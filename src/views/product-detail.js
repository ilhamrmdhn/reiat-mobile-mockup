import { icons } from '../icons.js';
import { renderSmartSizingModal, initSmartSizingModal, openModal } from '../components/smart-sizing-modal.js';

/**
 * Screen 2: Product Detail Page
 * Image carousel, description/fabric guide, sticky CTA → opens Smart Sizing Modal
 */

const productsCatalog = {
  '1': {
    name: 'Pink Oversized Cardigan',
    price: 'Rp 189.000',
    type: 'clothing',
    images: ['/images/cardigan.png', '/images/knit-sweater.png', '/images/cardigan.png'],
    description: `
      <strong>Brand:</strong> -<br/>
      <strong>Measurement</strong><br/>
      <ul>
        <li>Bust: 140-160</li>
        <li>Length: 60</li>
      </ul>
      <strong>Condition:</strong> 9/10<br/><br/>
      <em>Note: the colour might be slightly different due to lighting</em>
    `,
  },
  '2': {
    name: 'Blouse Pattern — Digital',
    price: 'Rp 45.000',
    type: 'pattern',
    images: ['/images/pattern-blouse.png', '/images/pattern-blouse.png'],
    fabricGuide: `
      <strong>Kain yang direkomendasikan</strong> antara lain katun Jepang, poplin, linen, gingham cotton, atau jenis kain tenun (woven) serupa lainnya.<br/><br/>
      <strong>Recommended fabrics</strong> include Japanese cotton, poplin, linen, gingham cotton, or similar woven fabrics.<br/><br/>
      <strong>Materials</strong><br/>
      <ul>
        <li>Kain non-stretch: 1 meter (100 cm)</li>
        <li>Kain Putih 10 cm (Opsional)</li>
        <li>Benang jahit yang senada</li>
        <li>Benang karet elastis</li>
        <li>Karet elastis (lebar 0,5-0,7 cm), panjang 2 meter (untuk lengan)</li>
        <li>Mesin jahit (dengan fitur lubang kancing)</li>
        <li>Jarum pentul</li>
        <li>Gunting</li>
        <li>Mesin obras / overlock</li>
        <li>Hiasan renda atau ruffle (opsional, untuk finishing dekoratif)</li>
      </ul>
    `,
  },
  '3': {
    name: 'Cropped Denim Jacket',
    price: 'Rp 275.000',
    type: 'clothing',
    images: ['/images/denim-jacket.png', '/images/denim-jacket.png'],
    description: `
      <strong>Brand:</strong> -<br/>
      <strong>Measurement</strong><br/>
      <ul>
        <li>Bust: 100-110</li>
        <li>Length: 48</li>
      </ul>
      <strong>Condition:</strong> 10/10 (Brand New)<br/><br/>
      <em>Note: the colour might be slightly different due to lighting</em>
    `,
  },
  '4': {
    name: 'A-Line Skirt Pattern',
    price: 'Rp 35.000',
    type: 'pattern',
    images: ['/images/pattern-skirt.png', '/images/pattern-skirt.png'],
    fabricGuide: `
      <strong>Kain yang direkomendasikan</strong> antara lain katun Jepang, poplin, linen, gingham cotton, atau jenis kain tenun (woven) serupa lainnya.<br/><br/>
      <strong>Recommended fabrics</strong> include Japanese cotton, poplin, linen, gingham cotton, or similar woven fabrics.<br/><br/>
      <strong>Materials</strong><br/>
      <ul>
        <li>Kain non-stretch: 1.5 meter (150 cm)</li>
        <li>Resleting / zipper 20 cm</li>
        <li>Benang jahit yang senada</li>
        <li>Kancing kait 1 buah</li>
        <li>Mesin jahit</li>
        <li>Jarum pentul</li>
        <li>Gunting</li>
        <li>Mesin obras / overlock</li>
      </ul>
    `,
  },
  '5': {
    name: 'Oversized Graphic Tee',
    price: 'Rp 129.000',
    type: 'clothing',
    images: ['/images/streetwear-tee.png', '/images/streetwear-tee.png'],
    description: `
      <strong>Brand:</strong> -<br/>
      <strong>Measurement</strong><br/>
      <ul>
        <li>Bust: 120-140</li>
        <li>Length: 72</li>
      </ul>
      <strong>Condition:</strong> 10/10 (Brand New)<br/><br/>
      <em>Note: the colour might be slightly different due to lighting</em>
    `,
  },
  '6': {
    name: 'Cable Knit Sweater',
    price: 'Rp 245.000',
    type: 'clothing',
    images: ['/images/knit-sweater.png', '/images/cardigan.png'],
    description: `
      <strong>Brand:</strong> -<br/>
      <strong>Measurement</strong><br/>
      <ul>
        <li>Bust: 110-130</li>
        <li>Length: 62</li>
      </ul>
      <strong>Condition:</strong> 9/10<br/><br/>
      <em>Note: the colour might be slightly different due to lighting</em>
    `,
  },
};

