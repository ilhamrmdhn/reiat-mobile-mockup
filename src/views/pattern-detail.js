import { icons } from '../icons.js';

/**
 * Pattern Detail Page
 * Displays a sewing pattern product with image carousel, details,
 * and an Auto Scale bottom sheet for body measurements.
 */

const patternData = {
  name: 'Blouse Pattern — Digital',
  price: 'Rp 45.000',
  rating: 4.8,
  reviews: 124,
  sold: '1.2rb',
  images: [
    '/images/pattern-blouse.png',
    '/images/pattern-skirt.png',
    '/images/pattern-blouse.png',
  ],
  description: `Pola digital blouse dengan desain modern dan elegan. Cocok untuk pemula hingga menengah. File dalam format PDF beresolusi tinggi yang dapat dicetak langsung di rumah.`,
  includes: [
    'Pola ukuran S–XXL',
    'Panduan potong & jahit',
    'Tips pemilihan kain',
    'Ilustrasi langkah-langkah',
  ],
  difficulty: 'Menengah',
  format: 'PDF Digital',
  pages: 12,
};

// Body part definitions with their measurement fields
const bodyParts = [
  {
    id: 'chest',
    label: 'Dada',
    icon: icons.bodyChest,
    fields: [
      { id: 'chest-width', label: 'Lebar Dada', placeholder: '96', unit: 'cm' },
      { id: 'chest-length', label: 'Panjang Dada', placeholder: '34', unit: 'cm' },
    ],
  },
  {
    id: 'waist',
    label: 'Pinggang',
    icon: icons.bodyWaist,
    fields: [
      { id: 'waist-width', label: 'Lingkar Pinggang', placeholder: '72', unit: 'cm' },
    ],
  },
  {
    id: 'arm',
    label: 'Lengan',
    icon: icons.bodyArm,
    fields: [
      { id: 'arm-length', label: 'Panjang Lengan', placeholder: '58', unit: 'cm' },
      { id: 'arm-width', label: 'Lingkar Lengan', placeholder: '30', unit: 'cm' },
    ],
  },
  {
    id: 'shoulder',
    label: 'Bahu',
    icon: icons.bodyShoulder,
    fields: [
      { id: 'shoulder-width', label: 'Lebar Bahu', placeholder: '42', unit: 'cm' },
    ],
  },
];

