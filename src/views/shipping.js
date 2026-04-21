import { icons } from '../icons.js';
import { getCart, getSubtotal, formatRupiah, setShippingData, getShippingData } from '../store/cart-store.js';

/**
 * Shipping Page — Address form + courier selection
 */

const couriers = [
  { id: 'jne', name: 'JNE Reguler', est: '3-4 hari', cost: 15000 },
  { id: 'jnt', name: 'J&T Express', est: '2-3 hari', cost: 18000 },
  { id: 'sicepat', name: 'SiCepat REG', est: '1-2 hari', cost: 22000 },
];

export function renderShipping(navigateFn) {
  const saved = getShippingData();

  return `
    <div class="shipping-page" id="shipping-view">
      <!-- Header -->
      <div class="checkout__header">
        <button class="pdp__back-btn" id="shipping-back" aria-label="Back">
          ${icons.arrowLeft}
        </button>
        <h1 class="checkout__header-title">Pengiriman</h1>
      </div>

      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <span class="breadcrumb__item breadcrumb__item--done">
          ${icons.checkCircle}
          Keranjang
        </span>
        <span class="breadcrumb__separator">${icons.chevronRight}</span>
        <span class="breadcrumb__item breadcrumb__item--active">
          Pengiriman
        </span>
        <span class="breadcrumb__separator">${icons.chevronRight}</span>
        <span class="breadcrumb__item">
          Pembayaran
        </span>
      </div>

      <!-- Address Form -->
      <div class="checkout__section">
        <h2 class="checkout__section-title">
          ${icons.mapPin}
          <span>Alamat Pengiriman</span>
        </h2>

        <div class="shipping-form">
          <div class="form-group">
            <label class="form-label" for="ship-name">Nama Penerima</label>
            <input type="text" class="form-input" id="ship-name" placeholder="Nama lengkap" value="${saved?.name || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ship-phone">No. Handphone</label>
            <input type="tel" class="form-input" id="ship-phone" placeholder="08xxxxxxxxxx" value="${saved?.phone || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ship-address">Alamat Lengkap</label>
            <textarea class="form-input form-textarea" id="ship-address" rows="3" placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan">${saved?.address || ''}</textarea>
          </div>
          <div class="form-row form-row--2col">
            <div class="form-group">
              <label class="form-label" for="ship-city">Kota</label>
              <input type="text" class="form-input" id="ship-city" placeholder="Jakarta Selatan" value="${saved?.city || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label" for="ship-zip">Kode Pos</label>
              <input type="text" class="form-input" id="ship-zip" placeholder="12345" maxlength="5" value="${saved?.zip || ''}" />
            </div>
          </div>
        </div>
      </div>

      <!-- Courier Selection -->
      <div class="checkout__section">
        <h2 class="checkout__section-title">
          ${icons.truck}
          <span>Pilih Kurir</span>
        </h2>

        <div class="courier-list" id="courier-list">
          ${couriers.map((c, i) => `
            <div class="courier-card ${i === 0 ? 'courier-card--selected' : ''}" data-courier="${c.id}" id="courier-${c.id}">
              <div class="courier-card__radio">
                <div class="courier-card__radio-dot"></div>
              </div>
              <div class="courier-card__info">
                <span class="courier-card__name">${c.name}</span>
                <span class="courier-card__est">${c.est}</span>
              </div>
              <span class="courier-card__price">${formatRupiah(c.cost)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Cost Summary -->
      <div class="checkout__section">
        <div class="cart-summary__row">
          <span>Subtotal Produk</span>
          <span class="cart-summary__value">${formatRupiah(getSubtotal())}</span>
        </div>
        <div class="cart-summary__row">
          <span>Ongkos Kirim</span>
          <span class="cart-summary__value" id="shipping-cost">${formatRupiah(couriers[0].cost)}</span>
        </div>
        <div class="cart-summary__row cart-summary__row--total">
          <span>Total</span>
          <span class="cart-summary__value cart-summary__value--big" id="shipping-total">${formatRupiah(getSubtotal() + couriers[0].cost)}</span>
        </div>
      </div>
    </div>

    <!-- Sticky CTA -->
    <div class="sticky-cta" id="shipping-sticky-cta">
      <button class="btn-accent w-full" id="shipping-next-btn">
        Lanjut ke Pembayaran
        ${icons.chevronRight}
      </button>
    </div>
  `;
}

export function initShipping(navigateFn) {
  // Back
  const backBtn = document.getElementById('shipping-back');
  if (backBtn) backBtn.addEventListener('click', () => navigateFn('cart'));

  // Courier selection
  let selectedCourier = couriers[0];
  const courierList = document.getElementById('courier-list');
  const shippingCostEl = document.getElementById('shipping-cost');
  const shippingTotalEl = document.getElementById('shipping-total');

  if (courierList) {
    courierList.addEventListener('click', (e) => {
      const card = e.target.closest('.courier-card');
      if (!card) return;

      courierList.querySelectorAll('.courier-card').forEach(c => c.classList.remove('courier-card--selected'));
      card.classList.add('courier-card--selected');

      selectedCourier = couriers.find(c => c.id === card.dataset.courier) || couriers[0];

      if (shippingCostEl) shippingCostEl.textContent = formatRupiah(selectedCourier.cost);
      if (shippingTotalEl) shippingTotalEl.textContent = formatRupiah(getSubtotal() + selectedCourier.cost);
    });
  }

  // Next button
  const nextBtn = document.getElementById('shipping-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Gather form values
      const name = document.getElementById('ship-name')?.value?.trim();
      const phone = document.getElementById('ship-phone')?.value?.trim();
      const address = document.getElementById('ship-address')?.value?.trim();
      const city = document.getElementById('ship-city')?.value?.trim();
      const zip = document.getElementById('ship-zip')?.value?.trim();

      // Basic validation
      if (!name || !phone || !address || !city) {
        // Highlight empty fields
        ['ship-name', 'ship-phone', 'ship-address', 'ship-city'].forEach(id => {
          const el = document.getElementById(id);
          if (el && !el.value.trim()) {
            el.classList.add('form-input--error');
            el.addEventListener('input', () => el.classList.remove('form-input--error'), { once: true });
          }
        });
        return;
      }

      setShippingData({
        name, phone, address, city, zip,
        courier: selectedCourier.name,
        courierCost: selectedCourier.cost,
        courierEst: selectedCourier.est,
      });

      navigateFn('checkout');
    });
  }
}
