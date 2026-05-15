import { icons } from '../icons.js';
import { getCartCount } from '../store/cart-store.js';

/**
 * Bottom Navigation Bar Component
 * 4 icons: Home (Beranda), Workspace, Cart (Keranjang), Profile (Profil)
 */
export function renderBottomNav(activeRoute = 'home') {
  const cartCount = getCartCount();
  const isWorkspace = activeRoute === 'workspace' || activeRoute === 'workspace-list';

  const navItems = [
    { id: 'home',           icon: icons.home,         label: 'Beranda',   active: activeRoute === 'home' },
    { id: 'workspace-list', icon: icons.scissors,     label: 'Workspace', active: isWorkspace },
    { id: 'cart',           icon: icons.shoppingCart,  label: 'Keranjang', badge: cartCount, active: activeRoute === 'cart' },
    { id: 'profile',       icon: icons.user,          label: 'Profil',    active: activeRoute === 'profile' },
  ];

  return `
    <nav class="bottom-nav" id="bottom-nav" aria-label="Main Navigation">
      ${navItems.map(item => `
        <button
          class="bottom-nav__item ${item.active ? 'bottom-nav__item--active' : ''}"
          data-route="${item.id}"
          id="nav-${item.id}"
          aria-label="${item.label}"
          ${item.id === 'profile' ? 'onclick="return false"' : ''}
        >
          <div class="bottom-nav__icon-wrap">
            ${item.icon}
            ${item.badge ? `<span class="bottom-nav__badge">${item.badge}</span>` : ''}
          </div>
          <span class="bottom-nav__label">${item.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

export function initBottomNav(navigateFn) {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;

  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.bottom-nav__item');
    if (!btn) return;
    const route = btn.dataset.route;
    if (route === 'profile') return; // placeholder
    navigateFn(route);
  });
}
