function getImg(i){ return CONAN_IMG_LIST[i % CONAN_IMG_LIST.length]; }

function openModal(html,opts={}){
  const modal=document.getElementById('modal');
  const modalPanel=modal?.querySelector('.modal-panel');
  if(!modal||!modalPanel) return;
  modalPanel.innerHTML=html;
  modal.classList.add('open');
  if(opts.fullpage) modal.classList.add('modal-fullpage');
  document.body.classList.add('modal-open');
}

function closeModal(){
  const modal = document.getElementById('modal');
  const modalPanel = modal?.querySelector('.modal-panel');
  if(!modal || !modalPanel) return;

  modal.classList.remove('open');
  modal.classList.remove('modal-fullpage');
  modalPanel.classList.remove('modal-panel-fullpage');
  modalPanel.classList.remove('modal-movie-panel');
  document.body.classList.remove('modal-open');
  document.body.style.overflow='';
  // Reset any swiped card transforms
  modalPanel.querySelectorAll('.modal-ep,.lm-season-card,.lm-movie-card').forEach(card=>{
    card.style.transform='';
    card.style.opacity='';
  });
  // Reset panel transform
  modalPanel.style.transform='';
  modal.style.background='';
  // Decrement counter and restore scroll position only when last modal closes
  window.modalOpenCount = Math.max(0, (window.modalOpenCount || 0) - 1);
  if (window.modalOpenCount === 0 && window.modalScrollPos > 0) {
    window.scrollTo({top: window.modalScrollPos, behavior: 'instant'});
    window.modalScrollPos = 0; // Reset for next time
  }
}

function openConanWatchModal(type, number) {
  if (type === 'episode') {
    openEpisodeModal(number);
  } else if (type === 'movie') {
    // Convert "Movie X" to proper movie ID
    const movieNum = number.replace('Movie ', '');
    const movie = (typeof MOVIES !== 'undefined' ? MOVIES : []).find(m => m.n.toString() === movieNum);
    if (movie) {
      openMovieModal(movie.id);
    }
  } else if (type === 'magic-kaito') {
    openMagicKaitoEpisode('episode', parseInt(number));
  } else if (type === 'ova' || type === 'magic-file') {
    // For OVAs, find the OVA and open a modal
    const ovaNum = number.replace('OVA ', '').replace('Magic File ', '');
    const ova = (typeof OVAS !== 'undefined' ? OVAS : []).find(o => o.id === `ova${ovaNum}`);
    if (ova) {
      showOVAModal(ova.id);
    }
  } else if (type === 'tv-special') {
    // Handle TV specials by finding them in OVAS array
    const spNum = number.replace('TV Special ', '');
    const special = (typeof OVAS !== 'undefined' ? OVAS : []).find(o => o.id === `tvs${spNum}` || o.id === number);
    if (special) {
      showOVAModal(special.id);
    }
  }
}

