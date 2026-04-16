import { icons } from '../icons.js';

/**
 * Smart Sizing Modal — Bottom Sheet
 * Dynamic match level computation based on user inputs
 */

function computeMatch(height, weight, bust) {
  if (!height || !weight || !bust) return null;

  const h = parseFloat(height);
  const w = parseFloat(weight);
  const b = parseFloat(bust);

  if (isNaN(h) || isNaN(w) || isNaN(b)) return null;
  if (h <= 0 || w <= 0 || b <= 0) return null;

  // Simulate smart sizing algorithm
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
            <input type="number" class="form-input" id="input-height" placeholder="165" min="100" max="220" />
          </div>
          <div class="form-group">
            <label class="form-label" for="input-weight">Berat (kg)</label>
            <input type="number" class="form-input" id="input-weight" placeholder="55" min="30" max="200" />
          </div>
          <div class="form-group">
            <label class="form-label" for="input-bust">Dada (cm)</label>
            <input type="number" class="form-input" id="input-bust" placeholder="88" min="60" max="150" />
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
          Apply & Save
        </button>
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

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  // Dynamic sizing computation
  const heightInput = document.getElementById('input-height');
  const weightInput = document.getElementById('input-weight');
  const bustInput = document.getElementById('input-bust');
  const resultEl = document.getElementById('sizing-result');
  const resultValueEl = document.getElementById('sizing-result-value');

  function updateResult() {
    const match = computeMatch(
      heightInput?.value,
      weightInput?.value,
      bustInput?.value
    );

    if (match) {
      resultEl.classList.remove('sizing-result--empty');
      resultValueEl.innerHTML = `Match Level: <strong>${match.percent}%</strong> — ${match.fit}`;
    } else {
      resultEl.classList.add('sizing-result--empty');
      resultValueEl.textContent = 'Masukkan data untuk melihat hasil';
    }
  }

  [heightInput, weightInput, bustInput].forEach(input => {
    if (input) input.addEventListener('input', updateResult);
  });
}
