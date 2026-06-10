const crypto = require('crypto');
const { db } = require('./db');

const KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

function isConfigured() {
  return Boolean(KEY_ID && KEY_SECRET && KEY_ID.startsWith('rzp_'));
}

function getRazorpay() {
  if (!isConfigured()) return null;
  // eslint-disable-next-line global-require
  const Razorpay = require('razorpay');
  return new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
}

function verifySignature(orderId, paymentId, signature) {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac('sha256', KEY_SECRET).update(body).digest('hex');
  return expected === signature;
}

function savePendingCheckout(razorpayOrderId, checkoutData) {
  db.prepare(`
    INSERT INTO pending_checkouts (razorpay_order_id, checkout_data)
    VALUES (?, ?)
  `).run(razorpayOrderId, JSON.stringify(checkoutData));
}

function getPendingCheckout(razorpayOrderId) {
  const row = db.prepare('SELECT * FROM pending_checkouts WHERE razorpay_order_id = ?').get(razorpayOrderId);
  if (!row) return null;
  return JSON.parse(row.checkout_data);
}

function deletePendingCheckout(razorpayOrderId) {
  db.prepare('DELETE FROM pending_checkouts WHERE razorpay_order_id = ?').run(razorpayOrderId);
}

function fulfillOrder(checkoutData, razorpayPaymentId, razorpayOrderId) {
  const {
    firstName, lastName, email, phone, address, city, state, zip, country,
    paymentMethod, items, subtotal, shipping, tax, total
  } = checkoutData;

  const placeOrder = db.transaction(() => {
    for (const item of items) {
      const product = db.prepare('SELECT stock, name FROM products WHERE id = ?').get(item.id);
      if (!product) throw new Error(`Product #${item.id} not found`);
      if (product.stock < item.qty) {
        throw new Error(`Insufficient stock for ${product.name}. Only ${product.stock} left.`);
      }
    }

    for (const item of items) {
      db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.qty, item.id);
    }

    const orderNumber = 'AS-' + Date.now().toString(36).toUpperCase() + '-' + crypto.randomBytes(2).toString('hex').toUpperCase();
    db.prepare(`
      INSERT INTO orders (
        order_number, first_name, last_name, email, phone, address, city, state, zip, country,
        payment_method, subtotal, shipping, tax, total, items, status,
        payment_status, razorpay_payment_id, razorpay_order_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      orderNumber, firstName, lastName, email, phone, address, city, state, zip,
      country || 'IN', paymentMethod, subtotal, shipping, tax, total, JSON.stringify(items),
      'confirmed', 'paid', razorpayPaymentId, razorpayOrderId
    );

    return orderNumber;
  });

  return placeOrder();
}

module.exports = {
  isConfigured,
  getRazorpay,
  getKeyId: () => KEY_ID,
  verifySignature,
  savePendingCheckout,
  getPendingCheckout,
  deletePendingCheckout,
  fulfillOrder
};
