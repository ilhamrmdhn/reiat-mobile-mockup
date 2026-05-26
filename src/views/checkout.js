import { icons } from '../icons.js';
import { getCart, getSubtotal, getShippingData, isCartAllDigital, formatRupiah, setPaymentMethod, getPaymentMethod } from '../store/cart-store.js';

/**
 * Checkout / Payment Page
 * Shows order summary from cart store, shipping info, payment method selection
 */

export function renderCheckout(navigateFn) {
  const items = getCart();
  const subtotal = getSubtotal();
  const shipping = getShippingData();
  const allDigital = isCartAllDigital();
  const shippingCost = allDigital ? 0 : (shipping?.courierCost || 0);
  const total = subtotal + shippingCost;
  const currentPayment = getPaymentMethod();

  return `
    <div class="checkout" id="checkout-view">
      <!-- Header -->
      <div class="checkout__header">
        <button class="pdp__back-btn" id="checkout-back" aria-label="Back">
          ${icons.arrowLeft}
        </button>
        <h1 class="checkout__header-title">Pembayaran</h1>
      </div>

      <!-- Breadcrumb -->
      <div class="breadcrumb" id="breadcrumb">
        <span class="breadcrumb__item breadcrumb__item--done">
          ${icons.checkCircle}
          Keranjang
        </span>
        <span class="breadcrumb__separator">${icons.chevronRight}</span>
        ${!allDigital ? `
        <span class="breadcrumb__item breadcrumb__item--done">
          ${icons.checkCircle}
          Pengiriman
        </span>
        <span class="breadcrumb__separator">${icons.chevronRight}</span>
        ` : ''}
        <span class="breadcrumb__item breadcrumb__item--active">
          Pembayaran
        </span>
      </div>

      <!-- Shipping Address (if physical) -->
      ${!allDigital && shipping ? `
      <div class="checkout__section">
        <h2 class="checkout__section-title">
          ${icons.mapPin}
          <span>Alamat Pengiriman</span>
        </h2>
        <div class="shipping-card">
          <p class="shipping-card__name">${shipping.name}</p>
          <p class="shipping-card__detail">${shipping.phone}</p>
          <p class="shipping-card__detail">${shipping.address}, ${shipping.city} ${shipping.zip || ''}</p>
          <div class="shipping-card__courier">
            ${icons.truck}
            <span>${shipping.courier} · ${shipping.courierEst}</span>
          </div>
        </div>
      </div>
      ` : ''}

      ${allDigital ? `
      <div class="checkout__section">
        <div class="digital-notice">
          ${icons.scissors}
          <div>
            <p class="digital-notice__title">Produk Digital</p>
            <p class="digital-notice__text">Pola dapat langsung diakses pada menu Design Workspace setelah pembayaran berhasil.</p>
          </div>
        </div>
      </div>
      ` : ''}

      <!-- Order Summary -->
      <div class="checkout__section">
        <h2 class="checkout__section-title">Ringkasan Pesanan</h2>

        ${items.map((item, i) => `
          <div class="order-item" ${i === items.length - 1 ? 'style="border-bottom:none;margin-bottom:0;padding-bottom:0;"' : ''}>
            <img class="order-item__thumb" src="${item.image}" alt="${item.name}" />
            <div class="order-item__info">
              <p class="order-item__name">${item.name}</p>
              <p class="order-item__meta">${item.type === 'pattern' ? 'Pola Digital' : 'Clothing'} · ${item.qty}x</p>
            </div>
            <p class="order-item__price">${formatRupiah(item.priceNum * item.qty)}</p>
          </div>
        `).join('')}

        <div style="border-top: 1px solid var(--color-border-light); margin-top: var(--space-base); padding-top: var(--space-base);">
          <div class="order-total-row">
            <span>Subtotal</span>
            <span>${formatRupiah(subtotal)}</span>
          </div>
          ${!allDigital ? `
          <div class="order-total-row">
            <span>Ongkos Kirim</span>
            <span>${formatRupiah(shippingCost)}</span>
          </div>
          ` : ''}
          <div class="order-total">
            <span class="order-total__label">Total Pembayaran</span>
            <span class="order-total__value">${formatRupiah(total)}</span>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="checkout__section">
        <h2 class="checkout__section-title">Metode Pembayaran</h2>

        <div class="payment-method ${currentPayment === 'ewallet' ? 'payment-method--selected' : ''}" data-method="ewallet" id="payment-ewallet">
          <div class="payment-method__icon">${icons.wallet}</div>
          <span class="payment-method__name">E-Wallet (OVO, GoPay, DANA)</span>
          <div class="payment-method__check"></div>
        </div>

        <div class="payment-method ${currentPayment === 'va' ? 'payment-method--selected' : ''}" data-method="va" id="payment-va">
          <div class="payment-method__icon">${icons.building}</div>
          <span class="payment-method__name">Virtual Account</span>
          <div class="payment-method__check"></div>
        </div>

        <div class="payment-method ${currentPayment === 'cc' ? 'payment-method--selected' : ''}" data-method="cc" id="payment-cc">
          <div class="payment-method__icon">${icons.creditCard}</div>
          <span class="payment-method__name">Kartu Kredit / Debit</span>
          <div class="payment-method__check"></div>
        </div>
      </div>
    </div>

    <!-- Sticky Pay Now Button -->
    <div class="sticky-cta" id="checkout-sticky-cta">
      <button class="btn-accent w-full" id="pay-now-btn">
        <span id="pay-now-text">Bayar Sekarang — ${formatRupiah(total)}</span>
      </button>
    </div>
  `;
}

export function initCheckout(navigateFn) {
  // Back button
  const backBtn = document.getElementById('checkout-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (isCartAllDigital()) {
        navigateFn('cart');
      } else {
        navigateFn('shipping');
      }
    });
  }

  // Payment method selection
  const methods = document.querySelectorAll('.payment-method');
  methods.forEach(method => {
    method.addEventListener('click', () => {
      methods.forEach(m => m.classList.remove('payment-method--selected'));
      method.classList.add('payment-method--selected');
      setPaymentMethod(method.dataset.method);
    });
  });

  // Pay Now button with loading
  const payBtn = document.getElementById('pay-now-btn');
  const payText = document.getElementById('pay-now-text');
  if (payBtn) {
    payBtn.addEventListener('click', () => {
      payBtn.disabled = true;
      payBtn.classList.add('btn--loading');
      if (payText) payText.innerHTML = `${icons.loader} Memproses Pembayaran...`;

      setTimeout(() => {
        navigateFn('order-success');
      }, 30000);
    });
  }
}
