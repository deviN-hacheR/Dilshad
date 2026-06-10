const API = '';
const PLACEHOLDER = '/images/placeholder.svg';

const Admin = {
  token: sessionStorage.getItem('aero_admin_token'),
  products: [],

  init() {
    if (this.token) {
      this.showApp();
      this.loadAll();
    }
    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.login();
    });

    document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

    document.querySelectorAll('.nav-item, [data-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view) this.switchView(view);
      });
    });

    document.getElementById('productForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveProduct();
    });

    document.getElementById('cancelEdit').addEventListener('click', () => {
      this.resetForm();
      this.switchView('products');
    });

    document.getElementById('pImageFile').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        document.getElementById('imagePreview').src = URL.createObjectURL(file);
      }
    });

    document.getElementById('pImageUrl').addEventListener('input', (e) => {
      if (e.target.value) {
        document.getElementById('imagePreview').src = e.target.value;
      }
    });
  },

  async login() {
    const password = document.getElementById('password').value;
    const errEl = document.getElementById('loginError');
    errEl.textContent = '';

    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      this.token = data.token;
      sessionStorage.setItem('aero_admin_token', this.token);
      this.showApp();
      this.loadAll();
    } catch (err) {
      errEl.textContent = err.message;
    }
  },

  logout() {
    if (this.token) {
      fetch(`${API}/api/admin/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.token}` }
      });
    }
    this.token = null;
    sessionStorage.removeItem('aero_admin_token');
    document.getElementById('adminApp').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('password').value = '';
  },

  showApp() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminApp').classList.remove('hidden');
  },

  async api(path, options = {}) {
    const res = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${this.token}`,
        ...options.headers
      }
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) {
      this.logout();
      throw new Error('Session expired. Please login again.');
    }
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  },

  async loadAll() {
    await Promise.all([
      this.loadStats(),
      this.loadProducts(),
      this.loadOrders()
    ]);
  },

  async loadStats() {
    try {
      const stats = await this.api('/api/admin/stats');
      document.getElementById('statsGrid').innerHTML = `
        <div class="stat-card"><div class="label">Products</div><div class="value">${stats.productCount}</div></div>
        <div class="stat-card"><div class="label">Orders</div><div class="value">${stats.orderCount}</div></div>
        <div class="stat-card"><div class="label">Revenue</div><div class="value">₹${Math.round(stats.revenue).toLocaleString('en-IN')}</div></div>
        <div class="stat-card"><div class="label">Low Stock</div><div class="value">${stats.lowStock}</div></div>
      `;

      const lowStock = this.products.filter(p => p.stock <= 5);
      document.getElementById('lowStockList').innerHTML = lowStock.length
        ? lowStock.map(p => `<p>⚠ <strong>${p.name}</strong> — only ${p.stock} left</p>`).join('')
        : '<p style="color:#888">All products are well stocked.</p>';
    } catch (err) {
      this.toast(err.message, 'error');
    }
  },

  async loadProducts() {
    try {
      this.products = await this.api('/api/admin/products');
      this.renderProductsTable();
      await this.loadStats();
    } catch (err) {
      this.toast(err.message, 'error');
    }
  },

  imgSrc(url) {
    if (!url) return PLACEHOLDER;
    return url.startsWith('http') || url.startsWith('/') ? url : `/${url}`;
  },

  formatPrice(n) {
    return '₹' + Number(n).toLocaleString('en-IN');
  },

  renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = this.products.map(p => `
      <tr>
        <td><img src="${this.imgSrc(p.image)}" alt="${p.name}" onerror="this.src='${PLACEHOLDER}'"></td>
        <td><strong>${p.name}</strong>${p.badge ? `<br><small style="color:var(--gold)">${p.badge}</small>` : ''}</td>
        <td>${p.category}</td>
        <td>${this.formatPrice(p.price)}</td>
        <td>
          <input type="number" class="stock-input ${p.stock <= 5 ? 'stock-low' : 'stock-ok'}" value="${p.stock}" min="0"
            data-id="${p.id}" onchange="Admin.updateStock(${p.id}, this.value)">
        </td>
        <td class="action-btns">
          <button class="btn-edit" onclick="Admin.editProduct(${p.id})">Edit</button>
          <button class="btn-danger" onclick="Admin.deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `).join('');
  },

  async updateStock(id, stock) {
    try {
      await this.api(`/api/admin/products/${id}/stock`, {
        method: 'PATCH',
        body: JSON.stringify({ stock: parseInt(stock, 10) })
      });
      this.toast('Stock updated');
      await this.loadProducts();
    } catch (err) {
      this.toast(err.message, 'error');
    }
  },

  editProduct(id) {
    const p = this.products.find(pr => pr.id === id);
    if (!p) return;

    document.getElementById('editId').value = p.id;
    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('pName').value = p.name;
    document.getElementById('pCategory').value = p.category;
    document.getElementById('pPrice').value = p.price;
    document.getElementById('pOriginalPrice').value = p.originalPrice || '';
    document.getElementById('pStock').value = p.stock;
    document.getElementById('pBadge').value = p.badge || '';
    document.getElementById('pDescription').value = p.description || '';
    document.getElementById('pSizes').value = p.sizes.join(', ');
    document.getElementById('pFeatured').value = p.featured ? '1' : '0';
    document.getElementById('pImageUrl').value = p.image.startsWith('/uploads') ? '' : p.image;
    document.getElementById('imagePreview').src = this.imgSrc(p.image);
    document.getElementById('pImageFile').value = '';

    this.switchView('add');
  },

  resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('editId').value = '';
    document.getElementById('formTitle').textContent = 'Add New Product';
    document.getElementById('imagePreview').src = PLACEHOLDER;
    document.getElementById('pStock').value = 10;
    document.getElementById('pSizes').value = 'S, M, L, XL';
  },

  async saveProduct() {
    const editId = document.getElementById('editId').value;
    const sizes = document.getElementById('pSizes').value.split(',').map(s => s.trim()).filter(Boolean);
    const colors = [{ name: 'Default', hex: '#1a2332' }];

    const formData = new FormData();
    formData.append('name', document.getElementById('pName').value);
    formData.append('category', document.getElementById('pCategory').value);
    formData.append('price', document.getElementById('pPrice').value);
    formData.append('originalPrice', document.getElementById('pOriginalPrice').value);
    formData.append('stock', document.getElementById('pStock').value);
    formData.append('badge', document.getElementById('pBadge').value);
    formData.append('description', document.getElementById('pDescription').value);
    formData.append('sizes', JSON.stringify(sizes));
    formData.append('colors', JSON.stringify(colors));
    formData.append('featured', document.getElementById('pFeatured').value);

    const imageFile = document.getElementById('pImageFile').files[0];
    const imageUrl = document.getElementById('pImageUrl').value.trim();

    if (imageFile) formData.append('image', imageFile);
    else if (imageUrl) formData.append('imageUrl', imageUrl);
    else if (!editId) {
      this.toast('Please upload a photo or provide an image URL', 'error');
      return;
    }

    try {
      const btn = document.getElementById('saveProductBtn');
      btn.disabled = true;
      btn.textContent = 'Saving...';

      if (editId) {
        await fetch(`${API}/api/admin/products/${editId}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${this.token}` },
          body: formData
        }).then(async res => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          return data;
        });
        this.toast('Product updated!', 'success');
      } else {
        await fetch(`${API}/api/admin/products`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${this.token}` },
          body: formData
        }).then(async res => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          return data;
        });
        this.toast('Product added!', 'success');
      }

      this.resetForm();
      await this.loadProducts();
      this.switchView('products');
    } catch (err) {
      this.toast(err.message, 'error');
    } finally {
      const btn = document.getElementById('saveProductBtn');
      btn.disabled = false;
      btn.textContent = 'Save Product';
    }
  },

  async deleteProduct(id) {
    if (!confirm('Delete this product permanently?')) return;
    try {
      await this.api(`/api/admin/products/${id}`, { method: 'DELETE' });
      this.toast('Product deleted', 'success');
      await this.loadProducts();
    } catch (err) {
      this.toast(err.message, 'error');
    }
  },

  async loadOrders() {
    try {
      const orders = await this.api('/api/admin/orders');
      document.getElementById('ordersTableBody').innerHTML = orders.length
        ? orders.map(o => `
          <tr>
            <td><strong>${o.order_number}</strong></td>
            <td>${o.first_name} ${o.last_name}<br><small>${o.email}</small></td>
            <td>${this.formatPrice(o.total)}</td>
            <td>${o.payment_method === 'cod' ? 'COD' : 'Online'}</td>
            <td><span class="${o.payment_status === 'paid' ? 'stock-ok' : 'stock-low'}">${o.payment_status || 'pending'}</span></td>
            <td>${new Date(o.created_at).toLocaleDateString('en-IN')}</td>
          </tr>
        `).join('')
        : '<tr><td colspan="6" style="text-align:center;color:#888">No orders yet</td></tr>';
    } catch (err) {
      this.toast(err.message, 'error');
    }
  },

  switchView(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`view-${view}`)?.classList.add('active');
    document.querySelector(`.nav-item[data-view="${view}"]`)?.classList.add('active');

    const titles = { dashboard: 'Dashboard', products: 'Products', orders: 'Orders', add: 'Add Product' };
    document.getElementById('pageTitle').textContent = titles[view] || 'Admin';

    if (view === 'add' && !document.getElementById('editId').value) {
      this.resetForm();
    }
    if (view === 'orders') this.loadOrders();
  },

  toast(msg, type = '') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = `toast ${type}`;
    setTimeout(() => el.classList.add('hidden'), 3000);
    el.classList.remove('hidden');
  }
};

document.addEventListener('DOMContentLoaded', () => Admin.init());
