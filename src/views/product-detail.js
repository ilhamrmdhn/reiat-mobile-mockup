import { icons } from '../icons.js';
import { renderSmartSizingModal, initSmartSizingModal, openModal } from '../components/smart-sizing-modal.js';

/**
 * Screen 2: Product Detail Page
 * Image carousel, fabric guide, sticky CTA → opens Smart Sizing Modal (Screen 3)
 */

const productData = {
  name: 'Pink Oversized Cardigan',
  price: 'Rp 189.000',
  images: [
    '/images/cardigan.png',
    '/images/knit-sweater.png',
    '/images/cardigan.png',
  ],
  fabricGuide: `
    <strong>Bahan:</strong> Premium Acrylic Blend (60% Akrilik, 40% Katun)<br/><br/>
    <strong>Tekstur:</strong> Lembut, ringan, dan breathable. Cocok untuk cuaca sejuk hingga dingin.<br/><br/>
    <strong>Rekomendasi:</strong> Gunakan jarum rajut 5mm untuk modifikasi. Bahan ini cocok dipadukan dengan inner berbahan katun untuk kenyamanan maksimal.
  `,
};

export function renderProductDetail(navigateFn) {
  return `
    <div class="pdp" id="pdp-view">
      <!-- Header -->
      <div class="pdp__header">
        <button class="pdp__back-btn" id="pdp-back" aria-label="Back">
          ${icons.arrowLeft}
        </button>
        <span class="pdp__header-title">Detail Produk</span>
        <button class="pdp__share-btn" aria-label="Share">
          ${icons.share}
        </button>
      </div>

      <!-- Image Carousel -->
      <div class="carousel" id="carousel">
        <div class="carousel__track" id="carousel-track">
          ${productData.images.map((img, i) => `
            <div class="carousel__slide">
              <img src="${img}" alt="${productData.name} view ${i + 1}" />
            </div>
          `).join('')}
        </div>
        <div class="carousel__dots" id="carousel-dots">
          ${productData.images.map((_, i) => `
            <div class="carousel__dot ${i === 0 ? 'carousel__dot--active' : ''}" data-index="${i}"></div>
          `).join('')}
        </div>
      </div>

      <!-- Content -->
      <div class="pdp__content">
        <h2 class="pdp__title">${productData.name}</h2>
        <p class="pdp__price">${productData.price}</p>

        <div class="pdp__section-title">
          ${icons.fabric}
          Fabric Guide & Recommendation
        </div>
        <div class="pdp__fabric-guide">
          <p class="pdp__fabric-text">${productData.fabricGuide}</p>
        </div>
      </div>
    </div>

    <!-- Sticky CTA (outside .pdp to ensure fixed positioning) -->
    <div class="sticky-cta" id="pdp-sticky-cta">
      <button class="btn-accent" id="check-fit-btn">
        ${icons.ruler}
        Check Fit (Smart Sizing)
      </button>
    </div>

    <!-- Smart Sizing Modal (Screen 3) -->
    ${renderSmartSizingModal()}
  `;
}

export function initProductDetail(navigateFn) {
  // Back button
  const backBtn = document.getElementById('pdp-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateFn('home'));
  }

  // Image Carousel
  const track = document.getElementById('carousel-track');
  const dotsContainer = document.getElementById('carousel-dots');
  let currentSlide = 0;
  const totalSlides = productData.images.length;

  function goToSlide(index) {
    currentSlide = index;
    if (track) track.style.transform = `translateX(-${index * 100}%)`;
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel__dot').forEach((dot, i) => {
        dot.classList.toggle('carousel__dot--active', i === index);
      });
    }
  }

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  const carousel = document.getElementById('carousel');
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
          goToSlide(currentSlide - 1);
        }
      }
    }, { passive: true });
  }

  // Dot clicks
  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel__dot');
      if (!dot) return;
      goToSlide(parseInt(dot.dataset.index));
    });
  }

  // Check Fit CTA → open Smart Sizing Modal
  const checkFitBtn = document.getElementById('check-fit-btn');
  if (checkFitBtn) {
    checkFitBtn.addEventListener('click', openModal);
  }

  // Initialize the modal
  initSmartSizingModal();
}
