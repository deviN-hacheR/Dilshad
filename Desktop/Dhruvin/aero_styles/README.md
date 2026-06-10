# Aero Styles — Men's Wear Shop

Full-stack e-commerce for **Aero Styles** with SQLite database, admin panel, and Indian checkout (₹ INR).

## Quick Start

**Requires [Node.js](https://nodejs.org/) installed.**

```bash
cd aero_styles
npm install
npm start
```

Then open:

| Page | URL |
|------|-----|
| **Shop** | http://localhost:3000 |
| **Admin Panel** | http://localhost:3000/admin/ |
| **Admin Password** | `dilshad` |

> Do **not** open `index.html` directly in the browser — the shop needs the server running to load products from the database.

## Features

### Shop
- Products loaded from SQLite database via API
- Prices in **Indian Rupees (₹)**
- Stock tracking — out-of-stock items disabled
- UPI, Card, and Cash on Delivery checkout
- Indian states + 6-digit PIN code
- GST (12%) and free shipping over ₹4,999
- Image fallback — no empty photo boxes

### Admin Panel (`/admin/`)
- Password-protected login
- Dashboard with stats and low-stock alerts
- Add products with **photo upload** or image URL
- Edit stock, price, name, category
- View recent orders
- Delete products

### Backend API
- `GET /api/products` — public product list
- `POST /api/orders` — place order (reduces stock)
- `POST /api/admin/login` — admin auth
- `GET/POST/PUT/DELETE /api/admin/products` — product management
- `PATCH /api/admin/products/:id/stock` — quick stock update

## Receive Real Payments (UPI / Card → Your Bank)

The shop uses **Razorpay** so customer payments go to **your bank account** (not a fake form).

### Setup steps

1. Create a free account at [https://razorpay.com](https://razorpay.com)
2. Complete **KYC** and **link your bank account** in the Razorpay dashboard
3. Go to **Settings → API Keys** and generate Test keys (for testing) or Live keys (for real money)
4. Copy `.env.example` to `.env` in the project folder:

```bash
copy .env.example .env
```

5. Paste your keys in `.env`:

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here
```

6. Restart the server: `npm start`

### How it works now

| Method | What happens |
|--------|----------------|
| **UPI / Card** | Razorpay payment popup opens → customer pays → payment verified → order confirmed → **money settles to your Razorpay-linked bank** (usually T+2 days) |
| **Cash on Delivery** | Order placed without online payment — collect cash on delivery |

> **Before Razorpay setup:** UPI/Card buttons are disabled. Only COD works.

### Test payments

Use Razorpay **Test Mode** keys and test UPI/card details from [Razorpay docs](https://razorpay.com/docs/payments/payments/test-card-upi-details/).

---

## Reset Database

Delete `server/aero_styles.db` and restart — fresh products will be seeded automatically.

## Project Structure

```
aero_styles/
├── server/
│   ├── index.js       ← Express API server
│   ├── db.js          ← SQLite setup
│   ├── seed-data.js   ← Default products (INR)
│   └── uploads/       ← Uploaded product photos
├── admin/             ← Admin panel (separate site)
├── js/
│   ├── api.js         ← API helpers
│   └── app.js         ← Shop frontend
├── images/
│   └── placeholder.svg
└── index.html
```