function renderFooterHTML(){
  return`<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo"><img src="fallback-images/misc/bbdci-logo.png" alt="Bring Back Detective Conan India" class="footer-bbdci-logo" width="48" height="48" loading="lazy" decoding="async"></div>
          <p class="footer-tagline">The complete, independent fan guide to watching Detective Conan in India — every platform, every language, every episode.<br><span style="color:var(--text2);font-size:.92em">By <strong>Bring Back Detective Conan India</strong> — fan community working since 2013 to bring Detective Conan back to India.</span></p>
          <div class="footer-social">
            <a href="https://www.instagram.com/bringbackdetectiveconanindia/" target="_blank" rel="noopener" class="footer-social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>
              @BringBackDetectiveConanIndia
            </a>
            <a href="https://www.facebook.com/detectivecononindia/" target="_blank" rel="noopener" class="footer-social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              @DetectiveConanIndia
            </a>
            <a href="https://www.youtube.com/channel/UCvfa-zGnQVx5LudH7yxgEZw" target="_blank" rel="noopener" class="footer-social-btn" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              YouTube Channel
            </a>
          </div>
          <div class="footer-disclaimer">Fan-made guide · Not affiliated with Gosho Aoyama, TMS Entertainment, Shogakukan, Netflix, Amazon, or any other entity. For reference only.</div>
        </div>
        <div>
          <div class="footer-col-title">Streaming Platforms</div>
          <div class="footer-links">
            ${PLATFORMS.map(p=>`<a href="/platform/${p.id}" onclick="event.preventDefault(); Router.navigate('/platform/${p.id}')">${p.name}${p.nameSub?` <span style="opacity:.8;font-size:.85em">${p.nameSub}</span>`:''}</a>`).join('')}
          </div>
        </div>
        <div>
          <div class="footer-col-title">Content</div>
          <div class="footer-links">
            <a href="/#series" onclick="event.preventDefault(); scrollToSection('series')">TV Series <span class="footer-link-badge tag tag-netflix">${SEASONS.length} Seasons</span></a>
            <a href="/#movies" onclick="event.preventDefault(); scrollToSection('movies')">Movies <span class="footer-link-badge tag tag-prime">27 Films</span></a>
            <a href="/#spinoffs" onclick="event.preventDefault(); scrollToSection('spinoffs')">Spinoffs</a>
            <a href="/browse" onclick="event.preventDefault(); Router.navigate('/browse')">Browse &amp; Filter</a>
            <a href="/#manga" onclick="event.preventDefault(); scrollToSection('manga')">Manga</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">More</div>
          <div class="footer-links">
            <a href="/languages" onclick="event.preventDefault(); Router.navigate('/languages')">Languages Guide</a>
            <a href="/#etv" onclick="event.preventDefault(); scrollToSection('etv')">ETV Bal Bharat</a>
            <a href="/merch" onclick="event.preventDefault(); Router.navigate('/merch')">Fan Merch India</a>
            <a href="/#archive" onclick="event.preventDefault(); Router.currentRoute==='/'||Router.currentRoute===''?scrollToSection('archive'):(Router.navigate('/'),setTimeout(()=>scrollToSection('archive'),400))">Archive</a>
            <a href="https://www.netflix.com/title/80090370" target="_blank" rel="noopener">Watch on Netflix ↗</a>
            <a href="https://www.primevideo.com" target="_blank" rel="noopener">Watch on Anime Times ↗</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">Fan-made guide · Not affiliated with Gosho Aoyama, TMS Entertainment, Shogakukan, Netflix, Amazon, or any other entity.</div>
        <div class="footer-made">Data current as of 2025 · Check platforms for latest availability</div>
      </div>
    </div>
  </footer>`;
}

function syncMobileContextUI(route){
  const bar = document.getElementById('mobileBottomBar');
  const topBar = document.getElementById('mobileTopBar');
  if(!bar) return;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if(!isMobile) return;
  const isPlatformDetail = typeof route === 'string' && route.startsWith('/platform/');
  bar.dataset.lockedHidden = isPlatformDetail ? '1' : '0';
  bar.classList.toggle('bar-hidden', isPlatformDetail);
  if(topBar) topBar.style.display = isPlatformDetail ? 'none' : '';
}