export function renderPatternDetail(navigateFn) {
  return `
    <div class="pdp pattern-detail" id="pattern-detail-view">
      <!-- Header -->
      <div class="pdp__header">
        <button class="pdp__back-btn" id="pattern-back" aria-label="Back">
          ${icons.arrowLeft}
        </button>
        <span class="pdp__header-title">Detail Pola</span>
        <button class="pdp__share-btn" aria-label="Share">
          ${icons.share}
        </button>
      </div>

      <!-- Image Carousel -->
      <div class="carousel" id="pattern-carousel">
        <div class="carousel__track" id="pattern-carousel-track">
          ${patternData.images.map((img, i) => `
            <div class="carousel__slide">
              <img src="${img}" alt="${patternData.name} view ${i + 1}" />
            </div>
          `).join('')}
        </div>
        <div class="carousel__dots" id="pattern-carousel-dots">
          ${patternData.images.map((_, i) => `
            <div class="carousel__dot ${i === 0 ? 'carousel__dot--active' : ''}" data-index="${i}"></div>
          `).join('')}
        </div>
      </div>

      <!-- Content -->
      <div class="pdp__content">
        <!-- Badge & Rating -->
        <div class="pattern-detail__meta-row">
          <span class="product-card__badge product-card__badge--pattern">Digital Pattern</span>
          <div class="pattern-detail__rating">
            ${icons.star}
            <span>${patternData.rating}</span>
            <span class="text-secondary">(${patternData.reviews} ulasan)</span>
          </div>
        </div>

        <h2 class="pdp__title">${patternData.name}</h2>
        <p class="pdp__price">${patternData.price}</p>

        <!-- Quick Stats -->
        <div class="pattern-detail__stats">
          <div class="pattern-detail__stat">
            ${icons.layers}
            <div>
              <span class="pattern-detail__stat-value">${patternData.pages} hal</span>
              <span class="pattern-detail__stat-label">${patternData.format}</span>
            </div>
          </div>
          <div class="pattern-detail__stat">
            ${icons.gauge}
            <div>
              <span class="pattern-detail__stat-value">${patternData.difficulty}</span>
              <span class="pattern-detail__stat-label">Kesulitan</span>
            </div>
          </div>
          <div class="pattern-detail__stat">
            ${icons.shoppingCart}
            <div>
              <span class="pattern-detail__stat-value">${patternData.sold}</span>
              <span class="pattern-detail__stat-label">Terjual</span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="pattern-detail__section">
          <h3 class="pattern-detail__section-title">Deskripsi</h3>
          <p class="pattern-detail__desc">${patternData.description}</p>
        </div>

        <!-- What's Included -->
        <div class="pattern-detail__section">
          <h3 class="pattern-detail__section-title">Yang Termasuk</h3>
          <ul class="pattern-detail__includes">
            ${patternData.includes.map(item => `
              <li class="pattern-detail__include-item">
                ${icons.checkCircle}
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- Sticky CTA -->
    <div class="sticky-cta sticky-cta--dual" id="pattern-sticky-cta">
      <button class="btn-outline btn-outline--icon" id="pattern-cart-btn" aria-label="Add to Cart">
        ${icons.shoppingCart}
      </button>
      <button class="btn-accent" id="pattern-autoscale-btn" style="flex:1;">
        ${icons.ruler}
        Auto Scale Pola
      </button>
    </div>

    <!-- Auto Scale Bottom Sheet -->
    <div class="modal-overlay" id="autoscale-overlay"></div>
    <div class="modal-sheet" id="autoscale-sheet">
      <div class="modal-sheet__sticky-top">
        <div class="modal-sheet__handle"></div>
        <div class="modal-sheet__header">
          <h2 class="modal-sheet__title">Auto Scale Pola</h2>
          <button class="modal-sheet__close" id="autoscale-close" aria-label="Close">
            ${icons.x}
          </button>
        </div>
      </div>

      <div class="modal-sheet__body">
        <p class="text-secondary" style="font-size: var(--font-sm); margin-bottom: var(--space-lg);">
          Pilih bagian tubuh, lalu masukkan ukuranmu untuk menyesuaikan skala pola secara otomatis.
        </p>

        <!-- Body Part Selector -->
        <div class="body-part-selector" id="body-part-selector">
          ${bodyParts.map((part, i) => `
            <button class="body-part-chip" data-part="${part.id}" id="body-chip-${part.id}">
              <span class="body-part-chip__icon">${part.icon}</span>
              <span class="body-part-chip__label">${part.label}</span>
            </button>
          `).join('')}
        </div>

        <!-- Measurement Input Area (hidden by default) -->
        <div class="measurement-area" id="measurement-area" style="display: none;">
          <div class="measurement-area__header" id="measurement-area-header">
            <!-- Dynamically filled -->
          </div>
          <div class="measurement-area__fields" id="measurement-fields">
            <!-- Dynamically filled -->
          </div>
          <button class="btn-save-measurement" id="measurement-save-btn" style="display: none;">
            ${icons.checkCircle}
            Simpan Ukuran
          </button>
        </div>

        <!-- Summary of entered measurements -->
        <div class="measurements-summary" id="measurements-summary" style="display: none;">
          <h4 class="measurements-summary__title">
            ${icons.checkCircle}
            Ukuran yang sudah dimasukkan
          </h4>
          <div class="measurements-summary__list" id="measurements-summary-list">
            <!-- Dynamically filled -->
          </div>
        </div>

        <!-- Scale Result -->
        <div class="sizing-result sizing-result--empty" id="autoscale-result">
          <div class="sizing-result__label">Status Pola</div>
          <div class="sizing-result__value" id="autoscale-result-value">
            Pilih bagian tubuh untuk mulai
          </div>
        </div>

        <button class="btn-accent w-full" id="autoscale-apply" style="margin-top: var(--space-base);">
          ${icons.scissors}
          Buka di Workspace
        </button>
      </div>
    </div>
  `;
}

export function initPatternDetail(navigateFn) {
  // Back button
  const backBtn = document.getElementById('pattern-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateFn('home'));
  }

  // === Image Carousel ===
  const track = document.getElementById('pattern-carousel-track');
  const dotsContainer = document.getElementById('pattern-carousel-dots');
  let currentSlide = 0;
  const totalSlides = patternData.images.length;

  function goToSlide(index) {
    currentSlide = index;
    if (track) track.style.transform = `translateX(-${index * 100}%)`;
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel__dot').forEach((dot, i) => {
        dot.classList.toggle('carousel__dot--active', i === index);
      });
    }
  }

  let touchStartX = 0;
  const carousel = document.getElementById('pattern-carousel');
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
        else if (diff < 0 && currentSlide > 0) goToSlide(currentSlide - 1);
      }
    }, { passive: true });
  }

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel__dot');
      if (!dot) return;
      goToSlide(parseInt(dot.dataset.index));
    });
  }

  // === Auto Scale Bottom Sheet ===
  const overlay = document.getElementById('autoscale-overlay');
  const sheet = document.getElementById('autoscale-sheet');
  const closeBtn = document.getElementById('autoscale-close');
  const openBtn = document.getElementById('pattern-autoscale-btn');
  const applyBtn = document.getElementById('autoscale-apply');
  const bodyPartSelector = document.getElementById('body-part-selector');
  const measurementArea = document.getElementById('measurement-area');
  const measurementHeader = document.getElementById('measurement-area-header');
  const measurementFields = document.getElementById('measurement-fields');
  const summaryContainer = document.getElementById('measurements-summary');
  const summaryList = document.getElementById('measurements-summary-list');
  const resultEl = document.getElementById('autoscale-result');
  const resultValueEl = document.getElementById('autoscale-result-value');
  const saveBtn = document.getElementById('measurement-save-btn');

  // Store all entered measurements
  const measurements = {};
  let selectedPart = null;
  const savedParts = new Set(); // track which body parts have been saved
  const stickyTop = sheet?.querySelector('.modal-sheet__sticky-top');

  function openSheet() {
    if (overlay) overlay.classList.add('modal-overlay--active');
    if (sheet) sheet.classList.add('modal-sheet--active');
    document.body.style.overflow = 'hidden';
  }

  function closeSheet() {
    if (overlay) overlay.classList.remove('modal-overlay--active');
    if (sheet) sheet.classList.remove('modal-sheet--active');
    document.body.style.overflow = '';
  }

  // Sticky header shadow on scroll
  if (sheet && stickyTop) {
    sheet.addEventListener('scroll', () => {
      stickyTop.classList.toggle('modal-sheet__sticky-top--shadow', sheet.scrollTop > 8);
    });
  }

  if (openBtn) openBtn.addEventListener('click', openSheet);
  if (closeBtn) closeBtn.addEventListener('click', closeSheet);
  if (overlay) overlay.addEventListener('click', closeSheet);

  // Body part chip selection
  if (bodyPartSelector) {
    bodyPartSelector.addEventListener('click', (e) => {
      const chip = e.target.closest('.body-part-chip');
      if (!chip) return;

      const partId = chip.dataset.part;
      const part = bodyParts.find(p => p.id === partId);
      if (!part) return;

      // Toggle active state
      bodyPartSelector.querySelectorAll('.body-part-chip').forEach(c =>
        c.classList.remove('body-part-chip--active')
      );
      chip.classList.add('body-part-chip--active');
      selectedPart = partId;

      // Show measurement area with animation
      if (measurementArea) {
        measurementArea.style.display = 'block';
        measurementArea.classList.remove('measurement-area--enter');
        void measurementArea.offsetWidth; // force reflow
        measurementArea.classList.add('measurement-area--enter');
      }

      // Render header
      if (measurementHeader) {
        measurementHeader.innerHTML = `
          <span class="measurement-area__icon">${part.icon}</span>
          <span class="measurement-area__title">Ukuran ${part.label}</span>
        `;
      }

      // Check if this part was already saved
      const isSaved = savedParts.has(partId);

      // Render fields
      if (measurementFields) {
        measurementFields.innerHTML = part.fields.map(field => {
          const savedData = measurements[field.id];
          const val = savedData ? savedData.value : '';
          return `
          <div class="measurement-field">
            <label class="form-label" for="measure-${field.id}">${field.label}</label>
            <div class="measurement-input-wrap">
              <input
                type="number"
                class="form-input measurement-input ${isSaved ? 'form-input--disabled' : ''}"
                id="measure-${field.id}"
                placeholder="${field.placeholder}"
                min="1"
                max="300"
                value="${val}"
                data-field-id="${field.id}"
                data-field-label="${field.label}"
                data-part-id="${partId}"
                data-part-label="${part.label}"
                ${isSaved ? 'disabled' : ''}
              />
              <span class="measurement-input-unit">${field.unit}</span>
            </div>
          </div>
        `;
        }).join('');

        // Show/hide save button based on saved state
        if (saveBtn) {
          if (isSaved) {
            saveBtn.style.display = 'flex';
            saveBtn.disabled = true;
            saveBtn.classList.add('btn-save-measurement--saved');
            saveBtn.innerHTML = `${icons.checkCircle} Tersimpan`;
          } else {
            saveBtn.style.display = 'none';
            saveBtn.disabled = false;
            saveBtn.classList.remove('btn-save-measurement--saved');
            saveBtn.innerHTML = `${icons.checkCircle} Simpan Ukuran`;
          }
        }

        // Attach input listeners (only if not saved)
        if (!isSaved) {
          measurementFields.querySelectorAll('.measurement-input').forEach(input => {
            input.addEventListener('input', () => {
              const fieldId = input.dataset.fieldId;
              const value = input.value;
              if (value && parseFloat(value) > 0) {
                measurements[fieldId] = {
                  value: parseFloat(value),
                  label: input.dataset.fieldLabel,
                  partLabel: input.dataset.partLabel,
                };
              } else {
                delete measurements[fieldId];
              }
              // Show save button when there's input
              const hasAnyValue = part.fields.some(f => measurements[f.id]);
              if (saveBtn) saveBtn.style.display = hasAnyValue ? 'flex' : 'none';
            });

            // Auto-focus the first input
            if (input === measurementFields.querySelector('.measurement-input')) {
              setTimeout(() => input.focus(), 300);
            }
          });
        }
      }
    });
  }

  // Save button logic
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (!selectedPart) return;

      const part = bodyParts.find(p => p.id === selectedPart);
      if (!part) return;

      // Check that at least one field has a value for this part
      const hasValue = part.fields.some(f => measurements[f.id]);
      if (!hasValue) return;

      // Mark part as saved
      savedParts.add(selectedPart);

      // Disable all inputs in the current measurement area
      measurementFields.querySelectorAll('.measurement-input').forEach(input => {
        input.disabled = true;
        input.classList.add('form-input--disabled');
      });

      // Update save button to saved state
      saveBtn.disabled = true;
      saveBtn.classList.add('btn-save-measurement--saved');
      saveBtn.innerHTML = `${icons.checkCircle} Tersimpan`;

      // Mark the chip as saved
      const chip = document.getElementById(`body-chip-${selectedPart}`);
      if (chip) chip.classList.add('body-part-chip--saved');

      // Update summary and result
      updateSummary();
      updateScaleResult();
    });
  }

  function updateSummary() {
    const entries = Object.entries(measurements);
    if (entries.length === 0) {
      if (summaryContainer) summaryContainer.style.display = 'none';
      return;
    }

    if (summaryContainer) summaryContainer.style.display = 'block';
    if (summaryList) {
      summaryList.innerHTML = entries.map(([id, data]) => `
        <div class="measurements-summary__item">
          <span class="measurements-summary__item-label">${data.partLabel} — ${data.label}</span>
          <span class="measurements-summary__item-value">${data.value} cm</span>
        </div>
      `).join('');
    }
  }

  function updateScaleResult() {
    const entries = Object.entries(measurements);
    if (entries.length === 0) {
      if (resultEl) resultEl.classList.add('sizing-result--empty');
      if (resultValueEl) resultValueEl.textContent = 'Pilih bagian tubuh untuk mulai';
      return;
    }

    // Show that the PDF has been adjusted
    if (resultEl) resultEl.classList.remove('sizing-result--empty');
    if (resultValueEl) {
      resultValueEl.innerHTML = `${icons.checkCircle} PDF pola sudah disesuaikan dengan ukuranmu`;
    }
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const entries = Object.entries(measurements);
      if (entries.length > 0) {
        closeSheet();
        // Navigate to workspace
        navigateFn('workspace');
      }
    });
  }
}
