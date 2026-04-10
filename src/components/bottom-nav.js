import { icons } from '../icons.js';

/**
 * Bottom Navigation Bar Component
 * 4 icons: Home (Beranda), Workspace, Cart (Keranjang), Profile (Profil)
 */
export function renderBottomNav(activeRoute = 'home') {
  const navItems = [
    { id: 'home',      icon: icons.home,         label: 'Beranda' },
    { id: 'workspace', icon: icons.scissors,      label: 'Workspace' },
    { id: 'checkout',  icon: icons.shoppingCart,   label: 'Keranjang' },
    { id: 'profile',   icon: icons.user,          label: 'Profil' },
  ];

  return `
    <nav class="bottom-nav" id="bottom-nav" aria-label="Main Navigation">
      ${navItems.map(item => `
        <button
          class="bottom-nav__item ${activeRoute === item.id ? 'bottom-nav__item--active' : ''}"
          data-route="${item.id}"
          id="nav-${item.id}"
          aria-label="${item.label}"
          ${item.id === 'profile' ? 'onclick="return false"' : ''}
        >
          ${item.icon}
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