// Default fallback
const defaultProduct = productsCatalog['1'];

export function renderProductDetail(navigateFn, routeParams = {}) {
  const productData = productsCatalog[routeParams.productId] || defaultProduct;
  const isPattern = productData.type === 'pattern';


  return `
    <div class="pdp" id="pdp-view">
      <!-- Header -->
      <div class="pdp__header">
        <button class="pdp__back-btn" id="pdp-back" aria-label="Back">
          ${icons.arrowLeft}
        </button>
        <span class="pdp__header-title">Detail Produk</span>
        <button class="pdp__share-btn" aria-label="Share">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
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

        ${!isPattern ? `
        <div class="pdp__section-title">
          ${icons.fabric}
          Detail Produk
        </div>
        <div class="pdp__fabric-guide">
          <div class="pdp__fabric-text">${productData.description}</div>
        </div>
        ` : `
        <div class="pdp__section-title">
          ${icons.fabric}
          Fabric Guide & Recommendation
        </div>
        <div class="pdp__fabric-guide">
          <div class="pdp__fabric-text">${productData.fabricGuide}</div>
        </div>
        `}
      </div>
    </div>

    <!-- Sticky CTA and Modal -->
    ${!isPattern ? `
    <div class="sticky-cta pdp-cta-row" id="pdp-sticky-cta">
      <button class="pdp-cta-icon-btn" id="check-fit-btn" aria-label="Check Fit">
        ${icons.ruler}
      </button>
      <button class="pdp-cta-icon-btn" id="add-to-cart-btn" aria-label="Masukkan Keranjang">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.01 16.136L4.141 4H3a1 1 0 0 1 0-2h1.985a.993.993 0 0 1 .66.235.997.997 0 0 1 .346.627L6.319 5H14v2H6.627l1.23 8h9.399l1.5-5h2.088l-1.886 6.287A1 1 0 0 1 18 17H7.016a.993.993 0 0 1-.675-.248.998.998 0 0 1-.332-.616zM10 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm9 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0-18a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0V6h-1a1 1 0 1 1 0-2h1V3a1 1 0 0 1 1-1z" fill="currentColor"/></svg>
      </button>
      <button class="btn-primary pdp-cta-main" id="buy-clothing-btn">
        Beli Sekarang
      </button>
    </div>
    ${renderSmartSizingModal()}
    ` : `
    <div class="sticky-cta pdp-cta-row" id="pdp-sticky-cta">
      <button class="pdp-cta-icon-btn" id="add-to-cart-btn" aria-label="Masukkan Keranjang">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.01 16.136L4.141 4H3a1 1 0 0 1 0-2h1.985a.993.993 0 0 1 .66.235.997.997 0 0 1 .346.627L6.319 5H14v2H6.627l1.23 8h9.399l1.5-5h2.088l-1.886 6.287A1 1 0 0 1 18 17H7.016a.993.993 0 0 1-.675-.248.998.998 0 0 1-.332-.616zM10 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm9 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0-18a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0V6h-1a1 1 0 1 1 0-2h1V3a1 1 0 0 1 1-1z" fill="currentColor"/></svg>
      </button>
      <button class="btn-primary pdp-cta-main" id="buy-pattern-btn">
        Beli Sekarang
      </button>
    </div>
    `}
  `;
}

export function initProductDetail(navigateFn, routeParams = {}) {
  const productData = productsCatalog[routeParams.productId] || defaultProduct;

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

  // Initialize the modal only if check fit button exists (meaning it's clothing)
  if (checkFitBtn) {
    initSmartSizingModal();
  }

  // Handle Buy Pattern & Buy Clothing button
  const buyPatternBtn = document.getElementById('buy-pattern-btn');
  if (buyPatternBtn) {
    buyPatternBtn.addEventListener('click', () => navigateFn('checkout'));
  }

  const buyClothingBtn = document.getElementById('buy-clothing-btn');
  if (buyClothingBtn) {
    buyClothingBtn.addEventListener('click', () => navigateFn('checkout'));
  }

  // Add to Cart button
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      addToCartBtn.classList.add('pdp-cta-icon-btn--added');
      addToCartBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>`;
      setTimeout(() => {
        addToCartBtn.classList.remove('pdp-cta-icon-btn--added');
        addToCartBtn.innerHTML = icons.shoppingCart;
      }, 1500);
    });
  }
}
