/* ══════════════════════════════════════════════════════
   APP.JS — Detective Conan India Watch Guide v2
   Multi-page router · Filter system · Language section
══════════════════════════════════════════════════════ */

// ─── IMAGE POOL ──────────────────────────────────────
const IMG = {
  conan1:  'https://images.alphacoders.com/133/1338628.jpg',
  conan2:  'https://images5.alphacoders.com/135/1352645.jpg',
  conan3:  'https://images6.alphacoders.com/134/1348942.jpg',
  conan4:  'https://images3.alphacoders.com/134/1340289.jpg',
  conan5:  'https://images6.alphacoders.com/131/1316985.jpg',
  conan6:  'https://images.alphacoders.com/133/1338165.jpg',
  conan7:  'https://images3.alphacoders.com/132/1328040.jpg',
  conan8:  'https://images.alphacoders.com/133/1332985.jpg',
  conan9:  'https://images2.alphacoders.com/134/1347826.jpg',
  conan10: 'https://images6.alphacoders.com/135/1350892.jpg',
  ran:     'https://images4.alphacoders.com/134/1342918.jpg',
  heiji:   'https://images2.alphacoders.com/133/1334602.jpg',
  haibara: 'https://images3.alphacoders.com/134/1341756.jpg',
  kid:     'https://images6.alphacoders.com/133/1337892.jpg',
  org:     'https://images.alphacoders.com/134/1345102.jpg',
  group:   'https://images2.alphacoders.com/135/1351234.jpg',
  ep96:    'https://image.tmdb.org/t/p/w780/136XvDGQfZRIzjiabq4MlTUFFoT.jpg',
  etvHero: 'https://images.alphacoders.com/133/1332985.jpg',
  manga96: 'https://m.media-amazon.com/images/I/81LCAzGSjHL._SL1500_.jpg',
  photosig: 'https://photosignature.co.kr/data/editor/2603/1ff6d445377e69e9dc6d1566b7b91731_1774938341_7741.jpg',
  heroMovies:   'https://images.alphacoders.com/134/1348942.jpg',
  heroBrowse:   'https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABdg2SunlPrfFksa3DuKqZJdpFmQvOeBvVrSd1XCH7uiKwIHUSd0lTj0v2Z1Qgv7zFqQHqunt-iCb2_Lk9tqlKso2otxLX5WPiXKS.jpg',
  heroTVShows:  'https://images.justwatch.com/backdrop/341965565/s640/season-2.jpg',
  heroSpinoffs: 'https://cdn.animenewsnetwork.com/thumbnails/max650x650/cms/news.5/178127/conan-spinoffs.jpeg',
  heroManga:    'https://preview.redd.it/2016-was-a-great-year-for-detective-conans-manga-v0-hq8cenzuiodg1.jpeg',
  heroLangs:    'https://is1-ssl.mzstatic.com/image/thumb/oFKRXsuS0ySwLn1gh6rTkw/1200x675.jpg',
  heroMerch:    'https://i.postimg.cc/8N8S6MCw/DSC00664.webp',
};
const CONAN_IMG_LIST = [
  IMG.conan1, IMG.conan2, IMG.conan3, IMG.conan4, IMG.conan5,
  IMG.conan6, IMG.conan7, IMG.conan8, IMG.conan9, IMG.conan10,
  IMG.ran, IMG.heiji, IMG.haibara, IMG.kid, IMG.org, IMG.group
];
function getImg(i){ return CONAN_IMG_LIST[i % CONAN_IMG_LIST.length]; }

const PLAT_BG = {
  netflix:    'https://i.postimg.cc/kqnpLV3d/Screenshot-2026-04-23-141153.png',
  primevideo: 'https://i.postimg.cc/fZH4v7py/Detective-Conan-Anime-Times.png',
  appletv:    'https://i.postimg.cc/y7nj9nWr/Screenshot-2026-04-23-at-14-20-52-Case-Closed-(Detective-Conan)-Apple-TV.png',
  etvbalb:    'https://i.postimg.cc/vM8KNgwS/banner11685526182-SPONGEBOB-HEADER2-172f60.jpg',
  etvwin:     'https://i.postimg.cc/rcyHP02f/Screenshot-2026-04-23-at-14-17-28-ETV-WIN-Search-Results-ETV-WIN.png',
};

// Language flags/emojis
const LANG_FLAGS = {
  'Hindi':'🇮🇳','Tamil':'🏴','Telugu':'🏴','Malayalam':'🏴','Kannada':'🏴',
  'Bengali':'🏴','Marathi':'🏴','Gujarati':'🏴','Odia':'🏴','Punjabi':'🏴',
  'Assamese':'🏴','English':'🇬🇧','English*':'🇬🇧'
};
const LANG_NATIVE = {
  'Hindi':'हिन्दी','Tamil':'தமிழ்','Telugu':'తెలుగు','Malayalam':'മലയാളം',
  'Kannada':'ಕನ್ನಡ','Bengali':'বাংলা','Marathi':'मराठी','Gujarati':'ગુજરાતી',
  'Odia':'ଓଡ଼ିଆ','Punjabi':'ਪੰਜਾਬੀ','Assamese':'অসমীয়া','English':'English','English*':'English'
};

// Platform display names and colors
const PLAT_META = {
  netflix:    {name:'Netflix',    color:'#E50914', short:'N'},
  primevideo: {name:'Anime Times',color:'#1A98FF', short:'AT'},
  appletv:    {name:'Apple TV',   color:'#A2AAAD', short:'A'},
  etvbalb:    {name:'ETV Bal Bharat', color:'#FF6B00', short:'ETV'},
  etvwin:     {name:'ETV Win',        color:'#FF9500', short:'ETVw'},
};

const WATCH_PRIORITY = ['primevideo','netflix','appletv','etvwin','etvbalb'];

function getPlatformById(pid){
  return PLATFORMS.find(p=>p.id===pid) || null;
}

function getBestWatchUrlFromPlatformIds(platformIds){
  const ids = Array.isArray(platformIds) ? platformIds : [];
  if(!ids.length) return null;
  const ordered = [...WATCH_PRIORITY.filter(pid=>ids.includes(pid)), ...ids.filter(pid=>!WATCH_PRIORITY.includes(pid))];
  for(const pid of ordered){
    const p = getPlatformById(pid);
    if(p?.url) return p.url;
  }
  return null;
}

function openWatchUrl(url, fallbackMsg='No direct streaming website link is available yet for this item.'){
  if(url){
    window.open(url, '_blank', 'noopener');
    return;
  }
  window.alert(fallbackMsg);
}

function getMovieWatchUrl(movie){
  if(!movie) return null;
  if(movie.animetimes && movie.animetimesUrl) return movie.animetimesUrl;
  if(movie.netflix && movie.netflixUrl) return movie.netflixUrl;
  if(movie.etvwin) return PLATFORMS.find(p=>p.id==='etvwin')?.url||'https://www.etvwin.com';
  const pids = [];
  if(movie.animetimes) pids.push('primevideo');
  if(movie.netflix) pids.push('netflix');
  if(movie.etvwin) pids.push('etvwin');
  if(movie.etv) pids.push('etvbalb');
  return getBestWatchUrlFromPlatformIds(pids);
}

function getSeasonWatchUrl(season){
  if(!season) return null;
  return getBestWatchUrlFromPlatformIds(season.platforms || []);
}

function getEpisodeWatchUrl(ep){
  if(!ep) return null;
  const pids = [];
  PLATFORMS.forEach(p=>{
    let hasEpisode = false;
    if(Array.isArray(p.seriesSeasons) && p.seriesSeasons.includes(ep.season)) hasEpisode = true;
    if(Array.isArray(p.seriesRange) && typeof ep.n === 'number'){
      const [a,b] = p.seriesRange;
      if(ep.n >= a && ep.n <= b) hasEpisode = true;
    }
    if(p.id === 'etvbalb' && !ep.etv) hasEpisode = false;
    if(hasEpisode) pids.push(p.id);
  });
  return getBestWatchUrlFromPlatformIds(pids);
}

function goToMovieWatch(mid){
  const m = MOVIES.find(x=>x.id===mid);
  openWatchUrl(getMovieWatchUrl(m), 'No direct streaming website is available yet for this movie in India.');
}

function goToSeasonWatch(sid){
  const s = SEASONS.find(x=>x.id===sid);
  openWatchUrl(getSeasonWatchUrl(s), 'No direct streaming website is available yet for this season in India.');
}

function goToEpisodeWatch(epNum){
  const ep = (typeof EPISODES!=='undefined' ? EPISODES : []).find(e=>e.n===Number(epNum));
  openWatchUrl(getEpisodeWatchUrl(ep), 'No direct streaming website is available yet for this episode in India.');
}

// ─── PLATFORM LOGOS (actual image assets) ─────────────
const PLATFORM_LOGOS = {
  netflix: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  primevideo: 'https://m.media-amazon.com/images/G/01/digital/video/merch/subs/benefit-id/a-f/animetimesin/logos/3p-logo._CB787992367_.png',
  appletv: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg',
  etvbalb: 'https://assets.etvbalbharat.com/languageimages/ETV_ENGLISH.png',
  etvwin: 'https://old.etvwin.com/images/etv-logo-new.png',
};

const PROVIDER_META = {
  'Airtel Digital TV': { logo:'https://upload.wikimedia.org/wikipedia/en/4/4d/Airtel_digitalTV.png',      bg:'#E40000' },
  'Tata Play':         { logo:'https://upload.wikimedia.org/wikipedia/commons/2/29/Tata_Play_2022_logo.svg', bg:'#2C1654' },
  'Dish TV':           { logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Dish_TV_Logo.svg/1280px-Dish_TV_Logo.svg.png', bg:'#E87722' },
  'd2h':               { logo:'https://upload.wikimedia.org/wikipedia/commons/f/f4/D2h_logo_Brand.png',      bg:'#6B2D8B' },
  'Sun Direct':        { logo:'https://www.google.com/s2/favicons?domain=sundirect.in&sz=128',               bg:'#FF6600' },
  'NXT Digital':       { logo:'https://nxtdigital.in/static/img/NXT_Digital_logo.png',                       bg:'#003087' },
};

function getPlatformLogoMarkup(p){
  const logoUrl = PLATFORM_LOGOS[p.id];
  if(logoUrl){
    const extraClass = p.id === 'appletv' ? ' logo-appletv' : '';
    return `<img class="plat-logo-img${extraClass}" src="${logoUrl}" alt="${p.name} logo" loading="lazy" decoding="async">`;
  }
  return `<span style="font-size:22px;font-weight:900;color:${p.color}">${p.name}</span>`;
}

function getPlatformHeroLogoMarkup(p){
  const logoUrl = PLATFORM_LOGOS[p.id];
  if(logoUrl){
    const extraClass = p.id === 'appletv' ? ' logo-appletv' : '';
    return `<img class="plat-logo-img plat-logo-hero${extraClass}" src="${logoUrl}" alt="${p.name} logo" loading="lazy" decoding="async">`;
  }
  return `<span style="font-family:var(--font-display);font-size:52px;color:${p.color}">${p.name}</span>`;
}

// ─── TMDB POSTER SYSTEM ──────────────────────────────
const TMDB_KEY = 'fe92cb30660fb8e7aab54dc2cfb699eb'; // v3 API key — no CORS preflight
const _isMobileSmall = window.matchMedia('(max-width:480px)').matches;
const TMDB_IMG   = _isMobileSmall ? 'https://image.tmdb.org/t/p/w185' : 'https://image.tmdb.org/t/p/w342';
const TMDB_TV_ID = 30983; // Detective Conan
const TMDB_STILL = _isMobileSmall ? 'https://image.tmdb.org/t/p/w500' : 'https://image.tmdb.org/t/p/w780';
window.MOVIE_POSTERS = new Map();
window.SPINOFF_POSTERS = new Map();
window.PVR_SPECIAL_POSTERS = new Map(); // key: pvr event id => TMDB poster url
window.EPISODE_META = new Map();   // key: local episode number => tmdb metadata
window.SEASON_STILLS = new Map();  // key: local season id (S1...) => representative still

function getMoviePoster(m, fallbackIdx){
  const cached = window.MOVIE_POSTERS.get(m.id);
  if(cached) return cached;
  return getImg(fallbackIdx !== undefined ? fallbackIdx : m.n);
}

function getPVREventPoster(ev, fallbackIdx){
  if(ev.poster) return ev.poster; // hardcoded (e.g. JFF)
  if(ev.movieId){
    const m = (typeof MOVIES!=='undefined'?MOVIES:[]).find(x=>x.id===ev.movieId);
    if(m) return getMoviePoster(m, fallbackIdx);
  }
  if(ev.tmdb){
    const cached = window.PVR_SPECIAL_POSTERS.get(ev.id);
    if(cached) return cached;
  }
  return getImg(fallbackIdx !== undefined ? fallbackIdx : 0);
}

function getSpinoffPoster(sp, fallbackIdx){
  if(!sp) return getImg(fallbackIdx || 0);
  const cached = window.SPINOFF_POSTERS.get(sp.id);
  if(cached) return cached;
  return getImg(fallbackIdx !== undefined ? fallbackIdx : 0);
}

function normalizeTitle(t=''){
  return String(t).toLowerCase()
    .replace(/[★☆]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getEpisodeMeta(ep){
  if(!ep || typeof ep.n !== 'number') return null;
  return window.EPISODE_META.get(ep.n) || null;
}

function getEpisodeStill(ep, fallbackIdx=0){
  return getEpisodeMeta(ep)?.still || getImg(fallbackIdx);
}

function getSeasonStillByLocalSeasonId(sid, fallbackIdx=0){
  return window.SEASON_STILLS.get(sid) || getImg(fallbackIdx);
}

async function fetchTMDBPosters(){
  const CACHE_KEY = 'tmdb_posters_v1';
  const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if(cached && (Date.now() - cached.ts) < CACHE_TTL){
      cached.data.forEach(([id, url]) => window.MOVIE_POSTERS.set(id, url));
      refreshMoviePosters();
      return;
    }
  } catch(_){}
  const movies = (typeof MOVIES !== 'undefined' ? MOVIES : []).filter(m => m.tmdb);
  await Promise.allSettled(movies.map(async m => {
    try {
      const r = await fetch(
        `https://api.themoviedb.org/3/movie/${m.tmdb}?api_key=${TMDB_KEY}&language=en-US`
      );
      if(!r.ok) return;
      const j = await r.json();
      if(j.poster_path){
        window.MOVIE_POSTERS.set(m.id, TMDB_IMG + j.poster_path);
      }
    } catch(_e){}
  }));
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ts: Date.now(), data: [...window.MOVIE_POSTERS]}));
  } catch(_){}
  refreshMoviePosters();
}

async function fetchTMDBPVRSpecialPosters(){
  const events = (typeof PVR_EVENTS!=='undefined'?PVR_EVENTS:[]).filter(ev=>ev.tmdb&&!ev.movieId);
  if(!events.length) return;
  await Promise.allSettled(events.map(async ev=>{
    try{
      const r = await fetch(`https://api.themoviedb.org/3/movie/${ev.tmdb}?api_key=${TMDB_KEY}&language=en-US`);
      if(!r.ok) return;
      const j = await r.json();
      if(j.poster_path) window.PVR_SPECIAL_POSTERS.set(ev.id, TMDB_IMG+j.poster_path);
    }catch(_){}
  }));
  // Patch any visible pvr-card elements
  document.querySelectorAll('[data-pvr-id]').forEach(el=>{
    const ev=(typeof PVR_EVENTS!=='undefined'?PVR_EVENTS:[]).find(x=>x.id===el.dataset.pvrId);
    if(!ev||!ev.tmdb) return;
    const url=window.PVR_SPECIAL_POSTERS.get(ev.id);
    if(url){
      const bg=el.querySelector('.pvr-card-bg');
      if(bg) bg.style.backgroundImage=`url('${url}')`;
    }
  });
}

