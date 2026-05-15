import { icons } from '../icons.js';
import { renderBottomNav, initBottomNav } from '../components/bottom-nav.js';

/**
 * Screen 1: Home & Catalog
 * Search bar, filter, category pills, masonry product grid, store reviews
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

// Store reviews data
const storeReviews = [
  {
    id: 1,
    name: 'Rina S.',
    avatar: 'R',
    rating: 5,
    text: 'Beli cardigan thrift di sini, kondisi beneran 9/10 sesuai deskripsi. Packagingnya juga rapi banget, ga nyangka barang thrift bisa sesafe ini sampainya!',
    photo: '/images/cardigan.png',
    date: '2 hari lalu',
    product: 'Pink Oversized Cardigan',
  },
  {
    id: 2,
    name: 'Dimas A.',
    avatar: 'D',
    rating: 5,
    text: 'Pola blouse-nya super detail, tutorial-nya juga lengkap. Cocok banget buat pemula kayak aku. Hasilnya surprisingly bagus!',
    photo: '/images/pattern-blouse.png',
    date: '5 hari lalu',
    product: 'Blouse Pattern — Digital',
  },
  {
    id: 3,
    name: 'Sari W.',
    avatar: 'S',
    rating: 4,
    text: 'Sweater rajutnya bagus dan hangat. Warna sedikit lebih gelap dari foto tapi overall puas. Pasti belanja lagi di Reiat!',
    photo: '/images/knit-sweater.png',
    date: '1 minggu lalu',
    product: 'Cable Knit Sweater',
  },
  {
    id: 4,
    name: 'Ayu P.',
    avatar: 'A',
    rating: 5,
    text: 'Denim jacket-nya keren banget! Kondisi seperti baru, jahitannya masih kuat. Ukuran juga pas sesuai deskripsi. Love it! 💕',
    photo: '/images/denim-jacket.png',
    date: '1 minggu lalu',
    product: 'Cropped Denim Jacket',
  },
  {
    id: 5,
    name: 'Maya R.',
    avatar: 'M',
    rating: 5,
    text: 'Pertama kali beli thrift online dan ga kecewa sama sekali. Barangnya original, bersih, dan cepat sampai. Thank you Reiat! 🙏',
    photo: '/images/streetwear-tee.png',
    date: '2 minggu lalu',
    product: 'Oversized Graphic Tee',
  },
];

const storeRating = 4.9;
const totalReviews = 248;

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += `<span class="review-star review-star--filled">${icons.star}</span>`;
    } else {
      stars += `<span class="review-star">${icons.starEmpty}</span>`;
    }
  }
  return stars;
}

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

        <!-- Store Reviews Section -->
        <div class="reviews-section" id="reviews-section">
          <!-- Section Header -->
          <div class="reviews-header">
            <div class="reviews-header__left">
              <h2 class="reviews-header__title">Ulasan Pembeli</h2>
              <p class="reviews-header__subtitle">Pengalaman belanja di Reiat</p>
            </div>
            <div class="reviews-header__rating">
              <span class="reviews-header__score">${storeRating}</span>
              <div class="reviews-header__stars">
                ${renderStars(Math.round(storeRating))}
              </div>
              <span class="reviews-header__count">${totalReviews} ulasan</span>
            </div>
          </div>

          <!-- Review Cards Carousel -->
          <div class="reviews-carousel" id="reviews-carousel">
            ${storeReviews.map(r => `
              <div class="review-card" id="review-${r.id}">
                <div class="review-card__header">
                  <div class="review-card__avatar" style="background: ${getAvatarColor(r.avatar)}">
                    ${r.avatar}
                  </div>
                  <div class="review-card__info">
                    <span class="review-card__name">${r.name}</span>
                    <span class="review-card__date">${r.date}</span>
                  </div>
                  <div class="review-card__stars">
                    ${renderStars(r.rating)}
                  </div>
                </div>
                <p class="review-card__text">${r.text}</p>
                ${r.photo ? `
                <div class="review-card__photo">
                  <img src="${r.photo}" alt="Foto dari ${r.name}" loading="lazy" />
                </div>
                ` : ''}
                <div class="review-card__product">
                  ${icons.shoppingBag}
                  <span>${r.product}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- See All -->
          <button class="reviews-see-all" id="reviews-see-all">
            Lihat Semua Ulasan (${totalReviews})
            ${icons.chevronRight}
          </button>
        </div>
      </div>
    </div>

    ${renderBottomNav('home')}
  `;
}

function getAvatarColor(letter) {
  const colors = {
    R: 'hsl(340, 65%, 55%)',
    D: 'hsl(210, 65%, 50%)',
    S: 'hsl(160, 55%, 45%)',
    A: 'hsl(280, 55%, 55%)',
    M: 'hsl(30, 70%, 50%)',
  };
  return colors[letter] || 'hsl(220, 50%, 50%)';
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
      navigateFn('product-detail', { productId });
    });
  }
}

