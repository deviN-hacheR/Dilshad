require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { db, rowToProduct, uploadsDir } = require('./db');
const payments = require('./payments');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = 'dilshad';
const adminTokens = new Set();

const rootDir = path.join(__dirname, '..');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));
app.use('/images', express.static(path.join(rootDir, 'images')));
app.use(express.static(rootDir));
app.use('/admin', express.static(path.join(rootDir, 'admin')));

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `product-${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files allowed'));
  }
});

function authAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !adminTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

function generateOrderNumber() {
  return 'AS-' + Date.now().toString(36).toUpperCase() + '-' + crypto.randomBytes(2).toString('hex').toUpperCase();
}

// ---- Public API ----

app.get('/api/products', (_req, res) => {
  const rows = db.prepare('SELECT * FROM products ORDER BY featured DESC, id ASC').all();
  res.json(rows.map(rowToProduct));
});

app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Product not found' });
  res.json(rowToProduct(row));
});

// Cash on Delivery only — online payments must use /api/payments/*
app.post('/api/orders', (req, res) => {
  try {
    const {
      firstName, lastName, email, phone, address, city, state, zip, country,
      paymentMethod, items, subtotal, shipping, tax, total
    } = req.body;

    if (paymentMethod !== 'cod') {
      return res.status(400).json({
        error: 'Online payments must be completed through Razorpay. UPI/Card without payment is not allowed.'
      });
    }

    if (!items?.length) return res.status(400).json({ error: 'Cart is empty' });

    const placeOrder = db.transaction(() => {
      for (const item of items) {
        const product = db.prepare('SELECT stock FROM products WHERE id = ?').get(item.id);
        if (!product) throw new Error(`Product #${item.id} not found`);
        if (product.stock < item.qty) {
          throw new Error(`Insufficient stock for ${item.name}. Only ${product.stock} left.`);
        }
      }

      for (const item of items) {
        db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.qty, item.id);
      }

      const orderNumber = generateOrderNumber();
      db.prepare(`
        INSERT INTO orders (
          order_number, first_name, last_name, email, phone, address, city, state, zip, country,
          payment_method, subtotal, shipping, tax, total, items, payment_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        orderNumber, firstName, lastName, email, phone, address, city, state, zip,
        country || 'IN', 'cod', subtotal, shipping, tax, total, JSON.stringify(items), 'pending'
      );

      return orderNumber;
    });

    const orderNumber = placeOrder();
    res.json({ success: true, orderNumber });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---- Razorpay Payments (real money → your linked bank account) ----

app.get('/api/payments/config', (_req, res) => {
  res.json({
    enabled: payments.isConfigured(),
    keyId: payments.isConfigured() ? payments.getKeyId() : null
  });
});

app.post('/api/payments/create-order', async (req, res) => {
  try {
    if (!payments.isConfigured()) {
      return res.status(503).json({
        error: 'Payment gateway not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env file. See README.'
      });
    }

    const checkoutData = req.body;
    const { items, total, firstName, lastName, email, phone } = checkoutData;

    if (!items?.length) return res.status(400).json({ error: 'Cart is empty' });
    if (!total || total <= 0) return res.status(400).json({ error: 'Invalid order total' });

    for (const item of items) {
      const product = db.prepare('SELECT stock, name FROM products WHERE id = ?').get(item.id);
      if (!product) return res.status(400).json({ error: `Product not found` });
      if (product.stock < item.qty) {
        return res.status(400).json({ error: `Only ${product.stock} left for ${product.name}` });
      }
    }

    const razorpay = payments.getRazorpay();
    const rzOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: 'INR',
      receipt: `aero_${Date.now()}`,
      notes: { shop: 'Aero Styles', customer: `${firstName} ${lastName}` }
    });

    payments.savePendingCheckout(rzOrder.id, checkoutData);

    res.json({
      razorpayOrderId: rzOrder.id,
      amount: rzOrder.amount,
      currency: rzOrder.currency,
      keyId: payments.getKeyId(),
      customer: { name: `${firstName} ${lastName}`, email, contact: phone }
    });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not create payment' });
  }
});

app.post('/api/payments/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!payments.isConfigured()) {
      return res.status(503).json({ error: 'Payment gateway not configured' });
    }

    if (!payments.verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return res.status(400).json({ error: 'Payment verification failed. Money was NOT received.' });
    }

    const checkoutData = payments.getPendingCheckout(razorpay_order_id);
    if (!checkoutData) {
      return res.status(400).json({ error: 'Checkout session expired. Please try again.' });
    }

    const orderNumber = payments.fulfillOrder(checkoutData, razorpay_payment_id, razorpay_order_id);
    payments.deletePendingCheckout(razorpay_order_id);

    res.json({ success: true, orderNumber, paymentId: razorpay_payment_id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---- Admin API ----

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  adminTokens.add(token);
  res.json({ token });
});

app.post('/api/admin/logout', authAdmin, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  adminTokens.delete(token);
  res.json({ success: true });
});

app.get('/api/admin/products', authAdmin, (_req, res) => {
  const rows = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
  res.json(rows.map(rowToProduct));
});

app.get('/api/admin/orders', authAdmin, (_req, res) => {
  const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 50').all();
  res.json(rows.map(r => ({
    ...r,
    items: JSON.parse(r.items)
  })));
});

app.get('/api/admin/stats', authAdmin, (_req, res) => {
  const productCount = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  const orderCount = db.prepare('SELECT COUNT(*) as c FROM orders').get().c;
  const revenue = db.prepare(`
    SELECT COALESCE(SUM(total), 0) as t FROM orders
    WHERE payment_status = 'paid' OR payment_method = 'cod'
  `).get().t;
  const lowStock = db.prepare('SELECT COUNT(*) as c FROM products WHERE stock <= 5').get().c;
  res.json({ productCount, orderCount, revenue, lowStock });
});

app.post('/api/admin/products', authAdmin, upload.single('image'), (req, res) => {
  try {
    const { name, category, price, originalPrice, badge, description, sizes, colors, stock, featured } = req.body;
    let image = req.body.imageUrl || '';

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    if (!image) {
      image = '/images/placeholder.svg';
    }

    const result = db.prepare(`
      INSERT INTO products (name, category, price, original_price, image, badge, description, sizes, colors, stock, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name,
      category || 'suits',
      parseFloat(price),
      originalPrice ? parseFloat(originalPrice) : null,
      image,
      badge || null,
      description || '',
      sizes || '["M","L","XL"]',
      colors || '[{"name":"Default","hex":"#1a2332"}]',
      parseInt(stock, 10) || 0,
      featured === '1' || featured === 'true' ? 1 : 0
    );

    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(rowToProduct(row));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/admin/products/:id', authAdmin, upload.single('image'), (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Product not found' });

    const { name, category, price, originalPrice, badge, description, sizes, colors, stock, featured } = req.body;
    let image = existing.image;

    if (req.file) image = `/uploads/${req.file.filename}`;
    else if (req.body.imageUrl) image = req.body.imageUrl;

    db.prepare(`
      UPDATE products SET
        name = ?, category = ?, price = ?, original_price = ?, image = ?,
        badge = ?, description = ?, sizes = ?, colors = ?, stock = ?, featured = ?
      WHERE id = ?
    `).run(
      name ?? existing.name,
      category ?? existing.category,
      price !== undefined ? parseFloat(price) : existing.price,
      originalPrice !== undefined && originalPrice !== '' ? parseFloat(originalPrice) : null,
      image,
      badge !== undefined ? (badge || null) : existing.badge,
      description ?? existing.description,
      sizes ?? existing.sizes,
      colors ?? existing.colors,
      stock !== undefined ? parseInt(stock, 10) : existing.stock,
      featured !== undefined ? (featured === '1' || featured === 'true' ? 1 : 0) : existing.featured,
      req.params.id
    );

    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    res.json(rowToProduct(row));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/admin/products/:id/stock', authAdmin, (req, res) => {
  const { stock } = req.body;
  const result = db.prepare('UPDATE products SET stock = ? WHERE id = ?').run(parseInt(stock, 10), req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Product not found' });
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  res.json(rowToProduct(row));
});

app.delete('/api/admin/products/:id', authAdmin, (req, res) => {
  const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Product not found' });
  res.json({ success: true });
});

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  if (req.path === '/' || req.path === '/index.html') {
    return res.sendFile(path.join(rootDir, 'index.html'));
  }
  next();
});

app.listen(PORT, () => {
  console.log(`\n  Aero Styles server running at http://localhost:${PORT}`);
  console.log(`  Shop:  http://localhost:${PORT}`);
  console.log(`  Admin: http://localhost:${PORT}/admin/`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  if (payments.isConfigured()) {
    console.log(`  Payments: Razorpay ENABLED — online payments go to your linked bank account`);
  } else {
    console.log(`  Payments: NOT configured — copy .env.example to .env and add Razorpay keys`);
  }
  console.log('');
});
