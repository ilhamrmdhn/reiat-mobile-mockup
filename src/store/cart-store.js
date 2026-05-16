/**
 * Cart Store — Simple in-memory state management for the shopping cart
 * Shared across all views via ES module imports
 */

let cartItems = [];
let shippingData = null;
let selectedPayment = 'ewallet';

// ========== Cart Operations ==========

export function addToCart(product) {
  const existing = cartItems.find(item => item.id === product.id);
  const type = product.type || 'clothing';

  if (existing) {
    if (type !== 'pattern') {
      existing.qty += 1;
    }
  } else {
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: parsePriceToNumber(product.price),
      image: product.image || product.images?.[0] || '/images/cardigan.png',
      type: type,
      qty: 1,
    });
  }
}

export function removeFromCart(productId) {
  cartItems = cartItems.filter(item => String(item.id) !== String(productId));
}

export function updateQty(productId, qty) {
  const item = cartItems.find(i => String(i.id) === String(productId));
  if (!item) return;
  if (qty <= 0) {
    removeFromCart(productId);
  } else {
    item.qty = qty;
  }
}

export function getCart() {
  return cartItems;
}

export function getCartCount() {
  return cartItems.reduce((sum, item) => sum + item.qty, 0);
}

export function getSubtotal() {
  return cartItems.reduce((sum, item) => sum + (item.priceNum * item.qty), 0);
}

export function clearCart() {
  cartItems = [];
  shippingData = null;
  selectedPayment = 'ewallet';
}

export function isCartAllDigital() {
  return cartItems.length > 0 && cartItems.every(item => item.type === 'pattern');
}

// ========== Shipping ==========

export function setShippingData(data) {
  shippingData = data;
}

export function getShippingData() {
  return shippingData;
}

// ========== Payment ==========

export function setPaymentMethod(method) {
  selectedPayment = method;
}

export function getPaymentMethod() {
  return selectedPayment;
}

// ========== Helpers ==========

function parsePriceToNumber(priceStr) {
  // "Rp 189.000" → 189000
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
}

export function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}
