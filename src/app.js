/**
 * Reiat Mobile — App Shell & Router
 * Hash-based routing with smooth page transitions
 */

import './styles/index.css';
import { renderHome, initHome } from './views/home.js';
import { renderProductDetail, initProductDetail } from './views/product-detail.js';
import { renderCart, initCart } from './views/cart.js';
import { renderShipping, initShipping } from './views/shipping.js';
import { renderCheckout, initCheckout } from './views/checkout.js';
import { renderOrderSuccess, initOrderSuccess } from './views/order-success.js';
import { renderWorkspaceList, initWorkspaceList } from './views/workspace-list.js';
import { renderWorkspace, initWorkspace } from './views/workspace.js';
import { renderAllReviews, initAllReviews } from './views/all-reviews.js';

const app = document.getElementById('app');

// Current state
let currentRoute = 'home';
let routeParams = {};

/**
 * Navigate to a route
 */
function navigate(route, params = {}) {
  currentRoute = route;
  routeParams = params;
  window.location.hash = route;
  render();
}

/**
 * Render the current route
 */
function render() {
  if (!app) return;

  // Scroll to top
  window.scrollTo(0, 0);

  switch (currentRoute) {
    case 'home':
      app.innerHTML = renderHome(navigate);
      initHome(navigate);
      break;
    case 'product-detail':
      app.innerHTML = renderProductDetail(navigate, routeParams);
      initProductDetail(navigate, routeParams);
      break;
    case 'cart':
      app.innerHTML = renderCart(navigate);
      initCart(navigate);
      break;
    case 'shipping':
      app.innerHTML = renderShipping(navigate);
      initShipping(navigate);
      break;
    case 'checkout':
      app.innerHTML = renderCheckout(navigate);
      initCheckout(navigate);
      break;
    case 'order-success':
      app.innerHTML = renderOrderSuccess(navigate);
      initOrderSuccess(navigate);
      break;
    case 'workspace-list':
      app.innerHTML = renderWorkspaceList(navigate);
      initWorkspaceList(navigate);
      break;
    case 'workspace':
      app.innerHTML = renderWorkspace(navigate, routeParams);
      initWorkspace(navigate, routeParams);
      break;
    case 'all-reviews':
      app.innerHTML = renderAllReviews(navigate);
      initAllReviews(navigate);
      break;
    default:
      app.innerHTML = renderHome(navigate);
      initHome(navigate);
      break;
  }
}

// Handle hash changes (back/forward navigation)
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  if (hash !== currentRoute) {
    currentRoute = hash;
    render();
  }
});

// Initial render
const initialHash = window.location.hash.replace('#', '') || 'home';
currentRoute = initialHash;
render();
