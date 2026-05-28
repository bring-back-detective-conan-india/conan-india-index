// ═══════════════════════════════════════════════════════════════
// WATCH GUIDE v2 — Netflix × Liquid Glass Design
// Slimmed hero, collapsible sidebar, custom arcs
// ═══════════════════════════════════════════════════════════════

// ── Arc Definitions (Custom navigation) ────────────────────────
const WATCH_ARCS = [
  {
    id: 'conan',
    name: 'Conan Arc',
    range: '1-128',
    startEp: 1,
    endEp: 128,
    subArcs: []
  },
  {
    id: 'sherry',
    name: 'Sherry Arc',
    range: '129-178',
    startEp: 129,
    endEp: 178,
    subArcs: []
  },
  {
    id: 'vermouth',
    name: 'Vermouth Arc',
    range: '179-345',
    startEp: 179,
    endEp: 345,
    subArcs: []
  },
  {
    id: 'cellphone',
    name: 'Cell Phone Arc',
    range: '346-424',
    startEp: 346,
    endEp: 424,
    subArcs: []
  },
  {
    id: 'kir',
    name: 'Kir Arc',
    range: '425-508',
    startEp: 425,
    endEp: 508,
    subArcs: []
  },
  {
    id: 'bourbon',
    name: 'Bourbon Arc',
    range: '509-783',
    startEp: 509,
    endEp: 783,
    subArcs: [
      { id: 'bourbon-shiho', name: "Bourbon's: Search for Shiho", range: '509-704', startEp: 509, endEp: 704 },
      { id: 'bourbon-akai', name: "Bourbon's: Search for Akai", range: '705-783', startEp: 705, endEp: 783 }
    ]
  },
  {
    id: 'rum',
    name: 'Rum Arc',
    range: '784+',
    startEp: 784,
    endEp: Infinity,
    subArcs: []
  }
];

// ── Filter Options ─────────────────────────────────────────────
// TAG_SLUG_MAP: slug used in data-tags/filter id → full name in EPISODE_TAGS
const TAG_SLUG_MAP = {
  'black-org':     'Black Organization',
  'fbi':           'FBI',
  'heiji':         'Heiji Hattori',
  'kaito-kid':     'Kaitou Kid',
  'shinichi-ran':  'Shinichi/Ran',
  'detective-boys':'Detective Boys',
  'character-dev': 'Character Development',
  'char-pasts':    'Character Pasts',
  'new-character': 'New Character'
};

const FILTER_OPTIONS = [
  { id: 'all',           label: 'All',              type: 'quick' },
  { id: 'main-plot',     label: 'Main Plot',         type: 'tag' },
  { id: 'movie',         label: 'Movies',            type: 'type' },
  { id: 'ova',           label: 'OVAs',              type: 'type' },
  { id: 'magic-kaito',   label: 'Magic Kaito',       type: 'type' },
  { id: 'black-org',     label: 'Black Organization',type: 'tag' },
  { id: 'fbi',           label: 'FBI',               type: 'tag' },
  { id: 'kaito-kid',     label: 'Kaitou Kid',        type: 'tag' },
  { id: 'heiji',         label: 'Heiji Hattori',     type: 'tag' },
  { id: 'shinichi-ran',  label: 'Shinichi/Ran',      type: 'tag' },
  { id: 'detective-boys',label: 'Detective Boys',    type: 'tag' },
  { id: 'character-dev', label: 'Character Dev',     type: 'tag' },
  { id: 'char-pasts',    label: 'Character Pasts',   type: 'tag' },
  { id: 'new-character', label: 'New Character',     type: 'tag' }
];

