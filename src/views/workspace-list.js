import { icons } from '../icons.js';
import { renderBottomNav, initBottomNav } from '../components/bottom-nav.js';

/**
 * Workspace List — Gallery of purchased digital patterns
 * Shows all patterns the user has bought with status indicators
 */

const purchasedPatterns = [
  {
    id: 'p1',
    name: 'Blouse Pattern',
    image: '/images/pattern-blouse.png',
    date: '15 Apr 2026',
    progress: 100,
    status: 'completed',
    difficulty: 'Pemula',
    pieces: 6,
  },
  {
    id: 'p2',
    name: 'A-Line Skirt Pattern',
    image: '/images/pattern-skirt.png',
    date: '12 Apr 2026',
    progress: 45,
    status: 'in-progress',
    difficulty: 'Menengah',
    pieces: 4,
  },
  {
    id: 'p3',
    name: 'Oversized Blazer',
    image: '/images/denim-jacket.png',
    date: '8 Apr 2026',
    progress: 0,
    status: 'new',
    difficulty: 'Mahir',
    pieces: 10,
  },
  {
    id: 'p4',
    name: 'Summer Dress Pattern',
    image: '/images/cardigan.png',
    date: '2 Apr 2026',
    progress: 70,
    status: 'in-progress',
    difficulty: 'Menengah',
    pieces: 8,
  },
];

const statusLabels = {
  'completed': { text: 'Selesai', icon: 'checkCircle', color: 'var(--color-success)' },
  'in-progress': { text: 'Sedang Dikerjakan', icon: 'scissors', color: 'var(--color-accent)' },
  'new': { text: 'Belum Dimulai', icon: 'package', color: 'var(--color-text-tertiary)' },
};

const difficultyColors = {
  'Pemula': 'hsl(160, 55%, 45%)',
  'Menengah': 'hsl(35, 80%, 50%)',
  'Mahir': 'hsl(340, 65%, 50%)',
};

function getStatusBadge(status) {
  const s = statusLabels[status];
  return `<span class="ws-card__status ws-card__status--${status}">${icons[s.icon]}<span>${s.text}</span></span>`;
}

export function renderWorkspaceList(navigateFn) {
  const completedCount = purchasedPatterns.filter(p => p.status === 'completed').length;
  const inProgressCount = purchasedPatterns.filter(p => p.status === 'in-progress').length;

  return `
    <div class="ws-list view" id="ws-list-view">
      <!-- Header -->
      <div class="ws-list__header">
        <h1 class="ws-list__title">Design Workspace</h1>
        <p class="ws-list__subtitle">Koleksi pola digitalmu</p>
      </div>

      <!-- Stats Bar -->
      <div class="ws-stats">
        <div class="ws-stats__item">
          <span class="ws-stats__num">${purchasedPatterns.length}</span>
          <span class="ws-stats__label">Total Pola</span>
        </div>
        <div class="ws-stats__divider"></div>
        <div class="ws-stats__item">
          <span class="ws-stats__num ws-stats__num--accent">${inProgressCount}</span>
          <span class="ws-stats__label">Dikerjakan</span>
        </div>
        <div class="ws-stats__divider"></div>
        <div class="ws-stats__item">
          <span class="ws-stats__num ws-stats__num--success">${completedCount}</span>
          <span class="ws-stats__label">Selesai</span>
        </div>
      </div>

      <!-- Pattern Cards -->
      <div class="ws-list__content">
        ${purchasedPatterns.map(p => `
          <div class="ws-card" data-pattern-id="${p.id}" id="ws-card-${p.id}">
            <div class="ws-card__img-wrap">
              <img class="ws-card__img" src="${p.image}" alt="${p.name}" loading="lazy" />
              ${p.status === 'completed' ? `
              <div class="ws-card__completed-badge">
                ${icons.checkCircle}
              </div>
              ` : ''}
            </div>
            <div class="ws-card__body">
              <div class="ws-card__top">
                <h3 class="ws-card__name">${p.name}</h3>
                ${getStatusBadge(p.status)}
              </div>
              <div class="ws-card__meta">
                <span class="ws-card__meta-item">
                  ${icons.scissors}
                  ${p.pieces} potong pola
                </span>
                <span class="ws-card__meta-item ws-card__difficulty" style="color: ${difficultyColors[p.difficulty] || 'inherit'}">
                  ${p.difficulty}
                </span>
              </div>
              <!-- Progress Bar -->
              <div class="ws-card__progress-wrap">
                <div class="ws-card__progress-bar">
                  <div class="ws-card__progress-fill ws-card__progress-fill--${p.status}" style="width: ${p.progress}%"></div>
                </div>
                <span class="ws-card__progress-text">${p.progress}%</span>
              </div>
              <div class="ws-card__footer">
                <span class="ws-card__date">Dibeli ${p.date}</span>
                <span class="ws-card__action">
                  ${p.status === 'new' ? 'Mulai' : p.status === 'completed' ? 'Lihat' : 'Lanjutkan'}
                  ${icons.chevronRight}
                </span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    ${renderBottomNav('workspace')}
  `;
}

export function initWorkspaceList(navigateFn) {
  initBottomNav(navigateFn);

  // Card clicks → navigate to workspace detail
  const content = document.querySelector('.ws-list__content');
  if (content) {
    content.addEventListener('click', (e) => {
      const card = e.target.closest('.ws-card');
      if (!card) return;
      const patternId = card.dataset.patternId;
      navigateFn('workspace', { patternId });
    });
  }
}
