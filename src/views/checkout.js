import { icons } from '../icons.js';

/**
 * Screen 4: Checkout
 * Breadcrumb navigation, order summary, payment methods, sticky Pay Now CTA
 */

export function renderCheckout(navigateFn) {
  return `
    <div class="checkout" id="checkout-view">
      <!-- Header -->
      <div class="checkout__header">
        <button class="pdp__back-btn" id="checkout-back" aria-label="Back">
          ${icons.arrowLeft}
        </button>
        <h1 class="checkout__header-title">Checkout</h1>
      </div>

      <!-- Breadcrumb -->
      <div class="breadcrumb" id="breadcrumb">
        <span class="breadcrumb__item breadcrumb__item--done">
          ${icons.checkCircle}
          Keranjang
        </span>
        <span class="breadcrumb__separator">${icons.chevronRight}</span>
        <span class="breadcrumb__item breadcrumb__item--done">
          ${icons.checkCircle}
          Pengiriman
        </span>
        <span class="breadcrumb__separator">${icons.chevronRight}</span>
        <span class="breadcrumb__item breadcrumb__item--active">
          Pembayaran
        </span>
      </div>

      <!-- Order Summary -->
      <div class="checkout__section">
        <h2 class="checkout__section-title">Ringkasan Pesanan</h2>

        <div class="order-item">
          <img class="order-item__thumb" src="/images/pattern-blouse.png" alt="Blouse Pattern" />
          <div class="order-item__info">
            <p class="order-item__name">Blouse Pattern — Digital</p>
            <p class="order-item__meta">Pola Digital · 1x</p>
          </div>
          <p class="order-item__price">Rp 45.000</p>
        </div>

        <div class="order-item" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
          <img class="order-item__thumb" src="/images/cardigan.png" alt="Pink Cardigan" />
          <div class="order-item__info">
            <p class="order-item__name">Pink Oversized Cardigan</p>
            <p class="order-item__meta">Size: M (Smart Sized) · 1x</p>
          </div>
          <p class="order-item__price">Rp 189.000</p>
        </div>

        <div style="border-top: 1px solid var(--color-border-light); margin-top: var(--space-base); padding-top: var(--space-base);">
          <div class="order-total">
            <span class="order-total__label">Total</span>
            <span class="order-total__value">Rp 234.000</span>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="checkout__section">
        <h2 class="checkout__section-title">Metode Pembayaran</h2>

        <div class="payment-method payment-method--selected" data-method="ewallet" id="payment-ewallet">
          <div class="payment-method__icon">
            ${icons.wallet}
          </div>
          <span class="payment-method__name">E-Wallet (OVO, GoPay, DANA)</span>
          <div class="payment-method__check"></div>
        </div>

        <div class="payment-method" data-method="va" id="payment-va">
          <div class="payment-method__icon">
            ${icons.building}
          </div>
          <span class="payment-method__name">Virtual Account</span>
          <div class="payment-method__check"></div>
        </div>

        <div class="payment-method" data-method="cc" id="payment-cc">
          <div class="payment-method__icon">
            ${icons.creditCard}
          </div>
          <span class="payment-method__name">Kartu Kredit / Debit</span>
          <div class="payment-method__check"></div>
        </div>
      </div>
    </div>

    <!-- Sticky Pay Now Button (outside .checkout for fixed positioning) -->
    <div class="sticky-cta" id="checkout-sticky-cta">
      <button class="btn-accent w-full" id="pay-now-btn">
        Pay Now — Rp 234.000
      </button>
    </div>
  `;
}

export function initCheckout(navigateFn) {
  // Back button
  const backBtn = document.getElementById('checkout-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateFn('home'));
  }

  // Payment method selection
  const methods = document.querySelectorAll('.payment-method');
  methods.forEach(method => {
    method.addEventListener('click', () => {
      methods.forEach(m => m.classList.remove('payment-method--selected'));
      method.classList.add('payment-method--selected');
    });
  });
}