// ── Main Renderer ────────────────────────────────────────────
// Options: string shorthand ('essential'|'canon'|'release-order') or object { filter, mode }
function renderWatchGuideV2(options = {}) {
  if (typeof options === 'string') options = { filter: options };
  const { filter = 'all' } = options;
  
  if (!WATCH_GUIDE) {
    console.error('WATCH_GUIDE not loaded');
    return;
  }
  
  if (typeof splitEpisodeRanges !== 'function') {
    console.error('splitEpisodeRanges function not available');
    return;
  }
  
  app.innerHTML = '';
  window.scrollTo({ top: 0, behavior: 'instant' });
  // Reset filter state on each render
  window.activeFilters = window.activeFilters || new Set();
  window.activeFilters.clear();
  window.wg2IndiaOnly = false;
  
  const pg = document.createElement('div');
  pg.className = 'wg2-container page-enter';
  
  // Prepare episode data - uses splitEpisodeRanges from watch-guide.js which preserves original order
  let episodes = splitEpisodeRanges(WATCH_GUIDE.watchOrder);
  const enrichedEpisodes = wg2EnrichEpisodes(episodes);
  
  // Filter episodes if needed
  let filteredEpisodes = enrichedEpisodes;
  let useFlatFeed = false;
  if (filter === 'main-plot') {
    filteredEpisodes = enrichedEpisodes.filter(ep => ep.mainPlot);
  } else if (filter === 'canon') {
    filteredEpisodes = enrichedEpisodes.filter(ep => ep.isCanon);
  } else if (filter === 'release-order') {
    // Sort all items by air date, fall back to episode number
    filteredEpisodes = [...enrichedEpisodes].sort((a, b) => {
      const dateA = a.aired ? new Date(a.aired).getTime() : Infinity;
      const dateB = b.aired ? new Date(b.aired).getTime() : Infinity;
      return dateA - dateB;
    });
    useFlatFeed = true;
  } else if (filter === 'black-org-guide') {
    // Build directly from EPISODES using the tag maps — not limited to watchOrder
    const blackOrgTags = new Set(['Black Organization', 'FBI']);
    const blackOrgEps = (typeof EPISODES !== 'undefined' ? EPISODES : [])
      .filter(e => {
        if (typeof e.n !== 'number') return false;
        const epTags = typeof EPISODE_TAGS !== 'undefined' ? EPISODE_TAGS.get(e.n) : null;
        return epTags && [...blackOrgTags].some(t => epTags.has(t));
      })
      .sort((a, b) => a.n - b.n)
      .map(e => ({ type: 'episode', episode: e.n, numbers: String(e.n) }));
    filteredEpisodes = wg2EnrichEpisodes(blackOrgEps);
    useFlatFeed = true;
  } else if (filter === 'india') {
    filteredEpisodes = enrichedEpisodes.filter(ep => ep.indiaAvailable);
  }
  
  // Determine title/desc based on filter
  const heroTitles = {
    canon:             'Canon <em>Watch</em> Order',
    'release-order':   'Release <em>Order</em> Guide',
    'black-org-guide': 'Black Organization <em>Arc</em>',
    india:             '🇮🇳 Watch in <em>India</em> Guide',
  };
  const heroDescs = {
    canon:             'Manga-canon episodes only — filler and TV-original content excluded.',
    'release-order':   'All Detective Conan episodes and movies in original Japanese air date order.',
    'black-org-guide': 'Every episode touching the Black Organization — Conan\'s origin, the FBI, CIA, Rum, and more.',
    india:             'Only episodes and movies currently available on Indian platforms — Netflix, Anime Times, ETV Bal Bharat, and Amasian TV.',
  };
  const heroTitle = heroTitles[filter] || 'Essential <em>Watch</em> Order';
  const heroDesc  = heroDescs[filter]  || 'Every important episode, movie, and special in the definitive Detective Conan viewing order.';
  
  // Build the feed — flat for release-order, arc-grouped for others
  const feedHtml = useFlatFeed
    ? renderFeedFlat(filteredEpisodes, heroTitle.replace(/<[^>]*>/g, ''))
    : renderFeed(groupEpisodesByArc(filteredEpisodes));
  
  // Clean up any previous arc sheet/overlay injected into body
  document.getElementById('wg2-arc-sheet')?.remove();
  document.getElementById('wg2-arc-sheet-overlay')?.remove();

  // Build HTML - Timeline Ruler Layout (no sidebar, full width feed)
  pg.innerHTML = `
    ${renderHero(heroTitle, heroDesc)}
    ${renderControls()}
    ${renderArcDrawer()}
    ${renderFilterDrawer()}
    ${renderFloatingNav()}
    
    ${feedHtml}
  `;
  
  app.appendChild(pg);

  // Inject arc sheet directly into body so position:fixed works correctly
  // (inside .wg2-container it would be trapped by the page-enter CSS transform/animation)
  document.body.insertAdjacentHTML('beforeend', renderArcSheet());
  
  // Initialize
  setTimeout(() => {
    observeAll();
    wg2InitScrollSpy();
    wg2InitDropdown();
    wg2InitScrubber();
  }, 100);

  // Adjust sticky filter position based on nav visibility
  const stickyFilter = document.querySelector('.wg2-controls');
  const navEl = document.getElementById('nav');
  if (stickyFilter && navEl) {
    function updateStickyTop() {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        stickyFilter.style.top = '66px'; // 54px (nav) + 12px gap
      } else {
        const navHidden = navEl.classList.contains('nav-hidden');
        stickyFilter.style.top = navHidden ? '0px' : '64px';
      }
    }
    updateStickyTop();
    window.addEventListener('scroll', updateStickyTop, { passive: true });
    window.addEventListener('hashchange', function cleanupStickyTop() {
      window.removeEventListener('scroll', updateStickyTop);
    }, { once: true });
  }
}

// ── Hero Section (Slimmed) ───────────────────────────────────
function renderHero(title = 'Essential <em>Watch</em> Order', desc = 'Every important episode, movie, and special in the definitive Detective Conan viewing order.') {
  return `
    <section class="wg2-hero">
      <div class="wg2-hero-bg" style="background-image:url('${IMG.conan3}')"></div>
      <div class="wg2-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <h1>${title}</h1>
        <p class="wg2-hero-desc">${desc}</p>
      </div>
    </section>
  `;
}

// ── Controls (Single Line with Dropdown) ───────────────────────
function renderControls() {
  const dropdownOptions = FILTER_OPTIONS.filter(f => f.type !== 'quick').map(f => `
    <div class="wg2-filter-option" data-value="${f.id}" onclick="wg2DropdownFilter(event, '${f.id}')">
      <input type="checkbox" id="filter-${f.id}" onclick="event.stopPropagation()">
      <span>${f.label}</span>
    </div>
  `).join('');
  
  return `
    <div class="wg2-controls" id="wg2-controls">
      <button class="wg2-btn wg2-btn-accent wg2-jump-btn" onclick="wg2ToggleArcDrawer()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
        Jump to Arc
      </button>
      <div class="wg2-controls-inner">
        <div class="wg2-filter-dropdown" id="wg2-filter-dropdown">
          <button class="wg2-filter-btn" onclick="wg2ToggleDropdown(event)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <span>Filter</span>
            <svg class="wg2-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="wg2-filter-menu">
            ${dropdownOptions}
          </div>
        </div>
        <label class="wg2-india-toggle wg2-india-btn" title="Show only episodes available in India">
          <input type="checkbox" id="wg2-india-check" onchange="wg2IndiaFilter(this.checked)">
          <span class="wg2-india-track">
            <span class="wg2-india-thumb"></span>
          </span>
          <span class="wg2-india-label">🇮🇳 India</span>
        </label>
      </div>
    </div>
  `;
}

