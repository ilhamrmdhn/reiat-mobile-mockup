import { icons } from '../icons.js';

/**
 * Smart Sizing Modal — Bottom Sheet
 * Dynamic match level computation based on user inputs
 * Features: loading spinner, input validation, measurement info guide
 */

// Validation rules per field
const validationRules = {
  'input-height': { min: 100, max: 250, label: 'Tinggi', errorMsg: 'Masukkan angka valid (100–250 cm)' },
  'input-weight': { min: 20, max: 200, label: 'Berat', errorMsg: 'Masukkan angka valid (20–200 kg)' },
  'input-bust':   { min: 50, max: 180, label: 'Dada', errorMsg: 'Masukkan angka valid (50–180 cm)' },
};

// Measurement guidance content
const measureGuides = {
  'input-bust': {
    title: 'Cara Mengukur Lingkar Dada',
    steps: [
      'Berdiri tegak dengan posisi rileks',
      'Lingkarkan pita ukur di bagian terlebar dada (biasanya sejajar puting)',
      'Pastikan pita tidak terlalu ketat dan sejajar di punggung',
      'Tarik napas biasa, lalu baca angka pada pita ukur',
    ],
    tip: 'Minta bantuan orang lain untuk hasil yang lebih akurat.',
  },
};

function computeMatch(height, weight, bust) {
  if (!height || !weight || !bust) return null;

  const h = parseFloat(height);
  const w = parseFloat(weight);
  const b = parseFloat(bust);

  if (isNaN(h) || isNaN(w) || isNaN(b)) return null;
  if (h <= 0 || w <= 0 || b <= 0) return null;

  // Check if any value is out of valid range
  if (h < 100 || h > 250 || w < 20 || w > 200 || b < 50 || b > 180) return null;

  const bmi = w / ((h / 100) ** 2);
  let matchPercent;
  let fitType;

  if (bmi < 18.5) {
    matchPercent = 82 + Math.min(b / 10, 8);
    fitType = 'Slim Fit';
  } else if (bmi < 25) {
    matchPercent = 90 + Math.min(b / 15, 7);
    fitType = 'Regular Fit';
  } else if (bmi < 30) {
    matchPercent = 88 + Math.min(b / 12, 7);
    fitType = 'Oversized Fit';
  } else {
    matchPercent = 80 + Math.min(b / 10, 10);
    fitType = 'Relaxed Fit';
  }

  matchPercent = Math.min(Math.round(matchPercent), 99);

  return { percent: matchPercent, fit: fitType };
}

export function renderSmartSizingModal() {
  return `
    <div class="modal-overlay" id="sizing-overlay"></div>
    <div class="modal-sheet" id="sizing-sheet">
      <div class="modal-sheet__handle"></div>

      <div class="modal-sheet__header">
        <h2 class="modal-sheet__title">Smart Sizing</h2>
        <button class="modal-sheet__close" id="sizing-close" aria-label="Close">
          ${icons.x}
        </button>
      </div>

      <div class="modal-sheet__body">
        <p class="text-secondary" style="font-size: var(--font-sm); margin-bottom: var(--space-base);">
          Masukkan ukuran tubuhmu untuk mendapatkan rekomendasi ukuran yang tepat.
        </p>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="input-height">Tinggi (cm)</label>
            <input type="number" class="form-input" id="input-height" placeholder="165" min="100" max="250" />
            <span class="form-error" id="error-input-height"></span>
          </div>
          <div class="form-group">
            <label class="form-label" for="input-weight">Berat (kg)</label>
            <input type="number" class="form-input" id="input-weight" placeholder="55" min="20" max="200" />
            <span class="form-error" id="error-input-weight"></span>
          </div>
          <div class="form-group">
            <label class="form-label form-label--with-info" for="input-bust">
              <span>Dada (cm)</span>
              <button class="info-trigger" id="info-trigger-bust" type="button" aria-label="Cara mengukur lingkar dada">
                ${icons.info}
              </button>
            </label>
            <input type="number" class="form-input" id="input-bust" placeholder="88" min="50" max="180" />
            <span class="form-error" id="error-input-bust"></span>
          </div>
        </div>

        <div class="sizing-result sizing-result--empty" id="sizing-result">
          <div class="sizing-result__label">Match Level</div>
          <div class="sizing-result__value" id="sizing-result-value">
            Masukkan data untuk melihat hasil
          </div>
        </div>

        <button class="btn-accent w-full mt-lg" id="sizing-apply">
          ${icons.sparkles}
          <span id="sizing-apply-text">Apply & Save</span>
        </button>
      </div>
    </div>

    <!-- Measurement Guide Overlay -->
    <div class="guide-overlay" id="guide-overlay"></div>
    <div class="guide-popup" id="guide-popup">
      <div class="guide-popup__header">
        <h3 class="guide-popup__title" id="guide-popup-title">Cara Mengukur</h3>
        <button class="modal-sheet__close" id="guide-popup-close" aria-label="Tutup panduan">
          ${icons.x}
        </button>
      </div>
      <div class="guide-popup__body" id="guide-popup-body">
        <!-- Dynamically filled -->
      </div>
    </div>
  `;
}

export function openModal() {
  const overlay = document.getElementById('sizing-overlay');
  const sheet = document.getElementById('sizing-sheet');
  if (overlay) overlay.classList.add('modal-overlay--active');
  if (sheet) sheet.classList.add('modal-sheet--active');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  const overlay = document.getElementById('sizing-overlay');
  const sheet = document.getElementById('sizing-sheet');
  if (overlay) overlay.classList.remove('modal-overlay--active');
  if (sheet) sheet.classList.remove('modal-sheet--active');
  document.body.style.overflow = '';
}

