/* ============================================
   AERO STYLES — Shop Application
   ============================================ */

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
];

const App = {
  products: [],
  cart: [],
  wishlist: [],
  currentCategory: 'all',
  currentSort: 'featured',
  checkoutStep: 1,
  checkoutData: {},
  paymentsEnabled: false,

  async init() {
    this.loadStorage();
    this.bindEvents();
    try {
      const cfg = await API.getPaymentConfig();
      this.paymentsEnabled = cfg.enabled;
    } catch { this.paymentsEnabled = false; }
    await this.loadProducts();
    this.updateBadges();
    this.initPreloader();
    this.initTestimonials();
    this.initHeaderScroll();
  },

  async loadProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '<p style="text-align:center;padding:3rem;color:var(--text-light)">Loading collection...</p>';
    try {
      this.products = await API.getProducts();
      this.renderProducts();
      if (typeof Animations !== 'undefined') Animations.reobserve();
    } catch {
      grid.innerHTML = '<p style="text-align:center;padding:3rem;color:#c0392b">Unable to load products. Please start the server: npm start</p>';
    }
  },

  getProduct(id) {
    return this.products.find(p => p.id === id);
  },

  loadStorage() {
    try {
      this.cart = JSON.parse(localStorage.getItem('aero_cart') || '[]');
      this.wishlist = JSON.parse(localStorage.getItem('aero_wishlist') || '[]');
    } catch {
      this.cart = [];
      this.wishlist = [];
    }
  },

  saveStorage() {
    localStorage.setItem('aero_cart', JSON.stringify(this.cart));
    localStorage.setItem('aero_wishlist', JSON.stringify(this.wishlist));
  },

  formatPrice(price) {
    return API.formatPrice(price);
  },

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  initPreloader() {
    window.addEventListener('load', () => {
      setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 1200);
    });
  },

  initHeaderScroll() {
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      header.classList.toggle('scrolled', scrollY > 50);
      backToTop.classList.toggle('visible', scrollY > 500);
      if (scrollY > lastScroll && scrollY > 200) header.classList.add('hidden-header');
      else header.classList.remove('hidden-header');
      lastScroll = scrollY;
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  },

  initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let current = 0;
    const show = (index) => {
      cards.forEach((c, i) => c.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      current = index;
    };
    dots.forEach(dot => dot.addEventListener('click', () => show(parseInt(dot.dataset.index))));
    setInterval(() => show((current + 1) % cards.length), 5000);
  },

  getFilteredProducts() {
    let items = [...this.products];
    if (this.currentCategory !== 'all') items = items.filter(p => p.category === this.currentCategory);
    switch (this.currentSort) {
      case 'price-low': items.sort((a, b) => a.price - b.price); break;
      case 'price-high': items.sort((a, b) => b.price - a.price); break;
      case 'name': items.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return items;
  },

  renderProducts() {
    const grid = document.getElementById('productsGrid');
    const products = this.getFilteredProducts();

    if (!products.length) {
      grid.innerHTML = '<p style="text-align:center;padding:3rem;color:var(--text-light)">No products in this category.</p>';
      return;
    }

    grid.innerHTML = products.map((p, i) => {
      const outOfStock = !p.inStock || p.stock <= 0;
      return `
      <article class="product-card ${outOfStock ? 'out-of-stock' : ''}" data-id="${p.id}">
        <div class="product-image-wrap">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          ${outOfStock ? '<span class="product-badge out-stock-badge">Out of Stock</span>' : ''}
          ${API.imgTag(p.image, p.name)}
          <div class="product-actions">
            <button class="product-action-btn wishlist-toggle ${this.isWishlisted(p.id) ? 'wishlisted' : ''}" data-id="${p.id}" aria-label="Wishlist">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <button class="product-action-btn quick-view" data-id="${p.id}" aria-label="Quick view">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
          ${outOfStock ? '' : `<button class="product-quick-add" data-id="${p.id}">Quick Add to Bag</button>`}
        </div>
        <div class="product-info">
          <p class="product-category">${p.category}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-price">
            ${p.originalPrice ? `<span class="original">${this.formatPrice(p.originalPrice)}</span>` : ''}
            ${this.formatPrice(p.price)}
          </p>
          ${!outOfStock && p.stock <= 5 ? `<p class="stock-warning">Only ${p.stock} left!</p>` : ''}
        </div>
      </article>`;
    }).join('');

    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.product-action-btn') || e.target.closest('.product-quick-add')) return;
        this.openProductModal(parseInt(card.dataset.id));
      });
    });
    grid.querySelectorAll('.wishlist-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); this.toggleWishlist(parseInt(btn.dataset.id)); });
    });
    grid.querySelectorAll('.quick-view, .product-quick-add').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); this.openProductModal(parseInt(btn.dataset.id)); });
    });

    grid.classList.add('stagger-children');
    grid.classList.remove('visible');
    requestAnimationFrame(() => {
      const rect = grid.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) grid.classList.add('visible');
      if (typeof Animations !== 'undefined') Animations.reobserve();
    });
  },

  openProductModal(id) {
    const product = this.getProduct(id);
    if (!product) return;
    const outOfStock = !product.inStock || product.stock <= 0;
    const maxQty = Math.min(product.stock, 10);

    document.getElementById('productModalBody').innerHTML = `
      <div class="product-modal-image">${API.imgTag(product.image, product.name)}</div>
      <div class="product-modal-details">
        <p class="product-category">${product.category}</p>
        <h2>${product.name}</h2>
        <p class="product-modal-price">
          ${product.originalPrice ? `<span class="original">${this.formatPrice(product.originalPrice)}</span>` : ''}
          ${this.formatPrice(product.price)}
        </p>
        <p class="product-modal-desc">${product.description}</p>
        ${outOfStock ? '<p class="stock-warning" style="font-size:1rem;margin-bottom:1rem">Currently out of stock</p>' : `<p style="font-size:0.85rem;color:var(--text-light);margin-bottom:1rem">${product.stock} available in stock</p>`}
        <span class="option-label">Select Size</span>
        <div class="size-options" id="modalSizes">
          ${product.sizes.map((s, i) => `<button type="button" class="size-option ${i === 0 ? 'selected' : ''}" data-size="${s}">${s}</button>`).join('')}
        </div>
        <span class="option-label">Select Color</span>
        <div class="color-options" id="modalColors">
          ${product.colors.map((c, i) => `<button type="button" class="color-option ${i === 0 ? 'selected' : ''}" data-color="${c.name}" style="background:${c.hex}" title="${c.name}"></button>`).join('')}
        </div>
        ${!outOfStock ? `
        <span class="option-label">Quantity</span>
        <div class="qty-selector" id="modalQty">
          <button type="button" class="qty-dec">−</button>
          <span id="modalQtyValue">1</span>
          <button type="button" class="qty-inc">+</button>
        </div>` : ''}
        <div class="modal-actions-stacked">
          ${!outOfStock ? `
          <div class="modal-actions-row">
            <button class="btn btn-primary" id="addToCartBtn">Add to Bag</button>
            <button class="btn btn-buy-now" id="buyNowBtn">Buy Now</button>
          </div>` : ''}
          <button class="btn btn-secondary btn-full" id="modalWishlistBtn">
            ${this.isWishlisted(product.id) ? '♥ Saved to Wishlist' : '♡ Add to Wishlist'}
          </button>
        </div>
      </div>`;

    const body = document.getElementById('productModalBody');
    body.querySelectorAll('.size-option').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    body.querySelectorAll('.color-option').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('.color-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    let modalQty = 1;
    if (!outOfStock) {
      const qtyValue = document.getElementById('modalQtyValue');
      body.querySelector('.qty-dec')?.addEventListener('click', () => {
        if (modalQty > 1) { modalQty--; qtyValue.textContent = modalQty; }
      });
      body.querySelector('.qty-inc')?.addEventListener('click', () => {
        if (modalQty < maxQty) { modalQty++; qtyValue.textContent = modalQty; }
      });

      const getSel = () => {
        const size = body.querySelector('.size-option.selected')?.dataset.size;
        const color = body.querySelector('.color-option.selected')?.dataset.color;
        if (!size) { this.showToast('Please select a size', 'error'); return null; }
        if (!color) { this.showToast('Please select a color', 'error'); return null; }
        return { size, color };
      };

      document.getElementById('addToCartBtn').addEventListener('click', () => {
        const sel = getSel();
        if (!sel) return;
        if (this.addToCart(product.id, sel.size, sel.color, modalQty)) {
          this.closeModal('productModal');
          this.openDrawer('cartDrawer');
        }
      });
      document.getElementById('buyNowBtn').addEventListener('click', () => {
        const sel = getSel();
        if (!sel) return;
        if (this.addToCart(product.id, sel.size, sel.color, modalQty)) {
          this.closeModal('productModal');
          this.openCheckout();
        }
      });
    }

    document.getElementById('modalWishlistBtn').addEventListener('click', () => {
      this.toggleWishlist(product.id);
      document.getElementById('modalWishlistBtn').textContent =
        this.isWishlisted(product.id) ? '♥ Saved to Wishlist' : '♡ Add to Wishlist';
    });
    this.openModal('productModal');
  },

  getAvailableStock(productId, size, color) {
    const product = this.getProduct(productId);
    if (!product) return 0;
    const inCart = this.cart.find(i => i.id === productId && i.size === size && i.color === color);
    return product.stock - (inCart?.qty || 0);
  },

  addToCart(productId, size, color, qty = 1) {
    const product = this.getProduct(productId);
    if (!product) return false;
    if (product.stock <= 0) {
      this.showToast('This item is out of stock', 'error');
      return false;
    }

    const existing = this.cart.find(i => i.id === productId && i.size === size && i.color === color);
    const currentQty = existing?.qty || 0;
    if (currentQty + qty > product.stock) {
      this.showToast(`Only ${product.stock} available in stock`, 'error');
      return false;
    }

    if (existing) existing.qty += qty;
    else this.cart.push({
      id: productId, name: product.name, price: product.price,
      image: product.image, size, color, qty
    });

    this.saveStorage();
    this.updateBadges();
    this.renderCart();
    this.showToast(`${product.name} added to your bag`);
    return true;
  },

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveStorage();
    this.updateBadges();
    this.renderCart();
    this.showToast('Item removed', 'info');
  },

  updateCartQty(index, delta) {
    const item = this.cart[index];
    const product = this.getProduct(item.id);
    const newQty = item.qty + delta;
    if (newQty > (product?.stock || 0)) {
      this.showToast(`Only ${product.stock} available`, 'error');
      return;
    }
    if (newQty <= 0) { this.removeFromCart(index); return; }
    item.qty = newQty;
    this.saveStorage();
    this.updateBadges();
    this.renderCart();
  },

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  getOrderTotals() {
    const subtotal = this.getCartTotal();
    const shipping = subtotal >= API.FREE_SHIPPING ? 0 : API.SHIPPING_FEE;
    const tax = Math.round(subtotal * API.GST_RATE * 100) / 100;
    const total = Math.round((subtotal + shipping + tax) * 100) / 100;
    return { subtotal, shipping, tax, total };
  },

  renderCheckoutSidebar() {
    const sidebar = document.getElementById('checkoutSidebar');
    if (!sidebar) return;
    const { subtotal, shipping, tax, total } = this.getOrderTotals();
    sidebar.innerHTML = `
      <h4>Your Order (${this.cart.reduce((s, i) => s + i.qty, 0)} items)</h4>
      ${this.cart.map(item => `
        <div class="sidebar-item">
          ${API.imgTag(item.image, item.name)}
          <div class="sidebar-item-info">
            <p class="sidebar-item-name">${item.name}</p>
            <p class="sidebar-item-meta">${item.size} · ${item.color} · Qty ${item.qty}</p>
          </div>
          <span class="sidebar-item-price">${this.formatPrice(item.price * item.qty)}</span>
        </div>`).join('')}
      <div class="summary-line"><span>Subtotal</span><span>${this.formatPrice(subtotal)}</span></div>
      <div class="summary-line"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : this.formatPrice(shipping)}</span></div>
      <div class="summary-line"><span>GST (12%)</span><span>${this.formatPrice(tax)}</span></div>
      <div class="summary-line total"><span>Total</span><span>${this.formatPrice(total)}</span></div>
      ${subtotal < API.FREE_SHIPPING ? `<p style="font-size:0.75rem;color:var(--gold-dark);margin-top:0.75rem">Add ${this.formatPrice(API.FREE_SHIPPING - subtotal)} more for free shipping</p>` : ''}
    `;
  },

  renderCart() {
    const container = document.getElementById('cartItems');
    const subtotal = document.getElementById('cartSubtotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (!this.cart.length) {
      container.innerHTML = `<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p>Your bag is empty</p></div>`;
      subtotal.textContent = '₹0';
      if (checkoutBtn) { checkoutBtn.disabled = true; checkoutBtn.style.opacity = '0.5'; }
      return;
    }

    if (checkoutBtn) { checkoutBtn.disabled = false; checkoutBtn.style.opacity = '1'; }
    container.innerHTML = this.cart.map((item, i) => `
      <div class="cart-item">
        ${API.imgTag(item.image, item.name)}
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-meta">${item.size} · ${item.color}</p>
          <p class="cart-item-price">${this.formatPrice(item.price * item.qty)}</p>
          <div class="cart-item-controls">
            <button class="qty-btn" data-index="${i}" data-delta="-1">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-index="${i}" data-delta="1">+</button>
            <button class="cart-item-remove" data-index="${i}">Remove</button>
          </div>
        </div>
      </div>`).join('');
    subtotal.textContent = this.formatPrice(this.getCartTotal());
    container.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => this.updateCartQty(parseInt(btn.dataset.index), parseInt(btn.dataset.delta)));
    });
    container.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => this.removeFromCart(parseInt(btn.dataset.index)));
    });
  },

  isWishlisted(id) { return this.wishlist.includes(id); },

  toggleWishlist(id) {
    const product = this.getProduct(id);
    const idx = this.wishlist.indexOf(id);
    if (idx > -1) { this.wishlist.splice(idx, 1); this.showToast(`${product?.name} removed from wishlist`, 'info'); }
    else { this.wishlist.push(id); this.showToast(`${product?.name} saved to wishlist`); }
    this.saveStorage();
    this.updateBadges();
    this.renderWishlist();
    this.renderProducts();
  },

  renderWishlist() {
    const container = document.getElementById('wishlistItems');
    const items = this.products.filter(p => this.wishlist.includes(p.id));
    if (!items.length) {
      container.innerHTML = `<div class="cart-empty"><p>Your wishlist is empty</p></div>`;
      return;
    }
    container.innerHTML = items.map(p => `
      <div class="cart-item">
        ${API.imgTag(p.image, p.name)}
        <div class="cart-item-info">
          <p class="cart-item-name">${p.name}</p>
          <p class="cart-item-price">${this.formatPrice(p.price)}</p>
          <div class="cart-item-controls">
            <button class="btn btn-sm btn-primary wishlist-add-cart" data-id="${p.id}" ${!p.inStock ? 'disabled' : ''}>Add to Bag</button>
            <button class="cart-item-remove wishlist-remove" data-id="${p.id}">Remove</button>
          </div>
        </div>
      </div>`).join('');
    container.querySelectorAll('.wishlist-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = this.getProduct(parseInt(btn.dataset.id));
        if (p) this.addToCart(p.id, p.sizes[0], p.colors[0].name);
      });
    });
    container.querySelectorAll('.wishlist-remove').forEach(btn => {
      btn.addEventListener('click', () => this.toggleWishlist(parseInt(btn.dataset.id)));
    });
  },

  updateBadges() {
    const cartTotal = this.cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount').textContent = cartTotal;
    document.getElementById('wishlistCount').textContent = this.wishlist.length;
    document.getElementById('cartCount').classList.toggle('show', cartTotal > 0);
    document.getElementById('wishlistCount').classList.toggle('show', this.wishlist.length > 0);
  },

  openCheckout() {
    if (!this.cart.length) { this.showToast('Your bag is empty', 'error'); return; }
    this.checkoutStep = 1;
    this.checkoutData = { paymentMethod: 'upi', country: 'IN' };
    document.getElementById('checkoutSteps').style.display = '';
    document.getElementById('checkoutSidebar').style.display = '';
    this.renderCheckoutStep();
    this.closeDrawer('cartDrawer');
    this.openModal('checkoutModal');
  },

  getPaymentMethod() { return this.checkoutData.paymentMethod || 'upi'; },

  setPaymentMethod(method) {
    this.checkoutData.paymentMethod = method;
    const onlineMsg = document.getElementById('onlinePayMsg');
    const codMsg = document.getElementById('codMsg');
    if (onlineMsg) onlineMsg.style.display = (method === 'upi' || method === 'card') ? 'block' : 'none';
    if (codMsg) codMsg.style.display = method === 'cod' ? 'block' : 'none';
  },

  renderCheckoutStep() {
    document.querySelectorAll('.checkout-steps .step').forEach(s => {
      const n = parseInt(s.dataset.step);
      s.classList.toggle('active', n === this.checkoutStep);
      s.classList.toggle('completed', n < this.checkoutStep);
    });
    this.renderCheckoutSidebar();
    const body = document.getElementById('checkoutBody');
    const { subtotal, shipping, tax, total } = this.getOrderTotals();
    const d = this.checkoutData;

    if (this.checkoutStep === 1) {
      body.innerHTML = `
        <form class="checkout-form" id="checkoutForm1">
          <h3 class="checkout-heading">Delivery Details</h3>
          <div class="form-row">
            <div class="form-group"><label>First Name *</label><input name="firstName" required value="${d.firstName || ''}"></div>
            <div class="form-group"><label>Last Name *</label><input name="lastName" required value="${d.lastName || ''}"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Email *</label><input type="email" name="email" required value="${d.email || ''}"></div>
            <div class="form-group"><label>Phone *</label><input type="tel" name="phone" required placeholder="+91 98765 43210" pattern="[0-9+\\s-]{10,15}" value="${d.phone || ''}"></div>
          </div>
          <div class="form-group"><label>Street Address *</label><input name="address" required placeholder="House no., Street, Area" value="${d.address || ''}"></div>
          <div class="form-row">
            <div class="form-group"><label>City *</label><input name="city" required value="${d.city || ''}"></div>
            <div class="form-group"><label>State *</label>
              <select name="state" required>
                <option value="">Select state</option>
                ${INDIAN_STATES.map(s => `<option value="${s}" ${d.state === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>PIN Code *</label><input name="zip" required pattern="[0-9]{6}" maxlength="6" placeholder="6-digit PIN" value="${d.zip || ''}"></div>
            <div class="form-group"><label>Country</label><input name="country" value="India" readonly></div>
          </div>
          <div class="checkout-nav"><button type="submit" class="btn btn-primary">Continue to Payment →</button></div>
        </form>`;
      document.getElementById('checkoutForm1').addEventListener('submit', (e) => {
        e.preventDefault();
        this.checkoutData = { ...this.checkoutData, ...Object.fromEntries(new FormData(e.target)), country: 'IN' };
        this.checkoutStep = 2;
        this.renderCheckoutStep();
      });
    } else if (this.checkoutStep === 2) {
      const method = this.getPaymentMethod();
      const paySetupWarning = !this.paymentsEnabled ? `
        <div class="checkout-error" style="background:#fff3cd;border-left:4px solid #f39c12;padding:1rem;margin-bottom:1rem;font-size:0.9rem">
          <strong>Online payments not active yet.</strong> Shop owner must add Razorpay API keys in <code>.env</code> file.
          Use Cash on Delivery for now, or contact the store.
        </div>` : '';
      body.innerHTML = `
        <form class="checkout-form" id="checkoutForm2">
          <h3 class="checkout-heading">Payment Method</h3>
          ${paySetupWarning}
          <div class="payment-methods">
            <button type="button" class="payment-method ${method === 'upi' ? 'selected' : ''}" data-method="upi" ${!this.paymentsEnabled ? 'disabled title="Razorpay not configured"' : ''}>UPI / GPay</button>
            <button type="button" class="payment-method ${method === 'card' ? 'selected' : ''}" data-method="card" ${!this.paymentsEnabled ? 'disabled' : ''}>Card</button>
            <button type="button" class="payment-method ${method === 'cod' ? 'selected' : ''}" data-method="cod">Cash on Delivery</button>
          </div>
          <div id="onlinePayMsg" style="display:${method === 'upi' || method === 'card' ? 'block' : 'none'};padding:1rem;background:var(--cream);margin:1rem 0;font-size:0.9rem;line-height:1.6">
            <strong>Secure payment via Razorpay</strong><br>
            When you place the order, a real payment window opens. Pay with UPI (GPay, PhonePe, Paytm), card, or net banking.
            <br><br>
            <em>Money is deposited to the shop owner's bank account linked with Razorpay — not a fake form.</em>
            Order is confirmed only after payment succeeds.
          </div>
          <div id="codMsg" style="display:${method === 'cod' ? 'block' : 'none'};padding:1rem;background:var(--cream);font-size:0.9rem;color:var(--text-light)">
            Pay ${this.formatPrice(total)} in cash when your order is delivered.
          </div>
          <div class="checkout-nav">
            <button type="button" class="btn btn-secondary" id="checkoutBack">← Back</button>
            <button type="submit" class="btn btn-primary">Review Order — ${this.formatPrice(total)}</button>
          </div>
        </form>`;
      if (!this.paymentsEnabled && method !== 'cod') {
        this.checkoutData.paymentMethod = 'cod';
      }
      this.setPaymentMethod(this.getPaymentMethod());
      body.querySelectorAll('.payment-method:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
          body.querySelectorAll('.payment-method').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          this.setPaymentMethod(btn.dataset.method);
        });
      });
      document.getElementById('checkoutBack').addEventListener('click', () => { this.checkoutStep = 1; this.renderCheckoutStep(); });
      document.getElementById('checkoutForm2').addEventListener('submit', (e) => {
        e.preventDefault();
        this.checkoutData.paymentMethod = this.getPaymentMethod();
        this.checkoutStep = 3;
        this.renderCheckoutStep();
      });
    } else if (this.checkoutStep === 3) {
      const payLabels = { upi: 'UPI / GPay', card: 'Credit/Debit Card', cod: 'Cash on Delivery' };
      body.innerHTML = `
        <div class="checkout-form">
          <h3 class="checkout-heading">Review &amp; Place Order</h3>
          <div class="checkout-summary">
            <h4>Order Summary</h4>
            ${this.cart.map(item => `<div class="summary-line"><span>${item.name} × ${item.qty}</span><span>${this.formatPrice(item.price * item.qty)}</span></div>`).join('')}
            <div class="summary-line"><span>Subtotal</span><span>${this.formatPrice(subtotal)}</span></div>
            <div class="summary-line"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : this.formatPrice(shipping)}</span></div>
            <div class="summary-line"><span>GST (12%)</span><span>${this.formatPrice(tax)}</span></div>
            <div class="summary-line"><span>Deliver to</span><span style="text-align:right;max-width:55%">${d.address}, ${d.city}, ${d.state} - ${d.zip}</span></div>
            <div class="summary-line"><span>Payment</span><span>${payLabels[this.getPaymentMethod()]}</span></div>
            <div class="summary-line total"><span>Total</span><span>${this.formatPrice(total)}</span></div>
          </div>
          <div class="checkout-nav">
            <button type="button" class="btn btn-secondary" id="checkoutBack">← Back</button>
            <button type="button" class="btn btn-primary" id="placeOrderBtn">Place Order — ${this.formatPrice(total)}</button>
          </div>
        </div>`;
      document.getElementById('checkoutBack').addEventListener('click', () => { this.checkoutStep = 2; this.renderCheckoutStep(); });
      const btnLabel = this.getPaymentMethod() === 'cod'
        ? `Place Order — ${this.formatPrice(total)}`
        : `Pay ${this.formatPrice(total)} Securely`;
      document.getElementById('placeOrderBtn').textContent = btnLabel;
      document.getElementById('placeOrderBtn').addEventListener('click', () => this.submitOrder(d, { subtotal, shipping, tax, total }));
    }
  },

  buildOrderPayload(d, totals) {
    return {
      firstName: d.firstName, lastName: d.lastName, email: d.email, phone: d.phone,
      address: d.address, city: d.city, state: d.state, zip: d.zip, country: 'IN',
      paymentMethod: this.getPaymentMethod(),
      items: this.cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, size: i.size, color: i.color })),
      ...totals
    };
  },

  showOrderSuccess(d, orderNumber, paymentNote = '') {
    document.getElementById('checkoutSteps').style.display = 'none';
    document.getElementById('checkoutSidebar').style.display = 'none';
    document.getElementById('checkoutBody').innerHTML = `
      <div class="order-success">
        <div class="order-success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>
        <h3>Order Confirmed!</h3>
        <p>Thank you, ${d.firstName}. Your order has been placed.</p>
        <p class="order-number">Order #${orderNumber}</p>
        ${paymentNote ? `<p style="font-size:0.85rem;color:var(--success,#27ae60);margin-top:0.5rem">${paymentNote}</p>` : ''}
        <p style="margin-top:1rem;font-size:0.9rem">Confirmation sent to <strong>${d.email}</strong></p>
        <p style="font-size:0.85rem;color:var(--text-light);margin-top:0.5rem">Estimated delivery: 3–7 business days across India</p>
        <button class="btn btn-primary" id="orderDoneBtn" style="margin-top:2rem">Continue Shopping</button>
      </div>`;
    document.getElementById('orderDoneBtn').addEventListener('click', () => {
      document.getElementById('checkoutSteps').style.display = '';
      document.getElementById('checkoutSidebar').style.display = '';
      this.closeModal('checkoutModal');
      window.scrollTo({ top: document.getElementById('shop').offsetTop - 80, behavior: 'smooth' });
    });
  },

  async submitOrder(d, totals) {
    const btn = document.getElementById('placeOrderBtn');
    const method = this.getPaymentMethod();
    const payload = this.buildOrderPayload(d, totals);

    btn.classList.add('btn-loading');
    btn.textContent = 'Processing...';

    try {
      if (method === 'cod') {
        const result = await API.placeCodOrder(payload);
        this.cart = [];
        this.saveStorage();
        this.updateBadges();
        this.renderCart();
        await this.loadProducts();
        this.showOrderSuccess(d, result.orderNumber, 'Pay in cash on delivery.');
        return;
      }

      if (!this.paymentsEnabled) {
        throw new Error('Online payments are not set up. Use Cash on Delivery or ask the shop owner to configure Razorpay.');
      }

      if (typeof Razorpay === 'undefined') {
        throw new Error('Payment system failed to load. Please refresh the page.');
      }

      const paymentOrder = await API.createPaymentOrder(payload);

      await new Promise((resolve, reject) => {
        const rzp = new Razorpay({
          key: paymentOrder.keyId,
          amount: paymentOrder.amount,
          currency: paymentOrder.currency,
          name: 'Aero Styles',
          description: 'Men\'s Wear Order',
          order_id: paymentOrder.razorpayOrderId,
          prefill: paymentOrder.customer,
          theme: { color: '#1a2332' },
          method: method === 'upi' ? { card: false, netbanking: false, wallet: false, upi: true } : undefined,
          handler: async (response) => {
            try {
              btn.textContent = 'Verifying payment...';
              const verified = await API.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });
              this.cart = [];
              this.saveStorage();
              this.updateBadges();
              this.renderCart();
              await this.loadProducts();
              this.showOrderSuccess(
                d,
                verified.orderNumber,
                `Payment received (ID: ${verified.paymentId}). Money sent to shop bank account.`
              );
              resolve();
            } catch (err) {
              reject(err);
            }
          },
          modal: {
            ondismiss: () => reject(new Error('Payment cancelled. No money was charged.'))
          }
        });
        rzp.on('payment.failed', (resp) => {
          reject(new Error(resp.error?.description || 'Payment failed'));
        });
        rzp.open();
      });
    } catch (err) {
      this.showToast(err.message, 'error');
      btn.classList.remove('btn-loading');
      btn.textContent = method === 'cod' ? `Place Order — ${this.formatPrice(totals.total)}` : `Pay ${this.formatPrice(totals.total)} Securely`;
    }
  },

  handleSearch(query) {
    const results = document.getElementById('searchResults');
    if (!query.trim()) { results.innerHTML = ''; return; }
    const matches = this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(query.toLowerCase())
    );
    if (!matches.length) { results.innerHTML = '<p style="padding:1rem;color:var(--text-light)">No results found</p>'; return; }
    results.innerHTML = matches.map(p => `
      <div class="search-result-item" data-id="${p.id}">
        ${API.imgTag(p.image, p.name, 'style="width:50px;height:60px;object-fit:cover"')}
        <div><strong style="color:var(--navy)">${p.name}</strong><p style="font-size:0.85rem;color:var(--text-light)">${this.formatPrice(p.price)}</p></div>
      </div>`).join('');
    results.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        this.closeOverlay('searchOverlay');
        this.openProductModal(parseInt(item.dataset.id));
      });
    });
  },

  openModal(id) { document.getElementById(id).classList.add('active'); document.body.classList.add('no-scroll'); },
  closeModal(id) { document.getElementById(id).classList.remove('active'); document.body.classList.remove('no-scroll'); },
  openDrawer(id) { document.getElementById(id).classList.add('active'); document.body.classList.add('no-scroll'); },
  closeDrawer(id) {
    document.getElementById(id).classList.remove('active');
    if (!document.querySelector('.modal.active')) document.body.classList.remove('no-scroll');
  },
  openOverlay(id) { document.getElementById(id).classList.add('active'); document.body.classList.add('no-scroll'); },
  closeOverlay(id) { document.getElementById(id).classList.remove('active'); document.body.classList.remove('no-scroll'); },

  bindEvents() {
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
      document.getElementById('mobileMenuBtn').classList.toggle('active');
      document.getElementById('navMobile').classList.toggle('open');
    });

    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.dataset.filter) {
          e.preventDefault();
          this.currentCategory = link.dataset.filter;
          document.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('active', t.dataset.category === link.dataset.filter));
          this.renderProducts();
        }
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`[data-nav="${link.dataset.nav}"]`).forEach(l => {
          if (l.classList.contains('nav-link')) l.classList.add('active');
        });
        document.getElementById('navMobile').classList.remove('open');
        document.getElementById('mobileMenuBtn').classList.remove('active');
      });
    });

    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentCategory = tab.dataset.category;
        this.renderProducts();
      });
    });

    document.getElementById('sortSelect').addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.renderProducts();
    });

    document.getElementById('searchBtn').addEventListener('click', () => {
      this.openOverlay('searchOverlay');
      setTimeout(() => document.getElementById('searchInput').focus(), 300);
    });
    document.getElementById('closeSearch').addEventListener('click', () => this.closeOverlay('searchOverlay'));
    document.getElementById('searchInput').addEventListener('input', (e) => this.handleSearch(e.target.value));

    document.getElementById('cartBtn').addEventListener('click', () => { this.renderCart(); this.openDrawer('cartDrawer'); });
    document.getElementById('closeCart').addEventListener('click', () => this.closeDrawer('cartDrawer'));
    document.getElementById('continueShopping').addEventListener('click', () => this.closeDrawer('cartDrawer'));
    document.getElementById('checkoutBtn').addEventListener('click', () => this.openCheckout());

    document.getElementById('wishlistBtn').addEventListener('click', () => { this.renderWishlist(); this.openDrawer('wishlistDrawer'); });
    document.getElementById('closeWishlist').addEventListener('click', () => this.closeDrawer('wishlistDrawer'));

    const openSizeGuide = () => this.openModal('sizeGuideModal');
    document.getElementById('sizeGuideBtn').addEventListener('click', openSizeGuide);
    document.getElementById('footerSizeGuide').addEventListener('click', (e) => { e.preventDefault(); openSizeGuide(); });

    document.querySelectorAll('.size-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.size-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.size-table').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`[data-size-table="${tab.dataset.sizeTab}"]`).classList.add('active');
      });
    });

    document.querySelectorAll('.modal').forEach(modal => {
      modal.querySelector('.modal-backdrop')?.addEventListener('click', () => { modal.classList.remove('active'); document.body.classList.remove('no-scroll'); });
      modal.querySelector('.modal-close')?.addEventListener('click', () => { modal.classList.remove('active'); document.body.classList.remove('no-scroll'); });
    });
    document.querySelectorAll('.drawer').forEach(drawer => {
      drawer.querySelector('.drawer-backdrop')?.addEventListener('click', () => { drawer.classList.remove('active'); document.body.classList.remove('no-scroll'); });
    });
    document.querySelectorAll('.category-card[data-filter]').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentCategory = card.dataset.filter;
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('active', t.dataset.category === card.dataset.filter));
        this.renderProducts();
      });
    });

    document.getElementById('newsletterForm').addEventListener('submit', (e) => { e.preventDefault(); this.showToast('Welcome to the Aero Styles Circle!'); e.target.reset(); });
    document.getElementById('contactForm').addEventListener('submit', (e) => { e.preventDefault(); this.showToast('Message sent! We\'ll be in touch shortly.'); e.target.reset(); });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active, .drawer.active, .overlay.active').forEach(el => el.classList.remove('active'));
        document.body.classList.remove('no-scroll');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