function renderArcSheet() {
  const pills = WATCH_ARCS.map(arc => `
    <button class="wg2-arc-pill" onclick="wg2JumpToArc('${arc.id}')">
      <span class="wg2-arc-pill-name">${arc.name}</span>
      <span class="wg2-arc-pill-range">Eps ${arc.range}</span>
    </button>
  `).join('');
  return `
    <div class="wg2-arc-sheet-overlay" id="wg2-arc-sheet-overlay" onclick="wg2CloseArcSheet()"></div>
    <div class="wg2-arc-sheet" id="wg2-arc-sheet">
      <div class="wg2-arc-sheet-handle"></div>
      <div class="wg2-arc-sheet-title">Jump to Arc</div>
      <div class="wg2-arc-sheet-grid">${pills}</div>
    </div>
  `;
}

function renderArcDrawer() {
  const arcItems = WATCH_ARCS.map(arc => `
    <button class="wg2-arc-item" onclick="wg2JumpToArc('${arc.id}')">
      <span class="wg2-arc-name">${arc.name}</span>
      <span class="wg2-arc-range">Eps ${arc.range}</span>
    </button>
  `).join('');

  return `
    <div class="wg2-arc-drawer-overlay" id="wg2-arc-overlay" onclick="wg2ToggleArcDrawer()"></div>
    <div class="wg2-arc-drawer" id="wg2-arc-drawer">
      <div class="wg2-arc-drawer-header">
        <h3>Jump to Arc</h3>
        <button class="wg2-close-btn" onclick="wg2ToggleArcDrawer()">×</button>
      </div>
      <div class="wg2-arc-list">
        ${arcItems}
      </div>
    </div>
    <button class="wg2-fab-nav" onclick="wg2ToggleArcDrawer()">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
    </button>
  `;
}


