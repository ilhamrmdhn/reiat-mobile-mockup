import { icons } from '../icons.js';
import { getCart, getSubtotal, updateQty, removeFromCart, formatRupiah, isCartAllDigital } from '../store/cart-store.js';
import { renderBottomNav, initBottomNav } from '../components/bottom-nav.js';/**
 * Cart Page — Shopping cart with qty controls, remove, and subtotal
 */

export function renderCart(navigateFn) {
  const items = getCart();
  const isEmpty = items.length === 0;
  const allDigital = isCartAllDigital();

  return `
    <div class="cart-page" id="cart-view">
      <!-- Header -->
      <div class="cart-page__header">
        <h1 class="cart-page__title">Keranjang</h1>
        <span class="cart-page__count">${items.length} item</span>
      </div>

      ${isEmpty ? `
      <!-- Empty State -->
      <div class="cart-empty">
        <div class="cart-empty__icon">${icons.shoppingBag}</div>
        <h3 class="cart-empty__title">Keranjang Kosong</h3>
        <p class="cart-empty__text">Yuk, mulai belanja dan temukan fashion favoritmu!</p>
        <button class="btn-primary" id="cart-shop-btn">
          ${icons.shoppingBag}
          Belanja Sekarang
        </button>
      </div>
      ` : `
      <!-- Cart Items -->
      <div class="cart-items" id="cart-items">
        ${items.map(item => `
          <div class="cart-item" data-id="${item.id}" id="cart-item-${item.id}">
            <img class="cart-item__img" src="${item.image}" alt="${item.name}" />
            <div class="cart-item__body">
              <div class="cart-item__top">
                <div>
                  <span class="cart-item__badge cart-item__badge--${item.type}">${item.type === 'pattern' ? 'Digital Pattern' : 'Clothing'}</span>
                  <p class="cart-item__name">${item.name}</p>
                </div>
                <button class="cart-item__remove" data-remove="${item.id}" aria-label="Remove">
                  ${icons.trash}
                </button>
              </div>
              <div class="cart-item__bottom">
                <p class="cart-item__price">${formatRupiah(item.priceNum)}</p>
                ${item.type === 'pattern' ? `
                <div class="qty-control qty-control--fixed" style="border:none; padding:0; background:transparent;">
                  <span class="qty-control__value" style="font-weight:600; color:var(--color-text-secondary); width:auto;">1x</span>
                </div>
                ` : `
                <div class="qty-control">
                  <button class="qty-control__btn" data-qty-action="minus" data-qty-id="${item.id}" aria-label="Kurangi">
                    ${icons.minus}
                  </button>
                  <span class="qty-control__value" id="qty-val-${item.id}">${item.qty}</span>
                  <button class="qty-control__btn" data-qty-action="plus" data-qty-id="${item.id}" aria-label="Tambah">
                    ${icons.plus}
                  </button>
                </div>
                `}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Order Summary -->
      <div class="cart-summary">
        <div class="cart-summary__row">
          <span>Subtotal</span>
          <span class="cart-summary__value" id="cart-subtotal">${formatRupiah(getSubtotal())}</span>
        </div>
        ${allDigital ? `
        <div class="cart-summary__row cart-summary__row--note">
          <span>${icons.mail} Produk digital tanpa ongkos kirim</span>
        </div>
        ` : `
        <div class="cart-summary__row cart-summary__row--note">
          <span>${icons.truck} Ongkir dihitung di langkah berikutnya</span>
        </div>
        `}
      </div>
      `}
    </div>

    ${!isEmpty ? `
    <!-- Sticky CTA -->
    <div class="sticky-cta sticky-cta--with-nav" id="cart-sticky-cta">
      <button class="btn-accent w-full" id="cart-checkout-btn">
        ${allDigital ? 'Lanjut ke Pembayaran' : 'Lanjut ke Pengiriman'}
        ${icons.chevronRight}
      </button>
    </div>
    ` : ''}
    
    ${renderBottomNav('cart')}
  `;
}

export function initCart(navigateFn) {
  initBottomNav(navigateFn);
  
  const shopBtn = document.getElementById('cart-shop-btn');
  if (shopBtn) shopBtn.addEventListener('click', () => navigateFn('home'));

  // Qty Controls
  const cartItemsEl = document.getElementById('cart-items');
  if (cartItemsEl) {
    cartItemsEl.addEventListener('click', (e) => {
      // Remove button
      const removeBtn = e.target.closest('[data-remove]');
      if (removeBtn) {
        const id = removeBtn.dataset.remove;
        const itemEl = document.getElementById(`cart-item-${id}`);
        if (itemEl) {
          itemEl.classList.add('cart-item--removing');
          setTimeout(() => {
            removeFromCart(id);
            // Re-render the page
            navigateFn('cart');
          }, 300);
        }
        return;
      }

      // Qty buttons
      const qtyBtn = e.target.closest('[data-qty-action]');
      if (qtyBtn) {
        const id = qtyBtn.dataset.qtyId;
        const action = qtyBtn.dataset.qtyAction;
        const item = getCart().find(i => String(i.id) === String(id));
        if (!item) return;

        const newQty = action === 'plus' ? item.qty + 1 : item.qty - 1;
        if (newQty <= 0) {
          const itemEl = document.getElementById(`cart-item-${id}`);
          if (itemEl) {
            itemEl.classList.add('cart-item--removing');
            setTimeout(() => {
              removeFromCart(id);
              navigateFn('cart');
            }, 300);
          }
          return;
        }

        updateQty(id, newQty);
        const qtyVal = document.getElementById(`qty-val-${id}`);
        if (qtyVal) qtyVal.textContent = newQty;

        const subtotalEl = document.getElementById('cart-subtotal');
        if (subtotalEl) subtotalEl.textContent = formatRupiah(getSubtotal());
      }
    });
  }

  // Checkout button
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (isCartAllDigital()) {
        // Skip shipping for digital products
        navigateFn('checkout');
      } else {
        navigateFn('shipping');
      }
    });
  }
}
