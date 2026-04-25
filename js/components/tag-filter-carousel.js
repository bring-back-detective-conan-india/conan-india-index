/* ======================================================
   TAG-FILTER-CAROUSEL.JS - Multi-Select Plot Filter
   Draggable on PC, scrollable on mobile
   Supports episodes, movies, OVAs, Magic Kaito
   ====================================================== */

// State - uses window globals from episode-tags.js
let selectedTags = new Set();
let filterLogic = 'OR'; // 'AND' or 'OR'
let onFilterChange = null;
let multiContentMode = false; // Filter across episodes, movies, OVAs, Kaito

// =======================================================
// RENDER FILTER CAROUSEL
// =======================================================

function renderTagFilterCarousel(containerId, options = {}) {
  const {
    logic = 'OR',
    onChange = null,
    showLogicToggle = true,
    className = '',
    multiContent = false
  } = options;
  
  filterLogic = logic;
  onFilterChange = onChange;
  multiContentMode = multiContent;
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`[TagFilter] Container #${containerId} not found`);
    return;
  }
  
  const allTags = window.ALL_TAGS || [];
  const tagDefinitions = window.TAG_DEFINITIONS || {};
  
  container.innerHTML = `
    <div class="tag-filter-wrapper ${className}">
      ${showLogicToggle ? renderLogicToggle() : ''}
      <div class="tag-filter-carousel" id="tag-carousel-${containerId}">
        <div class="tag-chips-container">
          ${allTags.map(tag => renderTagChip(tag, tagDefinitions)).join('')}
        </div>
      </div>
      ${selectedTags.size > 0 ? renderClearButton() : ''}
    </div>
  `;
  
  // Setup interactions
  setupTagInteractions(container);
  setupDragScroll(container.querySelector('.tag-filter-carousel'));
}

function renderLogicToggle() {
  return `
    <div class="filter-logic-toggle">
      <span class="logic-label">Match:</span>
      <button class="logic-btn ${filterLogic === 'OR' ? 'active' : ''}" data-logic="OR" title="Any selected tag">
        ANY
      </button>
      <button class="logic-btn ${filterLogic === 'AND' ? 'active' : ''}" data-logic="AND" title="All selected tags">
        ALL
      </button>
    </div>
  `;
}

function renderTagChip(tag, tagDefinitions) {
  const def = tagDefinitions[tag] || {};
  const isSelected = selectedTags.has(tag);
  
  return `
    <button 
      class="tag-chip ${isSelected ? 'selected' : ''}" 
      data-tag="${tag}"
      style="--tag-color: ${def.color}"
      title="${def.desc}"
    >
      <span class="tag-indicator" style="background: ${def.color}"></span>
      <span class="tag-name">${tag}</span>
      ${isSelected ? '<span class="tag-check">✓</span>' : ''}
    </button>
  `;
}

function renderClearButton() {
  return `
    <button class="clear-filters-btn" id="clear-filters">
      <span>Clear (${selectedTags.size})</span>
      <span class="clear-icon">×</span>
    </button>
  `;
}

// =======================================================
// INTERACTIONS
// =======================================================

function setupTagInteractions(container) {
  // Tag chip clicks
  container.querySelectorAll('.tag-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const tag = chip.dataset.tag;
      toggleTag(tag);
      updateCarouselUI(container);
      notifyFilterChange();
    });
  });
  
  // Logic toggle
  const logicToggle = container.querySelector('.filter-logic-toggle');
  if (logicToggle) {
    logicToggle.querySelectorAll('.logic-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterLogic = btn.dataset.logic;
        updateLogicToggleUI(container);
        notifyFilterChange();
      });
    });
  }
  
  // Clear button
  const clearBtn = container.querySelector('#clear-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearAllTags();
      updateCarouselUI(container);
      notifyFilterChange();
    });
  }
}

function toggleTag(tag) {
  if (selectedTags.has(tag)) {
    selectedTags.delete(tag);
  } else {
    selectedTags.add(tag);
  }
}

function clearAllTags() {
  selectedTags.clear();
}