function renderFloatingNav() {
  return `
    <div class="wg2-fab-container" id="wg2-fab-container">
      <div class="wg2-fab-menu" id="wg2-fab-menu">
        <button class="wg2-fab-item" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); wg2ToggleFabMenu();" title="Back to Top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        <button class="wg2-fab-item" onclick="wg2ToggleFabMenu(); wg2ToggleFilterDrawer();" title="Filters">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
        <button class="wg2-fab-item" onclick="wg2ToggleFabMenu(); wg2ToggleArcDrawer();" title="Jump to Arc">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6h16M4 12h16M4 18h7"></path>
          </svg>
        </button>
      </div>
      <button class="wg2-fab-main" onclick="wg2ToggleFabMenu()">
        <svg class="wg2-fab-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
        <svg class="wg2-fab-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;
}


function renderFilterDrawer() {
  const quickPills = FILTER_OPTIONS.filter(f => f.type === 'quick').map(f => `
    <button class="wg2-arc-item wg2-pill" style="margin-bottom: 8px; justify-content: center;" onclick="wg2QuickFilter('${f.id}'); wg2ToggleFilterDrawer();">
      ${f.label}
    </button>
  `).join('');

  const dropdownOptions = FILTER_OPTIONS.filter(f => f.type !== 'quick').map(f => `
    <div class="wg2-arc-item" style="padding-left: 20px;" onclick="wg2DropdownFilter(event, '${f.id}')">
      <input type="checkbox" id="drawer-filter-${f.id}" onclick="event.stopPropagation()" style="margin-right: 12px; transform: scale(1.2);">
      <span>${f.label}</span>
    </div>
  `).join('');

  return `
    <div class="wg2-arc-drawer-overlay" id="wg2-filter-overlay" onclick="wg2ToggleFilterDrawer()"></div>
    <div class="wg2-arc-drawer" id="wg2-filter-drawer">
      <div class="wg2-arc-drawer-header">
        <h2>Filters</h2>
        <button class="wg2-btn wg2-btn-icon" onclick="wg2ToggleFilterDrawer()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="wg2-arc-list" style="padding: 0 20px;">
        <h3 style="color: var(--wg2-text-muted); font-size: 12px; text-transform: uppercase; margin: 20px 0 10px;">Quick Filters</h3>
        ${quickPills}
        <h3 style="color: var(--wg2-text-muted); font-size: 12px; text-transform: uppercase; margin: 30px 0 10px;">Advanced Filters</h3>
        ${dropdownOptions}
      </div>
    </div>
  `;
}

window.wg2ToggleFilterDrawer = function() {
  const drawer = document.getElementById('wg2-filter-drawer');
  const overlay = document.getElementById('wg2-filter-overlay');
  
  // Sync checkboxes with shared activeFilters state
  wg2SyncCheckboxes();
  
  if (drawer && overlay) {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
  }
};

window.wg2ToggleFabMenu = function() {
  const menu = document.getElementById('wg2-fab-menu');
  const openIcon = document.querySelector('.wg2-fab-icon-open');
  const closeIcon = document.querySelector('.wg2-fab-icon-close');
  if(!menu) return;
  
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
    openIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  } else {
    menu.classList.add('active');
    openIcon.style.display = 'none';
    closeIcon.style.display = 'block';
  }
};

window.wg2CloseArcSheet = function() {
  const sheet = document.getElementById('wg2-arc-sheet');
  const overlay = document.getElementById('wg2-arc-sheet-overlay');
  if(sheet) sheet.classList.remove('active');
  if(overlay) overlay.classList.remove('active');
};

window.wg2ToggleArcDrawer = function() {
  if(window.matchMedia('(max-width:768px)').matches) {
    const sheet = document.getElementById('wg2-arc-sheet');
    const overlay = document.getElementById('wg2-arc-sheet-overlay');
    if(sheet) sheet.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
  } else {
    const drawer = document.getElementById('wg2-arc-drawer');
    const overlay = document.getElementById('wg2-arc-overlay');
    if(drawer) drawer.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
  }
};

window.wg2JumpToArc = function(arcId) {
  const isMobile = window.matchMedia('(max-width:768px)').matches;
  if(isMobile) {
    wg2CloseArcSheet();
  } else {
    const drawer = document.getElementById('wg2-arc-drawer');
    const overlay = document.getElementById('wg2-arc-overlay');
    if(drawer) drawer.classList.remove('active');
    if(overlay) overlay.classList.remove('active');
  }
  setTimeout(() => {
    const el = document.getElementById(arcId);
    if(el) {
      const offset = isMobile ? 80 : 100;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }, isMobile ? 300 : 420);
};

// ── Main Feed ───────────────────────────────────────────────────
function renderFeed(arcData) {
  const sections = WATCH_ARCS.map((arc, index) => {
    const data = arcData[arc.id];
    if (!data || data.items.length === 0) return '';
    
    const itemsHtml = data.items.map((ep, i) => renderWatchCard(ep, i)).join('');
    
    // Sub-arc sections for Bourbon
    const subArcSections = arc.subArcs && arc.subArcs.length > 0 
      ? arc.subArcs.map(sub => {
          const subData = data.subArcs?.[sub.id];
          if (!subData || subData.length === 0) return '';
          return `
            <div class="wg2-subsection" id="${sub.id}">
              <h4 class="wg2-subsection-title">${sub.name}</h4>
              <div class="wg2-grid">
                ${subData.map((ep, i) => renderWatchCard(ep, i)).join('')}
              </div>
            </div>
          `;
        }).join('')
      : '';
    
    return `
      <section class="wg2-section" id="${arc.id}" data-arc="${arc.id}">
        <div class="wg2-section-header">
          <div class="wg2-section-num">${String(index + 1).padStart(2, '0')}</div>
          <div>
            <h2 class="wg2-section-title">${arc.name}</h2>
            <p class="wg2-section-meta">Episodes ${arc.range} · ${data.items.length} items</p>
          </div>
        </div>
        <div class="wg2-grid">
          ${itemsHtml}
        </div>
        ${subArcSections}
      </section>
    `;
  }).join('');
  
  return `
    <main class="wg2-feed" id="wg2-feed">
      ${sections}
      ${renderFooterHTML()}
    </main>
  `;
}

// ── Flat Feed (Release Order / India) ────────────────────────
function renderFeedFlat(episodes, sectionTitle) {
  // Group by year using aired date
  const byYear = new Map();
  episodes.forEach(ep => {
    const year = ep.aired ? new Date(ep.aired).getFullYear() : 'Unknown';
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push(ep);
  });
  
  const sections = Array.from(byYear.entries()).map(([year, eps], i) => `
    <section class="wg2-section" id="year-${year}" data-arc="year-${year}">
      <div class="wg2-section-header">
        <div class="wg2-section-num">${String(year)}</div>
        <div>
          <h2 class="wg2-section-title">${year}</h2>
          <p class="wg2-section-meta">${eps.length} item${eps.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <div class="wg2-grid">
        ${eps.map((ep, j) => renderWatchCard(ep, j)).join('')}
      </div>
    </section>
  `).join('');
  
  return `
    <main class="wg2-feed" id="wg2-feed">
      ${sections}
      ${renderFooterHTML()}
    </main>
  `;
}

// ── Timeline Scrubber (Ruler Design) ──────────────────────────


// ── Episode Card Renderer ─────────────────────────────────────
function renderWatchCard(ep, index) {
  // Get image using existing functionality - with proper type checking
  let imageUrl = IMG.conan1;
  
  try {
    switch (ep.type) {
      case 'episode':
        if (typeof ep.episode === 'number') {
          const episodeData = (typeof EPISODES !== 'undefined' ? EPISODES : []).find(e => e.n === ep.episode);
          if (episodeData) {
            const still = getEpisodeStill(episodeData, ep.episode);
            if (still) imageUrl = still;
          }
          // Fallback to pool only if no still found
          if (imageUrl === IMG.conan1) {
            if (ep.episode <= 100) {
              imageUrl = `images/episodes/ep-${ep.episode}.jpg`;
            } else {
              const pool = [IMG.conan1, IMG.conan2, IMG.conan3, IMG.conan4, IMG.conan5, IMG.conan6, IMG.conan7, IMG.conan8, IMG.conan9, IMG.conan10];
              imageUrl = pool[index % pool.length];
            }
          }
        }
        break;
        
      case 'movie':
        {
          const num = (ep.numbers || '').replace('Movie ', '');
          const m = (typeof MOVIES !== 'undefined' ? MOVIES : []).find(m => m.n.toString() === num);
          if (m && typeof getMovieBackdrop === 'function') {
            imageUrl = getMovieBackdrop(m, parseInt(num)) || IMG.conan3;
          } else {
            imageUrl = IMG.conan3;
          }
        }
        break;
        
      case 'magic-kaito':
        {
          // Magic Kaito uses its own episode numbers (1-24)
          const mkEpNum = ep.episode;
          const cachedStill = window.MAGIC_KAITO_STILLS?.get(mkEpNum);
          const metaStill = window.EPISODE_META?.get(`mk${mkEpNum}`)?.still;
          imageUrl = cachedStill || metaStill || IMG.kid;
          
          // Fetch actual thumbnail if not cached
          if (!cachedStill && !metaStill && typeof MAGIC_KAITO !== 'undefined' && MAGIC_KAITO.tmdb) {
            fetchTMBDEpisodeData(MAGIC_KAITO.tmdb, 1, mkEpNum).then(data => {
              if (data?.image) {
                if (!window.MAGIC_KAITO_STILLS) window.MAGIC_KAITO_STILLS = new Map();
                window.MAGIC_KAITO_STILLS.set(mkEpNum, data.image);
                // Target the img element inside .wg2-card-thumb
                document.querySelectorAll(`[data-mk-ep="${mkEpNum}"] .wg2-card-thumb img`).forEach(el => {
                  el.src = data.image;
                });
              }
            });
          }
        }
        break;
        
      case 'ova':
      case 'magic-file':
      case 'tv-special':
        {
          let lookupId = '';
          const numStr = ep.numbers || '';
          if (ep.type === 'ova' || ep.type === 'magic-file') {
            const ovaNum = numStr.replace('OVA ', '').replace('Magic File ', '');
            lookupId = ep.type === 'magic-file' ? `mf${ovaNum}` : `ova${ovaNum}`;
          } else if (ep.type === 'tv-special') {
            const spNum = numStr.replace('TV Special ', '');
            lookupId = `tvs${spNum}`;
          }
          
          const ovaData = (typeof OVAS !== 'undefined' ? OVAS : []).find(o => o.id === lookupId || o.id === numStr);
          if (ovaData && ovaData.still) {
            imageUrl = ovaData.still;
          } else {
            const pool = [IMG.conan1, IMG.conan2, IMG.conan3, IMG.conan4, IMG.conan5];
            imageUrl = pool[index % pool.length];
          }
        }
        break;
    }
  } catch (e) {
    imageUrl = IMG.conan1;
  }
  
  // Type labels
  const typeLabels = {
    episode: 'EP',
    movie: 'Movie',
    ova: 'OVA',
    'magic-file': 'Magic File',
    'magic-kaito': 'Magic Kaito',
    'tv-special': 'Special'
  };
  
  const typeLabel = typeLabels[ep.type] || ep.type;
  
  // Display number - use numbers property for movies/OVAs, episode for regular episodes
  const displayNum = ep.numbers || (typeof ep.episode === 'number' ? ep.episode.toString() : '');
  
  // Unique identifier for data attributes
  const uniqueId = ep.type === 'magic-kaito' ? `mk-${ep.episode}` 
                 : ep.type === 'episode' ? `ep-${ep.episode}`
                 : ep.numbers || index;
  
  // Tags for filtering
  const tagData = [
    ep.type,
    ...(ep.tags || []),
    ep.mainPlot ? 'main-plot' : ''
  ].filter(Boolean).join(' ');
  const indiaAttr = ep.indiaAvailable ? '1' : '0';
  
  // Tags HTML
  const tagsHtml = (ep.tags || []).filter(t => t !== 'main-plot').slice(0, 2).map(t => {
    const opt = FILTER_OPTIONS.find(f => f.id === t);
    const label = opt ? opt.label : t.replace(/-/g, ' ');
    return `<span class="wg2-tag ${t}">${label}</span>`;
  }).join('');
  
  const mainPlotTag = ep.mainPlot ? `<span class="wg2-tag main-plot">Main Plot</span>` : '';
  
  // Modal opener - use appropriate identifier
  const modalId = ep.type === 'episode' ? ep.episode 
                : ep.type === 'magic-kaito' ? ep.episode
                : ep.numbers || '';
  
  return `
    <div class="wg2-card type-${ep.type} reveal" 
         data-tags="${tagData}"
         data-india="${indiaAttr}"
         data-unique-id="${uniqueId}"
         ${ep.type === 'magic-kaito' ? `data-mk-ep="${ep.episode}"` : ''}
         ${ep.type === 'episode' ? `data-episode="${ep.episode}"` : ''}
         onclick="openConanWatchModal('${ep.type}', '${modalId}')">
      <div class="wg2-card-thumb">
        <img src="${imageUrl}" alt="" onerror="this.onerror=null; this.src='${ep.type === 'episode' && ep.episode <= 100 ? `images/episodes/ep-${ep.episode}.jpg` : IMG.conan1}'">
        <div class="wg2-card-overlay">
          <div class="wg2-card-header">
            <span class="wg2-card-type ${ep.type}">${typeLabel}</span>
            <span class="wg2-card-num">${displayNum}</span>
          </div>
          <div class="wg2-card-title">${ep.title || displayNum}</div>
          ${ep.description && ep.description !== ep.title ? `<div class="wg2-card-desc">${ep.description}</div>` : ''}
          <div class="wg2-card-tags">
            ${mainPlotTag}
            ${tagsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── Group Episodes by Arc (Preserves original watch order) ──────
function groupEpisodesByArc(episodes) {
  const arcData = {};
  let currentArcIndex = 0;
  let lastEpisodeNum = 0;
  
  // Initialize arc data
  WATCH_ARCS.forEach(arc => {
    arcData[arc.id] = {
      items: [],
      subArcs: {}
    };
    if (arc.subArcs) {
      arc.subArcs.forEach(sub => {
        arcData[arc.id].subArcs[sub.id] = [];
      });
    }
  });
  
  // Process episodes in original watch order (do NOT sort)
  episodes.forEach(ep => {
    // Determine the reference episode number for arc assignment
    let refNum = 0;
    
    if (ep.type === 'episode' && typeof ep.episode === 'number') {
      refNum = ep.episode;
      lastEpisodeNum = refNum;
    } else if (ep.type === 'magic-kaito' && typeof ep.episode === 'number') {
      // Magic Kaito episodes are placed relative to surrounding episodes
      refNum = lastEpisodeNum;
    } else {
      // Movies, OVAs, specials - place them based on last seen episode
      refNum = lastEpisodeNum;
    }
    
    // Find which arc this belongs to
    let assignedArc = null;
    for (let i = 0; i < WATCH_ARCS.length; i++) {
      const arc = WATCH_ARCS[i];
      if (refNum >= arc.startEp && (arc.endEp === Infinity || refNum <= arc.endEp)) {
        assignedArc = arc;
        currentArcIndex = i;
        break;
      }
    }
    
    if (assignedArc) {
      arcData[assignedArc.id].items.push(ep);
      
      // Check sub-arcs (for Bourbon arc)
      if (assignedArc.subArcs && ep.type === 'episode' && typeof ep.episode === 'number') {
        for (const sub of assignedArc.subArcs) {
          if (ep.episode >= sub.startEp && ep.episode <= sub.endEp) {
            arcData[assignedArc.id].subArcs[sub.id].push(ep);
            break;
          }
        }
      }
    }
  });
  
  return arcData;
}

// ── UI Interactions ─────────────────────────────────────────────

// Toggle filter dropdown
window.wg2ToggleDropdown = function(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('wg2-filter-dropdown');
  dropdown.classList.toggle('open');
};

// Initialize dropdown close on outside click
function wg2InitDropdown() {
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('wg2-filter-dropdown');
    const button = dropdown?.querySelector('.wg2-filter-btn');
    
    // Close if clicking outside dropdown AND not clicking the filter button
    if (dropdown && !dropdown.contains(e.target) && (!button || !button.contains(e.target))) {
      dropdown.classList.remove('open');
    }
  });
}

// Handle window resize to clean up sidebar classes
function wg2HandleResize() {
  const sidebar = document.getElementById('wg2-sidebar');
  const overlay = document.getElementById('wg2-sidebar-overlay');
  const fab = document.getElementById('wg2-fab-toggle');
  
  if (!sidebar) return;
  
  if (window.innerWidth >= 1025) {
    // Desktop: remove mobile classes
    sidebar.classList.remove('open');
    overlay?.classList.remove('active');
    // Note: is-hidden is preserved - user can collapse/expand
    // Note: FAB active state is preserved
  } else {
    // Mobile/Tablet: remove desktop collapse class
    sidebar.classList.remove('is-hidden');
    // Note: 'open' class is preserved for mobile state
  }
}

// Initialize resize handler
window.addEventListener('resize', wg2HandleResize);

// Shared active filter state
const activeFilters = new Set();
let wg2IndiaOnly = false;

// Sync all checkboxes (dropdown + drawer) with activeFilters
function wg2SyncCheckboxes() {
  FILTER_OPTIONS.filter(f => f.type !== 'quick').forEach(f => {
    const checked = activeFilters.has(f.id);
    const menuCb = document.getElementById('filter-' + f.id);
    const drawerCb = document.getElementById('drawer-filter-' + f.id);
    if (menuCb) menuCb.checked = checked;
    if (drawerCb) drawerCb.checked = checked;
  });
}

// Quick filter (pills)
window.wg2QuickFilter = function(filterId) {
  // Update pill states
  document.querySelectorAll('.wg2-pill').forEach(p => p.classList.remove('active'));
  document.querySelector(`.wg2-pill[data-filter="${filterId}"]`)?.classList.add('active');
  
  // If "All" is clicked, clear all active tag filters
  if (filterId === 'all') {
    activeFilters.clear();
    wg2SyncCheckboxes();
  }
  
  // Apply filter
  wg2ApplyFilter(filterId);
};

// Dropdown/drawer filter (shared handler)
window.wg2DropdownFilter = function(e, filterId) {
  if (e) e.stopPropagation();
  
  // Toggle in shared state
  if (activeFilters.has(filterId)) {
    activeFilters.delete(filterId);
  } else {
    activeFilters.add(filterId);
  }
  
  // Sync both sets of checkboxes
  wg2SyncCheckboxes();
  
  // Deactivate quick pills since we're in multi-filter mode
  document.querySelectorAll('.wg2-pill').forEach(p => p.classList.remove('active'));
  
  // Apply combined filter
  const checkedFilters = Array.from(activeFilters);
  wg2ApplyFilter(checkedFilters.length > 0 ? checkedFilters : 'all');
};

// India toggle handler
window.wg2IndiaFilter = function(checked) {
  wg2IndiaOnly = checked;
  // Re-apply current tag filter
  const checkedFilters = Array.from(activeFilters);
  wg2ApplyFilter(checkedFilters.length > 0 ? checkedFilters : 'all');
};

// Apply filter to cards
function wg2ApplyFilter(filter) {
  const cards = document.querySelectorAll('.wg2-card');
  const isArray = Array.isArray(filter);
  
  cards.forEach(card => {
    const tagsRaw = card.getAttribute('data-tags') || '';
    const tagSet = new Set(tagsRaw.split(' ').filter(Boolean));
    let shouldShow = false;
    
    if (filter === 'all' || (isArray && filter.length === 0)) {
      shouldShow = true;
    } else if (isArray) {
      shouldShow = filter.some(f => tagSet.has(f));
    } else {
      shouldShow = tagSet.has(filter);
    }
    
    // India filter — hide if india-only mode and card not available
    if (shouldShow && wg2IndiaOnly) {
      if (card.getAttribute('data-india') !== '1') shouldShow = false;
    }
    card.classList.toggle('hidden', !shouldShow);
  });
  
  // Hide empty sections
  document.querySelectorAll('.wg2-section').forEach(section => {
    const visibleCards = section.querySelectorAll('.wg2-card:not(.hidden)');
    section.style.display = visibleCards.length > 0 ? '' : 'none';
  });
}

// Scroll to arc
window.wg2ScrollToArc = function(arcId) {
  const element = document.getElementById(arcId);
  if (!element) return;
  
  const controls = document.getElementById('wg2-controls');
  const offset = controls ? controls.offsetHeight : 56;
  const top = element.offsetTop - offset - 16;
  
  window.scrollTo({ top, behavior: 'smooth' });
  document.querySelectorAll('.wg2-arc-header, .wg2-subarc-header').forEach(h => {
    h.classList.remove('active');
  });
  document.querySelector(`[data-arc="${arcId}"]`)?.classList.add('active');
};

// Scroll spy for highlighting active arc
function wg2InitScrollSpy() {
  const sections = document.querySelectorAll('.wg2-section');
  if (!sections.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const arcId = entry.target.id;
        
        document.querySelectorAll('.wg2-arc-header, .wg2-subarc-header').forEach(h => {
          h.classList.remove('active');
        });
        
        const header = document.querySelector(`[data-arc="${arcId}"]`);
        if (header) {
          header.classList.add('active');
          header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }, { threshold: 0.3, rootMargin: '-56px 0px -50% 0px' });
  
  sections.forEach(s => observer.observe(s));
}

// ── Helper: Convert full tag name → slug ───────────────────────
function tagNameToSlug(name) {
  const entry = Object.entries(TAG_SLUG_MAP).find(([, v]) => v === name);
  return entry ? entry[0] : null;
}

// ── Helper: Get slugs from the rich tag maps ────────────────────
function getRichTagSlugs(ep) {
  let tagSet = null;
  if (ep.type === 'episode' && typeof EPISODE_TAGS !== 'undefined') {
    tagSet = EPISODE_TAGS.get(parseInt(ep.episode));
  } else if (ep.type === 'movie' && typeof MOVIE_TAGS !== 'undefined') {
    const num = parseInt((ep.numbers || '').replace('Movie ', ''));
    tagSet = MOVIE_TAGS.get(num);
  } else if ((ep.type === 'ova' || ep.type === 'magic-file') && typeof OVA_TAGS !== 'undefined') {
    const num = parseInt((ep.numbers || '').replace('OVA ', '').replace('Magic File ', ''));
    tagSet = OVA_TAGS.get(num);
  } else if (ep.type === 'magic-kaito' && typeof KAITO_TAGS !== 'undefined') {
    tagSet = KAITO_TAGS.get(parseInt(ep.episode));
  }
  if (!tagSet) return [];
  return Array.from(tagSet).map(tagNameToSlug).filter(Boolean);
}

// ── Helper: Check if an episode object is available in India ───
function wg2IsAvailableInIndia(ep) {
  if (ep.type === 'episode' && typeof EPISODES !== 'undefined') {
    const n = ep.episode;
    const epData = EPISODES.find(e => e.n === n);
    if (!epData) return false;
    
    // ETV Bal Bharat: any episode that has an etv air date
    if (epData.etv) return true;
    
    // Check if any streaming platform covers this episode
    if (typeof PLATFORMS !== 'undefined') {
      const hasPlatform = PLATFORMS.some(p => {
        if (Array.isArray(p.seriesSeasons) && p.seriesSeasons.includes(epData.season)) return true;
        if (Array.isArray(p.seriesRange) && typeof epData.n === 'number') {
          const [a, b] = p.seriesRange;
          if (epData.n >= a && epData.n <= b) return true;
        }
        return false;
      });
      if (hasPlatform) return true;
    }
    return false;
  }
  if (ep.type === 'movie' && typeof MOVIES !== 'undefined') {
    const num = parseInt((ep.numbers || '').replace('Movie ', ''));
    const m = MOVIES.find(m => m.n === num);
    return !!(m && (m.netflix || m.etv || m.animetimes || m.etvwin || m.pvr || m.comingSoon));
  }
  if (['ova', 'magic-file', 'tv-special'].includes(ep.type) && typeof OVAS !== 'undefined') {
    let lookupId = '';
    const numStr = ep.numbers || '';
    if (ep.type === 'ova' || ep.type === 'magic-file') {
      const ovaNum = numStr.replace('OVA ', '').replace('Magic File ', '');
      lookupId = `ova${ovaNum}`;
    } else if (ep.type === 'tv-special') {
      const spNum = numStr.replace('TV Special ', '');
      lookupId = `tvs${spNum}`;
    }
    
    const ova = OVAS.find(o => o.id === lookupId || o.id === numStr);
    if (!ova) return false;
    
    if (ova.available === true) return true;
    
    if (typeof PLATFORMS !== 'undefined') {
      return PLATFORMS.some(p => p.ovas && p.ovas.includes(ova.id));
    }
    return false;
  }
  if (ep.type === 'magic-kaito') return true; // Amasian TV
  if (ep.type === 'yaiba') return true; // Netflix + Anime Times
  return false;
}

// ── Helper: Enrich episodes with data ──────────────────────────
function wg2EnrichEpisodes(episodes) {
  return episodes.map(ep => {
    const enriched = { ...ep };
    
    // Get title and description from episode data
    if (ep.type === 'episode' && typeof EPISODES !== 'undefined') {
      const epData = EPISODES.find(e => e.n === ep.episode);
      if (epData) {
        enriched.title = epData.title;
        enriched.description = epData.description || epData.synopsis || '';
        enriched.aired = epData.aired || null;
        enriched.isCanon = !(epData.src === 'TV Original' || epData.src === 'TV original' || epData.src === 'tv original');
      }
    } else if (ep.type === 'movie' && typeof MOVIES !== 'undefined') {
      const num = (ep.numbers || '').replace('Movie ', '');
      const m = MOVIES.find(m => m.n.toString() === num);
      if (m) {
        enriched.title = m.title;
        enriched.description = m.description || m.synopsis || m.desc || '';
        enriched.aired = m.year ? `${m.year}-04-01` : null;
        enriched.isCanon = true;
      }
    }
    
    // Pull tags from the rich tag maps (overrides any existing tags)
    const richSlugs = getRichTagSlugs(ep);
    if (richSlugs.length > 0) enriched.tags = richSlugs;
    
    // India availability
    enriched.indiaAvailable = wg2IsAvailableInIndia(ep);
    
    return enriched;
  });
}

// ── Ruler Functions (Google Photos / Immich Style) ────────────

function wg2InitScrubber() {
  const ruler = document.getElementById('wg2-ruler');
  const track = document.getElementById('wg2-ruler-track');
  const current = document.getElementById('wg2-ruler-current');
  const hover = document.getElementById('wg2-ruler-hover');
  const hoverText = hover?.querySelector('.wg2-ruler-hover-text');
  
  if (!ruler || !track) return;
  
  let sections = [];
  let sectionTops = [];
  let trackHeight = 0;
  
  // Get all sections and cache positions
  function updateSections() {
    sections = Array.from(document.querySelectorAll('.wg2-section'));
    // Use getBoundingClientRect for absolute document positioning
    sectionTops = sections.map(s => s.getBoundingClientRect().top + window.scrollY);
    trackHeight = track.offsetHeight;
  }
  
  updateSections();
  
  // Get current section index
  function getCurrentSectionIndex() {
    const scrollTop = window.scrollY + window.innerHeight / 3;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollTop >= sectionTops[i]) return i;
    }
    return 0;
  }
  
  // Update current indicator position
  function updateCurrent() {
    const track = document.getElementById('wg2-ruler-track');
    const current = document.getElementById('wg2-ruler-current');
    if (!track || !current) return;
    const trackHeight = track.offsetHeight;
    
    const feed = document.querySelector('.wg2-feed-full');
    let percent = 0;
    if (feed) {
      const rect = feed.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight > 0) {
        // 100 is approx header offset
        percent = Math.max(0, Math.min(1, (100 - rect.top) / scrollableHeight));
      }
    } else {
      const sectionIndex = getCurrentSectionIndex();
      percent = sections.length > 1 ? sectionIndex / (sections.length - 1) : 0;
    }
    
    const pos = percent * trackHeight;
    current.style.top = `${pos}px`;
    
    const sectionIndex = getCurrentSectionIndex();
    document.querySelectorAll('.wg2-ruler-major-tick').forEach((tick, i) => {
      tick.classList.toggle('active', i === sectionIndex);
    });
  }
  // ── Immich-Style Drag & Scrub Logic ──
  let isDragging = false;
  
  function handleScrub(clientY) {
    showHover(clientY);
    
    // Smoothly scroll the feed
    const feed = document.querySelector('.wg2-feed-full');
    if (feed) {
      const rect = track.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      
      const feedRect = feed.getBoundingClientRect();
      const scrollableHeight = feedRect.height - window.innerHeight;
      if (scrollableHeight > 0) {
        // Find exact scroll position
        // When percent is 0, we want feedRect.top to be 100
        // Which means window.scrollY should be feed.offsetTop - 100
        const absoluteFeedTop = feedRect.top + window.scrollY;
        const targetScrollY = absoluteFeedTop - 100 + (percent * scrollableHeight);
        window.scrollTo({ top: targetScrollY, behavior: 'instant' });
      }
    }
  }

  // Pointer & Mouse down
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    ruler.classList.add('dragging');
    document.body.classList.add('wg2-is-dragging');
    handleScrub(e.clientY);
  });
  
  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    ruler.classList.add('dragging');
    document.body.classList.add('wg2-is-dragging');
    handleScrub(e.touches[0].clientY);
  }, { passive: false });

  // Move events on window to handle dragging outside the track
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) {
      // Normal hover logic if over track
      const rect = track.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && 
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        showHover(e.clientY);
      } else {
        hideHover();
      }
      return;
    }
    handleScrub(e.clientY);
  });
  
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent native scroll while scrubbing
    handleScrub(e.touches[0].clientY);
  }, { passive: false });

  // End drag
  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    ruler.classList.remove('dragging');
    document.body.classList.remove('wg2-is-dragging');
    hideHover();
  });
  
  window.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    ruler.classList.remove('dragging');
    document.body.classList.remove('wg2-is-dragging');
    hideHover();
  });

  // Scroll sync
  function onScrollSync() {
    if (!isDragging) {
      requestAnimationFrame(updateCurrent);
    }
  }
  window.addEventListener('scroll', onScrollSync, { passive: true });
  
  // Show ruler after initial scroll
  let rulerVisible = false;
  function onScrollShowRuler() {
    if (!rulerVisible && window.scrollY > 200) {
      rulerVisible = true;
      ruler.classList.add('visible');
    }
  }
  window.addEventListener('scroll', onScrollShowRuler, { passive: true });
  
  // Update on resize
  function onResizeScrubber() {
    updateSections();
    updateCurrent();
  }
  window.addEventListener('resize', onResizeScrubber);
  
  // Clean up on hashchange to prevent leaks
  window.addEventListener('hashchange', function cleanupScrubber() {
    window.removeEventListener('scroll', onScrollSync);
    window.removeEventListener('scroll', onScrollShowRuler);
    window.removeEventListener('resize', onResizeScrubber);
  }, { once: true });
  
  updateCurrent();
}

// Toggle ruler visibility (mobile)
window.wg2ToggleScrubber = function() {
  const ruler = document.getElementById('wg2-ruler');
  ruler?.classList.toggle('visible');
};

// Jump to specific arc via scrubber
window.wg2ScrubberJump = function(arcId) {
  const element = document.getElementById(arcId);
  if (!element) return;
  
  const controls = document.getElementById('wg2-controls');
  const offset = controls ? controls.offsetHeight : 56;
  const top = element.offsetTop - offset - 16;
  
  window.scrollTo({ top, behavior: 'smooth' });
};

// ── Export for use ───────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderWatchGuideV2, WATCH_ARCS };
}
