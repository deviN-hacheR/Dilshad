const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'aero_styles.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'suits',
    price REAL NOT NULL,
    original_price REAL,
    image TEXT NOT NULL,
    badge TEXT,
    description TEXT,
    sizes TEXT NOT NULL DEFAULT '["M","L","XL"]',
    colors TEXT NOT NULL DEFAULT '[{"name":"Default","hex":"#1a2332"}]',
    stock INTEGER NOT NULL DEFAULT 10,
    featured INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'IN',
    payment_method TEXT NOT NULL,
    subtotal REAL NOT NULL,
    shipping REAL NOT NULL,
    tax REAL NOT NULL,
    total REAL NOT NULL,
    items TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed',
    payment_status TEXT NOT NULL DEFAULT 'pending',
    razorpay_payment_id TEXT,
    razorpay_order_id TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS pending_checkouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    razorpay_order_id TEXT UNIQUE NOT NULL,
    checkout_data TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

const orderColumns = db.prepare('PRAGMA table_info(orders)').all().map(c => c.name);
if (!orderColumns.includes('payment_status')) {
  db.exec(`ALTER TABLE orders ADD COLUMN payment_status TEXT NOT NULL DEFAULT 'pending'`);
}
if (!orderColumns.includes('razorpay_payment_id')) {
  db.exec(`ALTER TABLE orders ADD COLUMN razorpay_payment_id TEXT`);
}
if (!orderColumns.includes('razorpay_order_id')) {
  db.exec(`ALTER TABLE orders ADD COLUMN razorpay_order_id TEXT`);
}

function rowToProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    originalPrice: row.original_price || null,
    image: row.image,
    badge: row.badge || null,
    description: row.description || '',
    sizes: JSON.parse(row.sizes),
    colors: JSON.parse(row.colors),
    stock: row.stock,
    inStock: row.stock > 0,
    featured: !!row.featured
  };
}

function seedIfEmpty() {
  const count = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  if (count > 0) return;

  const seedProducts = require('./seed-data');
  const insert = db.prepare(`
    INSERT INTO products (name, category, price, original_price, image, badge, description, sizes, colors, stock, featured)
    VALUES (@name, @category, @price, @original_price, @image, @badge, @description, @sizes, @colors, @stock, @featured)
  `);

  const insertMany = db.transaction((items) => {
    for (const p of items) {
      insert.run({
        name: p.name,
        category: p.category,
        price: p.price,
        original_price: p.originalPrice || null,
        image: p.image,
        badge: p.badge || null,
        description: p.description,
        sizes: JSON.stringify(p.sizes),
        colors: JSON.stringify(p.colors),
        stock: p.stock,
        featured: p.featured ? 1 : 0
      });
    }
  });

  insertMany(seedProducts);
  console.log(`Seeded ${seedProducts.length} products into database.`);
}

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

seedIfEmpty();

function migrateLegacyData() {
  const seedProducts = require('./seed-data');
  const rows = db.prepare('SELECT id, image, price FROM products ORDER BY id ASC').all();
  rows.forEach((row, i) => {
    const seed = seedProducts[i];
    if (!seed) return;
    const needsImageFix = !row.image || row.image.includes('unsplash');
    if (needsImageFix) {
      db.prepare('UPDATE products SET image = ? WHERE id = ?').run(seed.image, row.id);
    }
  });
}

migrateLegacyData();

module.exports = { db, rowToProduct, uploadsDir };