async function fetchTMDBSpinoffPosters(){
  const spinoffs = (typeof SPINOFFS !== 'undefined' ? SPINOFFS : []);
  if(!spinoffs.length) return;
  await Promise.allSettled(spinoffs.map(async sp=>{
    try{
      const q = encodeURIComponent(sp.title);
      const r = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${TMDB_KEY}&language=en-US&query=${q}&first_air_date_year=${sp.year}`);
      if(!r.ok) return;
      const j = await r.json();
      const results = Array.isArray(j.results) ? j.results : [];
      const match = results.find(x=>x.poster_path) || results[0];
      if(match?.poster_path){
        window.SPINOFF_POSTERS.set(sp.id, TMDB_IMG + match.poster_path);
      }
    }catch(_err){
      // best-effort; leave fallback image in place
    }
  }));
  refreshSpinoffPosters();
}

function refreshSpinoffPosters(){
  document.querySelectorAll('[data-spinoff-id]').forEach(el=>{
    const sid = el.dataset.spinoffId;
    const sp = (typeof SPINOFFS!=='undefined' ? SPINOFFS : []).find(x=>x.id===sid);
    if(!sp) return;
    const url = getSpinoffPoster(sp, 0);
    const img = el.querySelector('.browse-card-img,.content-card-bg,.spinoff-bg,.sbc-img');
    if(img) img.style.backgroundImage = `url('${url}')`;
  });
}

function refreshMoviePosters(){
  document.querySelectorAll('[data-movie-id]').forEach(el => {
    const mid = el.dataset.movieId;
    const url = window.MOVIE_POSTERS.get(mid);
    if(!url) return;
    // patch whatever image container is inside
    const img = el.querySelector('.browse-card-img,.content-card-bg,.mbc-img,.movie-big-card-img,.mrc-poster,.mbc-poster,.pvr-card-bg');
    if(img) img.style.backgroundImage = `url('${url}')`;
  });
}

async function fetchTMDBEpisodeMeta(){
  if(typeof EPISODES === 'undefined' || !Array.isArray(EPISODES) || !EPISODES.length) return;

  const bySeason = new Map();
  EPISODES.filter(e=>typeof e.n==='number' && e.season).forEach(e=>{
    if(!bySeason.has(e.season)) bySeason.set(e.season, []);
    bySeason.get(e.season).push(e);
  });
  bySeason.forEach(list=>list.sort((a,b)=>a.n-b.n));

  try{
    // TMDB keeps Conan episodes in season 1; map to local episode numbers.
    const r = await fetch(`https://api.themoviedb.org/3/tv/${TMDB_TV_ID}/season/1?api_key=${TMDB_KEY}&language=en-US`);
    if(!r.ok) return;
    const j = await r.json();
    const tmdbEpisodes = Array.isArray(j.episodes) ? j.episodes : [];
    if(!tmdbEpisodes.length) return;

    const tmdbByEpisodeNo = new Map();
    tmdbEpisodes.forEach(te=>{
      if(typeof te.episode_number==='number') tmdbByEpisodeNo.set(te.episode_number, te);
    });
    const tmdbUnused = new Set(tmdbEpisodes.map((_,i)=>i));

    // Priority 1: direct absolute-number mapping (local n -> TMDB S1 episode_number)
    EPISODES.filter(e=>typeof e.n==='number').forEach(le=>{
      const te = tmdbByEpisodeNo.get(le.n);
      if(!te) return;
      const idx = tmdbEpisodes.indexOf(te);
      if(idx>=0) tmdbUnused.delete(idx);
      window.EPISODE_META.set(le.n, {
        still: te.still_path ? (TMDB_STILL + te.still_path) : null,
        overview: te.overview || '',
        name: te.name || '',
        tmdbSeason: 1,
        tmdbEpisode: te.episode_number
      });
    });

    // Priority 2: air date match for any leftovers
    EPISODES.filter(e=>typeof e.n==='number' && !window.EPISODE_META.has(e.n)).forEach(le=>{
      if(!le.aired) return;
      let matchIdx = -1;
      for(const i of tmdbUnused){
        if(tmdbEpisodes[i]?.air_date === le.aired){ matchIdx = i; break; }
      }
      if(matchIdx < 0) return;
      const te = tmdbEpisodes[matchIdx];
      tmdbUnused.delete(matchIdx);
      window.EPISODE_META.set(le.n, {
        still: te.still_path ? (TMDB_STILL + te.still_path) : null,
        overview: te.overview || '',
        name: te.name || '',
        tmdbSeason: 1,
        tmdbEpisode: te.episode_number
      });
    });

    // Priority 3: title match fallback
    EPISODES.filter(e=>typeof e.n==='number' && !window.EPISODE_META.has(e.n)).forEach(le=>{
      const lt = normalizeTitle(le.title);
      if(!lt) return;
      let matchIdx = -1;
      for(const i of tmdbUnused){
        const tt = normalizeTitle(tmdbEpisodes[i]?.name || '');
        if(tt && (tt===lt || tt.includes(lt) || lt.includes(tt))){
          matchIdx = i;
          break;
        }
      }
      if(matchIdx < 0) return;
      const te = tmdbEpisodes[matchIdx];
      tmdbUnused.delete(matchIdx);
      window.EPISODE_META.set(le.n, {
        still: te.still_path ? (TMDB_STILL + te.still_path) : null,
        overview: te.overview || '',
        name: te.name || '',
        tmdbSeason: 1,
        tmdbEpisode: te.episode_number
      });
    });
  }catch(_e){}

  bySeason.forEach((localList,sid)=>{
    const firstWithStill = localList.find(le => window.EPISODE_META.get(le.n)?.still);
    if(firstWithStill){
      window.SEASON_STILLS.set(sid, window.EPISODE_META.get(firstWithStill.n).still);
    }
  });

  refreshEpisodeSeasonVisuals();
}

function refreshEpisodeSeasonVisuals(){
  document.querySelectorAll('[data-season-id]').forEach(el=>{
    const sid = el.dataset.seasonId;
    if(!sid) return;
    const url = getSeasonStillByLocalSeasonId(sid, 0);
    const bg = el.querySelector('.season-card-bg,.browse-card-img,.content-card-bg,.lm-season-bg');
    if(bg) bg.style.backgroundImage = `url('${url}')`;
  });

  document.querySelectorAll('[data-ep-num]').forEach(el=>{
    const n = Number(el.dataset.epNum);
    if(!n) return;
    const ep = (typeof EPISODES!=='undefined'?EPISODES:[]).find(x=>x.n===n);
    if(!ep) return;
    const thumb = el.querySelector('.modal-ep-thumb');
    if(thumb) thumb.style.backgroundImage = `url('${getEpisodeStill(ep,n+1)}')`;
  });
}

// ─── MANGA COVER SYSTEM ──────────────────────────────
window.MANGA_COVERS = new Map();
window.MANGA_COVERS.set(96, IMG.manga96);

function getMangaCover(vol){
  const n = Number(vol);
  if(window.MANGA_COVERS.has(n)) return window.MANGA_COVERS.get(n);
  return getImg(n);
}

async function fetchMangaCovers(){
  if(typeof MANGA_ISBNS === 'undefined') return;
  const entries = Object.entries(MANGA_ISBNS);
  // Open Library Covers API — no key, no rate limits
  // Returns a cover image directly by ISBN; -L.jpg = large, -M.jpg = medium
  await Promise.allSettled(entries.map(async ([vol, isbn]) => {
    try {
      const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;
      const r = await fetch(url, { method: 'HEAD' });
      if(r.ok && r.headers.get('content-type')?.startsWith('image')){
        window.MANGA_COVERS.set(Number(vol), `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);
      }
    } catch(e){}
  }));
  refreshMangaCovers();
}

function refreshMangaCovers(){
  document.querySelectorAll('[data-manga-vol]').forEach(el => {
    const vol = Number(el.dataset.mangaVol);
    const url = window.MANGA_COVERS.get(vol);
    if(!url) return;
    const img = el.querySelector('.manga-vol-img');
    if(img) img.style.backgroundImage = `url('${url}')`;
  });
}

// ─── CURSOR ──────────────────────────────────────────
const cursor     = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
const _isTouch   = window.matchMedia('(hover:none)').matches;
if(!_isTouch){
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cursor.style.left=mx+'px';cursor.style.top=my+'px';
  });
  (function animRing(){
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    cursorRing.style.left=rx+'px';cursorRing.style.top=ry+'px';
    requestAnimationFrame(animRing);
  })();
}
function addHover(el){
  el.addEventListener('mouseenter',()=>cursor.classList.add('hovering'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('hovering'));
}
function refreshHover(){
  if(_isTouch) return;
  document.querySelectorAll('a,button,[onclick],[data-nav],'+
    '.plat-card,.browse-card,.season-card,.content-card,'+
    '.spinoff-card,.pvr-card,.latest-cinematic-card,.archive-block-header,'+
    '.manga-feature-card,.merch-main-card,.merch-info-block,.pp-hero-back,.pp-tab,.filter-pill,.lang-big-pill,.movie-big-card'
  ).forEach(addHover);
}

// ─── NAV SCROLL STATE ────────────────────────────────
const nav = document.getElementById('nav');
let lastScroll=0;
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  nav.classList.toggle('scrolled',y>40);
  if(y>lastScroll&&y>80) nav.classList.add('nav-hidden');
  else nav.classList.remove('nav-hidden');
  lastScroll=y;
},{passive:true});
// ─── THEME ───────────────────────────────────────────

// ─── INTERSECTION OBSERVER ───────────────────────────
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.06});
const REVEAL_SEL='.reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-blur,.stagger';
function observeAll(){
document.querySelectorAll(REVEAL_SEL).forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight*0.96)el.classList.add('visible');
  });
  // auto stagger delays for siblings
  document.querySelectorAll('.stagger').forEach(el=>{
    const siblings=[...el.parentElement.children].filter(c=>c.classList.contains('stagger'));
    const i=siblings.indexOf(el);
    if(i>0)el.style.transitionDelay=(i*0.07)+'s';
  });
}
window.addEventListener('scroll',()=>{
  document.querySelectorAll(REVEAL_SEL).forEach(el=>{
    if(!el.classList.contains('visible')&&el.getBoundingClientRect().top<window.innerHeight*1.12)
      el.classList.add('visible');
  });
},{passive:true});

// ─── ROUTER ──────────────────────────────────────────
const app = document.getElementById('app');
const Router = {
  currentRoute: null,
  navigate(path){
    window.location.hash = path;
  },
  resolve(){
    const hash = decodeURIComponent(window.location.hash.slice(1)) || '/';
    this.currentRoute = hash;
    if(hash === '/' || hash === ''){
      renderHome();
	} else if(hash.startsWith('/platform/')){
      const id = hash.split('/platform/')[1];
      renderPlatformPage(id);
    } else if(hash === '/movies'){
      renderMoviesPage();
    } else if(hash === '/tvshows'){
      renderTVShowsPage();
    } else if(hash === '/spinoffs'){
      renderSpinoffsPage();
    } else if(hash === '/events'){
      renderEventsPage();
    } else if(hash === '/manga'){
      renderMangaPage();
    } else if(hash === '/browse'){
      renderBrowsePage();
    } else if(hash === '/languages'){
      renderLanguagesPage();
    } else if(hash === '/merch'){
      renderMerchPage();
    } else if(hash === '/advocacy'){
      renderAdvocacyPage();
    } else if(hash === '/archive'){
      renderHome();
      setTimeout(()=>scrollToSection('archive'),400);
    } else {
      renderHome();
    }
    syncMobileContextUI(this.currentRoute);
  }
};

window.addEventListener('hashchange',()=>Router.resolve());

// ─── NAV LINKS ───────────────────────────────────────
document.getElementById('nav-logo').addEventListener('click',()=>{
  if(Router.currentRoute === '/') window.scrollTo({top:0,behavior:'smooth'});
  else Router.navigate('/');
});

const NAV_ROUTES = new Set(['movies','tvshows','spinoffs','events','manga','languages','browse','merch','archive','advocacy']);
function closeDrawer(){
  document.getElementById('navHamburger').classList.remove('open');
  document.getElementById('navDrawer').classList.remove('open');
  document.body.style.overflow='';
}
function setupNavLinks(){
  document.querySelectorAll('[data-nav]').forEach(el=>{
    el.onclick = ()=>{
      const target = el.dataset.nav;
      if(NAV_ROUTES.has(target)){
        Router.navigate('/'+target);
      } else if(Router.currentRoute !== '/'){
        Router.navigate('/');
        setTimeout(()=>scrollToSection(target),400);
      } else {
        scrollToSection(target);
      }
      closeDrawer();
    };
  });
}

function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
}

// ─── HAMBURGER + MORE BTN ────────────────────────────
const hamburger = document.getElementById('navHamburger');
const navDrawer = document.getElementById('navDrawer');
function toggleDrawer(open){
  navDrawer.classList.toggle('open',open);
  const moreBtn=document.getElementById('navMoreBtn');
  if(moreBtn) moreBtn.classList.toggle('active',open);
}
hamburger.addEventListener('click',()=>{
  const open=hamburger.classList.toggle('open');
  toggleDrawer(open);
});
const navMoreBtn=document.getElementById('navMoreBtn');
if(navMoreBtn){
  navMoreBtn.addEventListener('click',e=>{
    e.stopPropagation();
    const open=!navDrawer.classList.contains('open');
    hamburger.classList.toggle('open',open);
    toggleDrawer(open);
  });
}
document.addEventListener('click',e=>{
  if(navDrawer.classList.contains('open')&&!navDrawer.contains(e.target)&&!e.target.closest('#nav')){
    hamburger.classList.remove('open');
    toggleDrawer(false);
  }
});
window.addEventListener('scroll',()=>{
  if(navDrawer.classList.contains('open')){
    hamburger.classList.remove('open');navDrawer.classList.remove('open');
    document.body.style.overflow='';
  }
},{passive:true});

// ─── FILTER STATE ────────────────────────────────────
const filterState = {type:'all', platform:'all', language:'all'};

function getMovieLangs(m){
  const langs = new Set();
  if(m.netflix||m.animetimes) langs.add('English Sub');
  if(m.animetimes) langs.add('Hindi');
  if(m.etv||m.etvwin){
    ['Hindi','Tamil','Telugu','Malayalam','Kannada','Bengali','Marathi','Gujarati','Odia','Punjabi','Assamese'].forEach(l=>langs.add(l));
  }
  return langs;
}
function getSeasonLangs(s){
  const langs = new Set();
  const pids = s.platforms||[];
  if(pids.some(p=>['netflix','primevideo','appletv'].includes(p))) langs.add('English Sub');
  if(pids.includes('primevideo')||pids.includes('appletv')) langs.add('Hindi');
  if(pids.includes('etvbalb')){
    ['Hindi','Tamil','Telugu','Malayalam','Kannada','Bengali','Marathi','Gujarati','Odia','Punjabi','Assamese'].forEach(l=>langs.add(l));
  }
  return langs;
}
function getMoviePlatforms(m){
  const p=[];
  if(m.netflix) p.push('netflix');
  if(m.animetimes) p.push('primevideo');
  if(m.animetimes) p.push('appletv');
  if(m.etv) p.push('etvbalb');
  if(m.etvwin) p.push('etvwin');
  return p;
}

function itemMatchesFilter(item, type){
  const {type:ft, platform:fp, language:fl} = filterState;
  if(ft!=='all' && ft!==type) return false;
  if(fp!=='all'){
    if(type==='movie'){
      const platIds=getMoviePlatforms(item);
      if(!platIds.includes(fp)) return false;
    } else if(type==='season'){
      if(!(item.platforms||[]).includes(fp)) return false;
    } else if(type==='spinoff'){
      if(fp!=='netflix') return false;
    }
  }
  if(fl!=='all'){
    let langs;
    if(type==='movie') langs=getMovieLangs(item);
    else if(type==='season') langs=getSeasonLangs(item);
    else if(type==='spinoff') langs=new Set(['English Sub','Hindi','English']);
    if(!langs.has(fl)) return false;
  }
  return true;
}

// ─── RENDER HOME ─────────────────────────────────────
function renderHome(){
  app.innerHTML='';
  const home = document.createElement('div');
  home.id='home-page';
  home.className='page-enter';
  home.innerHTML=`
    <!-- HERO -->
    <section id="hero">
      <div class="hero-carousel" id="heroCarousel"></div>
      <div class="hero-slide-fade"></div>
      <div class="hero-carousel-nav">
        <button class="carousel-btn carousel-prev" id="carouselPrev">‹</button>
        <div class="carousel-dots" id="carouselDots"></div>
        <button class="carousel-btn carousel-next" id="carouselNext">›</button>
      </div>
      <div class="hero-stats-bar">
        <div class="stat"><span class="stat-n">6</span><span class="stat-l">Platforms</span></div>
        <div class="stat-div"></div>
        <div class="stat"><span class="stat-n">30</span><span class="stat-l">Movies</span></div>
        <div class="stat-div"></div>
        <div class="stat"><span class="stat-n">${(()=>{const maxEp=PLATFORMS.filter(p=>p.seriesRange).reduce((m,p)=>Math.max(m,p.seriesRange[1]),0);return maxEp>0?maxEp+'<small>+</small>':'1000<small>+</small>'})()}</span><span class="stat-l">Episodes</span></div>
        <div class="stat-div"></div>
        <div class="stat"><span class="stat-n">12</span><span class="stat-l">Dub Languages</span></div>
      </div>
    </section>

    <!-- PLATFORMS -->
    <section id="platforms">
      <div class="section-max">
		<div class="section-eyebrow reveal-blur">Step 1</div>
        <h2 class="section-title reveal-left">Choose Your <em>Platform</em></h2>
        <p class="section-sub">Click any card to explore its catalog.</p>
        <div class="platforms-row-wrap reveal">
          <button class="platform-scroll-btn platform-scroll-btn--left" id="platform-scroll-left" aria-label="Scroll platforms left">‹</button>
          <div class="platforms-grid" id="platforms-grid"></div>
          <button class="platform-scroll-btn platform-scroll-btn--right" id="platform-scroll-right" aria-label="Scroll platforms right">›</button>
        </div>
      </div>
    </section>

    <!-- LATEST -->
    <section id="latest">
      <div class="section-max">
        <div class="section-eyebrow">🆕 Latest Addition</div>
        <div class="latest-cinematic-card reveal" onclick="Router.navigate('/platform/primevideo')">
          <div class="lcc-img" style="background-image:url('${IMG.ep96}')"></div>
          <div class="lcc-overlay"></div>
          <div class="lcc-content">
            <span class="lcc-platform-badge">Anime Times · Prime Video &amp; Apple TV</span>
            <div class="lcc-ep-num">97</div>
            <h2 class="lcc-title">Hindi Dub Reaches<br>Episode 97</h2>
            <p class="lcc-desc">Episodes 1–97 are now available in Hindi dub via Anime Times on Amazon Prime Video and Apple TV — the first dedicated Hindi dub streaming for Conan fans in India.</p>
            <div class="lcc-tags">
              <span class="ltag">Ep 1–97</span>
              <span class="ltag">Hindi Dub</span>
              <span class="ltag">Eng Subs</span>
              <span class="ltag">Free with Prime</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LANGUAGES -->
    <section id="languages">
      <div class="section-max">
        <h2 class="section-title reveal-right"><em>Watch</em> In Your Language</h2>
        <p class="section-sub">12 dub languages + English subtitles across streaming and TV.</p>
        <div class="lang-section-grid reveal" id="lang-section-grid"></div>
      </div>
    </section>

    <!-- TV SERIES -->
    <section id="series">
      <div class="section-max">
        <div class="section-eyebrow">TV Series</div>
        <div class="section-title-row">
          <h2 class="section-title">All <em>${SEASONS.length} Seasons</em></h2>
          <button class="section-view-all" onclick="Router.navigate('/tvshows')">View All →</button>
        </div>
        <p class="section-sub">Click any season for availability details.</p>
        <div class="scroll-row stagger" id="seasons-all"></div>
      </div>
    </section>

    <!-- MOVIES -->
    <section id="movies">
      <div class="section-max">
        <div class="section-eyebrow">Films</div>
        <div class="section-title-row">
          <h2 class="section-title">All <em>30 Movies</em></h2>
          <button class="section-view-all" onclick="Router.navigate('/movies')">View All →</button>
        </div>
        <p class="section-sub">Every film — click for India availability.</p>
        <div class="scroll-row stagger" id="movies-row"></div>
      </div>
    </section>

    <!-- MANGA -->
    <section id="manga">
      <div class="section-max">
        <div class="section-eyebrow">Read the Original</div>
        <div class="section-title-row">
          <h2 class="section-title">The <em>Manga</em></h2>
          <button class="section-view-all" onclick="Router.navigate('/manga')">View All Volumes →</button>
        </div>
        <div class="manga-teaser reveal" onclick="Router.navigate('/manga')" style="cursor:pointer">
          <div class="manga-teaser-img" style="background-image:url('${IMG.manga96}')"></div>
          <div class="manga-teaser-body">
            <div class="manga-teaser-label">Case Closed · Viz Media · 96+ Volumes</div>
            <div class="manga-teaser-title">Volume 96 <em>available now</em></div>
            <p class="manga-teaser-desc">The original manga by Gosho Aoyama — over 100 volumes and still ongoing. English editions available on Amazon India and BookWagon.</p>
            <div class="manga-teaser-btns">
              <a href="https://www.amazon.in/s?k=case+closed+manga+viz+media" target="_blank" rel="noopener" class="manga-feature-btn" style="font-size:12px;padding:10px 20px">Amazon India ↗</a>
              <button class="section-view-all" onclick="Router.navigate('/manga')" style="border-radius:100px;padding:10px 20px">All Volumes →</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MERCH -->
    <section id="merch" style="background:var(--surface);">
      <div class="section-max">
        <div class="section-eyebrow">Fan Experience · India</div>
        <div class="section-title-row">
          <h2 class="section-title">Photo Signature <em>× Conan</em></h2>
        </div>
        <div class="merch-main-card merch-main-card--teaser reveal">
          <div class="merch-card-img" style="background-image:url('${IMG.photosig}')"><div class="merch-card-img-overlay"></div></div>
          <div class="merch-card-body">
            <span class="merch-card-tag">Korean Selfie Booth · Official Detective Conan Collab</span>
            <h3 class="merch-card-title">Photo Signature</h3>
            <p class="merch-card-desc">Official Detective Conan-themed selfie booth collab in India with themed frames and collectible prints.</p>
            <div class="merch-detail-row"><strong>📍</strong><span>Grand Venice Mall, Greater Noida</span></div>
            <div class="merch-btns">
              <button class="merch-btn" onclick="Router.navigate('/merch')">Events &amp; Merch →</button>
              <a class="merch-btn merch-btn-outline" href="https://www.instagram.com/photosignature.india/" target="_blank" rel="noopener">📷 Instagram ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SPINOFFS -->
    <section id="spinoffs">
      <div class="section-max">
        <div class="section-eyebrow">Spinoff Series</div>
        <div class="section-title-row">
          <h2 class="section-title">Beyond <em>Conan</em></h2>
          <button class="section-view-all" onclick="Router.navigate('/spinoffs')">View All →</button>
        </div>
        <div class="spinoff-grid stagger" id="spinoffs-grid"></div>
      </div>
    </section>


    <!-- BROWSE / FILTER -->
    <section id="browse" style="background:var(--surface);">
      <div class="section-max">
        <div class="browse-heading-row">
          <h2 class="section-title">Filter <em>All Content</em></h2>
          <button class="browse-collapse-btn" id="browseCollapseBtn" onclick="toggleBrowseSection()">
            <span id="browseCollapseBtnLabel">Show</span>
            <svg id="browseCollapseChevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
        <div class="browse-collapsible" id="browseCollapsible">
          <div class="filter-bar filter-bar--inline reveal" id="filter-bar"></div>
          <div class="filter-count" id="filter-count"></div>
          <div class="browse-grid" id="browse-grid"></div>
        </div>
      </div>
    </section>

    <!-- ARCHIVE -->
    <section id="archive">
      <div class="section-max">
        <div class="section-eyebrow">📦 Archive</div>
        <h2 class="section-title">Past Events & <em>Screenings</em></h2>
        <p class="section-sub">Past screenings and broadcasts in India.</p>
        <div class="archive-block reveal">
          <div class="archive-block-header" onclick="toggleArchive('pvr-archive')">
            <div><div class="archive-block-title">🎬 PVR Cinemas — Theatrical Screenings</div><div class="archive-block-sub">Detective Conan films that screened at Indian multiplex cinemas</div></div>
            <div class="archive-chevron" id="pvr-archive-chevron">›</div>
          </div>
          <div class="archive-block-body" id="pvr-archive">
            <div class="pvr-cards-grid" id="pvr-cards-grid"></div>
          </div>
        </div>
        <div class="archive-block reveal">
          <div class="archive-block-header" onclick="toggleArchive('etv-movies-archive')">
            <div><div class="archive-block-title">📺 ETV Bal Bharat — Movies That Have Aired</div><div class="archive-block-sub">Conan films broadcast on ETV Bal Bharat in regional language dubs</div></div>
            <div class="archive-chevron" id="etv-movies-archive-chevron">›</div>
          </div>
          <div class="archive-block-body" id="etv-movies-archive">
            <div class="pvr-cards-grid" id="etv-archive-cards-grid"></div>
          </div>
        </div>
      </div>
    </section>

    ${renderFooterHTML()}
  `;
  app.appendChild(home);

  // Boot all home page components
  initHeroCarousel();
  renderPlatformCards();
  renderLanguageSection();
  renderSeasonCards();
  renderMoviesRow();
  renderBrowseSection();
  renderSpinoffs();
  renderPVRArchive();
  renderETVArchive();
  // Drag-to-scroll on all scroll rows
  document.querySelectorAll('.scroll-row,.platforms-grid,.lang-one-row').forEach(addDragScroll);

  setTimeout(()=>{observeAll();refreshHover();},80);
}

// ─── HERO CAROUSEL ───────────────────────────────────
function initHeroCarousel(){
  const heroCarousel=document.getElementById('heroCarousel');
  const dotsEl=document.getElementById('carouselDots');
  if(!heroCarousel)return;
  let currentSlide=0,carouselTimer;

  HERO_SLIDES.forEach((slide,i)=>{
    const el=document.createElement('div');
    el.className='hero-slide'+(i===0?' active slide-reset':'');
    el.innerHTML=`
      ${slide.imgMode==='contain-right'
        ?`<div class="hero-slide-bg" style="background-image:url('${slide.img}');background-color:${slide.bgColor};background-size:cover;background-position:center center"></div>
      <img class="hero-slide-img-right" src="${slide.img}" alt="" draggable="false" decoding="async" ${i===0?'fetchpriority="high"':'loading="lazy"'}>
      <div class="hero-slide-img-right-grad"></div>`
        :`<div class="hero-slide-bg" style="background-image:url('${slide.img}');background-color:${slide.bgColor};background-position:${slide.bgPosition||'center 20%'};background-size:cover"></div>`}
      <div class="hero-slide-content">
        <div class="hero-tag" style="--accent:${slide.accent};color:${slide.accent};border-color:${slide.accent}">
          <span class="hero-emoji">${slide.emoji}</span>${slide.tag}
        </div>
        <div class="hero-title">${slide.title}</div>
        <div class="hero-subtitle" style="color:${slide.accent}">${slide.subtitle}</div>
        <p class="hero-desc">${slide.desc}</p>
        <button class="hero-cta" style="background:${slide.accent}" onclick="${slide.ctaAction}">
          ${slide.ctaLabel}
        </button>
      </div>`;
    heroCarousel.appendChild(el);

    const dot=document.createElement('div');
    dot.className='cdot'+(i===0?' active':'');
    dot.onclick=()=>goTo(i);
    dotsEl.appendChild(dot);
  });

  // Trigger entrance animation on slide 0 after first paint
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      const first=heroCarousel.querySelector('.hero-slide');
      if(first){first.classList.remove('slide-reset');}
    });
  });

  function goTo(n){
    const slides=heroCarousel.querySelectorAll('.hero-slide');
    const dots=dotsEl.querySelectorAll('.cdot');
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide=(n+slides.length)%slides.length;
    // Reset the incoming slide so content re-animates from start state
    const next=slides[currentSlide];
    next.classList.add('slide-reset');
    void next.offsetWidth; // force reflow
    next.classList.remove('slide-reset');
    next.classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  function start(){carouselTimer=setInterval(()=>goTo(currentSlide+1),5500);}
  function stop(){clearInterval(carouselTimer);}
  document.getElementById('carouselNext').onclick=()=>{stop();goTo(currentSlide+1);start();};
  document.getElementById('carouselPrev').onclick=()=>{stop();goTo(currentSlide-1);start();};

  // Touch swipe support
  let touchStartX=0,touchStartY=0;
  heroCarousel.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX;touchStartY=e.touches[0].clientY;},{passive:true});
  heroCarousel.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-touchStartX;
    const dy=e.changedTouches[0].clientY-touchStartY;
    if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>40){
      stop();
      goTo(currentSlide+(dx<0?1:-1));
      start();
    }
  },{passive:true});

  // Mouse drag support for PC
  let dragStartX=0,dragging=false,dragMoved=false;
  heroCarousel.addEventListener('mousedown',e=>{
    if(e.button!==0)return;
    dragStartX=e.clientX;dragging=true;dragMoved=false;
    heroCarousel.style.cursor='grabbing';
    heroCarousel.style.userSelect='none';
  });
  window.addEventListener('mousemove',e=>{
    if(!dragging)return;
    if(Math.abs(e.clientX-dragStartX)>6)dragMoved=true;
  });
  window.addEventListener('mouseup',e=>{
    if(!dragging)return;
    dragging=false;
    heroCarousel.style.cursor='';
    heroCarousel.style.userSelect='';
    if(!dragMoved)return;
    const dx=e.clientX-dragStartX;
    if(Math.abs(dx)>50){stop();goTo(currentSlide+(dx<0?1:-1));start();}
  });

  start();

  // Parallax: shift hero bg images on scroll (preserve Ken Burns scale)
  function heroParallax(){
    const hero=document.getElementById('hero');
    if(!hero)return;
    const rect=hero.getBoundingClientRect();
    if(rect.bottom<0)return;
    const pct=Math.max(0,-rect.top/rect.height);
    hero.querySelectorAll('.hero-slide-bg').forEach(bg=>{
      const sc=bg.closest('.hero-slide.active')?1.06:1;
      bg.style.transform=`scale(${sc}) translateY(${pct*20}px)`;
    });
  }
  window.addEventListener('scroll',heroParallax,{passive:true});
  window.addEventListener('hashchange',()=>window.removeEventListener('scroll',heroParallax),{once:true});
}

// ─── PLATFORM CARDS ──────────────────────────────────
function renderPlatformCards(){
  const grid=document.getElementById('platforms-grid');
  if(!grid)return;
  grid.innerHTML=PLATFORMS.map(p=>`
    <div class="plat-card stagger" onclick="Router.navigate('/platform/${p.id}')">
      <div class="plat-card-bg" style="background-image:url('${PLAT_BG[p.id]||IMG.conan1}')"></div>
      <div class="plat-card-color-layer" style="background:${p.bg}"></div>
      <div class="plat-card-overlay"></div>
      <div class="plat-card-logo">${getPlatformLogoMarkup(p)}</div>
      <div class="plat-card-accent-bar" style="background:linear-gradient(90deg,${p.color},transparent)"></div>
    </div>`).join('');

  const leftBtn=document.getElementById('platform-scroll-left');
  const rightBtn=document.getElementById('platform-scroll-right');
  if(!leftBtn||!rightBtn) return;
  const step=340;
  const updateScrollButtons=()=>{
    const max=Math.max(0,grid.scrollWidth-grid.clientWidth);
    leftBtn.disabled=grid.scrollLeft<=4;
    rightBtn.disabled=grid.scrollLeft>=max-4;
  };
  leftBtn.onclick=()=>grid.scrollBy({left:-step,behavior:'smooth'});
  rightBtn.onclick=()=>grid.scrollBy({left:step,behavior:'smooth'});
  grid.addEventListener('scroll',updateScrollButtons,{passive:true});
  window.addEventListener('resize',updateScrollButtons,{passive:true});
  updateScrollButtons();
}

// ─── LANGUAGE SECTION ────────────────────────────────
function renderLanguageSection(){
  const grid=document.getElementById('lang-section-grid');
  if(!grid)return;

  // Dub languages + which platforms (with platform ids for navigation)
  const dubLangs = [
    {lang:'Hindi',   flag:'🇮🇳', native:'हिन्दी', platforms:[{label:'Anime Times',    id:'primevideo', detail:'Eps 1–97',     color:'#1A98FF'},{label:'ETV Bal Bharat',id:'etvbalb',    detail:'Eps 1–538',    color:'#FF6B00'}]},
    {lang:'Tamil',   flag:'🏴',  native:'தமிழ்',    platforms:[...(ENABLE_TAMIL_ANIMETIMES?[{label:'Anime Times',id:'primevideo',detail:'Eps 1–97',color:'#1A98FF'}]:[]),{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}]},
    {lang:'Telugu',  flag:'🏴',  native:'తెలుగు',   platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}]},
    {lang:'Malayalam',flag:'🏴', native:'മലയാളം',   platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}]},
    {lang:'Kannada', flag:'🏴',  native:'ಕನ್ನಡ',    platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}]},
    {lang:'Bengali', flag:'🏴',  native:'বাংলা',    platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}]},
    {lang:'Marathi', flag:'🏴',  native:'मराठी',    platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}]},
    {lang:'Gujarati',flag:'🏴',  native:'ગુજરાતી',  platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}]},
    {lang:'Odia',    flag:'🏴',  native:'ଓଡ଼ିଆ',    platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}]},
    {lang:'Punjabi', flag:'🏴',  native:'ਪੰਜਾਬੀ',   platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}]},
    {lang:'Assamese',flag:'🏴',  native:'অসমীয়া',  platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}]},
    {lang:'English', flag:'🇬🇧', native:'English',  platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Limited English dub · select episodes',color:'#FF6B00'}]},
  ];

  // Sub platforms for English subtitles tile
  const subPlatforms=[
    {label:'Netflix',   id:'netflix',    detail:'S1–S10, S23–S27 + all movies', color:'#E50914'},
    {label:'Anime Times',id:'primevideo',detail:'Eps 1–97',                     color:'#1A98FF'},
    {label:'Apple TV',  id:'appletv',    detail:'Eps 1–97 via Anime Times',     color:'#A2AAAD'},
  ];

  grid.innerHTML=`
    <div class="lang-one-row-wrap">
      <button class="lang-scroll-btn lang-scroll-btn--left" id="lang-scroll-left" aria-label="Scroll languages left">‹</button>
      <div class="lang-one-row" id="lang-one-row">
        <div class="lang-big-pill lang-big-pill--merged lang-square-tile" onclick="openLangModal('English Subtitles','🇬🇧',${JSON.stringify(subPlatforms).replace(/"/g,"'")})">
          <div class="lang-pill-name">English Sub</div>
        </div>
        ${dubLangs.map(l=>`
          <div class="lang-big-pill lang-pill-clickable lang-square-tile" onclick="openLangModal('${l.native||l.lang}','${l.flag}',${JSON.stringify(l.platforms).replace(/"/g,"'")})">
            <div class="lang-pill-name">${l.native||l.lang}</div>
          </div>`).join('')}
      </div>
      <button class="lang-scroll-btn lang-scroll-btn--right" id="lang-scroll-right" aria-label="Scroll languages right">›</button>
    </div>`;

  const row=grid.querySelector('#lang-one-row');
  const leftBtn=grid.querySelector('#lang-scroll-left');
  const rightBtn=grid.querySelector('#lang-scroll-right');
  if(!row||!leftBtn||!rightBtn) return;
  const step=240;
  const updateScrollButtons=()=>{
    const max=Math.max(0,row.scrollWidth-row.clientWidth);
    leftBtn.disabled=row.scrollLeft<=4;
    rightBtn.disabled=row.scrollLeft>=max-4;
  };
  leftBtn.onclick=()=>row.scrollBy({left:-step,behavior:'smooth'});
  rightBtn.onclick=()=>row.scrollBy({left:step,behavior:'smooth'});
  row.addEventListener('scroll',updateScrollButtons,{passive:true});
  window.addEventListener('resize',updateScrollButtons,{passive:true});
  updateScrollButtons();

}

// ─── DRAG-TO-SCROLL HELPER (with momentum) ────────────────────
function addDragScroll(el){
  if(!el||el._dragScroll) return;
  el._dragScroll=true;
  let down=false,didDrag=false,startX=0,scrollX=0;
  let lastX=0,lastT=0,velX=0,rafId=0;
  const origSnap=el.style.scrollSnapType;

  function cancelMomentum(){ cancelAnimationFrame(rafId); }

  function momentum(){
    velX*=0.91;
    if(Math.abs(velX)<0.5){ velX=0; return; }
    el.scrollLeft+=velX;
    rafId=requestAnimationFrame(momentum);
  }

  el.addEventListener('mousedown',e=>{
    if(e.button!==0) return;
    cancelMomentum();
    down=true; didDrag=false;
    startX=e.pageX; scrollX=el.scrollLeft;
    lastX=e.pageX; lastT=Date.now();
    velX=0;
    el.style.userSelect='none';
  });

  window.addEventListener('mousemove',e=>{
    if(!down) return;
    const dx=e.pageX-startX;
    if(!didDrag && Math.abs(dx)<5) return;
    if(!didDrag){
      didDrag=true;
      el.style.scrollSnapType='none';    // disable snap while dragging
    }
    el.scrollLeft=scrollX-dx;
    el.style.cursor='grabbing';
    const now=Date.now();
    const dt=now-lastT||1;
    velX=(lastX-e.pageX)/dt*16;
    lastX=e.pageX; lastT=now;
  });

  window.addEventListener('mouseup',()=>{
    if(!down) return;
    down=false;
    el.style.cursor='';
    el.style.userSelect='';
    if(didDrag && Math.abs(velX)>1) rafId=requestAnimationFrame(momentum);
  });

  el.addEventListener('click',e=>{
    if(didDrag){ didDrag=false; e.stopPropagation(); e.preventDefault(); }
  },{capture:true});
}

// ─── SEASON CARDS ────────────────────────────────────
const PLAT_COLORS={netflix:'#E50914',primevideo:'#1A98FF',appletv:'#A2AAAD',etvbalb:'#FF6B00',etvwin:'#FF9500',pvr:'#D4A017'};

function movieDots(m){
  const items=[
    m.netflix    && {color:PLAT_COLORS.netflix,  label:'Netflix'},
    m.animetimes && {color:PLAT_COLORS.primevideo,label:'Anime Times'},
    m.etv        && {color:PLAT_COLORS.etvbalb,  label:'ETV Bal Bharat'},
    m.etvwin     && {color:PLAT_COLORS.etvwin,   label:'ETV Win'},
    m.pvr        && {color:PLAT_COLORS.pvr,      label:'PVR Cinemas'},
  ].filter(Boolean);
  if(!items.length && m.comingSoon) return `<div class="plat-dot" style="background:rgba(255,255,255,0.25)" title="Coming Soon"></div>`;
  return items.map(p=>`<div class="plat-dot" style="background:${p.color}" title="${p.label}"></div>`).join('');
}

const PLAT_LEGEND_HTML=`<div class="plat-legend">`+
  `<span class="plat-legend-item"><span class="plat-dot" style="background:${PLAT_COLORS.netflix}"></span>Netflix</span>`+
  `<span class="plat-legend-item"><span class="plat-dot" style="background:${PLAT_COLORS.primevideo}"></span>Anime Times</span>`+
  `<span class="plat-legend-item"><span class="plat-dot" style="background:${PLAT_COLORS.etvbalb}"></span>ETV Bal Bharat</span>`+
  `<span class="plat-legend-item"><span class="plat-dot" style="background:${PLAT_COLORS.etvwin}"></span>ETV Win</span>`+
  `<span class="plat-legend-item"><span class="plat-dot" style="background:${PLAT_COLORS.pvr}"></span>PVR</span>`+
  `<span class="plat-legend-item"><span class="plat-dot" style="background:rgba(255,255,255,0.25)"></span>Coming Soon</span>`+
`</div>`;

function renderSeasonCard(s,idx){
  const dots=(s.platforms||[]).map(pid=>`<div class="plat-dot" style="background:${PLAT_COLORS[pid]||'#666'}" title="${pid}"></div>`).join('');
  const epEnd=s.epRange[1]?`–${s.epRange[1]}`:'–';
  return`<div class="season-card stagger${s.available?'':' unavailable'}" data-season-id="${s.id}" onclick="openSeasonModal('${s.id}')">
    <div class="season-card-bg" style="background-image:url('${getSeasonStillByLocalSeasonId(s.id,idx+3)}')"></div>
    <div class="season-card-overlay"></div>
    <div class="season-card-num">${s.id.replace('S','')}</div>
    ${s.available?`<div class="avail-badge yes">✓ IN</div>`:`<div class="avail-badge no">N/A</div>`}
    <div class="season-card-content">
      <div class="season-card-label">${s.label}</div>
      <div class="season-card-eps">Eps ${s.epRange[0]}${epEnd}</div>
      <div class="season-card-dots">${dots}</div>
    </div>
  </div>`;
}

function renderSeasonCards(){
  const el=document.getElementById('seasons-all');
  if(el) el.innerHTML=SEASONS.map((s,i)=>renderSeasonCard(s,i)).join('');
}

// ─── MOVIES ROW ──────────────────────────────────────
function renderMoviesRow(){
  const el=document.getElementById('movies-row');
  if(!el)return;
  el.innerHTML=MOVIES.map((m,i)=>{
    const avail = m.netflix||m.etv||m.etvwin||m.animetimes||m.pvr;
    const badge = m.comingSoon
      ? `<div class="avail-badge no">SOON</div>`
      : avail
        ? `<div class="avail-badge yes">✓ IN</div>`
        : `<div class="avail-badge no">N/A</div>`;
    return`<div class="content-card stagger" data-movie-id="${m.id}" onclick="openMovieModal('${m.id}')" style="--card-color0:${m.colors[0]};--card-color1:${m.colors[1]}">
      <div class="content-card-bg" style="background-image:url('${getMoviePoster(m,i+2)}');background-color:${m.colors[0]}"></div>
      <div class="content-card-bg-overlay"></div>
      <div class="content-card-num">${m.n}</div>
      <div class="content-card-tags">${badge}</div>
      <div class="content-card-content">
        <div class="content-card-title">${m.title}</div>
        <div class="content-card-meta">Movie · ${m.year}</div>
      </div>
    </div>`;
  }).join('');
}

// ─── BROWSE / FILTER SECTION ─────────────────────────
function renderBrowseSection(){
  renderFilterBar();
  applyFilters();
}

function toggleBrowseSection(){
  const el=document.getElementById('browseCollapsible');
  const label=document.getElementById('browseCollapseBtnLabel');
  const chevron=document.getElementById('browseCollapseChevron');
  if(!el)return;
  const open=el.classList.toggle('open');
  label.textContent=open?'Hide':'Show';
  chevron.style.transform=open?'rotate(180deg)':'rotate(0deg)';
}

function renderFilterBar(){
  const bar=document.getElementById('filter-bar');
  if(!bar)return;

  const allLanguages=['English Sub','Hindi','Tamil','Telugu','Malayalam','Kannada','Bengali','Marathi','Gujarati','Odia','Punjabi','Assamese'];

  bar.innerHTML=`
    <div class="filter-dropdowns">
      <label class="filter-dropdown-group">
        <span class="filter-row-label">Type</span>
        <select class="filter-select" data-group="type">
          ${['all','movie','season','spinoff'].map(v=>`<option value="${v}" ${filterState.type===v?'selected':''}>${v==='all'?'All Content':v.charAt(0).toUpperCase()+v.slice(1)+'s'}</option>`).join('')}
        </select>
      </label>
      <label class="filter-dropdown-group">
        <span class="filter-row-label">Platform</span>
        <select class="filter-select" data-group="platform">
          ${['all','netflix','primevideo','appletv','etvbalb','etvwin'].map(v=>`<option value="${v}" ${filterState.platform===v?'selected':''}>${v==='all'?'All Platforms':(PLAT_META[v]?.name||v)}</option>`).join('')}
        </select>
      </label>
      <label class="filter-dropdown-group">
        <span class="filter-row-label">Language</span>
        <select class="filter-select" data-group="language">
          <option value="all" ${filterState.language==='all'?'selected':''}>All Languages</option>
          ${allLanguages.map(l=>`<option value="${l}" ${filterState.language===l?'selected':''}>${LANG_NATIVE[l]||l}</option>`).join('')}
        </select>
      </label>
    </div>`;

  bar.querySelectorAll('.filter-select').forEach(sel=>{
    sel.addEventListener('change',()=>{
      const {group}=sel.dataset;
      filterState[group]=sel.value;
      applyFilters();
    });
  });
}

function applyFilters(){
  const grid=document.getElementById('browse-grid');
  const countEl=document.getElementById('filter-count');
  if(!grid)return;

  // Build all content items
  const items=[
    ...MOVIES.map((m,i)=>({item:m,type:'movie',idx:i})),
    ...SEASONS.map((s,i)=>({item:s,type:'season',idx:i})),
    ...SPINOFFS.map((sp,i)=>({item:sp,type:'spinoff',idx:i})),
  ];

  const matched=items.filter(({item,type})=>itemMatchesFilter(item,type));
  const total=matched.length;

  if(countEl){
    const typeLabel=filterState.type==='all'?'items':filterState.type+'s';
    countEl.textContent=`Showing ${total} ${typeLabel}${filterState.platform!=='all'?' on '+(PLAT_META[filterState.platform]?.name||filterState.platform):''}${filterState.language!=='all'?' in '+(LANG_NATIVE[filterState.language]||filterState.language):''}`;
  }

  if(total===0){
    grid.innerHTML=`<div class="no-results empty-state"><div class="empty-state-illustration">🔍</div><div class="empty-state-title">No content matches these filters</div><div class="empty-state-sub">Try resetting filters to see everything available across movies, seasons, and spinoffs.</div><button class="empty-state-action" onclick="resetHomeFilters()">Reset Filters</button></div>`;
    return;
  }

  grid.innerHTML=matched.map(({item,type,idx})=>renderBrowseCard(item,type,idx)).join('');
  if(!_isTouch) refreshHover();
}

function resetHomeFilters(){
  filterState.type = 'all';
  filterState.platform = 'all';
  filterState.language = 'all';
  renderFilterBar();
  applyFilters();
}

function renderBrowseCard(item,type,idx){
  if(type==='movie'){
    const m=item;
    const noAnnounce=m.noIndiaAnnouncement?`<span class="tag" style="font-size:7px;background:rgba(100,100,100,0.4);color:#aaa">No India Announcement</span>`:`<div class="season-card-dots">${movieDots(m)}</div>`;
    return`<div class="browse-card stagger" data-movie-id="${m.id}" onclick="openMovieModal('${m.id}')">
      <div class="browse-card-img" style="background-image:url('${getMoviePoster(m,idx+1)}');background-color:${m.colors[0]}"></div>
      <div class="browse-card-grad"></div>
      <div class="browse-card-num">${m.n}</div>
      <div class="browse-card-content">
        <div class="browse-card-type">Movie · ${m.year}</div>
        <div class="browse-card-title">${m.title}</div>
        <div class="browse-card-meta">${noAnnounce}</div>
      </div>
    </div>`;
  }
  if(type==='season'){
    const s=item;
    const dots=(s.platforms||[]).map(pid=>`<span style="color:${PLAT_COLORS[pid]||'#aaa'};font-size:9px">⬤</span>`).join(' ');
    return`<div class="browse-card stagger${s.available?'':' unavailable'}" data-season-id="${s.id}" onclick="openSeasonModal('${s.id}')">
      <div class="browse-card-img" style="background-image:url('${getSeasonStillByLocalSeasonId(s.id,idx+1)}')"></div>
      <div class="browse-card-grad"></div>
      <div class="browse-card-num">${s.id.replace('S','')}</div>
      <div class="browse-card-content">
        <div class="browse-card-type">${s.label} · ${s.year}</div>
        <div class="browse-card-title">Eps ${s.epRange[0]}–${s.epRange[1]||'ongoing'}</div>
        <div class="browse-card-meta">${dots}${s.available?` <span class="tag tag-netflix" style="font-size:7px">✓ IN</span>`:` <span class="tag tag-soon" style="font-size:7px">N/A</span>`}</div>
      </div>
    </div>`;
  }
  if(type==='spinoff'){
    const sp=item;
    return`<div class="browse-card" data-spinoff-id="${sp.id}" onclick="openSpinoffModal('${sp.id}')">
      <div class="browse-card-img" style="background-image:url('${getSpinoffPoster(sp, idx+8)}')"></div>
      <div class="browse-card-grad"></div>
      <div class="browse-card-content">
        <div class="browse-card-type">Spinoff · ${sp.year}</div>
        <div class="browse-card-title">${sp.title}</div>
        <div class="browse-card-meta"><span class="tag tag-netflix" style="font-size:7px">Netflix</span> ${sp.episodes} eps</div>
      </div>
      <div class="browse-card-hover">
        <div class="browse-card-hover-desc">${sp.desc}</div>
      </div>
    </div>`;
  }
  return'';
}

// ─── SPINOFFS ────────────────────────────────────────
function renderSpinoffs(){
  const el=document.getElementById('spinoffs-grid');
  if(!el)return;
  el.innerHTML=SPINOFFS.map((sp,i)=>`
    <div class="content-card stagger" data-spinoff-id="${sp.id}" onclick="openSpinoffModal('${sp.id}')" style="--card-color0:${sp.colors[0]};--card-color1:${sp.colors[1]}">
      <div class="content-card-bg" style="background-image:url('${getSpinoffPoster(sp, i+7)}');background-color:${sp.colors[0]}"></div>
      <div class="content-card-bg-overlay"></div>
      <div class="content-card-num">${i+1}</div>
      <div class="content-card-tags"><div class="season-card-dots">${movieDots(sp)}</div></div>
      <div class="content-card-content">
        <div class="content-card-title">${sp.title}</div>
        <div class="content-card-meta">Spinoff · ${sp.year}</div>
      </div>
    </div>`).join('');
}

// ─── ARCHIVE ─────────────────────────────────────────
function renderPVRArchive(){
  const el=document.getElementById('pvr-cards-grid');
  if(!el)return;
  el.innerHTML=PVR_EVENTS.map((ev,i)=>renderPVREventCard(ev,i)).join('');
}
function renderETVArchive(){
  const el=document.getElementById('etv-archive-cards-grid');
  if(!el)return;
  const etvMovieNums=PLATFORMS.find(p=>p.id==='etvbalb').movies;
  el.innerHTML=etvMovieNums.map((n,i)=>{
    const m=MOVIES.find(mv=>mv.n===n);
    if(!m)return'';
    return`<div class="pvr-card" data-movie-id="${m.id}" onclick="openMovieModal('${m.id}')">
      <div class="pvr-card-bg" style="background-image:url('${getMoviePoster(m,i+1)}');background-color:${m.colors[0]}"></div>
      <div class="pvr-card-overlay"></div>
      <div class="pvr-card-content">
        <div class="pvr-type-badge pvr-type-etv">ETV Broadcast</div>
        <div class="pvr-card-title">${m.title}</div>
        <div class="pvr-card-sub">Movie ${m.n} · ${m.year}</div>
      </div>
    </div>`;
  }).join('');
}
window.toggleArchive=function(id){
  const body=document.getElementById(id);
  const chev=document.getElementById(id+'-chevron');
  if(!body)return;
  const isOpen=body.classList.contains('open');
  body.classList.toggle('open',!isOpen);
  chev.classList.toggle('open',!isOpen);
  if(!isOpen)setTimeout(observeAll,100);
};

// ─── FOOTER ──────────────────────────────────────────
function renderFooterHTML(){
  return`<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo"><img src="https://i.postimg.cc/b86XR0Wv/BBDCI-Logo-use-for-dark-mode.png" alt="Bring Back Detective Conan India" class="footer-bbdci-logo" loading="lazy" decoding="async"></div>
          <p class="footer-tagline">The complete, independent fan guide to watching Detective Conan in India — every platform, every language, every episode.<br><span style="opacity:.6;font-size:.92em">By <strong>Bring Back Detective Conan India</strong> — fan community working since 2013 to bring Detective Conan back to India.</span></p>
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
            ${PLATFORMS.map(p=>`<a onclick="Router.navigate('/platform/${p.id}')">${p.name}${p.nameSub?` <span style="opacity:.5;font-size:.85em">${p.nameSub}</span>`:''}</a>`).join('')}
          </div>
        </div>
        <div>
          <div class="footer-col-title">Content</div>
          <div class="footer-links">
            <a onclick="scrollToSection('series')">TV Series <span class="footer-link-badge tag tag-netflix">${SEASONS.length} Seasons</span></a>
            <a onclick="scrollToSection('movies')">Movies <span class="footer-link-badge tag tag-prime">${MOVIES.length} Films</span></a>
            <a onclick="scrollToSection('spinoffs')">Spinoffs</a>
            <a onclick="Router.navigate('/browse')">Browse &amp; Filter</a>
            <a onclick="scrollToSection('manga')">Manga</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">More</div>
          <div class="footer-links">
            <a onclick="Router.navigate('/languages')">Languages Guide</a>
            <a onclick="scrollToSection('etv')">ETV Bal Bharat</a>
            <a onclick="Router.navigate('/merch')">Fan Merch India</a>
            <a onclick="Router.currentRoute==='/'||Router.currentRoute===''?scrollToSection('archive'):(Router.navigate('/'),setTimeout(()=>scrollToSection('archive'),400))">Archive</a>
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

// ─── PLATFORM PAGE ────────────────────────────────────
function renderPlatformPage(id){
  const p=PLATFORMS.find(x=>x.id===id);
  if(!p){Router.navigate('/');return;}

  app.innerHTML='';
  window.scrollTo(0,0);

  const pg=document.createElement('div');
  pg.className='platform-page page-enter';

  // Stats
  let epCount='-',movieCount='-',langCount=0;
  if(p.seriesSeasons) epCount=p.seriesSeasons.length+' Seasons';
  else if(p.seriesRange) epCount='Eps '+p.seriesRange[0]+'–'+p.seriesRange[1];
  if(p.movies==='all') movieCount=MOVIES.length+' Movies';
  else if(Array.isArray(p.movies)) movieCount=p.movies.length+' Movies';
  langCount=(p.languages?.sub?.length||0)+(p.languages?.dub?.length||0);

  // Build content sections for each tab panel
  let episodePanel='', moviesPanel='', langsPanel='', etvEpisodesPanel='';

  // Episodes
  if(p.seriesSeasons){
    episodePanel=`<div class="pp-section-title">Seasons Available</div>
      <div class="scroll-row" style="padding-bottom:16px">
        ${p.seriesSeasons.map((sid,i)=>{
          const s=SEASONS.find(x=>x.id===sid);
          if(!s)return'';
          return`<div class="content-card" data-season-id="${s.id}" onclick="openSeasonModal('${s.id}')">
            <div class="content-card-bg" style="background-image:url('${getSeasonStillByLocalSeasonId(s.id,i+3)}')"></div>
            <div class="content-card-bg-overlay"></div>
            <div class="content-card-num">${s.id.replace('S','')}</div>
            <div class="content-card-content">
              <div class="content-card-title">${s.label}</div>
              <div class="content-card-meta">Eps ${s.epRange[0]}–${s.epRange[1]}</div>
            </div>
          </div>`;
        }).join('')}
      </div>`;
  } else if(p.seriesRange){
    const isETV = p.id === 'etvbalb';
    if(isETV){
      // Build ETV season cards from EPISODES data
      const etvSeasonIds=['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12','S13','S14'];
      const etvSeasonCards=etvSeasonIds.map((sid,i)=>{
        const sv=SEASONS.find(x=>x.id===sid);if(!sv)return'';
        const etvCount=(typeof EPISODES!=='undefined'?EPISODES:[]).filter(e=>e.season===sid&&e.etv).length;
        if(!etvCount)return'';
        return`<div class="content-card" data-season-id="${sv.id}" onclick="openSeasonModal('${sv.id}',undefined,undefined,true,true)">
          <div class="content-card-bg" style="background-image:url('${getSeasonStillByLocalSeasonId(sv.id,i+3)}')"></div>
          <div class="content-card-bg-overlay"></div>
          <div class="content-card-num">${sv.id.replace('S','')}</div>
          <div class="content-card-content">
            <div class="content-card-title">${sv.label}</div>
            <div class="content-card-meta" style="color:#FF6B00">${etvCount} ETV eps · Eps ${sv.epRange[0]}–${sv.epRange[1]}</div>
          </div>
        </div>`;
      }).join('');
      const providerCardsHTML = p.providers&&p.providers.length ? `
        <div class="pp-section-title">Available On</div>
        <div class="pp-provider-grid-new">
          ${p.providers.map(r=>{
            const meta=PROVIDER_META[r.name]||{};
            const logoUrl=meta.logo||'';
            const bg=meta.bg||'#1a1a1a';
            const chBadges=[
              r.sd?`<span class="pp-provider-ch">Ch ${r.sd}<span class="pp-provider-ch-label"> SD</span></span>`:'',
              r.hd?`<span class="pp-provider-ch">Ch ${r.hd}<span class="pp-provider-ch-label"> HD</span></span>`:''
            ].filter(Boolean).join('');
            return`<div class="pp-provider-tile">
              <div class="pp-provider-card">
                <div class="pp-provider-card-color" style="background:${bg}"></div>
                <div class="pp-provider-card-overlay"></div>
                <div class="pp-provider-card-logo">
                  ${logoUrl
                    ?`<img class="pp-provider-logo" src="${logoUrl}" alt="${r.name}" loading="lazy" draggable="false" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                      <div class="pp-provider-logo-text" style="display:none">${r.name}</div>`
                    :`<div class="pp-provider-logo-text">${r.name}</div>`}
                </div>
                <div class="pp-provider-accent-bar" style="background:${bg}"></div>
              </div>
              <div class="pp-provider-tile-label">
                <div class="pp-provider-name-label">${r.name}</div>
                ${chBadges}
              </div>
            </div>`;
          }).join('')}
        </div>` : '';
      episodePanel=`<div class="pp-section-title">Broadcast Info</div>
          ${providerCardsHTML}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:28px;margin-bottom:24px">
            <div style="padding:20px;border-radius:12px;background:var(--surface2);border:1px solid var(--border)">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:6px">Channels</div>
              <div style="font-family:var(--font-display);font-size:20px;color:#FF6B00">ETV Bal Bharat</div>
              <div style="font-size:13px;color:var(--muted);margin-top:4px">+ ETV Bal Bharat HD</div>
            </div>
            <div style="padding:20px;border-radius:12px;background:var(--surface2);border:1px solid var(--border)">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:6px">Schedule</div>
              <div style="font-family:var(--font-display);font-size:20px;color:#FF6B00">11PM Daily</div>
              <div style="font-size:13px;color:var(--muted);margin-top:4px">Monday to Sunday</div>
            </div>
            <div style="padding:20px;border-radius:12px;background:var(--surface2);border:1px solid var(--border)">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:6px">Episode Range</div>
              <div style="font-family:var(--font-display);font-size:20px;color:#FF6B00">Eps 1 to 538</div>
              <div style="font-size:13px;color:var(--muted);margin-top:4px">260 episodes confirmed aired</div>
            </div>
            <div style="padding:20px;border-radius:12px;background:var(--surface2);border:1px solid var(--border)">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:6px">Access</div>
              <div style="font-family:var(--font-display);font-size:20px;color:#FF6B00">Paid DTH/Cable</div>
              <div style="font-size:13px;color:var(--muted);margin-top:4px">Subscription required</div>
            </div>
          </div>
          <div class="pp-note" style="border-left:3px solid #FF6B00;padding-left:14px">Dubbing is selective — earlier episodes (roughly 1 to 200) have the broadest language coverage across all 12 languages. Later episodes may only be available in Hindi or a few languages.</div>`;
      etvEpisodesPanel=`<div class="pp-section-title">Seasons on ETV Bal Bharat</div>
          <p style="font-size:13px;color:var(--muted);margin:0 0 16px">Click any season to see the full episode list with ETV air dates.</p>
          <div class="scroll-row" style="padding-bottom:16px">${etvSeasonCards}</div>`;
    } else {
      // Build season cards from EPISODES for the seriesRange
      const rangeSeasonCards=(()=>{
        const eps=(typeof EPISODES!=='undefined'?EPISODES:[]);
        const [r0,r1]=[p.seriesRange[0],p.seriesRange[1]];
        const seenSeasons=[],seen=new Set();
        eps.filter(e=>typeof e.n==='number'&&e.n>=r0&&e.n<=r1).forEach(e=>{if(!seen.has(e.season)){seen.add(e.season);seenSeasons.push(e.season);}});
        return seenSeasons.map((sid,i)=>{
          const sv=SEASONS.find(x=>x.id===sid);if(!sv)return'';
          const avail=eps.filter(e=>e.season===sid&&typeof e.n==='number'&&e.n>=r0&&e.n<=r1);
          const full=(avail.length===(sv.epRange[1]-sv.epRange[0]+1));
          const metaLabel=full
            ?`Eps ${sv.epRange[0]}–${sv.epRange[1]}`
            :`Eps ${avail[0].n}–${avail[avail.length-1].n} · partial`;
          return`<div class="content-card" data-season-id="${sv.id}" onclick="openSeasonModal('${sv.id}',${r0},${r1},false)">
            <div class="content-card-bg" style="background-image:url('${getSeasonStillByLocalSeasonId(sv.id,i+3)}')"></div>
            <div class="content-card-bg-overlay"></div>
            <div class="content-card-num">${sv.id.replace('S','')}</div>
            <div class="content-card-content">
              <div class="content-card-title">${sv.label}</div>
              <div class="content-card-meta">${metaLabel} · ${avail.length} eps</div>
            </div>
          </div>`;
        }).join('');
      })();
      episodePanel=`<div class="pp-section-title">Seasons Available</div>
          <div class="pp-note" style="margin-bottom:16px">Episodes ${p.seriesRange[0]}–${p.seriesRange[1]}${p.languages?.dub?.length?` · ${p.languages.dub.join(' + ')} Dub + Eng Sub`:' · Eng Sub only'}. Click any season for the full episode list.</div>
          <div class="scroll-row" style="padding-bottom:16px">${rangeSeasonCards}</div>`;
    }

  } else {
    episodePanel=`<div class="pp-note">No series episodes available on this platform.</div>`;
  }

  // Movies
  if(p.movies==='all'||Array.isArray(p.movies)){
    const movieList=p.movies==='all'?MOVIES:MOVIES.filter(m=>Array.isArray(p.movies)&&(p.movies.includes(m.id)||p.movies.includes(m.n)));
    moviesPanel=`<div class="pp-section-title">${movieList.length} Movies</div>
      <div class="browse-grid">
        ${movieList.map((m,i)=>`
          <div class="browse-card" data-movie-id="${m.id}" onclick="openMovieModal('${m.id}')">
            <div class="browse-card-img" style="background-image:url('${getMoviePoster(m,i+2)}');background-color:${m.colors[0]}"></div>
            <div class="browse-card-grad"></div>
            <div class="browse-card-num">${m.n}</div>
            <div class="browse-card-content">
              <div class="browse-card-type">Movie · ${m.year}</div>
              <div class="browse-card-title">${m.title}</div>
            </div>
          </div>`).join('')}
      </div>`;
  } else {
    moviesPanel=`<div class="pp-note">No movies available on this platform.</div>`;
  }

  // Languages
  const subLangs=p.languages?.sub||[];
  const dubLangs=p.languages?.dub||[];
  langsPanel=`
    ${subLangs.length?`
      <div class="pp-lang-section">
        <div class="pp-lang-section-title">Subtitles</div>
        <div class="pp-lang-grid">
          ${subLangs.map(l=>`<div class="pp-lang-chip">${l} Subtitles</div>`).join('')}
        </div>
      </div>`:''}
    ${dubLangs.length?`
      <div class="pp-lang-section" style="margin-top:${subLangs.length?24:0}px">
        <div class="pp-lang-section-title">Dubbed Languages</div>
        <div class="pp-lang-grid">
          ${dubLangs.map(l=>`<div class="pp-lang-chip">${LANG_NATIVE[l]||l}</div>`).join('')}
        </div>
      </div>`:''}
    ${p.dubNote?`<div class="pp-note" style="margin-top:20px">⚠️ ${p.dubNote}</div>`:''}
    ${p.note?`<div class="pp-note" style="margin-top:12px">ℹ️ ${p.note}</div>`:''}
    ${p.socialUrl?`<div style="margin-top:20px"><a href="${p.socialUrl}" target="_blank" rel="noopener" class="pp-social-link">📸 Follow @animetimes_in on Instagram for offers &amp; updates ↗</a></div>`:''}`;

  // Spinoff panel
  let spinoffPanel='';
  if(p.spinoffs&&p.spinoffs.length){
    spinoffPanel=p.spinoffs.map((sid,i)=>{
      const sp=SPINOFFS.find(x=>x.id===sid);
      if(!sp)return'';
      return`<div class="spinoff-card" data-spinoff-id="${sp.id}" style="height:200px;cursor:pointer" onclick="openSpinoffModal('${sp.id}')">
        <div class="spinoff-bg" style="background-image:url('${getSpinoffPoster(sp, i+10)}')"></div>
        <div class="spinoff-overlay"></div>
        <div class="spinoff-content">
          <div class="spinoff-label">${sp.year} · ${sp.episodes} Episodes</div>
          <div class="spinoff-title">${sp.title}</div>
          <div class="spinoff-dub">
            ${sp.languages.dub.map(l=>`<span class="tag tag-etv">${l} Dub</span>`).join('')}
            <span class="tag tag-netflix">Eng Sub</span>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  // Cast panel for ETV and Anime Times
  const castPanel = buildPlatformCastPanel(p);

  const hasTabs=['episodes','movies','languages',...(p.spinoffs?.length?['spinoffs']:[])];

  // Hero metadata badges
  const accessType = p.url ? 'Subscription' : 'Paid DTH/Cable';
  const streamType = p.url ? 'On Demand' : 'Scheduled Broadcast';
  const metaBadges = [
    {icon:'📺', label: accessType},
    {icon:'🌐', label: streamType},
    ...(langCount>0?[{icon:'🗣', label:`${langCount} Language${langCount!==1?'s':''}`}]:[]),
  ];

  pg.innerHTML=`
    <!-- Accent color bar -->
    <div class="pp-hero-color-bar" style="background:${p.color}"></div>

    <!-- Hero -->
    <div class="pp-hero">
      <div class="pp-hero-img" id="pp-hero-img" style="background-image:url('${PLAT_BG[p.id]||IMG.conan1}')"></div>
      <div class="pp-hero-grad"></div>
      <div class="pp-hero-grad2"></div>

      <!-- Platform color glow behind logo -->
      <div class="pp-hero-glow" style="background:radial-gradient(ellipse 520px 360px at 0% 100%,${p.color}28 0%,transparent 70%)"></div>

      <button class="pp-hero-back" onclick="Router.navigate('/')">← All Platforms</button>

      <div class="pp-hero-content">
        <div class="pp-hero-info">
          <!-- Large SVG logo -->
          <div class="pp-hero-logo-wrap">
            ${getPlatformHeroLogoMarkup(p)}
          </div>
          ${p.nameSub?`<div class="pp-hero-sub">${p.nameSub}</div>`:''}
          <p class="pp-hero-desc">${p.description}</p>

          <!-- Metadata badges strip -->
          <div class="pp-hero-meta-strip">
            ${metaBadges.map(b=>`<span class="pp-hero-meta-badge"><span class="pp-meta-icon">${b.icon}</span>${b.label}</span>`).join('')}
          </div>

          <!-- Language tags -->
          <div class="pp-hero-langs">
            ${subLangs.map(l=>`<span class="tag tag-netflix">Sub: ${l}</span>`).join('')}
            ${dubLangs.slice(0,4).map(l=>`<span class="tag tag-etv">Dub: ${l}</span>`).join('')}
            ${dubLangs.length>4?`<span class="tag tag-soon">+${dubLangs.length-4} more</span>`:''}
          </div>
        </div>
        ${p.url?`<a href="${p.url}" target="_blank" rel="noopener" class="pp-hero-cta" style="background:${p.color};box-shadow:0 0 32px ${p.color}55">Watch Now ↗</a>`:'<span class="pp-hero-cta pp-hero-cta--tv" style="border-color:${p.color};color:${p.color}">📡 TV Broadcast</span>'}
      </div>
    </div>

    <!-- Stats bar -->
    <div class="pp-stats-bar" style="border-top:2px solid ${p.color}22">
      <div class="pp-stat">
        <div class="pp-stat-n" style="color:${p.color}">${epCount}</div>
        <div class="pp-stat-l">Episodes</div>
        <div class="pp-stat-bar" style="background:${p.color}"></div>
      </div>
      <div class="pp-stat">
        <div class="pp-stat-n" style="color:${p.color}">${movieCount}</div>
        <div class="pp-stat-l">Movies</div>
        <div class="pp-stat-bar" style="background:${p.color}"></div>
      </div>
      <div class="pp-stat">
        <div class="pp-stat-n" style="color:${p.color}">${langCount}</div>
        <div class="pp-stat-l">Languages</div>
        <div class="pp-stat-bar" style="background:${p.color}"></div>
      </div>
      <div class="pp-stat">
        <div class="pp-stat-n" style="color:${p.color}">${p.badge.split('·')[0].trim()}</div>
        <div class="pp-stat-l">Access</div>
        <div class="pp-stat-bar" style="background:${p.color}"></div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="pp-tabs">
      ${p.id==='etvbalb'
        ?'<div class="pp-tab active" data-tab="etvepisodes">Episodes</div>'
        :'<div class="pp-tab active" data-tab="episodes">Episodes</div>'
      }
      <div class="pp-tab" data-tab="movies">${p.id==='etvbalb'?'Broadcast Archive':'Movies'}</div>
      ${spinoffPanel?'<div class="pp-tab" data-tab="spinoffs">Spinoffs</div>':''}
      <div class="pp-tab" data-tab="languages">Languages</div>
      ${castPanel?'<div class="pp-tab" data-tab="cast">Voice Cast</div>':''}
      ${p.id==='etvbalb'?'<div class="pp-tab" data-tab="episodes">Broadcast Info</div>':''}
    </div>

    <!-- Tab Panels -->
    <div class="pp-tab-panels">
      <div class="pp-panel${p.id==='etvbalb'?'':' active'}" id="panel-episodes">${episodePanel}</div>
      ${p.id==='etvbalb'?`<div class="pp-panel active" id="panel-etvepisodes">${etvEpisodesPanel}</div>`:''}
      <div class="pp-panel" id="panel-movies">
        ${p.id==='etvbalb'?'<div class="pp-note" style="margin-bottom:16px;border-left:3px solid #FF6B00;padding-left:14px">These films aired on ETV Bal Bharat in regional language dubs. They are TV broadcast recordings — not available for streaming on demand.</div>':''}
        ${moviesPanel}
      </div>
      ${spinoffPanel?`<div class="pp-panel" id="panel-spinoffs"><div class="spinoff-grid" style="max-width:900px">${spinoffPanel}</div></div>`:''}
      <div class="pp-panel" id="panel-languages">${langsPanel}</div>
      ${castPanel?`<div class="pp-panel" id="panel-cast">${castPanel}</div>`:''}
    </div>

    ${renderFooterHTML()}
  `;

  app.appendChild(pg);

  // Tab switching
  pg.querySelectorAll('.pp-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      pg.querySelectorAll('.pp-tab').forEach(t=>t.classList.remove('active'));
      pg.querySelectorAll('.pp-panel').forEach(panel=>panel.classList.remove('active'));
      tab.classList.add('active');
      const panel=document.getElementById('panel-'+tab.dataset.tab);
      if(panel){
        panel.classList.add('active');
        const provScroll=panel.querySelector('.pp-provider-grid-new');
        if(provScroll) addDragScroll(provScroll);
      }
    });
  });

  // Animate hero image + logo entrance
  setTimeout(()=>{
    const img=document.getElementById('pp-hero-img');
    if(img)img.classList.add('loaded');
    const logoWrap=pg.querySelector('.pp-hero-logo-wrap');
    if(logoWrap)logoWrap.classList.add('logo-entered');
  },80);

  // Parallax on hero bg
  function handleParallax(){
    const heroEl=pg.querySelector('.pp-hero');
    const imgEl=document.getElementById('pp-hero-img');
    if(!heroEl||!imgEl)return;
    const rect=heroEl.getBoundingClientRect();
    if(rect.bottom<0||rect.top>window.innerHeight)return;
    const progress=Math.max(0,Math.min(1,-rect.top/rect.height));
    imgEl.style.transform=`scale(1) translateY(${progress*60}px)`;
  }
  window.addEventListener('scroll',handleParallax,{passive:true});
  window.addEventListener('hashchange',()=>window.removeEventListener('scroll',handleParallax),{once:true});

  setTimeout(()=>{
    refreshHover(); refreshMoviePosters();
    const provScroll=pg.querySelector('.pp-provider-grid-new');
    if(provScroll) addDragScroll(provScroll);
  },100);
}
// ─── MOVIES PAGE ─────────────────────────────────────
function renderMoviesPage(){
  app.innerHTML='';
  window.scrollTo(0,0);
  const pg=document.createElement('div');
  pg.className='page-enter';
  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.heroMovies}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <div class="section-eyebrow">Films</div>
        <h1 class="movies-page-title">All <em>30 Movies</em></h1>
        <p class="movies-page-sub">Every Detective Conan film — click any card for full India availability.</p>
      </div>
    </section>
    <section class="movies-page-body">
      <div class="section-max">
       <div class="movies-page-filter-row">
          <button class="mpf-btn active" data-mf="all">All</button>
          <button class="mpf-btn" data-mf="available">Available in India</button>
          <button class="mpf-btn" data-mf="coming">Coming Soon</button>
          <button class="mpf-btn" data-mf="notavailable">Not in India</button>
        </div>
        <div class="movies-page-filter-row">
          <button class="mpf-btn-lang active" data-ml="all">All Languages</button>
          <button class="mpf-btn-lang" data-ml="engsub">Eng Sub</button>
          <select class="mpf-select" id="dub-select">
            <option value="">Dub Language ▾</option>
            <option value="hindi">Hindi</option>
            <option value="tamil">Tamil</option>
            <option value="telugu">Telugu</option>
            <option value="malayalam">Malayalam</option>
            <option value="kannada">Kannada</option>
            <option value="bengali">Bengali</option>
            <option value="marathi">Marathi</option>
            <option value="gujarati">Gujarati</option>
            <option value="odia">Odia</option>
            <option value="punjabi">Punjabi</option>
            <option value="assamese">Assamese</option>
          </select>
        </div>
        ${PLAT_LEGEND_HTML}
        <div class="movies-big-grid" id="movies-big-grid"></div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  app.appendChild(pg);

  function isAvailable(m){ return m.netflix||m.etv||m.etvwin||m.animetimes||m.pvr; }
  function isComingSoon(m){ return m.comingSoon; }

  function renderGrid(filter){
    const grid=document.getElementById('movies-big-grid');
    if(!grid)return;
    const langFilter=pg.querySelector('.mpf-btn-lang.active')?.dataset.ml||'all';
    const dubVal=pg.querySelector('#dub-select')?.value||'';
    const filtered=MOVIES.filter(m=>{
      if(filter==='available'&&!(isAvailable(m)&&!isComingSoon(m))) return false;
      if(filter==='coming'&&!isComingSoon(m)) return false;
      if(filter==='notavailable'&&(isAvailable(m)||isComingSoon(m))) return false;
      if(langFilter==='engsub'&&!(m.netflix||m.animetimes)) return false;
      if(dubVal==='hindi'&&!(m.animetimes||m.etv||m.etvwin)) return false;
      if(dubVal==='tamil'&&!(( ENABLE_TAMIL_ANIMETIMES&&m.animetimes)||m.etv||m.etvwin)) return false;
      if(dubVal&&dubVal!=='hindi'&&dubVal!=='tamil'&&!(m.etv||m.etvwin)) return false;
      return true;
    });
    grid.innerHTML=filtered.map((m,i)=>`
      <div class="movie-big-card stagger" data-movie-id="${m.id}" onclick="openMovieModal('${m.id}')" style="--card-accent:${m.colors[1]};--card-color0:${m.colors[0]}">
        <div class="mbc-poster" style="background-image:url('${getMoviePoster(m,i+2)}');background-color:${m.colors[0]}">
          <div class="mbc-poster-dots"><div class="season-card-dots">${movieDots(m)}</div></div>
        </div>
        <div class="mbc-body">
          <div class="mbc-num">${m.n}</div>
          <div class="mbc-status ${isComingSoon(m)?'soon':isAvailable(m)?'yes':'no'}">${isComingSoon(m)?'Coming Soon':isAvailable(m)?'✓ In India':'Not in India'}</div>
          <div class="mbc-title">${m.title}</div>
          <div class="mbc-meta">${m.year} · Movie ${m.n}</div>
          <div class="mbc-desc">${m.desc}</div>
        </div>
      </div>`).join('');
    setTimeout(()=>{observeAll();refreshHover();},80);
  }

  renderGrid('all');

let activeFilter='all';
  pg.querySelectorAll('.mpf-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      pg.querySelectorAll('.mpf-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter=btn.dataset.mf;
      renderGrid(activeFilter);
    });
  });
  pg.querySelectorAll('.mpf-btn-lang').forEach(btn=>{
    btn.addEventListener('click',()=>{
      pg.querySelectorAll('.mpf-btn-lang').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      pg.querySelector('#dub-select').value='';
      renderGrid(activeFilter);
    });
  });
  pg.querySelector('#dub-select').addEventListener('change',()=>{
    pg.querySelectorAll('.mpf-btn-lang').forEach(b=>b.classList.remove('active'));
    renderGrid(activeFilter);
  });

  setTimeout(()=>refreshHover(),100);
}

// ─── TV SHOWS PAGE ───────────────────────────────────
function renderTVShowsPage(){
  app.innerHTML='';
  window.scrollTo(0,0);
  const pg=document.createElement('div');
  pg.className='page-enter';
  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.heroTVShows}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <div class="section-eyebrow">TV Series</div>
        <h1 class="movies-page-title">All <em>${SEASONS.length} Seasons</em></h1>
        <p class="movies-page-sub">Every season of Detective Conan. Click any card for India availability details.</p>
      </div>
    </section>
    <section class="movies-page-body">
      <div class="section-max">
        <div class="movies-page-filter-row">
          <button class="mpf-btn active" data-sf="all">All Seasons</button>
          <button class="mpf-btn" data-sf="available">Available in India</button>
          <button class="mpf-btn" data-sf="notavailable">Not in India</button>
          <button class="mpf-btn" data-sf="airing">Currently Airing</button>
        </div>
        <div class="tv-seasons-grid" id="tv-seasons-grid"></div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  app.appendChild(pg);

  function renderGrid(filter){
    const grid=document.getElementById('tv-seasons-grid');
    if(!grid)return;
    const filtered=SEASONS.filter(s=>{
      const n=parseInt(s.id.slice(1));
      const airing=s.year>=2024;
      if(filter==='available') return s.available;
      if(filter==='notavailable') return !s.available&&!airing;
      if(filter==='airing') return airing;
      return true;
    });
    grid.innerHTML=filtered.map((s,i)=>renderSeasonCard(s,i)).join('');
    setTimeout(()=>{observeAll();refreshHover();},80);
  }

  renderGrid('all');
  pg.querySelectorAll('.mpf-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      pg.querySelectorAll('.mpf-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid(btn.dataset.sf);
    });
  });
  setTimeout(()=>refreshHover(),100);
}

// ─── SPINOFFS PAGE ───────────────────────────────────
function renderSpinoffsPage(){
  app.innerHTML='';
  window.scrollTo(0,0);
  const pg=document.createElement('div');
  pg.className='page-enter';
  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.heroSpinoffs}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <div class="section-eyebrow">Spinoff Series</div>
        <h1 class="movies-page-title">Beyond <em>Conan</em></h1>
        <p class="movies-page-sub">Official Detective Conan spinoff series — available on Netflix India with English and Hindi dub.</p>
      </div>
    </section>
    <section class="movies-page-body">
      <div class="section-max">
        <div class="spinoffs-page-grid">
          ${SPINOFFS.map((sp,i)=>`
            <div class="content-card reveal" style="flex:0 0 220px;height:300px;--card-color0:${sp.colors[0]};--card-color1:${sp.colors[1]}" data-spinoff-id="${sp.id}" onclick="openSpinoffModal('${sp.id}')">
              <div class="content-card-bg" style="background-image:url('${getSpinoffPoster(sp, i+8)}');background-color:${sp.colors[0]}"></div>
              <div class="content-card-bg-overlay"></div>
              <div class="content-card-num">${i+1}</div>
              <div class="content-card-tags"><div class="season-card-dots">${movieDots(sp)}</div></div>
              <div class="content-card-content">
                <div class="content-card-title">${sp.title}</div>
                <div class="content-card-meta">Spinoff · ${sp.year} · ${sp.episodes} eps</div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  app.appendChild(pg);
  setTimeout(()=>{observeAll();refreshHover();},100);
}

// ─── EVENTS PAGE ─────────────────────────────────────
function renderEventsPage(){
  app.innerHTML='';
  window.scrollTo(0,0);
  const pg=document.createElement('div');
  pg.className='page-enter';
  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.heroMerch}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <div class="section-eyebrow">Events</div>
        <h1 class="movies-page-title">India <em>Events</em></h1>
        <p class="movies-page-sub">Detective Conan theatrical screenings, festivals, and events in India.</p>
      </div>
    </section>
    <section class="movies-page-body">
      <div class="section-max">

        <!-- CURRENT EVENTS — add active events here -->
        <div class="events-section-title">🎟️ Current &amp; Upcoming Events</div>
        <div class="events-empty reveal">
          <div class="events-empty-icon">📅</div>
          <div class="events-empty-text">No events currently scheduled.</div>
          <div class="events-empty-sub">Check back soon — theatrical screenings and special events will appear here.</div>
        </div>

        <!-- ARCHIVE — paste completed events here as pvr-card items -->
        <div class="events-section-title" style="margin-top:56px">📦 Past Events &amp; Screenings</div>
        <div class="archive-block reveal">
          <div class="archive-block-header" onclick="toggleArchive('ev-pvr-archive')">
            <div><div class="archive-block-title">🎬 PVR Cinemas — Theatrical Screenings</div><div class="archive-block-sub">Detective Conan films that screened at Indian multiplex cinemas</div></div>
            <div class="archive-chevron" id="ev-pvr-archive-chevron">›</div>
          </div>
          <div class="archive-block-body" id="ev-pvr-archive">
            <div class="pvr-cards-grid" id="ev-pvr-cards-grid"></div>
          </div>
        </div>
        <div class="archive-block reveal" style="margin-top:16px">
          <div class="archive-block-header" onclick="toggleArchive('ev-etv-archive')">
            <div><div class="archive-block-title">📺 ETV Bal Bharat — Movies That Have Aired</div><div class="archive-block-sub">Conan films broadcast on ETV Bal Bharat in regional language dubs</div></div>
            <div class="archive-chevron" id="ev-etv-archive-chevron">›</div>
          </div>
          <div class="archive-block-body" id="ev-etv-archive">
            <div class="pvr-cards-grid" id="ev-etv-cards-grid"></div>
          </div>
        </div>

      </div>
    </section>
    ${renderFooterHTML()}
  `;
  app.appendChild(pg);

  // Render PVR archive copy
  const pvrEl=document.getElementById('ev-pvr-cards-grid');
  if(pvrEl) pvrEl.innerHTML=PVR_EVENTS.map((ev,i)=>renderPVREventCard(ev,i)).join('');

  // Render ETV archive copy
  const etvEl=document.getElementById('ev-etv-cards-grid');
  if(etvEl){
    const etvMovieNums=PLATFORMS.find(p=>p.id==='etvbalb').movies;
    etvEl.innerHTML=etvMovieNums.map((n,i)=>{
      const m=MOVIES.find(mv=>mv.n===n);
      if(!m)return'';
      return`<div class="pvr-card" onclick="openMovieModal('${m.id}')">
        <div class="pvr-card-bg" style="background-image:url('${getImg(i+1)}');background-color:${m.colors[0]}"></div>
        <div class="pvr-card-overlay"></div>
        <div class="pvr-card-content">
          <div class="pvr-type-badge pvr-type-etv">ETV Broadcast</div>
          <div class="pvr-card-title">${m.title}</div>
          <div class="pvr-card-sub">Movie ${m.n} · ${m.year}</div>
        </div>
      </div>`;
    }).join('');
  }

  setTimeout(()=>{observeAll();refreshHover();},100);
}

// ─── MODAL SYSTEM ─────────────────────────────────────
const modal=document.getElementById('modal');
const modalPanel=modal.querySelector('.modal-panel');
const PLATFORM_ROUTE_BY_NAME = {
  'Netflix': 'netflix',
  'Anime Times': 'primevideo',
  'Apple TV': 'appletv',
  'ETV Bal Bharat': 'etvbalb',
  'ETV Win': 'etvwin',
  'PVR Cinemas': null,
  'Coming Soon to India': null,
};
function openModal(html,opts={}){
  modalPanel.innerHTML=html;
  const isFullPage = Boolean(opts.fullPage);
  modal.classList.toggle('modal-fullpage', isFullPage);
  modalPanel.classList.toggle('modal-panel-fullpage', isFullPage);
  modalPanel.classList.toggle('modal-movie-panel', Boolean(opts.movieModal));
  if(isFullPage && !modalPanel.querySelector('.mmh-close')){
    const fpClose = document.createElement('button');
    fpClose.className='modal-fp-close';
    fpClose.textContent='✕';
    fpClose.setAttribute('aria-label','Close');
    fpClose.onclick=closeModal;
    modalPanel.insertBefore(fpClose, modalPanel.firstChild);
  }
  modal.classList.add('open');
  document.body.classList.add('modal-open');
  document.body.style.overflow='hidden';
  initSwipeDismiss();
  // Wire drag-to-scroll on any horizontal scroll containers inside modal
  modalPanel.querySelectorAll('.lm-season-scroll,.lm-movie-scroll,.scroll-row').forEach(addDragScroll);
}
function closeModal(){
  modal.classList.remove('open');
  modal.classList.remove('modal-fullpage');
  modalPanel.classList.remove('modal-panel-fullpage');
  modalPanel.classList.remove('modal-movie-panel');
  document.body.classList.remove('modal-open');
  document.body.style.overflow='';
}
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

function renderWherePlatformLabel(name, color){
  const platform = PLATFORMS.find(p=>p.name===name);
  if(platform?.url){
    return `<a class="modal-where-plat modal-where-plat-link" style="color:${color}" href="${platform.url}" target="_blank" rel="noopener">⬤ ${name} ↗</a>`;
  }
  return `<span class="modal-where-plat" style="color:${color}">⬤ ${name}</span>`;
}

// ─── SWIPE-TO-DISMISS MODAL ──────────────────────────
function initSwipeDismiss(){
  let startY=0,currentY=0,dragging=false,dragSource=null;
  const panel=modalPanel;
  const SWIPE_THRESHOLD=120;
  const CARD_SWIPE_THRESHOLD=150;

  function onStart(e){
    if(modal.classList.contains('modal-fullpage')) return;
    const t=e.touches?e.touches[0]:e;
    const rect=panel.getBoundingClientRect();
    const touchY=t.clientY-rect.top;

    // Check if touching a card element
    const target=e.target;
    const cardSelectors=['.modal-ep','.lm-season-card','.lm-movie-card','.spinoff-card','.content-card','.browse-card','.movie-big-card'];
    const isCard=cardSelectors.some(sel=>target.closest(sel));

    if(isCard){
      dragSource='card';
      startY=t.clientY;
      dragging=true;
      panel.style.transition='none';
    }else if(touchY<=80){
      dragSource='handle';
      startY=t.clientY;
      dragging=true;
      panel.style.transition='none';
    }
  }

  function onMove(e){
    if(!dragging)return;
    const t=e.touches?e.touches[0]:e;
    const deltaY=t.clientY-startY;

    if(dragSource==='card'){
      if(deltaY>30){
        currentY=Math.max(0,deltaY-30);
        panel.style.transform=`translateY(${currentY}px)`;
        const prog=Math.min(currentY/300,1);
        modal.style.background=`rgba(7,7,15,${0.8*(1-prog*0.6)})`;
      }
    }else{
      currentY=Math.max(0,deltaY);
      panel.style.transform=`translateY(${currentY}px)`;
      const prog=Math.min(currentY/300,1);
      modal.style.background=`rgba(7,7,15,${0.8*(1-prog*0.6)})`;
    }
  }

  function onEnd(){
    if(!dragging)return;
    const threshold=dragSource==='card'?CARD_SWIPE_THRESHOLD:SWIPE_THRESHOLD;
    dragging=false;
    panel.style.transition='';
    modal.style.background='';
    if(currentY>threshold){
      closeModal();
    }else{
      panel.style.transform='translateY(0)';
    }
    currentY=0;dragSource=null;
  }

  panel.addEventListener('touchstart',onStart,{passive:true});
  panel.addEventListener('touchmove',onMove,{passive:true});
  panel.addEventListener('touchend',onEnd,{passive:true});
}

// ─── LANGUAGE MODAL ──────────────────────────────────
// Per-language content summary — what does each lang actually have?
// ─── LANGUAGE MODAL — platform-split season + movie grids ────────────────
// Maps platform id → which seasons it carries for a given language key
const LANG_PLATFORM_SEASONS = {
  'English Subtitles': {
    netflix:    ['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S23','S24','S25','S26','S27'],
    primevideo: null, // range-based — use seriesRange [1,97]
    appletv:    null, // range-based — use seriesRange [1,97]
  },
  'Hindi': {
    primevideo: null, // range [1,97]
    appletv:    null, // range [1,97]
    etvbalb:    null, // range [1,538] — ETV
  },
  'Tamil': {
    primevideo: null, // range [1,97] — only when ENABLE_TAMIL_ANIMETIMES
    appletv:    null, // range [1,97] — only when ENABLE_TAMIL_ANIMETIMES
    etvbalb:    null, // range [1,538] — ETV
  },
  'ETV': { // all other dub languages
    etvbalb:    null, // range [1,538]
  },
};

// Feature toggle: Anime Times currently has Hindi dub for episodes, not movies.
// Flip this to true if/when Hindi-dub movie catalog goes live there.
const ENABLE_HINDI_ANIMETIMES_MOVIES = false;
// Feature toggle: Anime Times Tamil dub. Set true if/when Tamil dub launches on Anime Times.
// Covers both episodes and movies (unlike Hindi which is episodes-only for now).
const ENABLE_TAMIL_ANIMETIMES = false;

// Maps platform id → season id list OR range for the lang modal
const LANG_PLATFORM_SEASON_RANGES = {
  'English Subtitles': {
    netflix:    {seasons:['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S23','S24','S25','S26','S27']},
    primevideo: {range:[1,97]},
    appletv:    {range:[1,97]},
  },
  'Hindi': {
    primevideo: {range:[1,97]},
    appletv:    {range:[1,97]},
    etvbalb:    {range:[1,538], etv:true},
  },
  'Tamil': {
    ...(ENABLE_TAMIL_ANIMETIMES ? {primevideo:{range:[1,97]}, appletv:{range:[1,97]}} : {}),
    etvbalb:    {range:[1,538], etv:true},
  },
  'ETV': {
    etvbalb:    {range:[1,538], etv:true},
  },
  'English Dub': {
    etvbalb:    {range:[1,538], etv:true},
  },
};

// Maps platform id → movie filter for the lang modal
function getLangMoviesForPlatform(pid, langKey){
  return MOVIES.filter(m=>{
    if(langKey==='English Subtitles'){
      if(pid==='netflix') return m.netflix;
      if(pid==='primevideo'||pid==='appletv') return m.animetimes;
      return false;
    }
    if(langKey==='English Dub'){
      // Keep disabled for now — English dub is currently episode-focused.
      return false;
    }
    if(langKey==='Hindi'){
      if(pid==='primevideo'||pid==='appletv') return ENABLE_HINDI_ANIMETIMES_MOVIES && m.animetimes;
      if(pid==='etvbalb') return m.etv||m.etvwin;
      return false;
    }
    if(langKey==='Tamil'){
      if(pid==='primevideo'||pid==='appletv') return ENABLE_TAMIL_ANIMETIMES && m.animetimes;
      if(pid==='etvbalb') return m.etv||m.etvwin;
      return false;
    }
    // ETV dub languages
    if(pid==='etvbalb') return m.etv||m.etvwin;
    return false;
  });
}

function buildLangModalSeasonCards(pid, langKey){
  const rangeMap = LANG_PLATFORM_SEASON_RANGES[langKey] || {};
  const platRange = rangeMap[pid];
  if(!platRange) return '';

  let seasons = [];
  if(platRange.seasons){
    seasons = platRange.seasons.map(sid=>SEASONS.find(s=>s.id===sid)).filter(Boolean);
  } else if(platRange.range){
    const [r0,r1] = platRange.range;
    const eps = typeof EPISODES !== 'undefined' ? EPISODES : [];
    if(eps.length){
      const seen = new Set(), seenList = [];
      eps.filter(e=>typeof e.n==='number'&&e.n>=r0&&e.n<=r1).forEach(e=>{
        if(!seen.has(e.season)){seen.add(e.season);seenList.push(e.season);}
      });
      seasons = seenList.map(sid=>SEASONS.find(s=>s.id===sid)).filter(Boolean);
    } else {
      seasons = SEASONS.filter(s=>s.epRange[0]<=r1&&(s.epRange[1]||r1)>=r0);
    }
  }

  if(!seasons.length) return '<p style="color:var(--muted);font-size:13px">No season data available.</p>';

  const color = PLAT_META[pid]?.color || '#888';
  return `<div class="lm-season-scroll">` + seasons.map((s,i)=>{
    const r0 = platRange.range ? platRange.range[0] : s.epRange[0];
    const r1 = platRange.range ? platRange.range[1] : s.epRange[1];
    const epLabel = platRange.seasons
      ? `Eps ${s.epRange[0]}–${s.epRange[1]}`
      : `Eps ${Math.max(s.epRange[0],r0)}–${Math.min(s.epRange[1]||r1,r1)}`;
    return `<div class="lm-season-card" data-season-id="${s.id}" onclick="closeModal();openSeasonModal('${s.id}',${r0},${r1},${pid==='etvbalb'},${pid==='etvbalb'})">
      <div class="lm-season-bg" style="background-image:url('${getSeasonStillByLocalSeasonId(s.id,i+3)}')"></div>
      <div class="lm-season-overlay"></div>
      <div class="lm-season-num" style="color:${color}">${s.id.replace('S','')}</div>
      <div class="lm-season-label">${s.label.replace(/\s*\(\d+\)/,'')}</div>
      <div class="lm-season-eps">${epLabel}</div>
    </div>`;
  }).join('') + `</div>`;
}

function buildLangModalMovieCards(pid, langKey){
  const movies = getLangMoviesForPlatform(pid, langKey);
  if(!movies.length) return '<p style="color:var(--muted);font-size:13px">No movies on this platform.</p>';
  const color = PLAT_META[pid]?.color || '#888';
  return `<div class="lm-movie-scroll">` + movies.map((m,i)=>`
    <div class="lm-movie-card" data-movie-id="${m.id}" onclick="closeModal();openMovieModal('${m.id}')">
      <div class="lm-movie-bg" style="background-image:url('${getMoviePoster(m,i+2)}');background-color:${m.colors[0]}"></div>
      <div class="lm-movie-overlay"></div>
      <div class="lm-movie-num" style="color:${color}">${m.n}</div>
      <div class="lm-movie-title">${m.title}</div>
      <div class="lm-movie-year">${m.year}</div>
    </div>`).join('') + `</div>`;
}

window.openLangModal=function(langName,flag,platforms){
  const isEnglish = langName.includes('Subtitles') || langName==='English Subtitles';
  const isEnglishDub = !isEnglish && (langName==='English' || langName==='English*');
  const isHindi   = langName.includes('Hindi');
  const isTamil   = langName.includes('Tamil') || langName.includes('தமிழ்');
  const langKey   = isEnglish ? 'English Subtitles' : isEnglishDub ? 'English Dub' : isHindi ? 'Hindi' : isTamil ? 'Tamil' : 'ETV';

  // Short summary line
  const summaryMap = {
    'English Subtitles': 'Japanese audio with English subtitles — the widest selection in India.',
    'English Dub': 'English dub is currently limited and selective on ETV Bal Bharat.',
    'Hindi': 'Hindi dub on Anime Times (Eps 1–97, streaming via Prime Video & Apple TV) and ETV Bal Bharat (Eps 1–538, paid DTH/cable at 11PM daily).',
    'Tamil': ENABLE_TAMIL_ANIMETIMES
      ? 'Tamil dub on Anime Times (Eps 1–97, streaming via Prime Video & Apple TV) and ETV Bal Bharat (Eps 1–538, paid DTH/cable at 11PM daily).'
      : 'Available as a TV broadcast on ETV Bal Bharat — requires a paid DTH/cable subscription.',
    'ETV': 'Available as a TV broadcast on ETV Bal Bharat — requires a paid DTH/cable subscription.',
  };
  const summary = summaryMap[langKey];

  // Build platform sections — each with a season grid + movie grid
  // For English dub, append a spinoffs section at the end
  const spinoffSection = isEnglishDub ? (()=>{
    const dubNames = SPINOFFS.flatMap(sp=>sp.languages.dub);
    return `<div class="lm-plat-divider"></div>
      <div class="lm-plat-section">
        <div class="lm-plat-header">
          <div class="lm-plat-dot" style="background:#E50914"></div>
          <div class="lm-plat-name" style="color:#E50914">Netflix</div>
          <div class="lm-plat-detail">Spinoff series · English Dub</div>
          <button class="lm-plat-link" onclick="closeModal();Router.navigate('/spinoffs')">View Spinoffs →</button>
        </div>
        <div class="lm-grid-label">Spinoffs</div>
        <div class="lm-movie-grid">${SPINOFFS.map(sp=>`
          <div class="lm-movie-card" onclick="closeModal();openSpinoffModal('${sp.id}')">
            <div class="lm-movie-img" style="background-image:url('${getSpinoffPoster(sp,9)}');background-color:#111"></div>
            <div class="lm-movie-title">${sp.title}</div>
            <div class="lm-movie-year">${sp.year} · ${sp.episodes} eps</div>
          </div>`).join('')}
        </div>
      </div>`;
  })() : '';

  const platSections = platforms.map(p=>{
    const color = p.color || PLAT_META[p.id]?.color || '#888';
    const seasonCards = buildLangModalSeasonCards(p.id, langKey);
    const movieCards  = buildLangModalMovieCards(p.id, langKey);
    const hasSeasons  = seasonCards && seasonCards.trim() !== '' && !seasonCards.includes('No season data');
    const hasMovies   = movieCards  && !movieCards.includes('No movies');

    // ETV note
    const etvNote = p.id==='etvbalb'
      ? `<div class="lm-etv-note">📡 TV broadcast · 11PM daily · Dubbing is selective — earlier episodes have broadest coverage</div>`
      : '';

    return `
      <div class="lm-plat-section">
        <div class="lm-plat-header">
          <div class="lm-plat-dot" style="background:${color}"></div>
          <div class="lm-plat-name" style="color:${color}">${p.label}</div>
          <div class="lm-plat-detail">${p.detail}</div>
          <button class="lm-plat-link" onclick="closeModal();Router.navigate('/platform/${p.id}')">View Platform →</button>
        </div>
        ${etvNote}
        ${hasSeasons ? `<div class="lm-grid-label">Seasons</div>${seasonCards}` : ''}
        ${hasMovies  ? `<div class="lm-grid-label" style="margin-top:${hasSeasons?16:0}px">Movies</div>${movieCards}` : ''}
      </div>`;
  }).join('<div class="lm-plat-divider"></div>');

  // Resolve the correct VOICE_CAST key from langName (native) or langKey
  const nativeToKey = {
    'हिन्दी':'Hindi', 'தமிழ்':'Tamil', 'తెలుగు':'Telugu',
    'മലയാളം':'Malayalam', 'ಕನ್ನಡ':'Kannada', 'বাংলা':'Bengali',
    'मराठी':'Marathi', 'ગુજરાતી':'Gujarati', 'ଓଡ଼ିଆ':'Odia',
    'ਪੰਜਾਬੀ':'Punjabi', 'অসমীয়া':'Assamese',
    'English Subtitles':'English Sub', 'English':'English Sub',
  };
  const resolvedCastKey = nativeToKey[langName] || nativeToKey[langKey] || langKey;
  const VC_CHECK = typeof VOICE_CAST!=='undefined'?VOICE_CAST:{};
  const hasCast = !!(VC_CHECK[resolvedCastKey]?.length ||
    (resolvedCastKey==='Hindi' && VC_CHECK['Hindi (Anime Times)']?.length));
  const castBtn = hasCast
    ? `<div style="padding:16px 0 0"><button class="lang-cast-btn" style="font-size:13px;padding:8px 18px;border-radius:24px;border-width:1.5px" onclick="closeModal();setTimeout(()=>openCastModal('${resolvedCastKey}','${langName} Voice Cast'),120)">🎙️ View Voice Cast</button></div>`
    : '';

  openModal(`<div class="modal-handle"></div>
    <div class="modal-header">
      <div>
        <div class="modal-badge">Language Guide</div>
        <div class="modal-title">${langName}</div>
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-desc">${summary}${castBtn}</div>
    ${platSections}
    ${spinoffSection}
  `,{fullPage:true});
};

// ─── SEASON MODAL ────────────────────────────────────
window.openSeasonModal=function(sid,r0,r1,showETV,etvOnly){
  if(showETV===undefined)showETV=true;
  if(etvOnly===undefined)etvOnly=false;
  const s=SEASONS.find(x=>x.id===sid);if(!s)return;
  // Filter to numeric n only — excludes malformed specials tagged to wrong seasons in episodes.js
  let eps=(typeof EPISODES!=='undefined'?EPISODES:[]).filter(e=>e.season===sid&&typeof e.n==='number');
  if(r0!==undefined&&r1!==undefined)eps=eps.filter(e=>e.n>=r0&&e.n<=r1);
  if(etvOnly) eps=eps.filter(e=>e.etv);

  function specialStar(sp){
    if(!sp)return'';
    if(sp==='2hr')return' <span class="ep-star ep-star--2" title="2-Hour Special">★★</span>';
    return' <span class="ep-star" title="'+(sp==='1hr'?'1-Hour Special':'Special')+'">★</span>';
  }

  const epGrid=eps.map(e=>{
    const star=specialStar(e.special);
    const etvBadge=showETV&&e.etv?`<span class="modal-ep-etv">📺 ETV</span>`:'';
    const still=getEpisodeStill(e,e.n+1);
    return`<div class="modal-ep${showETV&&e.etv?' modal-ep--etv':''}${ e.special?' modal-ep--special':''}" data-ep-num="${e.n}" onclick="openEpisodeModal(${e.n})">
      <div class="modal-ep-thumb" style="background-image:url('${still}')"></div>
      <div class="modal-ep-body">
        <div class="modal-ep-num">EP ${e.n}${star}</div>
        <div class="modal-ep-title">${e.title}${etvBadge}</div>
      </div>
    </div>`;
  }).join('');

  const etvSummary=showETV&&etvOnly
    ?`<div class="modal-etv-summary"><span style="color:#FF6B00">📺</span> <strong>${etvOnly?eps.length:etvOnly}</strong> of ${eps.length} episodes aired on <strong>ETV Bal Bharat</strong></div>`
    :'';

  const epCountTitle=`<div class="modal-where-title" style="margin-top:16px">${eps.length} Episodes</div>`;

  const seasonThumb=getSeasonStillByLocalSeasonId(s.id,SEASONS.indexOf(s)+3);
  const thumbBanner=`<div class="modal-season-thumb" style="background-image:url('${seasonThumb}')">
    <div class="modal-season-thumb-overlay"></div>
    <div class="modal-season-thumb-num">${s.id}</div>
    <div class="modal-season-thumb-label">${s.label}</div>
    <div class="modal-season-thumb-eps">Eps ${s.epRange[0]}–${s.epRange[1]||'ongoing'} · ${s.year}</div>
  </div>`;

  if(!s.available&&!etvOnly){
    const hasETV=etvOnly?eps.length>0:false;
    openModal(`<div class="modal-handle"></div>
      ${thumbBanner}
      <div class="modal-header">
        <div><div class="modal-badge">TV Series · ${s.label}</div><div class="modal-title">${s.label}</div></div>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-desc">Episodes ${s.epRange[0]}–${s.epRange[1]||'ongoing'} · ${s.year}</div>
      ${hasETV?etvSummary:`<div class="modal-unavail">🚫 <strong>Not Streaming in India</strong><br>${s.unavailableNote}</div>`}
      ${epCountTitle}
      <div class="modal-ep-grid">${epGrid}</div>`,{fullPage:true});
    return;
  }

  const platformIds = etvOnly
    ? [...new Set([...(s.platforms||[]), 'etvbalb'])]
    : (s.platforms||[]);
  const platforms=platformIds.map(pid=>{
    const p=PLATFORMS.find(x=>x.id===pid);
    if(!p) return '';
    const coverage = p.seriesRange
      ? `Eps ${p.seriesRange[0]}–${p.seriesRange[1]}`
      : (Array.isArray(p.seriesSeasons) && p.seriesSeasons.includes(s.id) ? `Eps ${s.epRange[0]}–${s.epRange[1]}` : '');
    const langInfo = `${p.languages?.sub?.length?'Sub ✓':''} ${p.languages?.dub?.length?'| Dub ✓':''}`.trim();
    const detail = [coverage,langInfo].filter(Boolean).join(' · ');
    return `<div class="modal-where-row">${renderWherePlatformLabel(p.name,p.color)}<span class="modal-where-detail">${detail||'Available'}</span></div>`;
  }).join('');

  openModal(`<div class="modal-handle"></div>
    ${thumbBanner}
    <div class="modal-header">
      <div><div class="modal-badge">TV Series</div><div class="modal-title">${s.label}</div></div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-desc">Episodes ${s.epRange[0]}–${s.epRange[1]||'ongoing'} · ${s.year}</div>
    <div class="modal-where-title">Where to Watch in India</div>
    <div class="modal-where">${platforms||'<p style="color:var(--muted);font-size:13px">No streaming info yet.</p>'}</div>
    ${etvSummary}
    ${epCountTitle}
    <div class="modal-ep-grid">${epGrid}</div>`,{fullPage:true});
};

function getEpisodePlatformRows(ep){
  if(!ep) return [];
  return PLATFORMS.reduce((rows,p)=>{
    let hasEpisode=false;

    if(Array.isArray(p.seriesSeasons) && p.seriesSeasons.includes(ep.season)) hasEpisode=true;
    if(Array.isArray(p.seriesRange) && typeof ep.n==='number'){
      const [a,b]=p.seriesRange;
      if(ep.n>=a && ep.n<=b) hasEpisode=true;
    }
    if(p.id==='etvbalb' && !ep.etv) hasEpisode=false;

    if(hasEpisode){
      const sub=(p.languages?.sub||[]).join(', ');
      const dub=(p.languages?.dub||[]).join(', ');
      let langLine='';
      if(sub) langLine=`Sub: ${sub}`;
      if(dub) langLine += `${langLine?' | ':''}Dub: ${dub}`;
      rows.push({
        name:p.name,
        color:p.color||'#888',
        detail:langLine||'Language info unavailable'
      });
    }
    return rows;
  },[]);
}

window.openEpisodeModal=function(epNum){
  const ep=(typeof EPISODES!=='undefined'?EPISODES:[]).find(e=>e.n===Number(epNum));
  if(!ep) return;

  const meta=getEpisodeMeta(ep)||{};
  const image=meta.still || getImg(ep.n+1);
  const overview=(meta.overview && meta.overview.trim()) || 'No TMDB description available for this episode yet.';
  const rows=getEpisodePlatformRows(ep);
  const _epf=id=>PLATFORMS.find(p=>p.id===id);
  const platforms=rows.map(w=>{
    const pid=PLATFORM_ROUTE_BY_NAME[w.name];
    const pObj=pid?_epf(pid):null;
    if(w.name==='ETV Bal Bharat')
      return `<button class="watch-btn" onclick="closeModal();Router.navigate('/platform/etvbalb');setTimeout(()=>{const t=document.querySelector('.pp-tab[data-tab=episodes]');if(t)t.click();},350);" style="--btn-color:#FF6B00;--btn-bg:#1a0a00;width:100%;border:1.5px solid #FF6B00"><span class="watch-btn-name">${w.name}</span><span class="watch-btn-detail">${w.detail}</span></button>`;
    if(pObj?.url)
      return `<a class="watch-btn" href="${pObj.url}" target="_blank" rel="noopener" style="--btn-color:${w.color};--btn-bg:#111"><span class="watch-btn-name">${w.name}</span><span class="watch-btn-detail">${w.detail}</span></a>`;
    return `<div class="watch-btn watch-btn--nolink" style="--btn-color:${w.color};--btn-bg:#111"><span class="watch-btn-name">${w.name}</span><span class="watch-btn-detail">${w.detail}</span></div>`;
  }).join('');

  openModal(`<div class="modal-handle"></div>
    <div class="modal-season-thumb" style="background-image:url('${image}')">
      <div class="modal-season-thumb-overlay"></div>
      <div class="modal-season-thumb-num">EP ${ep.n}</div>
      <div class="modal-season-thumb-label">${ep.title}</div>
      <div class="modal-season-thumb-eps">${ep.season} · ${ep.aired||'Air date unknown'}</div>
    </div>
    <div class="modal-header">
      <div><div class="modal-badge">Episode Details</div><div class="modal-title">EP ${ep.n} · ${ep.title}</div></div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-desc">${overview}</div>
    <div class="modal-where-title">Where to Watch in India</div>
    <div class="watch-btns">${platforms||'<p style="color:var(--muted);font-size:13px">No platform data available.</p>'}</div>
  `,{fullPage:true});
};

// ─── MOVIE MODAL ─────────────────────────────────────
window.openMovieModal=function(mid){
  const m=MOVIES.find(x=>x.id===mid);if(!m)return;
  const poster=getMoviePoster(m, MOVIES.indexOf(m)+2);
  const watchBtns=[];
  if(m.netflix)    watchBtns.push({name:'Netflix',   color:'#E50914',bg:'#1a0000',detail:'English Sub · Japanese Audio',url:m.netflixUrl});
  if(m.etv)        watchBtns.push({name:'ETV Bal Bharat',color:'#FF6B00',bg:'#1a0a00',detail:'TV · Multi-language Dub',url:'#etv',isInternal:true});
  if(m.etvwin)     watchBtns.push({name:'ETV Win',   color:'#FF9500',bg:'#1a0a00',detail:'Online · Dubbed',url:'https://www.etvwin.com'});
  if(m.animetimes) watchBtns.push({name:'Anime Times',color:'#1A98FF',bg:'#001a33',detail:'English Sub + Hindi Dub'+(ENABLE_TAMIL_ANIMETIMES?' + Tamil Dub':''),url:m.animetimesUrl});
  if(m.animetimes) watchBtns.push({name:'Apple TV',  color:'#A2AAAD',bg:'#1a1a1a',detail:'via Anime Times · Eng Sub + Hindi Dub',url:'https://tv.apple.com/in/show/case-closed-detective-conan/umc.cmc.o4e5fbtkmgjivlpghedf8a6x'});
  if(m.pvr)        watchBtns.push({name:'PVR Cinemas',color:'#D4A017',bg:'#1a1400',detail:m.pvrDetail||'Theatrical Screening',url:'https://www.pvrcinemas.com'});
  if(m.comingSoon) watchBtns.push({name:'Coming Soon',color:'#888',bg:'#1a1a1a',detail:'Details TBA',url:null});
  const rows=watchBtns.map(w=>{
    if(!w.url) return `<div class="watch-btn watch-btn--nolink" style="--btn-color:${w.color};--btn-bg:${w.bg}"><span class="watch-btn-name">${w.name}</span><span class="watch-btn-detail">${w.detail}</span></div>`;
    if(w.isInternal) return `<button class="watch-btn" onclick="closeModal();Router.navigate('/platform/etvbalb');setTimeout(()=>{const t=document.querySelector('.pp-tab[data-tab=episodes]');if(t)t.click();},350);" style="--btn-color:${w.color};--btn-bg:${w.bg};width:100%;border:1.5px solid var(--btn-color)"><span class="watch-btn-name">${w.name}</span><span class="watch-btn-detail">${w.detail}</span></button>`;
    return `<a class="watch-btn" href="${w.url}" target="_blank" rel="noopener" style="--btn-color:${w.color};--btn-bg:${w.bg}"><span class="watch-btn-name">${w.name}</span><span class="watch-btn-detail">${w.detail}</span></a>`;
  }).join('');

  const available=watchBtns.length>0&&!m.comingSoon;
  const statusBadge=m.comingSoon
    ?`<span class="mmb-status mmb-status--soon">Coming Soon</span>`
    :available
      ?`<span class="mmb-status mmb-status--yes">✓ Available in India</span>`
      :`<span class="mmb-status mmb-status--no">Not in India</span>`;

  openModal(`
    <div class="modal-handle"></div>
    <button class="modal-close mmh-close" onclick="closeModal()">✕</button>
    <div class="modal-movie-layout">
      <div class="mml-poster-wrap" style="background-color:${m.colors[0]}">
        <img class="mml-poster-img" src="${poster}" alt="${m.title} poster" loading="lazy">
      </div>
      <div class="mml-body">
        <div class="mmh-badge">Movie ${m.n} · ${m.year}</div>
        <div class="mmh-title">${m.title}</div>
        <div style="margin:8px 0 12px">${statusBadge}</div>
        <p class="modal-desc">${m.desc}</p>
        <div class="modal-where-title">Where to Watch in India</div>
        <div class="watch-btns">${rows||'<p style="color:var(--muted);font-size:13px">Not yet available on any Indian platform.</p>'}</div>
      </div>
    </div>
  `,{fullPage:true, movieModal:true});

  // If poster isn't cached yet, patch when it arrives (checked at 1s and 4s).
  if(!window.MOVIE_POSTERS.get(m.id)){
    [1000,4000].forEach(ms=>setTimeout(()=>{
      const url=window.MOVIE_POSTERS.get(m.id);
      if(url){
        const el=modalPanel.querySelector('.mml-poster-img');
        if(el && el.src!==url) el.src=url;
      }
    },ms));
  }
};

// ─── SPINOFF MODAL ───────────────────────────────────
window.openSpinoffModal=function(sid){
  const sp=SPINOFFS.find(x=>x.id===sid);if(!sp)return;
  const spImg = getSpinoffPoster(sp, 9);
  openModal(`<div class="modal-handle"></div>
    <div class="modal-movie-hero">
      <div class="mmh-poster" style="background-image:url('${spImg}');background-color:#111"></div>
      <div class="mmh-overlay" style="background:linear-gradient(to right, rgba(7,7,15,0.9) 0%, rgba(7,7,15,0.6) 45%, transparent 100%)"></div>
      <div class="mmh-info">
        <div class="mmh-badge">Spinoff · ${sp.year}</div>
        <div class="mmh-title">${sp.title}</div>
      </div>
      <button class="modal-close mmh-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-movie-body">
      <p class="modal-desc">${sp.episodes} Episodes<br>${sp.desc}</p>
      <div class="modal-where-title">Where to Watch in India</div>
      <div class="modal-where">
        <div class="modal-where-row">
          ${renderWherePlatformLabel('Netflix','#E50914')}
          <span class="modal-where-detail">${sp.languages.dub.map(l=>l+' Dub').join(' · ')} · English Sub</span>
        </div>
      </div>
    </div>`);
};

// ─── PVR MODAL ───────────────────────────────────────
window.openPVRModal=function(eid){
  const ev=PVR_EVENTS.find(x=>x.id===eid);if(!ev)return;
  const m=ev.movieId?MOVIES.find(x=>x.id===ev.movieId):null;
  openModal(`<div class="modal-handle"></div>
    <div class="modal-header">
      <div><div class="modal-badge">PVR Cinemas · ${ev.subtitle}</div><div class="modal-title">${ev.title}</div></div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-desc">${ev.detail}${m?'<br><br>'+m.desc:''}</div>
    ${m?`<div class="modal-where-title">Also Stream Online</div>
    <div class="modal-where">
      ${m.netflix?`<div class="modal-where-row">${renderWherePlatformLabel('Netflix','#E50914')}<span class="modal-where-detail"><a href="https://www.netflix.com/title/80090370" target="_blank" style="color:var(--red)">Watch ↗</a></span></div>`:''}
      ${m.animetimes?`<div class="modal-where-row">${renderWherePlatformLabel('Anime Times','#1A98FF')}<span class="modal-where-detail"><a href="https://www.primevideo.com" target="_blank" style="color:var(--red)">Watch on Anime Times ↗</a></span></div>`:''}
    </div>`:''}
  `,{fullPage:true});
};

// ─── MANGA PAGE ──────────────────────────────────────
async function renderMangaPage(){
  app.innerHTML='';
  window.scrollTo(0,0);
  // Loading state while fetching
  const loading=document.createElement('div');
  loading.style.cssText='min-height:100vh;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase';
  loading.textContent='Fetching manga data…';
  app.appendChild(loading);
  // Jikan API — free, no key needed. MAL ID 1 = Detective Conan manga
  let LATEST_VOL=96;
  let heroCover=IMG.manga96;
  try{
    const res=await fetch('https://api.jikan.moe/v4/manga/1061');
    if(res.ok){
      const j=await res.json();
      if(j.data?.volumes) LATEST_VOL=j.data.volumes;
      if(j.data?.images?.jpg?.large_image_url) heroCover=j.data.images.jpg.large_image_url;
    }
  }catch(e){}
  app.innerHTML='';
  const pg=document.createElement('div');
  pg.className='page-enter';
  const VOLUMES=Array.from({length:LATEST_VOL},(_,i)=>i+1);
  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${heroCover}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <div class="section-eyebrow">Read the Original</div>
        <h1 class="movies-page-title">The <em>Manga</em></h1>
        <p class="movies-page-sub">Case Closed (Detective Conan) · Viz Media · ${LATEST_VOL} Volumes · Available in India</p>
      </div>
    </section>
    <section class="movies-page-body">
      <div class="section-max">
       <div class="manga-page-header">
          <div class="manga-page-buy-links">
            <a href="https://www.amazon.in/s?k=case+closed+manga+viz+media" target="_blank" rel="noopener" class="manga-feature-btn" style="font-size:13px;padding:13px 24px">Amazon India ↗</a>
            <a href="https://www.bookwagon.in/search?q=case+closed+detective+conan" target="_blank" rel="noopener" class="manga-feature-btn manga-feature-btn--outline" style="font-size:13px;padding:13px 24px">BookWagon ↗</a>
          </div>
          <div class="manga-page-sort">
            <button class="mpf-btn active" id="sort-asc">Vol 1 → ${LATEST_VOL}</button>
            <button class="mpf-btn" id="sort-desc">Vol ${LATEST_VOL} → 1</button>
          </div>
        </div>

        <div class="manga-vol-grid" id="manga-vol-grid"></div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  app.appendChild(pg);

  let ascending=true;
  function renderGrid(){
    const grid=document.getElementById('manga-vol-grid');
    if(!grid)return;
    const vols=ascending?[...VOLUMES]:[...VOLUMES].reverse();
    grid.innerHTML=vols.map(n=>`
      <a href="https://www.amazon.in/s?k=case+closed+detective+conan+volume+${n}+viz+media" target="_blank" rel="noopener" class="manga-vol-card reveal" data-manga-vol="${n}">
        <div class="manga-vol-num">${n}</div>
        <div class="manga-vol-img-wrap">
          <div class="manga-vol-img" style="background-image:url('${getMangaCover(n)}')"></div>
        </div>
        <div class="manga-vol-label">Vol. ${n}${n===LATEST_VOL?' <span class="manga-latest-badge">Latest</span>':''}</div>
        <div class="manga-vol-buy">Buy ↗</div>
      </a>`).join('');
    setTimeout(()=>{observeAll();refreshHover();},80);
  }

  renderGrid();
  document.getElementById('sort-asc').addEventListener('click',function(){
    ascending=true;
    this.classList.add('active');
    document.getElementById('sort-desc').classList.remove('active');
    renderGrid();
  });
  document.getElementById('sort-desc').addEventListener('click',function(){
    ascending=false;
    this.classList.add('active');
    document.getElementById('sort-asc').classList.remove('active');
    renderGrid();
  });
  setTimeout(()=>refreshHover(),100);
}

// ─── BROWSE PAGE ─────────────────────────────────────
function renderBrowsePage(){
  app.innerHTML='';
  window.scrollTo(0,0);
  const pg=document.createElement('div');
  pg.className='page-enter';

  const allLanguages=['English Sub','Hindi','Tamil','Telugu','Malayalam','Kannada','Bengali','Marathi','Gujarati','Odia','Punjabi','Assamese'];

  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.heroBrowse}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <div class="section-eyebrow">🔍 Browse</div>
        <h1 class="movies-page-title">Search &amp; <em>Filter</em></h1>
        <p class="movies-page-sub">Every episode, movie and spinoff — search by title or filter by platform, language and type.</p>
      </div>
    </section>
    <section class="movies-page-body">
      <div class="section-max">

        <!-- SEARCH BAR -->
        <div class="browse-search-wrap">
          <span class="browse-search-icon">🔍</span>
          <input class="browse-search-input" id="browseSearch" type="search" placeholder="Search titles, descriptions…" autocomplete="off" spellcheck="false">
          <button class="browse-search-clear" id="browseSearchClear" title="Clear">✕</button>
        </div>

        <!-- FILTERS -->
        <div class="browse-page-filters" id="browse-page-filters">
          <div class="filter-dropdowns" style="margin-bottom:14px">
            <label class="filter-dropdown-group">
              <span class="filter-row-label">Type</span>
              <select class="filter-select" data-bselect="type">
                ${['all','movie','season','spinoff'].map(v=>`<option value="${v}">${v==='all'?'All Content':v==='movie'?'Movies':v==='season'?'Seasons':'Spinoffs'}</option>`).join('')}
              </select>
            </label>
            <label class="filter-dropdown-group">
              <span class="filter-row-label">Platform</span>
              <select class="filter-select" data-bselect="platform">
                ${['all','netflix','primevideo','appletv','etvbalb','etvwin'].map(v=>`<option value="${v}">${v==='all'?'All Platforms':(PLAT_META[v]?.name||v)}</option>`).join('')}
              </select>
            </label>
            <label class="filter-dropdown-group">
              <span class="filter-row-label">Language</span>
              <select class="filter-select" data-bselect="language">
                <option value="all">All Languages</option>
                ${allLanguages.map(l=>`<option value="${l}">${LANG_NATIVE[l]||l}</option>`).join('')}
              </select>
            </label>
          </div>
        </div>

        <div class="browse-page-meta" id="browse-page-meta"></div>
        <div class="browse-grid" id="browse-page-grid"></div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  app.appendChild(pg);

  // State
  const bs={type:'all',platform:'all',language:'all',query:''};

  function syncBrowseFilterControls(){
    pg.querySelectorAll('[data-bselect]').forEach(sel=>{
      const g = sel.dataset.bselect;
      sel.value = bs[g];
    });
  }
  syncBrowseFilterControls();

  pg.querySelectorAll('[data-bselect]').forEach(sel=>{
    sel.addEventListener('change',()=>{
      const g = sel.dataset.bselect;
      bs[g] = sel.value;
      runBrowse();
    });
  });

  // Search input
  const searchEl=document.getElementById('browseSearch');
  const clearBtn=document.getElementById('browseSearchClear');
  searchEl.addEventListener('input',()=>{
    bs.query=searchEl.value.trim().toLowerCase();
    clearBtn.style.display=bs.query?'flex':'none';
    runBrowse();
  });
  clearBtn.addEventListener('click',()=>{
    searchEl.value='';bs.query='';
    clearBtn.style.display='none';
    searchEl.focus();runBrowse();
  });

  function itemVisible(item,type){
    // type filter
    if(bs.type!=='all'&&bs.type!==type) return false;
    // platform filter
    if(bs.platform!=='all'){
      if(type==='movie'){if(!getMoviePlatforms(item).includes(bs.platform)) return false;}
      else if(type==='season'){if(!(item.platforms||[]).includes(bs.platform)) return false;}
      else if(type==='spinoff'){if(bs.platform!=='netflix') return false;}
    }
    // language filter
    if(bs.language!=='all'){
      let langs;
      if(type==='movie') langs=getMovieLangs(item);
      else if(type==='season') langs=getSeasonLangs(item);
      else langs=new Set(['English Sub','Hindi','English']);
      if(!langs.has(bs.language)) return false;
    }
    // text search — for seasons also match against individual episode titles/numbers
    if(bs.query){
      const hay=[
        type==='movie'?item.title:'',
        type==='movie'?item.desc:'',
        type==='season'?item.label:'',
        type==='spinoff'?item.title:'',
        type==='spinoff'?item.desc:'',
      ].join(' ').toLowerCase();
      // Also check if query matches any episode in this season
      let epMatch=false;
      if(type==='season'&&typeof EPISODES!=='undefined'){
        const num=parseInt(bs.query,10);
        epMatch=EPISODES.some(e=>
          e.season===item.id&&(
            (typeof e.n==='number'&&e.n===num)||
            (e.title&&e.title.toLowerCase().includes(bs.query))
          )
        );
      }
      if(!hay.includes(bs.query)&&!epMatch) return false;
    }
    return true;
  }

  function runBrowse(){
    const grid=document.getElementById('browse-page-grid');
    const meta=document.getElementById('browse-page-meta');
    if(!grid)return;

    const q=bs.query;
    const num=q?parseInt(q,10):NaN;

    // Episode-level results when query looks like an episode number or title fragment
    let epResults=[];
    if(q&&typeof EPISODES!=='undefined'&&bs.type==='all'){
      const matched=EPISODES.filter(e=>
        typeof e.n==='number'&&(
          (!isNaN(num)&&e.n===num)||
          (e.title&&e.title.toLowerCase().includes(q))
        )
      ).slice(0,24);
      epResults=matched.map(e=>{
        const s=SEASONS.find(x=>x.id===e.season)||{};
        return`<div class="browse-card ep-result-card" onclick="openEpisodeModal(${e.n})">
          <div class="browse-card-img" style="background-image:url('${getEpisodeStill(e,e.n+1)}')"></div>
          <div class="browse-card-grad"></div>
          <div class="browse-card-num">${e.n}</div>
          <div class="browse-card-badges"><span class="tag tag-plex" style="font-size:8px">EP</span></div>
          <div class="browse-card-content">
            <div class="browse-card-type">${s.label||e.season} · ${e.etv?'ETV ·':''} ${e.special?'Special':''}</div>
            <div class="browse-card-title">${e.title}</div>
          </div>
        </div>`;
      });
    }

    const items=[
      ...MOVIES.map((m,i)=>({item:m,type:'movie',idx:i})),
      ...SEASONS.map((s,i)=>({item:s,type:'season',idx:i})),
      ...SPINOFFS.map((sp,i)=>({item:sp,type:'spinoff',idx:i})),
    ].filter(({item,type})=>itemVisible(item,type));

    const totalCount=epResults.length+items.length;
    meta.textContent=`Showing ${totalCount} result${totalCount!==1?'s':''}${q?' for "'+searchEl.value+'"':''}`;

    if(totalCount===0){
      grid.innerHTML=`<div class="no-results empty-state" style="grid-column:1/-1"><div class="empty-state-illustration">🧭</div><div class="empty-state-title">No results found</div><div class="empty-state-sub">Try a different title or episode number, or reset all filters to return to the full catalog.</div><button class="empty-state-action" onclick="Router.navigate('/browse')">Reset Browse</button></div>`;
      return;
    }

    const epSection=epResults.length
      ?`<div class="browse-ep-heading" style="grid-column:1/-1">Episodes (${epResults.length})</div>${epResults.join('')}`
      :'';
    const cardSection=items.length
      ?`${epResults.length?'<div class="browse-ep-heading" style="grid-column:1/-1">Series, Movies &amp; More ('+items.length+')</div>':''}`
        +items.map(({item,type,idx})=>renderBrowseCard(item,type,idx)).join('')
      :'';

    grid.innerHTML=epSection+cardSection;
    setTimeout(()=>{observeAll();refreshHover();},60);
  }

  runBrowse();
  setTimeout(()=>{refreshHover();searchEl.focus();},120);
}

// ─── LANGUAGES PAGE ──────────────────────────────────
function renderLanguagesPage(){
  app.innerHTML='';
  window.scrollTo(0,0);
  const pg=document.createElement('div');
  pg.className='page-enter';

  const dubLangs=[
    {lang:'Hindi',    flag:'🇮🇳', native:'हिन्दी',   platforms:[{label:'Anime Times',    id:'primevideo', detail:'Eps 1–97',     color:'#1A98FF'},{label:'ETV Bal Bharat',id:'etvbalb',    detail:'Eps 1–538',    color:'#FF6B00'}], hasMovies:true, hasSpinoffs:true},
    {lang:'Tamil',    flag:'🏴',  native:'தமிழ்',    platforms:[...(ENABLE_TAMIL_ANIMETIMES?[{label:'Anime Times',id:'primevideo',detail:'Eps 1–97',color:'#1A98FF'}]:[]),{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}], hasMovies:true, hasSpinoffs:false},
    {lang:'Telugu',   flag:'🏴',  native:'తెలుగు',   platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}], hasMovies:true, hasSpinoffs:false},
    {lang:'Malayalam',flag:'🏴',  native:'മലയാളം',   platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}], hasMovies:true, hasSpinoffs:false},
    {lang:'Kannada',  flag:'🏴',  native:'ಕನ್ನಡ',    platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}], hasMovies:true, hasSpinoffs:false},
    {lang:'Bengali',  flag:'🏴',  native:'বাংলা',    platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}], hasMovies:true, hasSpinoffs:false},
    {lang:'Marathi',  flag:'🏴',  native:'मराठी',    platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}], hasMovies:true, hasSpinoffs:false},
    {lang:'Gujarati', flag:'🏴',  native:'ગુજરાતી',  platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}], hasMovies:true, hasSpinoffs:false},
    {lang:'Odia',     flag:'🏴',  native:'ଓଡ଼ିଆ',    platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}], hasMovies:true, hasSpinoffs:false},
    {lang:'Punjabi',  flag:'🏴',  native:'ਪੰਜਾਬੀ',   platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}], hasMovies:true, hasSpinoffs:false},
    {lang:'Assamese', flag:'🏴',  native:'অসমীয়া',  platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Eps 1–538',color:'#FF6B00'}], hasMovies:true, hasSpinoffs:false},
    {lang:'English', flag:'🇬🇧', native:'English',  platforms:[{label:'ETV Bal Bharat',id:'etvbalb',detail:'Limited English dub · select episodes',color:'#FF6B00'}], hasMovies:false, hasSpinoffs:false},
  ];

  const subPlatforms=[
    {label:'Netflix',    id:'netflix',    detail:'S1–10, S23–28 + all movies', color:'#E50914', eps:'302 + 212 eps', movies:'26 Movies'},
    {label:'Anime Times',id:'primevideo', detail:'Eps 1–97 via Prime Video & Apple TV',          color:'#1A98FF', eps:'97 eps',        movies:'11 Movies'},
    {label:'Apple TV',   id:'appletv',    detail:'Eps 1–97 via Anime Times',              color:'#A2AAAD', eps:'97 eps',        movies:'11 Movies'},
  ];

  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.heroLangs}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <div class="section-eyebrow">Accessibility</div>
        <h1 class="movies-page-title">Languages <em>Guide</em></h1>
        <p class="movies-page-sub">Detective Conan in India — 13 languages across streaming and TV broadcast.</p>
      </div>
    </section>
    <section class="movies-page-body">
      <div class="section-max">

        <!-- ENGLISH SUBTITLES -->
        <div class="lang-page-section-title">🇬🇧 English Subtitles — Streaming</div>
        <p style="font-size:14px;color:var(--muted);margin-bottom:24px">Japanese audio with English subtitles — available across four platforms, offering the widest episode and movie selection in India.</p>
        <div class="lang-page-sub-grid">
          ${subPlatforms.map(p=>`
            <div class="lang-page-plat-card" onclick="openLangModal('English Subtitles','🇬🇧',${JSON.stringify([{label:p.label,id:p.id,detail:p.detail,color:p.color}]).replace(/"/g,"'")})">              <div class="lang-page-plat-color" style="background:${p.color}"></div>
              <div class="lang-page-plat-body">
                <div class="lang-page-plat-name" style="color:${p.color}">${p.label}</div>
                <div class="lang-page-plat-detail">${p.detail}</div>
                <div class="lang-page-plat-pills">
                  <span class="lang-page-pill">📺 ${p.eps}</span>
                  ${p.movies!=='-'?`<span class="lang-page-pill">🎬 ${p.movies}</span>`:''}
                </div>
              </div>
              <div class="lang-page-plat-arrow">→</div>
            </div>`).join('')}
        </div>
        ${(()=>{
          const cast=(typeof VOICE_CAST!=='undefined'?VOICE_CAST:{})["English Sub"]||[];
          if(!cast.length) return '';
          return`<button class="lang-cast-btn" onclick="openCastModal('English Sub','English Dub')"
            style="margin-top:16px">🎙️ View Voice Cast</button>`;
        })()}

        <!-- DUB LANGUAGES -->
        <div class="lang-page-section-title" style="margin-top:64px">🎙️ Dubbed Languages — 12 Languages</div>
        <p style="font-size:14px;color:var(--muted);margin-bottom:24px">All dubs below are broadcast on ETV Bal Bharat nightly at 11PM. Hindi is also available as a streaming dub on Anime Times. Note: dubbing is selective — earlier episodes (roughly Eps 1–200) have the broadest multi-language coverage.</p>
        <div class="lang-page-dub-grid">
          ${dubLangs.map(l=>{
            const VC = typeof VOICE_CAST!=='undefined'?VOICE_CAST:{};
            const cast = VC[l.lang]||[];
            const castAT = l.lang==='Hindi'?(VC['Hindi (Anime Times)']||[]):[];
            const hasCast = cast.length||castAT.length;
            const castStrip = hasCast
              ? `<button class="lang-cast-btn" onclick="event.stopPropagation();openCastModal('${l.lang}','${l.native||l.lang} Voice Cast')">🎙️ View Voice Cast</button>`
              : '';
            return`<div class="lang-page-dub-card" onclick="openLangModal('${l.native||l.lang}','${l.flag}',${JSON.stringify(l.platforms).replace(/"/g,"'")})">              <div class="lang-page-dub-body">
                <div class="lang-page-dub-native">${l.native}</div>
                <div class="lang-page-dub-eng">${l.lang}</div>
                <div class="lang-page-dub-plats">
                  ${l.platforms.map(p=>`<span class="lang-page-dub-dot" style="background:${p.color}" title="${p.label}"></span>`).join('')}
                  ${l.platforms.map(p=>`<span style="font-size:11px;color:${p.color}">${p.label} (${p.detail})</span>`).join('<span style="color:var(--muted);font-size:11px"> · </span>')}
                </div>
                <div class="lang-page-dub-avail">
                  ${l.platforms.map(p=>`<span class="lang-page-pill">📺 ${p.label}: ${p.detail.split('·')[0].trim()}</span>`).join('')}
                  ${l.hasMovies?'<span class="lang-page-pill">🎬 Select Movies</span>':''}
                  ${l.hasSpinoffs?'<span class="lang-page-pill">✨ Spinoffs</span>':''}
                </div>
                ${castStrip}
              </div>
            </div>`;
          }).join('')}
        </div>

        <!-- NOTE -->
        <div class="pp-note reveal" style="margin-top:40px;border-left:3px solid var(--red);padding-left:16px">
          <strong>⚠️ Selective Dubbing on ETV Bal Bharat:</strong> Not every episode exists in every language. Telugu, Tamil, Malayalam and Kannada have good coverage for Eps 1–200. Coverage for later episodes may vary. Always check your local ETV Bal Bharat schedule.
        </div>

      </div>
    </section>
    ${renderFooterHTML()}
  `;
  app.appendChild(pg);
  setTimeout(()=>{observeAll();refreshHover();},100);
}

// ─── ADVOCACY PAGE ───────────────────────────────────
function renderAdvocacyPage(){
  app.innerHTML='';
  window.scrollTo(0,0);
  const pg=document.createElement('div');
  pg.className='page-enter';

  pg.innerHTML=`
    <!-- ADVOCACY STICKY NAV -->
    <nav class="adv-sticky-nav" id="advStickyNav">
      <div class="adv-sticky-inner">
        <button class="adv-sticky-back" onclick="Router.navigate('/')">← Index</button>
        <div class="adv-sticky-links">
          <a onclick="document.getElementById('adv-proof').scrollIntoView({behavior:'smooth'})">The Proof</a>
          <a onclick="document.getElementById('adv-opportunity').scrollIntoView({behavior:'smooth'})">Opportunity</a>
          <a onclick="document.getElementById('adv-letter').scrollIntoView({behavior:'smooth'})">Industry Letter</a>
          <a onclick="document.getElementById('adv-letter-fans').scrollIntoView({behavior:'smooth'})">Fan Letter</a>
        </div>
      </div>
    </nav>

    <!-- ① HERO -->
    <section class="adv-hero" id="adv-hero">
      <div class="adv-hero-texture"></div>
      <div class="adv-hero-content">
        <div class="adv-hero-eyebrow reveal">BBDCI — Bring Back Detective Conan India</div>
        <h1 class="adv-hero-title reveal">
          <span class="adv-hero-line1">THE AUDIENCE</span>
          <span class="adv-hero-line2">IS <em>HERE.</em></span>
        </h1>
        <p class="adv-hero-sub reveal">Detective Conan is one of the world's biggest franchises. India is one of the world's fastest-growing anime markets. There is no official product connecting the two. <strong>That ends here.</strong></p>
        <div class="adv-hero-ctas reveal">
          <button class="adv-btn-primary" onclick="document.getElementById('adv-letter').scrollIntoView({behavior:'smooth'})">Letter to Industry</button>
          <button class="adv-btn-ghost" onclick="document.getElementById('adv-letter-fans').scrollIntoView({behavior:'smooth'})">Letter to Fans</button>
        </div>
      </div>
      <div class="adv-hero-rule"></div>
    </section>

    <!-- ② THE PROOF -->
    <section class="adv-proof" id="adv-proof">
      <div class="adv-section-max">
        <div class="adv-proof-eyebrow reveal">Why India. Why Now.</div>
        <div class="adv-stats-grid">
          <div class="adv-stat reveal" style="transition-delay:0s">
            <div class="adv-stat-n">17<span>+</span></div>
            <div class="adv-stat-l">Years on Indian Television</div>
          </div>
          <div class="adv-stat reveal" style="transition-delay:0.08s">
            <div class="adv-stat-n">1100<span>+</span></div>
            <div class="adv-stat-l">Episodes Available in India</div>
          </div>
          <div class="adv-stat reveal" style="transition-delay:0.16s">
            <div class="adv-stat-n">30</div>
            <div class="adv-stat-l">Theatrical Films</div>
          </div>
          <div class="adv-stat reveal" style="transition-delay:0.24s">
            <div class="adv-stat-n">12</div>
            <div class="adv-stat-l">Indian Language Dubs</div>
          </div>
          <div class="adv-stat reveal" style="transition-delay:0.32s">
            <div class="adv-stat-n">6</div>
            <div class="adv-stat-l">Streaming &amp; Broadcast Platforms</div>
          </div>
          <div class="adv-stat reveal" style="transition-delay:0.40s">
            <div class="adv-stat-n">₹2,500<span>Cr+</span></div>
            <div class="adv-stat-l">India Anime Market by 2030</div>
          </div>
        </div>
        <div class="adv-proof-body reveal">
          <p>Detective Conan captured our hearts on Indian television in since the early 2000s on Hungama and Jetex TV. It currently broadcasts nightly on ETV Bal Bharat in 12 languages, streams 97 Hindi-dubbed episodes on Anime Times, and has previously screened theatrically at PVR Cinemas. A fandom this embedded, this linguistically diverse, this persistent — is not a niche. It is something greater.</p>
          <p style="margin-top:16px">India's anime audience grew at over 70% year-on-year between 2020 and 2024. The demographic skews 18–35, urban, and bilingual. They subscribe to streaming platforms. They buy merchandise. They attend screenings. The infrastructure is in place. The appetite is documented. The only thing missing is an official response for the Detective Conan hole in the market.</p>
        </div>
      </div>
    </section>

    <!-- ③ THE OPPORTUNITY -->
    <section class="adv-opportunity" id="adv-opportunity">
      <div class="adv-section-max">
        <div class="adv-opp-eyebrow reveal">Five Open Doors</div>
        <h2 class="adv-opp-heading reveal">The <em>Opportunity</em></h2>

        <!-- STREAMING — full-bleed asymmetric -->
        <div class="adv-opp-block adv-opp-streaming reveal">
          <div class="adv-opp-number">01</div>
          <div class="adv-opp-content">
            <div class="adv-opp-tag">Streaming</div>
            <h3 class="adv-opp-title">An Official Simulcast</h3>
            <p class="adv-opp-body">The current streaming window covers Episodes 1–97 on Anime Times and select seasons on Netflix — a fraction of the 1,100+ episode run. An official simulcast of new episodes in India, with English subtitles and potential dubs, would be the single largest unlock for the Indian Conan fandom. The platform that makes that move acquires a loyal and engaged audience overnight.</p>
          </div>
          <div class="adv-opp-accent-line"></div>
        </div>

        <!-- MANGA — editorial pull-quote style -->
        <div class="adv-opp-block adv-opp-manga reveal">
          <div class="adv-opp-number">02</div>
          <div class="adv-opp-content">
            <div class="adv-opp-tag">Manga</div>
            <h3 class="adv-opp-title">Official Indian Distribution</h3>
            <p class="adv-opp-body">96+ volumes of Case Closed exist in English. They are ordered from Amazon India as imports. There is no official Indian print run, no regional-language edition, no bookstore presence. India's manga retail market is nascent and growing fast — a first-mover advantage here is real and compounding.</p>
          </div>
          <blockquote class="adv-opp-quote">"96 volumes. No Indian edition. That is not a gap — that is a queue of buyers with nowhere to spend."</blockquote>
        </div>

        <!-- THEATRICAL — counter layout -->
        <div class="adv-opp-block adv-opp-theatrical reveal">
          <div class="adv-opp-number">03</div>
          <div class="adv-opp-content">
            <div class="adv-opp-tag">Theatrical</div>
            <h3 class="adv-opp-title">Annual Film Screenings</h3>
            <p class="adv-opp-body">PVR Cinemas has already screened Detective Conan films in India but that stopped in 2024. The theatrical infrastructure exists. Annual wide releases of the Detective Conan film of the year. The comps are there. The audience is organised and vocal. As fans we want to experience the One of the top Movies in Japan.</p>
          </div>
        </div>

        <!-- MERCHANDISE — sparse, bold -->
        <div class="adv-opp-block adv-opp-merch reveal">
          <div class="adv-opp-number">04</div>
          <div class="adv-opp-content">
            <div class="adv-opp-tag">Merchandise</div>
            <h3 class="adv-opp-title">Licensed Merch in Indian Retail</h3>
            <p class="adv-opp-body">There is no official Detective Conan merchandise available in Indian retail. Fans import at significant cost and inconvenience. The only India-local collaboration to date is an independent photo studio partnership. A licensed merchandise line, distributed through Indian e-commerce and physical retail, enters a market with zero competition from the same IP.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ OPEN LETTERS -->
    <section class="adv-letter-section" id="adv-letter">
      <div class="adv-section-max">
        <div class="adv-letter-eyebrow reveal">An Open Letter</div>
        <div class="adv-letter-card reveal">
          <div class="adv-letter-to">To anyone who can bring Detective Conan to India —</div>
          <div class="adv-letter-body">
            <p>We are not writing to ask for a favour. We are writing to point at an opportunity.</p>
            <p>Detective Conan has been part of India's classic anime culture for nearly two decades thanks to it's run on Hangama and its current presence on ETV Bal Bharat. It has been dubbed into Hindi, Tamil, Telugu, Malayalam, Bengali, and seven other Indian languages unlike any other anime. It broadcasts to Indian households every night.</p>
            <p>This fandom is always proactive and ready to support. It built community wikis, subtitled episodes, organised watch parties, and found every legal avenue available to watch the show it loves. What it has not had is an official product built for it.</p>
            <p>The Indian anime market is no longer a rounding error on a global spreadsheet. It is a primary growth market. And Detective Conan, with its unmatched breadth of Indian-language dubbing and its two-decade broadcast history, is better positioned to capitalise on that growth than almost any other title.</p>
            <p>We are the audience. We are here. We are organised. We are asking — plainly, and on record — for an opportunity for streaming simulcast, a manga distribution deal, regular theatrical releases, official merchandise, and physical media for the Indian market.</p>
            <p>The audience is here. The only thing missing is an official product.</p>
            <p>We hope you'll be the one to build it.</p>
          </div>
          <div class="adv-letter-sig">— The BBDCI Community</div>
          <div class="adv-letter-date">Submitted to distributors, streaming platforms and anyone willing to listen · 2026</div>
        </div>

        <div class="adv-letter-divider reveal"></div>

        <div id="adv-letter-fans" style="scroll-margin-top:110px;height:0;overflow:hidden"></div>
        <div class="adv-letter-eyebrow reveal">A Letter to Fans</div>
        <div class="adv-letter-card reveal">
          <div class="adv-letter-to">To Detective Conan Fans in India —</div>
          <div class="adv-letter-body">
            <p>Detective Conan has been with us for a long time. On TV at odd hours, in languages we grew up speaking, dubbed by artists whose voices became as familiar as the show itself. We found it, we loved it, and we kept watching — even when it wasn't easy.</p>
            <p>That's exactly why we built the Conan India Index. Not because the situation is perfect, but because it isn't. Finding where to watch legally, which platform has which season, which language is available where — it shouldn't be this hard for a show this big. We wanted to make that easier.</p>
            <p>But a guide can only do so much. What actually changes things is official support — a simulcast, a manga on shelves, a film in cinemas. That requires the people who hold the rights to believe there's an audience worth investing in.</p>
            <p>You are that audience. Watch officially where you can. Share the Index with other fans. Make the numbers visible. Every legal stream, every ticket sold, every copy bought is a signal that India is a market worth showing up for.</p>
            <p>We're not asking for much — just that Detective Conan finally gets the India release it deserves. We think it's coming. We're building toward it.</p>
            <p>Until then, we hope this makes it a little easier to find what you're looking for.</p>
          </div>
          <div class="adv-letter-sig">— Bring Back Detective Conan India (BBDCI)</div>
          <div class="adv-letter-date">2026</div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="adv-footer">
      <div class="adv-footer-inner">
        <div class="adv-footer-logo">
          <img src="https://i.postimg.cc/b86XR0Wv/BBDCI-Logo-use-for-dark-mode.png" alt="BBDCI" style="height:28px;opacity:0.7">
          <span>Bring Back Detective Conan India</span>
        </div>
        <div class="adv-footer-links">
          <a onclick="Router.navigate('/')">← Conan India Index</a>
          <a href="https://www.instagram.com/bringbackdetectiveconanindia/" target="_blank" rel="noopener">Instagram ↗</a>
          <a href="https://www.facebook.com/detectivecononindia" target="_blank" rel="noopener">Facebook ↗</a>

          </div>
        <div class="adv-footer-legal">This is a fan advocacy initiative. BBDCI is not affiliated with Gosho Aoyama, Shogakukan, TMS Entertainment, or any rights holder. All trademarks belong to their respective owners.</div>
      </div>
    </footer>
  `;

  app.appendChild(pg);

  // Observe reveals
  setTimeout(()=>observeAll(),80);

  // Fan counter animation
  const counterEl=document.getElementById('advCounter');
  const counterWrap=document.getElementById('advCounterWrap');
  const TARGET=4817;
  let counted=false;
  const counterObs=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting&&!counted){
      counted=true;
      let start=0;
      const dur=2000;
      const step=ts=>{
        if(!start)start=ts;
        const p=Math.min((ts-start)/dur,1);
        const ease=1-Math.pow(1-p,3);
        counterEl.textContent=Math.round(ease*TARGET).toLocaleString('en-IN');
        if(p<1)requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterObs.disconnect();
    }
  },{threshold:0.5});
  if(counterWrap)counterObs.observe(counterWrap);

  // Sticky nav hide/show on scroll
  const stickyNav=document.getElementById('advStickyNav');
  let lastY=0;
  function onAdvScroll(){
    const y=window.scrollY;
    if(y>120){stickyNav.classList.add('adv-sticky-visible');}
    else{stickyNav.classList.remove('adv-sticky-visible');}
    lastY=y;
  }
  window.addEventListener('scroll',onAdvScroll,{passive:true});
  pg.addEventListener('remove',()=>window.removeEventListener('scroll',onAdvScroll));
}

window.openFanLetter=function(){
  const m=document.getElementById('advFanModal');
  if(m){m.classList.add('open');document.body.style.overflow='hidden';}
};
window.closeFanLetter=function(){
  const m=document.getElementById('advFanModal');
  if(m){m.classList.remove('open');document.body.style.overflow='';}
};

window.advFormSubmit=function(e){
  e.preventDefault();
  document.getElementById('advFormWrap').style.display='none';
  document.getElementById('advThankyou').style.display='flex';
  const c=document.getElementById('advCounter');
  const cur=parseInt((c.textContent||'0').replace(/,/g,''),10)||4817;
  c.textContent=(cur+1).toLocaleString('en-IN');
  return false;
};

// ─── MERCH PAGE ──────────────────────────────────────
function renderMerchPage(){
  app.innerHTML='';
  window.scrollTo(0,0);
  const pg=document.createElement('div');
  pg.className='page-enter';
  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.heroMerch}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <div class="section-eyebrow">Fan Experience · India</div>
        <h1 class="movies-page-title">Merch &amp; <em>Events</em></h1>
        <p class="movies-page-sub">Official Detective Conan collaborations and fan experiences available in India.</p>
      </div>
    </section>
    <section class="movies-page-body">
      <div class="section-max">

        <div class="merch-page-tag">📸 Korean Selfie Booth · Official Detective Conan Collab</div>
        <div class="merch-feature-grid reveal" style="margin-top:16px">
          <div class="merch-main-card">
            <div class="merch-card-img" style="background-image:url('${IMG.photosig}')"><div class="merch-card-img-overlay"></div></div>
            <div class="merch-card-body">
              <span class="merch-card-tag">Korean Selfie Booth · Official Detective Conan Collab</span>
              <h3 class="merch-card-title">Photo Signature</h3>
              <p class="merch-card-desc">Photo Signature is a Korean-style self-photo studio running an exclusive Detective Conan collaboration. Conan-themed frames, collector prints, and digital copies via QR code.</p>
              <div class="merch-detail-row"><strong>📍</strong><span>The Grand Venice Mall, Greater Noida, Uttar Pradesh</span></div>
              <div class="merch-detail-row"><strong>📸</strong><span>@photosignature.india on Instagram</span></div>
              <div class="merch-detail-row"><strong>🕐</strong><span>Check Instagram for current hours and availability</span></div>
              <div class="merch-btns">
                <a href="https://www.instagram.com/photosignature.india" target="_blank" rel="noopener" class="merch-btn">📷 Instagram ↗</a>
                <a href="https://maps.google.com/?q=Grand+Venice+Mall+Greater+Noida" target="_blank" rel="noopener" class="merch-btn merch-btn-outline">🗺 Directions ↗</a>
              </div>
            </div>
          </div>
          <div class="merch-info-stack">
            <div class="merch-info-block"><div class="merch-info-icon">📸</div><div class="merch-info-title">Korean-Style 4-Cut Prints</div><div class="merch-info-desc">Classic 4-cut photo strips in exclusive Conan frames. Physical prints + QR digital delivery included.</div></div>
            <div class="merch-info-block"><div class="merch-info-icon">🎴</div><div class="merch-info-title">Collector Photo Cards</div><div class="merch-info-desc">Limited-edition Detective Conan photo card bundles available with select sessions.</div></div>
            <div class="merch-info-block"><div class="merch-info-icon">📍</div><div class="merch-info-title">Grand Venice Mall, Greater Noida</div><div class="merch-info-desc">The only Photo Signature location in India running the official Conan collaboration.</div></div>
          </div>
        </div>

        <!-- PLACEHOLDER for future merch -->
        <div class="pp-note reveal" style="margin-top:48px;text-align:center;padding:32px">
          <div style="font-size:28px;margin-bottom:12px">🛍️</div>
          <strong>More merch coming soon</strong><br>
          <span style="font-size:13px;color:var(--muted)">Know of a Detective Conan collab or event in India? More fan experiences will be listed here as they're confirmed.</span>
        </div>

      </div>
    </section>
    ${renderFooterHTML()}
  `;
  app.appendChild(pg);
  setTimeout(()=>{observeAll();refreshHover();},100);
}

// ─── PLATFORM CAST PANEL ─────────────────────────────
function buildPlatformCastPanel(p){
  const VC = typeof VOICE_CAST!=='undefined'?VOICE_CAST:{};
  let sections = [];

  if(p.id==='etvbalb'){
    const langs = (p.languages?.dub||[]);
    langs.forEach(lang=>{
      const key = lang.replace('*','').trim();
      const cast = VC[key]||[];
      if(!cast.length) return;
      const native = (typeof LANG_NATIVE!=='undefined'?LANG_NATIVE:{})[lang]||lang;
      sections.push({title:`${native} (${key})`, cast});
    });
    // Also add Hindi Anime Times
    const atCast = VC['Hindi (Anime Times)']||[];
    if(atCast.length) sections.push({title:'Hindi — Anime Times Dub', cast:atCast});
  } else if(p.id==='primevideo'||p.id==='animetimes'){
    const cast = VC['Hindi (Anime Times)']||[];
    if(cast.length) sections.push({title:'Hindi Dub (Anime Times)', cast});
  }

  if(!sections.length) return '';

  function castRows(list){
    return list.map(c=>`
      <div class="cm-cast-row">
        <span class="cm-cast-char">${c.character}</span>
        <span class="cm-cast-artist">${c.artist}</span>
      </div>`).join('');
  }

  return sections.map(s=>`
    <div class="pp-cast-section">
      <div class="pp-cast-lang-title">${s.title}</div>
      <div class="pp-cast-table">
        <div class="pp-cast-table-head">
          <span>Character</span><span>Voice Artist</span>
        </div>
        ${castRows(s.cast)}
      </div>
    </div>`).join('<div class="pp-cast-divider"></div>');
}

// ─── CAST MODAL ──────────────────────────────────────
window.openCastModal=function(langKey, title){
  const VC = typeof VOICE_CAST!=='undefined'?VOICE_CAST:{};
  const cast = VC[langKey]||[];
  const castAT = langKey==='Hindi'?(VC['Hindi (Anime Times)']||[]):[];
  if(!cast.length&&!castAT.length) return;

  function castRows(list){
    return list.map(c=>`
      <div class="cm-cast-row">
        <span class="cm-cast-char">${c.character}</span>
        <span class="cm-cast-artist">${c.artist}</span>
      </div>`).join('');
  }

  const html=`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="cm-header">
      <div class="cm-title">🎙️ ${title}</div>
      <div class="cm-sub">Voice Artists</div>
    </div>
    <div class="cm-body">
      ${cast.length&&castAT.length?'<div class="cm-section-label">ETV Bal Bharat Dub</div>':''}
      <div class="cm-cast-list">${castRows(cast)}</div>
      ${castAT.length?`<div class="cm-section-label" style="margin-top:20px">Anime Times Dub</div><div class="cm-cast-list">${castRows(castAT)}</div>`:''}
    </div>`;

  const modal=document.getElementById('modal');
  const panel=modal.querySelector('.modal-panel');
  panel.innerHTML=html;
  modal.classList.add('open');
};

// ─── PVR CARD HELPER ─────────────────────────────────
function renderPVREventCard(ev,i){
  const cls=ev.type==='movie'?'pvr-type-movie':ev.type==='special'?'pvr-type-special':'pvr-type-festival';
  const lbl=ev.type==='movie'?'Movie':ev.type==='special'?'Special':'Festival';
  const poster=getPVREventPoster(ev,i+5);
  const bgSize=ev.poster?'contain':'cover'; // logo-style images need contain
  return`<div class="pvr-card" data-pvr-id="${ev.id}" onclick="openPVRModal('${ev.id}')">
    <div class="pvr-card-bg" style="background-image:url('${poster}');background-color:${ev.colors[0]};background-size:${bgSize}"></div>
    <div class="pvr-card-overlay"></div>
    <div class="pvr-card-content">
      <div class="pvr-type-badge ${cls}">${lbl}</div>
      <div class="pvr-card-title">${ev.title}</div>
      <div class="pvr-card-sub">${ev.subtitle}</div>
    </div>
  </div>`;
}

// ─── INIT ────────────────────────────────────────────
setupNavLinks();
Router.resolve();
setTimeout(() => { fetchTMDBPosters(); fetchTMDBSpinoffPosters(); fetchTMDBPVRSpecialPosters(); fetchMangaCovers(); fetchTMDBEpisodeMeta(); }, 300);

// ─── MOBILE BOTTOM BAR ───────────────────────────────
(function setupMobileBottomBar(){
  const bar = document.getElementById('mobileBottomBar');
  const moreMenu = document.getElementById('mbbMoreMenu');
  const moreHandle = document.getElementById('mbbMoreHandle');
  if(!bar) return;

  // Hide bottom bar on scroll down, show on scroll up (same logic as top nav)
  let mbbLastScroll = 0;
  window.addEventListener('scroll', () => {
    if(bar.dataset.lockedHidden === '1') return;
    const y = window.scrollY;
    if (y < 16) {
      bar.classList.remove('bar-hidden');
    } else if (y > mbbLastScroll && y > 120) {
      bar.classList.add('bar-hidden');
    } else {
      bar.classList.remove('bar-hidden');
    }
    mbbLastScroll = y;
  }, {passive: true});

  function setActive(tabId){
    bar.querySelectorAll('.mbb-tab').forEach(t=>t.classList.toggle('active',t.dataset.mbb===tabId));
  }

  function routeToTab(route){
    if(route==='/' || route==='') return 'home';
    if(route==='/browse') return 'browse';
    if(route==='/languages') return 'languages';
    return 'more';
  }

  bar.querySelectorAll('.mbb-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      const id = tab.dataset.mbb;
      if(id==='more'){
        const isOpen = moreMenu.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        setActive(isOpen ? 'more' : routeToTab(Router.currentRoute));
        return;
      }
      // close more menu if open
      moreMenu.classList.remove('open');
      document.body.style.overflow='';
      setActive(id);
      if(id==='home') Router.navigate('/');
      else if(id==='browse') Router.navigate('/browse');
      else if(id==='languages') Router.navigate('/languages');
    });
  });

  // More menu links
  document.querySelectorAll('.mbb-more-link').forEach(link=>{
    link.addEventListener('click',()=>{
      const target = link.dataset.nav;
      moreMenu.classList.remove('open');
      document.body.style.overflow='';
      if(target) Router.navigate('/'+target);
    });
  });

  // Swipe-down to close More menu
  let moreStartY=0;
  moreMenu.addEventListener('touchstart',e=>{moreStartY=e.touches[0].clientY;},{passive:true});
  moreMenu.addEventListener('touchend',e=>{
    if(e.changedTouches[0].clientY - moreStartY > 60){
      moreMenu.classList.remove('open');
      document.body.style.overflow='';
      setActive(routeToTab(Router.currentRoute));
    }
  },{passive:true});

  // Tap backdrop behind more menu
  document.addEventListener('click',e=>{
    if(moreMenu.classList.contains('open') && !moreMenu.contains(e.target) && !bar.contains(e.target)){
      moreMenu.classList.remove('open');
      document.body.style.overflow='';
    }
  });

  // Sync active tab on route change
  window.addEventListener('hashchange',()=>{
    moreMenu.classList.remove('open');
    document.body.style.overflow='';
    const route = decodeURIComponent(window.location.hash.slice(1)) || '/';
    setActive(routeToTab(route));
  });
})();

function syncMobileContextUI(route){
  const bar = document.getElementById('mobileBottomBar');
  if(!bar) return;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if(!isMobile) return;
  const isPlatformDetail = typeof route === 'string' && route.startsWith('/platform/');
  bar.dataset.lockedHidden = isPlatformDetail ? '1' : '0';
  bar.classList.toggle('bar-hidden', isPlatformDetail);
}

// Edge-swipe right gesture to go back on mobile pages.
(function setupMobileEdgeBackGesture(){
  const _isMobileVP = window.matchMedia('(max-width: 768px)');
  let startX = 0;
  let startY = 0;
  let tracking = false;

  document.addEventListener('touchstart', (e) => {
    if(!_isMobileVP.matches) return;
    if(document.body.classList.contains('modal-open')) return;
    if((Router.currentRoute || '/') === '/') return;
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    tracking = startX <= 24;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if(!tracking) return;
    tracking = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = Math.abs(t.clientY - startY);
    if(dx > 70 && dy < 40){
      if(window.history.length > 1) window.history.back();
      else Router.navigate('/');
    }
  }, { passive: true });
})();