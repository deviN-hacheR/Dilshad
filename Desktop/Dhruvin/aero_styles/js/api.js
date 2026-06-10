const API = {
  BASE: '',
  PLACEHOLDER: '/images/placeholder.svg',
  FREE_SHIPPING: 4999,
  SHIPPING_FEE: 99,
  GST_RATE: 0.12,

  imgUrl(url) {
    if (!url) return this.PLACEHOLDER;
    if (url.startsWith('http') || url.startsWith('/')) return url;
    return '/' + url;
  },

  imgTag(url, alt, extra = '') {
    const src = this.imgUrl(url);
    return `<img src="${src}" alt="${alt || ''}" loading="lazy" onerror="this.onerror=null;this.src='${this.PLACEHOLDER}'" ${extra}>`;
  },

  formatPrice(price) {
    return '₹' + Math.round(price).toLocaleString('en-IN');
  },

  async getProducts() {
    const res = await fetch(`${this.BASE}/api/products`);
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  },

  async getPaymentConfig() {
    const res = await fetch(`${this.BASE}/api/payments/config`);
    return res.json();
  },

  async createPaymentOrder(orderData) {
    const res = await fetch(`${this.BASE}/api/payments/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not start payment');
    return data;
  },

  async verifyPayment(paymentData) {
    const res = await fetch(`${this.BASE}/api/payments/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Payment verification failed');
    return data;
  },

  async placeCodOrder(orderData) {
    const res = await fetch(`${this.BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...orderData, paymentMethod: 'cod' })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Order failed');
    return data;
  }
};