function updateCarouselUI(container) {
  // Update tag chips
  container.querySelectorAll('.tag-chip').forEach(chip => {
    const tag = chip.dataset.tag;
    const isSelected = selectedTags.has(tag);
    chip.classList.toggle('selected', isSelected);
    
    // Update checkmark
    const checkSpan = chip.querySelector('.tag-check');
    if (isSelected && !checkSpan) {
      chip.insertAdjacentHTML('beforeend', '<span class="tag-check">✓</span>');
    } else if (!isSelected && checkSpan) {
      checkSpan.remove();
    }
  });
  
  // Update clear button
  const existingClear = container.querySelector('.clear-filters-btn');
  if (selectedTags.size > 0) {
    if (!existingClear) {
      container.querySelector('.tag-filter-carousel').insertAdjacentHTML('afterend', renderClearButton());
      setupClearButton(container);
    } else {
      existingClear.querySelector('span').textContent = `Clear (${selectedTags.size})`;
    }
  } else if (existingClear) {
    existingClear.remove();
  }
}

function updateLogicToggleUI(container) {
  container.querySelectorAll('.logic-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.logic === filterLogic);
  });
}

function setupClearButton(container) {
  const clearBtn = container.querySelector('#clear-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearAllTags();
      updateCarouselUI(container);
      notifyFilterChange();
    });
  }
}

function notifyFilterChange() {
  const selected = Array.from(selectedTags);
  
  if (multiContentMode) {
    // Multi-content filtering (episodes + movies + OVAs + Kaito)
    const allResults = window.filterAllContentByTags ? window.filterAllContentByTags(selected, filterLogic) : { episodes: [], movies: [], ovas: [], kaito: [] };
    const totalMatches = window.getTotalMatches ? window.getTotalMatches(allResults) : 0;
    
    if (onFilterChange) {
      onFilterChange({
        selectedTags: selected,
        logic: filterLogic,
        multiContent: true,
        results: allResults,
        totalMatches: totalMatches,
        breakdown: {
          episodes: allResults.episodes.length,
          movies: allResults.movies.length,
          ovas: allResults.ovas.length,
          kaito: allResults.kaito.length
        }
      });
    }
  } else {
    // Legacy single-content filtering (episodes only)
    const matchingEpisodes = filterLogic === 'AND' 
      ? (window.getEpisodesByAllTags ? window.getEpisodesByAllTags(selected) : [])
      : (window.getEpisodesByAnyTags ? window.getEpisodesByAnyTags(selected) : []);
    
    if (onFilterChange) {
      onFilterChange({
        selectedTags: selected,
        logic: filterLogic,
        multiContent: false,
        matchingEpisodes: matchingEpisodes,
        totalMatches: matchingEpisodes.length
      });
    }
  }
}

// =======================================================
// DRAG & SCROLL BEHAVIOR
// =======================================================

function setupDragScroll(carousel) {
  if (!carousel) return;
  
  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragging = false;
  
  // Mouse events (PC drag)
  carousel.addEventListener('mousedown', (e) => {
    // Don't drag if clicking a button
    if (e.target.closest('.tag-chip, .logic-btn')) return;
    
    isDown = true;
    isDragging = false;
    carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });
  
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('dragging');
    // Prevent click if was dragging
    if (isDragging) {
      carousel.addEventListener('click', preventClick, { capture: true, once: true });
    }
  });
  
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    isDragging = true;
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carousel.scrollLeft = scrollLeft - walk;
  });
  
  // Touch events (mobile scroll)
  let touchStartX = 0;
  let touchScrollLeft = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = carousel.scrollLeft;
  }, { passive: true });
  
  carousel.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].pageX;
    const walk = touchStartX - touchX;
    carousel.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });
  
  // Prevent click after drag
  function preventClick(e) {
    e.stopPropagation();
    e.preventDefault();
  }
}

// =======================================================
// API
// =======================================================

function getSelectedTags() {
  return Array.from(selectedTags);
}

function setSelectedTags(tags) {
  selectedTags = new Set(tags);
  // UI will update on next render
}

function getFilterLogic() {
  return filterLogic;
}

function setFilterLogic(logic) {
  filterLogic = logic === 'AND' ? 'AND' : 'OR';
}

function clearFilters() {
  selectedTags.clear();
}

function hasActiveFilters() {
  return selectedTags.size > 0;
}

// Make functions available globally
window.renderTagFilterCarousel = renderTagFilterCarousel;
window.getSelectedTags = getSelectedTags;
window.setSelectedTags = setSelectedTags;
window.getFilterLogic = getFilterLogic;
window.setFilterLogic = setFilterLogic;
window.clearFilters = clearFilters;
window.hasActiveFilters = hasActiveFilters;