// ─── DYNAMIC SCHEMA.ORG STRUCTURED DATA INJECTION FOR GOOGLE INDEXING ───
function injectSEOStructure(route) {
  // Remove previously injected structured data block
  document.getElementById('bbdci-seo-jsonld')?.remove();

  let schemaObj = null;

  if (route === '/' || route === '') {
    // 1. Home / Landing: TVSeries Schema with regional broadcaster ETV Bal Bharat Schedule
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "TVSeries",
      "name": "Detective Conan (Case Closed) India Index",
      "description": "The definitive watch guide, streaming catalog, and language release tracker for Detective Conan in India.",
      "countryOfOrigin": "JP",
      "genre": ["Mystery", "Detective", "Thriller", "Action"],
      "actor": [
        { "@type": "PerformanceRole", "characterName": "Conan Edogawa", "actor": { "@type": "Person", "name": "Minami Takayama" } },
        { "@type": "PerformanceRole", "characterName": "Shinichi Kudo", "actor": { "@type": "Person", "name": "Kappei Yamaguchi" } },
        { "@type": "PerformanceRole", "characterName": "Ran Mouri", "actor": { "@type": "Person", "name": "Wakana Yamazaki" } }
      ],
      "broadcastService": {
        "@type": "BroadcastService",
        "name": "ETV Bal Bharat",
        "broadcaster": {
          "@type": "Organization",
          "name": "ETV Network India"
        },
        "hasBroadcastChannel": {
          "@type": "BroadcastChannel",
          "providesBroadcastService": {
            "@type": "BroadcastService",
            "name": "ETV Bal Bharat Television Channel"
          }
        },
        "broadcastSchedule": {
          "@type": "BroadcastSchedule",
          "startTime": "23:00:00",
          "endTime": "23:30:00",
          "repeatFrequency": "Daily",
          "scheduleTimezone": "IST"
        }
      }
    };
  } else if (route === '/movies') {
    // 2. Movies: Collection list of Conan theatrical films in India
    schemaObj = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Detective Conan Movies in India",
      "description": "Official list of Detective Conan movies streaming on Netflix India, Anime Times, and released theatrically in PVR Cinemas.",
      "itemListElement": (typeof MOVIES !== 'undefined' ? MOVIES : []).slice(0, 12).map((m, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Movie",
          "name": m.title,
          "dateCreated": m.year.toString(),
          "description": m.desc || "Official Detective Conan theatrical movie.",
          "offers": {
            "@type": "Offer",
            "category": m.netflix ? "Subscription Streaming" : "Theatrical Screenings",
            "seller": {
              "@type": "Organization",
              "name": m.netflix ? "Netflix India" : "PVR Cinemas India"
            }
          }
        }
      }))
    };
  } else if (route.startsWith('/platform/')) {
    const platId = route.split('/platform/')[1];
    const p = typeof PLATFORMS !== 'undefined' ? PLATFORMS.find(x => x.id === platId) : null;
    if (p) {
      // 3. Platform details: Subscription details and dynamic series ranges
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "BroadcastService",
        "name": p.name,
        "tagline": p.tagline,
        "description": p.description,
        "url": p.url || window.location.href,
        "offers": {
          "@type": "Offer",
          "category": "Subscription Video On Demand",
          "price": p.badge
        }
      };
    }
  }

  if (schemaObj) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'bbdci-seo-jsonld';
    script.innerHTML = JSON.stringify(schemaObj, null, 2);
    document.head.appendChild(script);
  }
}

window.injectSEOStructure = injectSEOStructure;

function getSeasonRangeString(seasonIds) {
  if (!seasonIds || !seasonIds.length) return '';
  const nums = seasonIds
    .map(id => parseInt(id.replace('S', ''), 10))
    .filter(n => !isNaN(n))
    .sort((a, b) => a - b);
  
  if (!nums.length) return '';
  
  const ranges = [];
  let start = nums[0];
  let prev = nums[0];
  
  for (let i = 1; i <= nums.length; i++) {
    if (i < nums.length && nums[i] === prev + 1) {
      prev = nums[i];
    } else {
      if (start === prev) {
        ranges.push(`S${start}`);
      } else {
        ranges.push(`S${start}–${prev}`);
      }
      if (i < nums.length) {
        start = nums[i];
        prev = nums[i];
      }
    }
  }
  return ranges.join(', ');
}

window.getSeasonRangeString = getSeasonRangeString;

window.optimizeImage = function(url, quality = 75) {
  if (!url || !url.startsWith('http')) return url;
  if (url.includes('wsrv.nl') || url.includes('pbs.twimg.com') || url.includes('uploads.mangadex.org') || url.includes('amazon.com')) return url;
  const cleanUrl = url.replace(/^https?:\/\//, '');
  return `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&output=webp&q=${quality}`;
};