export function initSmartSizingModal() {
  const closeBtn = document.getElementById('sizing-close');
  const overlay = document.getElementById('sizing-overlay');
  const applyBtn = document.getElementById('sizing-apply');
  const applyText = document.getElementById('sizing-apply-text');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // === Apply & Save with loading spinner ===
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      // Check for any active validation errors
      const hasErrors = document.querySelectorAll('.form-input--error').length > 0;
      if (hasErrors) return;

      // Show loading state
      applyBtn.disabled = true;
      applyBtn.classList.add('btn--loading');
      if (applyText) applyText.textContent = 'Menyimpan...';
      applyBtn.querySelector('svg')?.replaceWith(createSpinnerEl());

      // Simulate save delay
      setTimeout(() => {
        applyBtn.disabled = false;
        applyBtn.classList.remove('btn--loading');
        if (applyText) applyText.textContent = 'Apply & Save';
        // Restore sparkle icon
        const spinner = applyBtn.querySelector('.icon-spin');
        if (spinner) {
          const temp = document.createElement('span');
          temp.innerHTML = icons.sparkles;
          spinner.replaceWith(temp.firstElementChild);
        }
        closeModal();
      }, 1200);
    });
  }

  // === Dynamic sizing computation + validation ===
  const heightInput = document.getElementById('input-height');
  const weightInput = document.getElementById('input-weight');
  const bustInput = document.getElementById('input-bust');
  const resultEl = document.getElementById('sizing-result');
  const resultValueEl = document.getElementById('sizing-result-value');

  function validateField(input) {
    const rule = validationRules[input.id];
    if (!rule) return true;

    const errorEl = document.getElementById(`error-${input.id}`);
    const val = parseFloat(input.value);

    if (input.value && (!isFinite(val) || val < rule.min || val > rule.max)) {
      input.classList.add('form-input--error');
      if (errorEl) {
        errorEl.textContent = rule.errorMsg;
        errorEl.style.display = 'block';
      }
      return false;
    } else {
      input.classList.remove('form-input--error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
      return true;
    }
  }

  function updateResult() {
    // Validate all fields first
    const allInputs = [heightInput, weightInput, bustInput];
    let allValid = true;
    allInputs.forEach(input => {
      if (input && input.value) {
        if (!validateField(input)) allValid = false;
      }
    });

    if (!allValid) {
      resultEl?.classList.add('sizing-result--empty');
      if (resultValueEl) resultValueEl.textContent = 'Perbaiki data yang salah';
      return;
    }

    const match = computeMatch(
      heightInput?.value,
      weightInput?.value,
      bustInput?.value
    );

    if (match) {
      resultEl?.classList.remove('sizing-result--empty');
      if (resultValueEl) resultValueEl.innerHTML = `Match Level: <strong>${match.percent}%</strong> — ${match.fit}`;
    } else {
      resultEl?.classList.add('sizing-result--empty');
      if (resultValueEl) resultValueEl.textContent = 'Masukkan data untuk melihat hasil';
    }
  }

  [heightInput, weightInput, bustInput].forEach(input => {
    if (input) {
      input.addEventListener('input', updateResult);
      input.addEventListener('blur', () => {
        if (input.value) validateField(input);
      });
    }
  });

  // === Measurement info guide ===
  const guideTrigger = document.getElementById('info-trigger-bust');
  const guideOverlay = document.getElementById('guide-overlay');
  const guidePopup = document.getElementById('guide-popup');
  const guideClose = document.getElementById('guide-popup-close');
  const guideTitle = document.getElementById('guide-popup-title');
  const guideBody = document.getElementById('guide-popup-body');

  function openGuide(fieldId) {
    const guide = measureGuides[fieldId];
    if (!guide) return;

    if (guideTitle) guideTitle.textContent = guide.title;
    if (guideBody) {
      guideBody.innerHTML = `
        <div class="guide-illustration">
          <div class="guide-illustration__figure">
            <div class="guide-figure-body">
              <div class="guide-figure-head"></div>
              <div class="guide-figure-torso">
                <div class="guide-figure-tape"></div>
              </div>
              <div class="guide-figure-arms">
                <div class="guide-figure-arm guide-figure-arm--left"></div>
                <div class="guide-figure-arm guide-figure-arm--right"></div>
              </div>
            </div>
          </div>
        </div>
        <ol class="guide-steps">
          ${guide.steps.map(step => `<li class="guide-step">${step}</li>`).join('')}
        </ol>
        ${guide.tip ? `
          <div class="guide-tip">
            ${icons.info}
            <span>${guide.tip}</span>
          </div>
        ` : ''}
      `;
    }

    guideOverlay?.classList.add('guide-overlay--active');
    guidePopup?.classList.add('guide-popup--active');
  }

  function closeGuide() {
    guideOverlay?.classList.remove('guide-overlay--active');
    guidePopup?.classList.remove('guide-popup--active');
  }

  if (guideTrigger) guideTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openGuide('input-bust');
  });

  if (guideClose) guideClose.addEventListener('click', closeGuide);
  if (guideOverlay) guideOverlay.addEventListener('click', closeGuide);
}

/** Creates a spinning loader SVG element */
function createSpinnerEl() {
  const temp = document.createElement('span');
  temp.innerHTML = `<svg class="icon-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
  return temp.firstElementChild;
}
