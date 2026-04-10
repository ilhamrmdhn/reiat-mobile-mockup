import { icons } from '../icons.js';
import { renderBottomNav, initBottomNav } from '../components/bottom-nav.js';

/**
 * Screen 5: Design Workspace (Instructional Hub)
 * PDF download button, custom styled video player, accordion step-by-step instructions
 */

const steps = [
  {
    title: 'Persiapan Bahan & Alat',
    expanded: true,
    content: `
      Siapkan semua bahan dan alat yang dibutuhkan sebelum memulai:
      <ul>
        <li>Kain utama sesuai rekomendasi (2.5 meter)</li>
        <li>Kain furing (1.5 meter)</li>
        <li>Gunting kain, jarum pentul, kapur jahit</li>
        <li>Mesin jahit dengan jarum ukuran 11/75</li>
        <li>Benang senada warna kain</li>
      </ul>
    `
  },
  {
    title: 'Potong Pola pada Kain',
    expanded: false,
    content: `
      Letakkan pola di atas kain yang sudah dilipat sesuai arah serat. Gunakan jarum pentul untuk menyematkan pola pada kain, lalu potong mengikuti garis pola dengan menambahkan seam allowance 1.5 cm.
    `
  },
  {
    title: 'Jahit & Finishing',
    expanded: false,
    content: `
      Mulai dengan menjahit bagian bahu, lalu sisi samping. Pasang lengan dan selesaikan dengan keliman pada bagian bawah dan ujung lengan. Lakukan pressing pada setiap jahitan untuk hasil yang rapi.
    `
  },
];

export function renderWorkspace(navigateFn) {
  return `
    <div class="workspace view" id="workspace-view">
      <!-- Header -->
      <div class="workspace__header">
        <h1 class="workspace__title">Design Workspace</h1>
        <p class="workspace__subtitle">Blouse Pattern — Tutorial & Instruksi</p>
      </div>

      <!-- Download PDF Button -->
      <div class="workspace__section">
        <button class="btn-primary w-full" id="download-pdf-btn">
          ${icons.download}
          Download PDF Pattern
        </button>
      </div>

      <!-- Custom Video Player -->
      <div class="workspace__section">
        <p class="workspace__section-label">Video Tutorial</p>
        <div class="video-player" id="video-player">
          <img class="video-player__poster" src="/images/pattern-blouse.png" alt="Tutorial thumbnail" />
          <div class="video-player__overlay" id="video-overlay">
            <div class="video-player__play-btn" id="video-play-btn">
              ${icons.play}
            </div>
            <span class="video-player__label">Tonton Tutorial Menjahit</span>
          </div>
          <div class="video-player__controls" id="video-controls" style="display:none;">
            <button id="video-toggle-btn" style="background:none;border:none;color:white;cursor:pointer;display:flex;align-items:center;">
              ${icons.pause}
            </button>
            <div class="video-player__progress">
              <div class="video-player__progress-bar" id="video-progress"></div>
            </div>
            <span class="video-player__time" id="video-time">0:00 / 12:34</span>
          </div>
        </div>
      </div>

      <!-- Step-by-Step Accordion -->
      <div class="workspace__section">
        <p class="workspace__section-label">Instruksi Langkah demi Langkah</p>
        <div class="accordion" id="accordion">
          ${steps.map((step, i) => `
            <div class="accordion__item ${step.expanded ? 'accordion__item--active' : ''}" data-step="${i}">
              <button class="accordion__trigger" id="accordion-trigger-${i}">
                <div class="accordion__trigger-left">
                  <span class="accordion__step-badge">${i + 1}</span>
                  <span class="accordion__trigger-text">${step.title}</span>
                </div>
                <span class="accordion__chevron">${icons.chevronDown}</span>
              </button>
              <div class="accordion__content">
                <div class="accordion__content-inner">
                  <div class="accordion__content-text">${step.content}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    ${renderBottomNav('workspace')}
  `;
}

export function initWorkspace(navigateFn) {
  initBottomNav(navigateFn);

  // Accordion toggle
  const accordion = document.getElementById('accordion');
  if (accordion) {
    accordion.addEventListener('click', (e) => {
      const trigger = e.target.closest('.accordion__trigger');
      if (!trigger) return;
      const item = trigger.closest('.accordion__item');
      if (!item) return;

      item.classList.toggle('accordion__item--active');
    });
  }

  // Custom Video Player simulation
  const player = document.getElementById('video-player');
  const overlay = document.getElementById('video-overlay');
  const controls = document.getElementById('video-controls');
  const playBtn = document.getElementById('video-play-btn');
  const toggleBtn = document.getElementById('video-toggle-btn');
  const progressBar = document.getElementById('video-progress');
  const timeDisplay = document.getElementById('video-time');

  let isPlaying = false;
  let progressInterval = null;
  let currentProgress = 0;
  const totalDuration = 754; // 12:34 in seconds

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function startPlayback() {
    isPlaying = true;
    if (overlay) overlay.style.display = 'none';
    if (controls) controls.style.display = 'flex';
    if (toggleBtn) toggleBtn.innerHTML = icons.pause;

    progressInterval = setInterval(() => {
      currentProgress += 1;
      if (currentProgress >= totalDuration) {
        currentProgress = 0;
        stopPlayback();
        return;
      }
      const percent = (currentProgress / totalDuration) * 100;
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (timeDisplay) timeDisplay.textContent = `${formatTime(currentProgress)} / ${formatTime(totalDuration)}`;
    }, 1000);
  }

  function stopPlayback() {
    isPlaying = false;
    if (toggleBtn) toggleBtn.innerHTML = icons.play;
    clearInterval(progressInterval);
  }

  if (playBtn) {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startPlayback();
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        stopPlayback();
      } else {
        startPlayback();
      }
    });
  }

  if (player) {
    player.addEventListener('click', () => {
      if (!isPlaying && overlay?.style.display !== 'none') {
        startPlayback();
      }
    });
  }
}
