import { icons } from '../icons.js';

/**
 * All Reviews Page — Full list of buyer reviews
 */

const allReviews = [
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
  {
    id: 6,
    name: 'Farel D.',
    avatar: 'F',
    rating: 5,
    text: 'Pola rok A-Line nya gampang dipahami banget. Instruksinya step by step, bahkan saya yang pemula bisa bikin rok sendiri!',
    date: '2 minggu lalu',
    product: 'A-Line Skirt Pattern',
  },
  {
    id: 7,
    name: 'Lina K.',
    avatar: 'L',
    rating: 4,
    text: 'Graphic tee-nya keren dan unik. Susah cari desain begini di toko biasa. Bahan masih bagus walau secondhand. Recommended!',
    date: '3 minggu lalu',
    product: 'Oversized Graphic Tee',
  },
  {
    id: 8,
    name: 'Budi H.',
    avatar: 'B',
    rating: 5,
    text: 'Beliin istri cardigan pink, dia suka banget. Warnanya cantik dan bahannya lembut. Pengiriman juga cepat, 2 hari sampai.',
    date: '3 minggu lalu',
    product: 'Pink Oversized Cardigan',
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

function getAvatarColor(letter) {
  const colors = {
    R: 'hsl(340, 65%, 55%)',
    D: 'hsl(210, 65%, 50%)',
    S: 'hsl(160, 55%, 45%)',
    A: 'hsl(280, 55%, 55%)',
    M: 'hsl(30, 65%, 50%)',
    F: 'hsl(190, 60%, 45%)',
    L: 'hsl(350, 60%, 50%)',
    B: 'hsl(120, 45%, 45%)',
  };
  return colors[letter] || 'hsl(220, 50%, 50%)';
}

export function renderAllReviews(navigateFn) {
  return `
    <div class="all-reviews" id="all-reviews-view">
      <!-- Header -->
      <div class="all-reviews__header">
        <button class="pdp__back-btn" id="reviews-back" aria-label="Back">
          ${icons.arrowLeft}
        </button>
        <div class="all-reviews__header-text">
          <h1 class="all-reviews__title">Ulasan Pembeli</h1>
          <p class="all-reviews__subtitle">${totalReviews} ulasan • Rating ${storeRating}/5</p>
        </div>
      </div>

      <!-- Review List -->
      <div class="all-reviews__list">
        ${allReviews.map(r => `
          <div class="all-reviews__item" id="all-review-${r.id}">
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
            <p class="all-reviews__text">${r.text}</p>
            ${r.photo ? `
            <div class="all-reviews__photo">
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
    </div>
  `;
}

export function initAllReviews(navigateFn) {
  const backBtn = document.getElementById('reviews-back');
  if (backBtn) backBtn.addEventListener('click', () => navigateFn('home'));
}
