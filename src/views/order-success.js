import { icons } from '../icons.js';
import { getSubtotal, getShippingData, isCartAllDigital, formatRupiah, getPaymentMethod, clearCart } from '../store/cart-store.js';

/**
 * Order Success Page — Confirmation after payment
 */

const paymentLabels = {
  ewallet: 'E-Wallet',
  va: 'Virtual Account',
  cc: 'Kartu Kredit / Debit',
};

function generateOrderId() {
  const prefix = 'REIT';
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  const ts = Date.now().toString().slice(-4);
  return `${prefix}-${ts}${rand}`;
}

export function renderOrderSuccess(navigateFn) {
  const shipping = getShippingData();
  const allDigital = isCartAllDigital();
  const shippingCost = allDigital ? 0 : (shipping?.courierCost || 0);
  const total = getSubtotal() + shippingCost;
  const payment = getPaymentMethod();
  const orderId = generateOrderId();

  // Clear cart after capturing data
  setTimeout(() => clearCart(), 100);

  return `
    <div class="success-page" id="success-view">
      <!-- Animated Checkmark -->
      <div class="success-check">
        <div class="success-check__circle">
          <svg class="success-check__svg" viewBox="0 0 52 52">
            <circle class="success-check__bg" cx="26" cy="26" r="25" fill="none"/>
            <path class="success-check__tick" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
      </div>

      <h1 class="success-title">Pesanan Berhasil!</h1>
      <p class="success-subtitle">Terima kasih atas pesananmu. ${allDigital ? 'Pola digitalmu sudah bisa diakses.' : 'Pesanan sedang diproses.'}</p>

      <!-- Order Details Card -->
      <div class="success-card">
        <div class="success-card__row">
          <span class="success-card__label">No. Pesanan</span>
          <span class="success-card__value success-card__value--mono">${orderId}</span>
        </div>
        <div class="success-card__divider"></div>
        <div class="success-card__row">
          <span class="success-card__label">Total Pembayaran</span>
          <span class="success-card__value success-card__value--accent">${formatRupiah(total)}</span>
        </div>
        <div class="success-card__divider"></div>
        <div class="success-card__row">
          <span class="success-card__label">Metode Bayar</span>
          <span class="success-card__value">${paymentLabels[payment] || payment}</span>
        </div>
        ${!allDigital && shipping ? `
        <div class="success-card__divider"></div>
        <div class="success-card__row">
          <span class="success-card__label">Pengiriman</span>
          <span class="success-card__value">${shipping.courier}</span>
        </div>
        <div class="success-card__row">
          <span class="success-card__label">Estimasi</span>
          <span class="success-card__value">${shipping.courierEst}</span>
        </div>
        ` : ''}
      </div>

      ${allDigital ? `
      <div class="success-digital-note">
        ${icons.scissors}
        <span>Pola digital sudah tersedia dan dapat diakses melalui menu Design Workspace.</span>
      </div>
      ` : `
      <div class="success-digital-note success-digital-note--shipping">
        ${icons.package}
        <span>Pesanan akan dikirim ke <strong>${shipping?.name || 'alamatmu'}</strong> dalam ${shipping?.courierEst || '2-3 hari'}.</span>
      </div>
      `}

      <!-- Action Buttons -->
      <div class="success-actions">
        <button class="btn-primary w-full" id="success-home-btn">
          ${icons.home}
          Kembali ke Beranda
        </button>
      </div>
    </div>
  `;
}

export function initOrderSuccess(navigateFn) {
  const homeBtn = document.getElementById('success-home-btn');
  if (homeBtn) homeBtn.addEventListener('click', () => navigateFn('home'));
}
