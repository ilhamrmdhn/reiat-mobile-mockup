import { icons } from '../icons.js';
import { renderBottomNav, initBottomNav } from '../components/bottom-nav.js';

/**
 * Screen 1: Home & Catalog
 * Search bar, filter, category pills, masonry product grid
 */

const products = [
  { id: 1, name: 'Pink Oversized Cardigan', price: 'Rp 189.000', image: '/images/cardigan.png', type: 'clothing' },
  { id: 2, name: 'Blouse Pattern — Digital', price: 'Rp 45.000', image: '/images/pattern-blouse.png', type: 'pattern' },
  { id: 3, name: 'Cropped Denim Jacket', price: 'Rp 275.000', image: '/images/denim-jacket.png', type: 'clothing' },
  { id: 4, name: 'A-Line Skirt Pattern', price: 'Rp 35.000', image: '/images/pattern-skirt.png', type: 'pattern' },
  { id: 5, name: 'Oversized Graphic Tee', price: 'Rp 129.000', image: '/images/streetwear-tee.png', type: 'clothing' },
  { id: 6, name: 'Cable Knit Sweater', price: 'Rp 245.000', image: '/images/knit-sweater.png', type: 'clothing' },
];

const categories = [
  { label: 'Semua', active: true },
  { label: 'Pakaian', active: false },
  { label: 'Pola Digital', active: false },
  { label: 'Trending', active: false },
  { label: 'Sale', active: false },
];

export function renderHome(navigateFn) {
  return `
    <div class="view" id="home-view">
      <!-- Header -->
      <div class="home-header">
        <div class="home-header__top">
          <h1 class="home-header__logo">Rei<span>at</span></h1>
          <div class="home-header__actions">
            <button class="home-header__icon-btn" aria-label="Wishlist">
              ${icons.heart}
            </button>
            <button class="home-header__icon-btn" aria-label="Notifications">
              ${icons.bell}
              <span class="home-header__badge"></span>
            </button>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="home-search">
          <div class="search-bar" id="search-bar">
            ${icons.search}
            <input type="text" placeholder="Cari pakaian & pola jahit..." id="search-input" />
          </div>
          <button class="filter-btn" id="filter-btn" aria-label="Filter">
            ${icons.filter}
          </button>
        </div>
      </div>

      <!-- Category Pills -->
      <div class="category-pills" id="category-pills">
        ${categories.map((cat, i) => `
          <button class="category-pill ${cat.active ? 'category-pill--active' : ''}" data-index="${i}">
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <!-- Product Grid -->
      <div class="home-content">
        <div class="product-grid" id="product-grid">
          ${products.map(p => `
            <div class="product-card" data-product-id="${p.id}" id="product-${p.id}">
              <img class="product-card__image" src="${p.image}" alt="${p.name}" loading="lazy" />
              <div class="product-card__info">
                <span class="product-card__badge product-card__badge--${p.type === 'pattern' ? 'pattern' : 'clothing'}">
                  ${p.type === 'pattern' ? 'Digital Pattern' : 'Clothing'}
                </span>
                <p class="product-card__name">${p.name}</p>
                <p class="product-card__price">${p.price}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    ${renderBottomNav('home')}
  `;
}

export function initHome(navigateFn) {
  initBottomNav(navigateFn);

  // Category pill toggle
  const pillContainer = document.getElementById('category-pills');
  if (pillContainer) {
    pillContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.category-pill');
      if (!pill) return;
      pillContainer.querySelectorAll('.category-pill').forEach(p => p.classList.remove('category-pill--active'));
      pill.classList.add('category-pill--active');
    });
  }

  // Product card click → navigate to PDP
  const grid = document.getElementById('product-grid');
  if (grid) {
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      const productId = card.dataset.productId;
      const product = products.find(p => p.id === parseInt(productId));
      if (product && product.type === 'pattern') {
        navigateFn('pattern-detail', { productId });
      } else {
        navigateFn('product-detail', { productId });
      }
    });
  }
}
