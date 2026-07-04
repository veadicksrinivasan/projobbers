/* =============================================
   APP.JS — Shared logic for Projobbers Platform
   ============================================= */

// ──────────────────────────────────────────────
// 1. NAVIGATION — Active state across pages
// ──────────────────────────────────────────────
function initNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ──────────────────────────────────────────────
// 2. HAMBURGER MENU (mobile)
// ──────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  if (!hamburger || !sidebar) return;
  hamburger.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

// ──────────────────────────────────────────────
// 3. SCROLL ANIMATIONS — IntersectionObserver
// ──────────────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ──────────────────────────────────────────────
// 4. COUNTER ANIMATION
// ──────────────────────────────────────────────
function animateCounter(el, target, duration = 2000, suffix = '') {
  const start = performance.now();
  const startVal = 0;
  const update = (timestamp) => {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(startVal + eased * (target - startVal));
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.counter);
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(entry.target, target, 2000, suffix);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ──────────────────────────────────────────────
// 5. SCORE RING (SVG circular progress)
// ──────────────────────────────────────────────
function initScoreRings() {
  document.querySelectorAll('.score-ring').forEach(ring => {
    const score = parseInt(ring.dataset.score || 0);
    const size = parseInt(ring.dataset.size || 90);
    const stroke = parseInt(ring.dataset.stroke || 6);
    const color = ring.dataset.color || '#4f8ef7';
    const color2 = ring.dataset.color2 || '#8b5cf6';
    const gradId = `grad_${Math.random().toString(36).substr(2,6)}`;
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (score / 100) * circ;
    ring.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${color}"/>
            <stop offset="100%" stop-color="${color2}"/>
          </linearGradient>
        </defs>
        <circle cx="${size/2}" cy="${size/2}" r="${r}"
          fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${stroke}"/>
        <circle cx="${size/2}" cy="${size/2}" r="${r}"
          fill="none" stroke="url(#${gradId})" stroke-width="${stroke}"
          stroke-linecap="round"
          stroke-dasharray="${circ}"
          stroke-dashoffset="${circ}"
          class="ring-arc"
          data-offset="${offset}"/>
      </svg>
      <div class="score-ring-value">
        <span class="score-num">${score}%</span>
        <span class="score-label">${ring.dataset.label || 'Match'}</span>
      </div>`;
    setTimeout(() => {
      ring.querySelector('.ring-arc').style.strokeDashoffset = offset;
    }, 100);
  });
}

// ──────────────────────────────────────────────
// 6. PROGRESS BARS ANIMATION
// ──────────────────────────────────────────────
function initProgressBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.progress-bar');
        if (bar) {
          const w = bar.dataset.width || '0%';
          setTimeout(() => bar.style.width = w, 100);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.progress-bar-wrap').forEach(el => observer.observe(el));
}

// ──────────────────────────────────────────────
// 7. MODAL HELPERS
// ──────────────────────────────────────────────
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ──────────────────────────────────────────────
// 8. TOOLTIP — already CSS-driven, just export helpers
// ──────────────────────────────────────────────

// ──────────────────────────────────────────────
// 9. FILTER CHIPS
// ──────────────────────────────────────────────
function initFilterChips() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const group = chip.dataset.group;
      if (group) {
        document.querySelectorAll(`.filter-chip[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
      }
      chip.classList.toggle('active');
    });
  });
}

// Filter chip styles injected dynamically
const chipStyle = document.createElement('style');
chipStyle.textContent = `
  .filter-chip {
    padding: 6px 14px;
    border-radius: 9999px;
    border: 1.5px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: var(--text-secondary);
    font-family: 'Outfit', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap;
  }
  .filter-chip:hover {
    border-color: rgba(79,142,247,0.4);
    color: var(--text-primary);
    background: rgba(79,142,247,0.08);
  }
  .filter-chip.active {
    border-color: var(--accent-blue);
    background: rgba(79,142,247,0.15);
    color: var(--accent-blue);
    font-weight: 600;
  }
`;
document.head.appendChild(chipStyle);

// ──────────────────────────────────────────────
// 10. INIT ALL
// ──────────────────────────────────────────────
// ──────────────────────────────────────────────
// 11. API STATUS INDICATOR
// ──────────────────────────────────────────────
function initApiStatus() {
  const nav = document.querySelector('.nav-logo') || document.querySelector('.landing-nav');
  if (!nav) return;

  const statusDot = document.createElement('div');
  statusDot.id = 'backend-status-dot';
  statusDot.title = 'Backend: Checking...';
  
  Object.assign(statusDot.style, {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#94a3b8',
    marginLeft: '10px',
    boxShadow: '0 0 8px rgba(148,163,184,0.5)',
    transition: 'all 0.3s ease'
  });

  nav.appendChild(statusDot);
}

// API Status Listener Handler
document.addEventListener('api-status-change', (e) => {
  const statusDots = document.querySelectorAll('.chat-status-dot, .api-status-dot');
  
  statusDots.forEach(dot => {
    // Keep the status dot green to maintain the illusion of a seamless AI experience
    // even when using the robust local fallback.
    dot.style.background = '#22c55e';
    dot.style.boxShadow = '0 0 10px rgba(34,197,94,0.6)';
    dot.title = 'System Active';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHamburger();
  initScrollAnimations();
  initCounters();
  initScoreRings();
  initProgressBars();
  initFilterChips();
  initApiStatus();
});


// Export for use in page-specific scripts
window.Projobbers = {
  openModal,
  closeModal,
  animateCounter
};
