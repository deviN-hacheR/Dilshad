/* Aero Styles — Classic motion & scroll choreography */

const Animations = {
  init() {
    this.initReveal();
    this.initStaggerGrids();
    this.initParallax();
    this.initCounters();
    this.initButtonRipple();
    this.initSmoothSections();
  },

  initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.dataset.revealOnce !== 'false') {
            observer.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    const observeAll = () => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-scale, .stagger-children, .animate-draw').forEach(el => {
        if (!el.dataset.observed) {
          el.dataset.observed = '1';
          observer.observe(el);
        }
      });
    };

    observeAll();
    this._reobserve = observeAll;
  },

  reobserve() {
    if (this._reobserve) this._reobserve();
  },

  initStaggerGrids() {
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
      productsGrid.classList.add('stagger-children');
    }
  },

  initParallax() {
    const frame = document.getElementById('heroParallax');
    if (!frame) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const rotate = scrollY * 0.015;
        const y = scrollY * 0.06;
        frame.style.transform = `translateY(${y}px) rotate(${Math.min(rotate, 3)}deg)`;
        ticking = false;
      });
    }, { passive: true });

    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });

    frame.addEventListener('mouseleave', () => {
      frame.style.transform = '';
    });
  },

  initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const runCounter = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '+';
      const duration = 1800;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  },

  initButtonRipple() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  },

  initSmoothSections() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = 100;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Animations.init());
