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
  amasiantv: 'https://images.plex.tv/photo?size=large-1920&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F464ba63c-620f-4b2b-8de3-e69c3bc3ee4e%2FAmasian_TV_logo_dark_-_Jason_Hwang.png',
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
const TMDB_IMG   = _isMobileSmall ? 'https://image.tmdb.org/t/p/w154' : 'https://image.tmdb.org/t/p/w185';
const TMDB_TV_ID = 30983; // Detective Conan
const TMDB_STILL = _isMobileSmall ? 'https://image.tmdb.org/t/p/w300' : 'https://image.tmdb.org/t/p/w500';
const TMDB_MODAL_POSTER = 'https://image.tmdb.org/t/p/w500'; // hi-res for modal
window.MOVIE_POSTERS = new Map();
window.SPINOFF_POSTERS = new Map();
window.PVR_SPECIAL_POSTERS = new Map(); // key: pvr event id => TMDB poster url
window.EPISODE_META = new Map();   // key: local episode number => tmdb metadata
window.SEASON_STILLS = new Map();  // key: local season id (S1...) => representative still

function getMoviePosterHiRes(m, fallbackIdx){
  const cached = window.MOVIE_POSTERS.get(m.id);
  if(cached) return cached.replace('/w154/','/w500/').replace('/w185/','/w500/');
  return getImg(fallbackIdx !== undefined ? fallbackIdx : m.n);
}

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

function debounce(fn, delay){
  let t;
  return function(...args){ clearTimeout(t); t = setTimeout(()=>fn.apply(this,args), delay); };
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

  // Also fetch Magic Kaito 1412 episodes
  await fetchMagicKaitoTMDBMeta();
  
  // Mark OVAs as not available in India
  markOVAsAsUnavailable();
  
  // Refresh season images now that we have TMDB data
  refreshEpisodeSeasonVisuals();
}

async function fetchMagicKaitoTMDBMeta(){
  if(typeof MAGIC_KAITO === 'undefined' || !MAGIC_KAITO?.tmdb) return;
  
  try{
    const r = await fetch(`https://api.themoviedb.org/3/tv/${MAGIC_KAITO.tmdb}/season/1?api_key=${TMDB_KEY}&language=en-US`);
    if(!r.ok) return;
    const j = await r.json();
    const tmdbEpisodes = Array.isArray(j.episodes) ? j.episodes : [];
    if(!tmdbEpisodes.length) return;

    const tmdbByEpisodeNo = new Map();
    tmdbEpisodes.forEach(te=>{
      if(typeof te.episode_number==='number') tmdbByEpisodeNo.set(te.episode_number, te);
    });

    // Map Magic Kaito episodes (1-24) to TMDB data
    for(let epNum = 1; epNum <= 24; epNum++){
      const te = tmdbByEpisodeNo.get(epNum);
      if(!te) continue;
      
      // Store in EPISODE_META with a special key format for Magic Kaito
      window.EPISODE_META.set(`mk${epNum}`, {
        still: te.still_path ? (TMDB_STILL + te.still_path) : null,
        overview: te.overview || '',
        name: te.name || '',
        tmdbSeason: 1,
        tmdbEpisode: te.episode_number
      });
    }
  }catch(_e){
    // Silent fail
  }
}

function markOVAsAsUnavailable(){
  if(typeof OVAS === 'undefined' || !Array.isArray(OVAS) || !OVAS.length) return;
  
  // Mark all OVAs and Specials as unavailable in India
  OVAS.forEach(item => {
    item.available = false;
    
    // Set appropriate unavailable note based on type
    const typeLabels = {
      'ova': 'OVAs are not available for streaming in India',
      'magic-file': 'Magic Files are not available for streaming in India',
      'tv-special': 'TV Specials are not available for streaming in India',
      'drama-special': 'Drama Specials are not available for streaming in India',
      'wooo-ova': 'Wooo OVAs are not available for streaming in India',
      'police-academy': 'Police Academy specials are not available for streaming in India',
      'recap-special': 'Recap specials are not available for streaming in India'
    };
    
    item.unavailableNote = typeLabels[item.type] || 'This content is not available for streaming in India';
  });
}

function refreshEpisodeSeasonVisuals(){
  document.querySelectorAll('[data-season-id]').forEach(el=>{
    const sid = el.dataset.seasonId;
    if(!sid) return;
    const url = getSeasonStillByLocalSeasonId(sid, 0);
    const bg = el.querySelector('.season-card-bg,.browse-card-img,.content-card-bg,.lm-season-bg');
    if(bg) {
      // Try to use fallback if image fails
      const fallbackUrl = typeof FALLBACK_IMAGES !== 'undefined' ? getFallbackUrl(url) : url;
      bg.style.backgroundImage = `url('${fallbackUrl}')`;
      // Add gradient backup in case image fails
      bg.style.backgroundColor = '#1a1a1a';
    }
  });

  document.querySelectorAll('[data-ep-num]').forEach(el=>{
    const n = Number(el.dataset.epNum);
    if(!n) return;
    const ep = (typeof EPISODES!=='undefined'?EPISODES:[]).find(x=>x.n===n);
    if(!ep) return;
    const thumb = el.querySelector('.modal-ep-thumb, .episode-horizontal-img');
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
    } else if(hash === '/guides'){
      renderWatchGuidesIndex();
    } else if(hash === '/guide'){
      renderComprehensiveGuide();
    } else if(hash === '/guide/important-episodes'){
      renderImportantEpisodesPage();
    } else if(hash === '/guide/canon-episodes'){
      renderCanonEpisodesPage();
    } else if(hash === '/guide/no-filler'){
      renderNoFillerPage();
    } else if(hash === '/ovas'){
      renderOVAsPage();
    } else if(hash === '/magic-kaito'){
      renderMagicKaitoPage();
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

const NAV_ROUTES = new Set(['movies','tvshows','spinoffs','events','manga','languages','browse','merch','archive','advocacy','guides','guide','guide/important-episodes','guide/canon-episodes','ovas','magic-kaito']);
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

function getMovieLangs(m, platformFilter){
  const langs = new Set();
  
  // If filtering by specific platform, only return languages for that platform
  if (platformFilter && platformFilter !== 'all') {
    if (platformFilter === 'netflix') {
      if (m.netflix) langs.add('English Sub');
    } else if (platformFilter === 'primevideo' || platformFilter === 'appletv') {
      // Anime Times only has English Sub and Hindi
      if (m.animetimes) {
        langs.add('English Sub');
        langs.add('Hindi');
      }
    } else if (platformFilter === 'etvbalb') {
      // ETV Bal Bharat has all regional dubs
      if (m.etv) {
        ['Hindi','Tamil','Telugu','Malayalam','Kannada','Bengali','Marathi','Gujarati','Odia','Punjabi','Assamese'].forEach(l=>langs.add(l));
      }
    } else if (platformFilter === 'etvwin') {
      // ETV Win only has Telugu
      if (m.etvwin) {
        langs.add('Telugu');
      }
    }
    return langs;
  }
  
  // No platform filter - return all languages from all platforms (original behavior)
  if(m.netflix||m.animetimes) langs.add('English Sub');
  if(m.animetimes) langs.add('Hindi');
  if(m.etv||m.etvwin){
    ['Hindi','Tamil','Telugu','Malayalam','Kannada','Bengali','Marathi','Gujarati','Odia','Punjabi','Assamese'].forEach(l=>langs.add(l));
  }
  return langs;
}
function getSeasonLangs(s, platformFilter){
  const langs = new Set();
  const pids = s.platforms||[];
  
  // If filtering by specific platform, only return languages for that platform
  if (platformFilter && platformFilter !== 'all') {
    if (platformFilter === 'netflix') {
      if (pids.includes('netflix')) langs.add('English Sub');
    } else if (platformFilter === 'primevideo' || platformFilter === 'appletv') {
      // Anime Times only has English Sub and Hindi
      if (pids.includes('primevideo') || pids.includes('appletv')) {
        langs.add('English Sub');
        langs.add('Hindi');
      }
    } else if (platformFilter === 'etvbalb') {
      if (pids.includes('etvbalb')) {
        ['Hindi','Tamil','Telugu','Malayalam','Kannada','Bengali','Marathi','Gujarati','Odia','Punjabi','Assamese'].forEach(l=>langs.add(l));
      }
    } else if (platformFilter === 'etvwin') {
      // ETV Win only has Telugu
      if (pids.includes('etvwin')) {
        langs.add('Telugu');
      }
    }
    return langs;
  }
  
  // No platform filter - return all languages from all platforms
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

// ─── EPISODE HELPERS ─────────────────────────────────
function isFiller(ep){
  // TV Original = filler episode (anime original, not based on manga)
  return ep && (ep.src==='TV Original' || ep.src==='TV original' || ep.src==='tv original');
}
function isCanon(ep){
  return ep && !isFiller(ep);
}
function getEpisodeSpecialType(ep){
  if(!ep||!ep.special) return null;
  if(ep.special==='2hr') return '2hr';
  if(ep.special==='1hr') return '1hr';
  return 'special';
}
function episodeMatchesFilter(ep, filters){
  // filters: {canon:'all'|'canon'|'filler', special:'all'|'1hr'|'2hr', etv:'all'|'etv'}
  if(!ep) return false;
  // Canon/Filler filter
  if(filters.canon==='canon' && !isCanon(ep)) return false;
  if(filters.canon==='filler' && !isFiller(ep)) return false;
  // Special filter
  if(filters.special==='1hr' && ep.special!=='1hr') return false;
  if(filters.special==='2hr' && ep.special!=='2hr') return false;
  if(filters.special==='special' && !ep.special) return false;
  // ETV filter
  if(filters.etv==='etv' && !ep.etv) return false;
  return true;
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
          <div class="lcc-new-badge">🆕 New Addition</div>
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
        <div class="browse-grid" id="spinoffs-grid"></div>
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
  initScrollRowTouch();
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

// ─── SCROLL ROW TOUCH HANDLING ───────────────────────
// Provides momentum-on-release for .scroll-row on mobile.
// Native pan-x handles the actual scrolling; this only kicks in for momentum
// after touchend, and only when the gesture is clearly horizontal.
function initScrollRowTouch(){
  document.querySelectorAll('.scroll-row').forEach(row=>{
    if(row._touchScroll) return;
    row._touchScroll=true;

    let startX=0,startY=0,lastX=0,lastTime=0,velX=0,rafId=null;
    let isHoriz=false,decided=false;

    row.addEventListener('touchstart',e=>{
      cancelAnimationFrame(rafId); velX=0;
      startX=lastX=e.touches[0].clientX;
      startY=e.touches[0].clientY;
      lastTime=Date.now(); isHoriz=false; decided=false;
    },{passive:true});

    row.addEventListener('touchmove',e=>{
      const x=e.touches[0].clientX;
      const y=e.touches[0].clientY;
      if(!decided){
        const dx=Math.abs(x-startX), dy=Math.abs(y-startY);
        if(dx<3&&dy<3) return;
        isHoriz=dx>dy; decided=true;
      }
      if(!isHoriz) return;
      const now=Date.now(), dt=now-lastTime||1;
      velX=(lastX-x)/dt*16; // px per frame @60fps
      lastX=x; lastTime=now;
    },{passive:true});

    row.addEventListener('touchend',()=>{
      if(!isHoriz||Math.abs(velX)<1) return;
      // Apply momentum — no scroll-behavior:smooth so this is frame-accurate
      function momentum(){
        velX*=0.93;
        if(Math.abs(velX)<0.4){ velX=0; return; }
        row.scrollLeft+=velX;
        rafId=requestAnimationFrame(momentum);
      }
      rafId=requestAnimationFrame(momentum);
    },{passive:true});
  });
}

// ─── DRAG-TO-SCROLL HELPER (with momentum) ────────────────────
function addDragScroll(el){
  if(!el||el._dragScroll) return;
  el._dragScroll=true;
  let down=false,didDrag=false,startX=0,scrollX=0;
  let lastX=0,lastT=0,velX=0,rafId=0;
  const origSnap=el.style.scrollSnapType;

  function cancelMomentum(){ cancelAnimationFrame(rafId); el.style.scrollBehavior=''; }

  function momentum(){
    velX*=0.91;
    if(Math.abs(velX)<0.5){ velX=0; el.style.scrollBehavior=''; return; }
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
    if(didDrag && Math.abs(velX)>1){ el.style.scrollBehavior='auto'; rafId=requestAnimationFrame(momentum); }
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
    // Add tag badges
    const tags = (typeof MOVIE_TAGS !== 'undefined' ? MOVIE_TAGS.get(m.n) : null) || new Set();
    const tagBadges = Array.from(tags).slice(0, 3).map(tag => {
      const def = (typeof TAG_DEFINITIONS !== 'undefined' ? TAG_DEFINITIONS[tag] : null) || { color: '#666' };
      return `<span class="content-tag" style="--tag-color: ${def.color}; font-size: 8px; padding: 2px 6px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-right: 4px;">${tag}</span>`;
    }).join('');
    return`<div class="browse-card stagger" data-movie-id="${m.id}" data-type="movie" data-tags="${Array.from(tags).join(',')}" onclick="openMovieModal('${m.id}')">
      <div class="browse-card-img" style="background-image:url('${getMoviePoster(m,idx+1)}');background-color:${m.colors[0]}"></div>
      <div class="browse-card-grad"></div>
      <div class="browse-card-num">${m.n}</div>
      <div class="browse-card-content">
        <div class="browse-card-type">Movie · ${m.year}</div>
        <div class="browse-card-title">${m.title}</div>
        <div class="browse-card-meta">${noAnnounce}</div>
        ${tagBadges ? `<div class="browse-card-tags" style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 4px;">${tagBadges}</div>` : ''}
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
  if(type==='ova'){
    const o=item;
    // Map content types to display labels
    const typeLabels = {
      'ova': 'OVA',
      'magic-file': 'Magic File',
      'tv-special': 'TV Special',
      'drama-special': 'Drama Special',
      'wooo-ova': 'Wooo OVA',
      'police-academy': 'Police Academy',
      'recap-special': 'Recap Special'
    };
    const typeLabel = typeLabels[o.type] || 'Special';
    
    // Get display number based on type
    let displayNum = '';
    if (o.type === 'ova') displayNum = `OVA ${o.episodeNumber}`;
    else if (o.type === 'magic-file') displayNum = `MF ${o.episodeNumber}`;
    else if (o.type === 'tv-special') displayNum = `TVS ${o.episodeNumber}`;
    else if (o.type === 'drama-special') displayNum = `DS ${o.episodeNumber}`;
    else if (o.type === 'wooo-ova') displayNum = `WOOO ${o.episodeNumber}`;
    else if (o.type === 'police-academy') displayNum = `PA ${o.episodeNumber}`;
    else displayNum = typeLabel;
    
    // Add tag badges
    const ovaNum = o.episodeNumber || (o.id ? parseInt(o.id.replace(/\D/g, '')) : idx + 1);
    const tags = (typeof OVA_TAGS !== 'undefined' ? OVA_TAGS.get(ovaNum) : null) || new Set();
    const tagBadges = Array.from(tags).slice(0, 3).map(tag => {
      const def = (typeof TAG_DEFINITIONS !== 'undefined' ? TAG_DEFINITIONS[tag] : null) || { color: '#666' };
      return `<span class="content-tag" style="--tag-color: ${def.color}; font-size: 8px; padding: 2px 6px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-right: 4px;">${tag}</span>`;
    }).join('');
    return`<div class="browse-card stagger" data-ova-id="${o.id}" data-type="${o.type || 'ova'}" data-tags="${Array.from(tags).join(',')}" onclick="showOVAModal('${o.id}')">
      <div class="browse-card-img" style="background-image:url('${o.still || getMoviePoster({colors:o.colors}, idx+1)}');background-color:${o.colors[0]}"></div>
      <div class="browse-card-grad"></div>
      <div class="browse-card-num">${displayNum}</div>
      <div class="browse-card-content">
        <div class="browse-card-type">${typeLabel} · ${o.year}</div>
        <div class="browse-card-title">${o.title}</div>
        <div class="browse-card-meta"><span class="tag tag-soon" style="font-size:7px">Special</span></div>
        ${tagBadges ? `<div class="browse-card-tags" style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 4px;">${tagBadges}</div>` : ''}
      </div>
    </div>`;
  }
  if(type==='kaito'){
    const k=item;
    // Use Magic Kaito TMDB poster
    const posterUrl = k.tmdb ? `https://image.tmdb.org/t/p/w500/fjAS5f29mqEshLNzj761d4VkfRe.jpg` : '';
    // Add tag badges - aggregate all Kaito episode tags
    let tags = new Set();
    if (typeof KAITO_TAGS !== 'undefined') {
      for (let i = 1; i <= 24; i++) {
        const epTags = KAITO_TAGS.get(i);
        if (epTags) epTags.forEach(t => tags.add(t));
      }
    }
    const tagBadges = Array.from(tags).slice(0, 3).map(tag => {
      const def = (typeof TAG_DEFINITIONS !== 'undefined' ? TAG_DEFINITIONS[tag] : null) || { color: '#666' };
      return `<span class="content-tag" style="--tag-color: ${def.color}; font-size: 8px; padding: 2px 6px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-right: 4px;">${tag}</span>`;
    }).join('');
    return`<div class="browse-card stagger" data-kaito-id="${k.id}" data-type="kaito" data-tags="${Array.from(tags).join(',')}" onclick="Router.navigate('/magic-kaito')">
      <div class="browse-card-img" style="background-image:url('${posterUrl}');background-color:${k.colors[0]}"></div>
      <div class="browse-card-grad"></div>
      <div class="browse-card-num">24 eps</div>
      <div class="browse-card-content">
        <div class="browse-card-type">Series · ${k.year}</div>
        <div class="browse-card-title">${k.title}</div>
        <div class="browse-card-meta"><span class="tag" style="font-size:7px;background:#FF6B35">Amasian TV</span> English Dub</div>
        ${tagBadges ? `<div class="browse-card-tags" style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 4px;">${tagBadges}</div>` : ''}
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
    <div class="browse-card stagger" data-spinoff-id="${sp.id}" onclick="openSpinoffModal('${sp.id}')">
      <div class="browse-card-img" style="background-image:url('${getSpinoffPoster(sp, i+7)}')"></div>
      <div class="browse-card-grad"></div>
      <div class="browse-card-num">${i+1}</div>
      <div class="browse-card-content">
        <div class="browse-card-type">Spinoff · ${sp.year}</div>
        <div class="browse-card-title">${sp.title}</div>
        <div class="browse-card-meta">${sp.episodes} eps · <span class="tag tag-netflix" style="font-size:7px">Netflix</span></div>
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
  window.scrollTo({top:0,behavior:"instant"});

  const pg=document.createElement('div');
  pg.className='platform-page page-enter';

  // Stats
  let epCount='-',movieCount='-',langCount=0;
  if(p.seriesSeasons) epCount=p.seriesSeasons.length+' Seasons';
  else if(p.seriesRange) epCount='Eps '+p.seriesRange[0]+'–'+p.seriesRange[1];
  else if(p.magicKaitoEpisodes) epCount=p.magicKaitoEpisodes.length+' Episodes';
  if(p.movies==='all') movieCount=MOVIES.length+' Movies';
  else if(Array.isArray(p.movies)) movieCount=p.movies.length+' Movies';
  langCount=(p.languages?.sub?.length||0)+(p.languages?.dub?.length||0);

  // Build content sections for each tab panel
  let episodePanel='', moviesPanel='', langsPanel='', etvEpisodesPanel='';

  // Episodes
  if(p.seriesSeasons){
    episodePanel=`<div class="pp-section-title">Seasons Available</div>
      <div class="browse-grid">
        ${p.seriesSeasons.map((sid,i)=>{
          const s=SEASONS.find(x=>x.id===sid);
          if(!s)return'';
          return`<div class="browse-card" data-season-id="${s.id}" onclick="openSeasonModal('${s.id}')">
            <div class="browse-card-img" style="background-image:url('${getSeasonStillByLocalSeasonId(s.id,i+3)}')"></div>
            <div class="browse-card-grad"></div>
            <div class="browse-card-num">${s.id.replace('S','')}</div>
            <div class="browse-card-content">
              <div class="browse-card-type">Season · ${s.year}</div>
              <div class="browse-card-title">${s.label}</div>
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
        return`<div class="browse-card" data-season-id="${sv.id}" onclick="openSeasonModal('${sv.id}',undefined,undefined,true,true)">
          <div class="browse-card-img" style="background-image:url('${getSeasonStillByLocalSeasonId(sv.id,i+3)}')"></div>
          <div class="browse-card-grad"></div>
          <div class="browse-card-num">${sv.id.replace('S','')}</div>
          <div class="browse-card-content">
            <div class="browse-card-type">Season · ${sv.year}</div>
            <div class="browse-card-title">${sv.label}</div>
            <div class="browse-card-type" style="color:#FF6B00;margin-top:4px">${etvCount} ETV eps</div>
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
          <div class="browse-grid">${etvSeasonCards}</div>`;
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
          return`<div class="browse-card" data-season-id="${sv.id}" onclick="openSeasonModal('${sv.id}',${r0},${r1},false)">
            <div class="browse-card-img" style="background-image:url('${getSeasonStillByLocalSeasonId(sv.id,i+3)}')"></div>
            <div class="browse-card-grad"></div>
            <div class="browse-card-num">${sv.id.replace('S','')}</div>
            <div class="browse-card-content">
              <div class="browse-card-type">Season · ${sv.year}</div>
              <div class="browse-card-title">${sv.label}</div>
              <div class="browse-card-type" style="margin-top:4px">${metaLabel} · ${avail.length} eps</div>
            </div>
          </div>`;
        }).join('');
      })();
      episodePanel=`<div class="pp-section-title">Seasons Available</div>
          <div class="pp-note" style="margin-bottom:16px">Episodes ${p.seriesRange[0]}–${p.seriesRange[1]}${p.languages?.dub?.length?` · ${p.languages.dub.join(' + ')} Dub + Eng Sub`:' · Eng Sub only'}. Click any season for the full episode list.</div>
          <div class="browse-grid">${rangeSeasonCards}</div>`;
    }

  } else if(p.magicKaitoEpisodes && p.magicKaitoEpisodes.length > 0) {
    // Magic Kaito 1412 episodes with TMDB images
    episodePanel=`<div class="pp-section-title">Magic Kaito 1412 Episodes</div>
      <div class="pp-note" style="margin-bottom:16px">All 24 episodes available with English dub. Click any episode for details and watch options.</div>
      <div class="browse-grid" id="magic-kaito-episodes-grid">
        ${p.magicKaitoEpisodes.map((epNum,i)=>{
          const fallbackImages = [
            'https://i.postimg.cc/4Z8C1vqg/Detective-conan-netflix.webp',
            'https://i.postimg.cc/MxskY0N8/sagsfdgsdfhsrzh-ASZgsdbb.jpg',
            'https://i.postimg.cc/b86XR0Wv/BBDCI-Logo-use-for-dark-mode.png',
            'https://i.postimg.cc/X32MgKhT/etv-bal-bharat-conan-at-night-11pm.jpg'
          ];
          const fallbackUrl = fallbackImages[epNum % 4];
          return`<div class="browse-card" onclick="event.preventDefault(); event.stopPropagation(); openMagicKaitoEpisode('episode', ${epNum});" data-episode="${epNum}">
            <div class="browse-card-img" style="background-image:url('${fallbackUrl}')" data-fallback="${fallbackUrl}"></div>
            <div class="browse-card-grad"></div>
            <div class="browse-card-num">${epNum}</div>
            <div class="browse-card-content">
              <div class="browse-card-type">Episode · 2014</div>
              <div class="browse-card-title">Episode ${epNum}</div>
              <div class="browse-card-type" style="margin-top:4px;color:#FF6B35">English Dub</div>
            </div>
          </div>`;
        }).join('')}
      </div>`;
    
    // Load TMDB images after page renders
    setTimeout(() => {
      loadMagicKaitoTMDBImages();
      // setupMagicKaitoEpisodeListeners(); // DISABLED - causing routing conflicts
    }, 1000);
  } else {
    episodePanel=`<div class="pp-note">No series episodes available on this platform.</div>`;
  }

  // OVAs
  if(p.ovas && p.ovas.length > 0) {
    const ovaImages = [IMG.ran, IMG.heiji, IMG.kid, IMG.ai];
    const ovaPanel = `<div class="pp-section-title">OVAs</div>
      <div class="browse-grid">
        ${p.ovas.map((ovaId, index) => {
          const ova = OVAS.find(o => o.id === ovaId);
          if (!ova) return '';
          // Use hardcoded still if available, otherwise fallback to character images
          const ovaImage = ova.still || ovaImages[index % ovaImages.length];
          return `<div class="browse-card" onclick="event.preventDefault(); event.stopPropagation(); openMagicKaitoEpisode('ova', '${ova.id}')" data-ep-num="${ova.id}">
            <div class="browse-card-img" style="background-image:url('${ovaImage}'); background-color: ${ova.colors[0]}"></div>
            <div class="browse-card-grad"></div>
            <div class="browse-card-num">OVA</div>
            <div class="browse-card-content">
              <div class="browse-card-type">OVA • ${ova.year}</div>
              <div class="browse-card-title">${ova.title}</div>
              <div class="browse-card-type" style="margin-top:4px;color:#FF6B35">Special</div>
            </div>
          </div>`;
        }).join('')}
      </div>`;
    
    // Add OVA panel after episode panel
    if (episodePanel) {
      episodePanel += ovaPanel;
    } else {
      episodePanel = ovaPanel;
    }
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
      return`<div class="browse-card" data-spinoff-id="${sp.id}" onclick="openSpinoffModal('${sp.id}')">
        <div class="browse-card-img" style="background-image:url('${getSpinoffPoster(sp, i+10)}')"></div>
        <div class="browse-card-grad"></div>
        <div class="browse-card-num">${i+1}</div>
        <div class="browse-card-content">
          <div class="browse-card-type">Spinoff · ${sp.year} · ${sp.episodes} eps</div>
          <div class="browse-card-title">${sp.title}</div>
          <div class="browse-card-meta">${sp.languages.dub.map(l=>`<span class="tag tag-etv">${l} Dub</span>`).join('')} <span class="tag tag-netflix">Eng Sub</span></div>
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
      ${spinoffPanel?`<div class="pp-panel" id="panel-spinoffs"><div class="browse-grid" style="max-width:900px">${spinoffPanel}</div></div>`:''}
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
    // Add drag scroll to all season carousels
    pg.querySelectorAll('.scroll-row').forEach(addDragScroll);
  },100);
}
// ─── MOVIES PAGE ─────────────────────────────────────
function renderMoviesPage(){
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
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

// ─── TV SHOWS PAGE (All Episodes with Filters) ───────
function renderTVShowsPage(){
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
  const pg=document.createElement('div');
  pg.className='page-enter';

  // Filter state
  let filters={
    canon:'all',       // 'all'|'canon'|'filler'
    special:'all',     // 'all'|'special'|'1hr'|'2hr'
    platform:'all',    // 'all'|'netflix'|'primevideo'|'appletv'|'etvbalb'|'etvwin'
    language:'all',    // 'all'|'engsub'|'hindi'|'tamil'|'telugu'|'malayalam'|'kannada'|'bengali'|'marathi'|'gujarati'|'odia'|'punjabi'|'assamese'
    indiaOnly:false,   // true|false - show only available in India
    search:'',         // text search
  };

  // Calculate stats
  const allEps=typeof EPISODES!=='undefined'?EPISODES:[];
  const fillerCount=allEps.filter(isFiller).length;
  const canonCount=allEps.length-fillerCount;
  const specialCount=allEps.filter(e=>e.special).length;
  const hr1Count=allEps.filter(e=>e.special==='1hr').length;
  const hr2Count=allEps.filter(e=>e.special==='2hr').length;
  const etvCount=allEps.filter(e=>e.etv).length;
  // Count available episodes in India
  const availableEps=allEps.filter(e=>{
    const rows=getEpisodePlatformRows(e);
    return rows.length>0;
  }).length;

  // Platform options
  const platformOpts=[
    {id:'all',label:'All Platforms'},
    {id:'netflix',label:'Netflix'},
    {id:'primevideo',label:'Prime Video'},
    {id:'appletv',label:'Apple TV'},
    {id:'etvbalb',label:'ETV Bal Bharat'},
    {id:'etvwin',label:'ETV Win'},
  ];

  // Language options
  const langOpts=[
    {id:'all',label:'All Languages'},
    {id:'engsub',label:'English Sub'},
    {id:'hindi',label:'हिन्दी Hindi'},
    {id:'tamil',label:'தமிழ் Tamil'},
    {id:'telugu',label:'తెలుగు Telugu'},
    {id:'malayalam',label:'മലയാളം Malayalam'},
    {id:'kannada',label:'ಕನ್ನಡ Kannada'},
    {id:'bengali',label:'বাংলা Bengali'},
    {id:'marathi',label:'मराठी Marathi'},
    {id:'gujarati',label:'ગુજરાતી Gujarati'},
    {id:'odia',label:'ଓଡ଼ିଆ Odia'},
    {id:'punjabi',label:'ਪੰਜਾਬੀ Punjabi'},
    {id:'assamese',label:'অসমীয়া Assamese'},
  ];

  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.heroTVShows}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <div class="section-eyebrow">TV Series · All Episodes</div>
        <h1 class="movies-page-title">All <em>${allEps.length} Episodes</em></h1>
        <p class="movies-page-sub">${canonCount} Canon · ${fillerCount} Filler · ${specialCount} Specials · ${etvCount} on ETV · ${availableEps} Available in India</p>
      </div>
    </section>
    <section class="movies-page-body">
      <div class="section-max">
        <!-- FILTERS -->
        <div class="tv-filter-bar">
          <div class="tv-filter-row">
            <select class="tv-filter-select" id="tvf-canon">
              <option value="all">Canon & Filler</option>
              <option value="canon">Canon Only (${canonCount})</option>
              <option value="filler">Filler Only (${fillerCount})</option>
            </select>
            <select class="tv-filter-select" id="tvf-special">
              <option value="all">All Types</option>
              <option value="special">Specials (${specialCount})</option>
              <option value="1hr">1-Hour (${hr1Count})</option>
              <option value="2hr">2-Hour (${hr2Count})</option>
            </select>
            <select class="tv-filter-select" id="tvf-platform">
              ${platformOpts.map(p=>`<option value="${p.id}">${p.label}</option>`).join('')}
            </select>
            <select class="tv-filter-select" id="tvf-language">
              ${langOpts.map(l=>`<option value="${l.id}">${l.label}</option>`).join('')}
            </select>
            <label class="tv-filter-toggle">
              <input type="checkbox" id="tvf-india">
              <span class="tv-toggle-slider"></span>
              <span class="tv-toggle-label">India Only</span>
            </label>
          </div>
        </div>

        <!-- FLOATING SEARCH -->
        <div class="tv-search-float" id="tv-search-float">
          <button class="tv-search-toggle" id="tv-search-toggle" onclick="toggleTVSearch()">
            <span class="tv-search-toggle-icon">🔍</span>
          </button>
          <div class="tv-search-panel" id="tv-search-panel">
            <div class="tv-search-inner">
              <span class="tv-search-icon">🔍</span>
              <input type="search" class="tv-search-input" id="tvf-search" placeholder="Search episodes...">
              <button class="tv-search-close" onclick="toggleTVSearch()">✕</button>
            </div>
          </div>
        </div>

        <!-- EPISODES BY SEASON -->
        <div id="tv-episodes-container"></div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  app.appendChild(pg);

  function specialStar(sp){
    if(!sp)return'';
    if(sp==='2hr')return' <span class="ep-star ep-star--2" title="2-Hour Special">★★</span>';
    return' <span class="ep-star" title="'+(sp==='1hr'?'1-Hour Special':'Special')+'">★</span>';
  }

  // Check if episode is available on a specific platform
  function episodeHasPlatform(ep,platId){
    const rows=getEpisodePlatformRows(ep);
    if(platId==='etvbalb') return !!ep.etv; // etv is a date string or null
    if(platId==='etvwin'){
      return rows.some(r=>r.name.includes('ETV Win'));
    }
    return rows.some(r=>{
      const pid=PLATFORM_ROUTE_BY_NAME[r.name];
      return pid===platId;
    });
  }

  // Check if episode has specific language
  function episodeHasLanguage(ep,langId){
    const rows=getEpisodePlatformRows(ep);
    if(langId==='engsub'){
      return rows.some(r=>{
        if(r.name==='ETV Bal Bharat') return false; // ETV has dubs not subs
        return (r.detail||'').includes('Sub:');
      });
    }
    // Check for specific dub language
    const langMap={'hindi':'Hindi','tamil':'Tamil','telugu':'Telugu','malayalam':'Malayalam','kannada':'Kannada','bengali':'Bengali','marathi':'Marathi','gujarati':'Gujarati','odia':'Odia','punjabi':'Punjabi','assamese':'Assamese'};
    const targetLang=langMap[langId];
    if(!targetLang)return false;
    return rows.some(r=>{
      if(r.name==='ETV Bal Bharat' && ep.etv){
        // ETV has this language if it's in their dub list
        const etvPlat=PLATFORMS.find(p=>p.id==='etvbalb');
        return etvPlat?.languages?.dub?.includes(targetLang);
      }
      return (r.detail||'').toLowerCase().includes(targetLang.toLowerCase());
    });
  }

  // Get platform dots for an episode
  function getEpisodePlatformDots(ep){
    const rows=getEpisodePlatformRows(ep);
    if(!rows.length)return'';
    return`<div class="tv-ep-platforms">${rows.map(r=>`<span class="tv-ep-plat-dot" style="background:${r.color}" title="${r.name}"></span>`).join('')}</div>`;
  }

  function renderEpisodes(){
    const container=document.getElementById('tv-episodes-container');
    if(!container)return;

    // Filter episodes
    let eps=allEps.filter(e=>{
      // Canon/Filler
      if(filters.canon==='canon' && !isCanon(e)) return false;
      if(filters.canon==='filler' && !isFiller(e)) return false;
      // Specials
      if(filters.special==='1hr' && e.special!=='1hr') return false;
      if(filters.special==='2hr' && e.special!=='2hr') return false;
      if(filters.special==='special' && !e.special) return false;
      // Platform + Language (check if language is available ON that specific platform)
      if(filters.platform!=='all' && filters.language!=='all'){
        if(!episodeHasLanguageOnPlatform(e,filters.language,filters.platform)) return false;
      }else if(filters.platform!=='all' && !episodeHasPlatform(e,filters.platform)) return false;
      else if(filters.language!=='all' && !episodeHasLanguage(e,filters.language)) return false;
      // Available in India toggle
      if(filters.indiaOnly){
        const rows=getEpisodePlatformRows(e);
        if(rows.length===0) return false;
      }
      // Search
      if(filters.search){
        const q=filters.search.toLowerCase();
        return e.title.toLowerCase().includes(q) || String(e.n).includes(q);
      }
      return true;
    });


    // Group by season
    const bySeason=new Map();
    eps.forEach(e=>{
      if(!bySeason.has(e.season))bySeason.set(e.season,[]);
      bySeason.get(e.season).push(e);
    });

    // Sort seasons numerically (S1, S2, S3... not S1, S10, S11)
    const sortedSeasons=[...bySeason.keys()].sort((a,b)=>{
      const numA=parseInt(a.replace('S',''));
      const numB=parseInt(b.replace('S',''));
      return numA-numB;
    });

    if(sortedSeasons.length===0){
      container.innerHTML=`<div class="tv-no-results">No episodes match your filters</div>`;
      return;
    }

    container.innerHTML=sortedSeasons.map(sid=>{
      const seasonEps=bySeason.get(sid);
      const s=SEASONS.find(x=>x.id===sid);
      if(!s)return'';

      return`
        <div class="tv-season-section">
          <div class="tv-season-header-static">
            <div class="tv-season-info">
              <span class="tv-season-badge">${sid}</span>
              <span class="tv-season-title">${s.label}</span>
              <span class="tv-season-year">${s.year}</span>
              <span class="tv-season-count">${seasonEps.length} episodes</span>
            </div>
          </div>
          <div class="tv-ep-grid-modal">
            ${seasonEps.map(e=>{
              const star=specialStar(e.special);
              const fillerBadge=isFiller(e)?`<span class="modal-ep-filler">TV Original</span>`:'';
              const etvBadge=e.etv?`<span class="modal-ep-etv">📺 ETV</span>`:'';
              const still=getEpisodeStill(e,e.n+1);
              const platDots=getEpisodePlatformDots(e);
              // No longer adding modal-ep--filler class (removed dimming)
              return`
                <div class="modal-ep${e.etv?' modal-ep--etv':''}${e.special?' modal-ep--special':''}" onclick="openEpisodeModal(${e.n})">
                  <div class="modal-ep-thumb" style="background-image:url('${still}')"></div>
                  <div class="modal-ep-body">
                    <div class="modal-ep-num">EP ${e.n}${star}</div>
                    <div class="modal-ep-title">${e.title}${etvBadge}${fillerBadge}</div>
                    ${platDots}
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>`;
    }).join('');

    setTimeout(()=>{observeAll();},80);
  }

  // Wire up filter handlers
  const canonSel=document.getElementById('tvf-canon');
  const specialSel=document.getElementById('tvf-special');
  const platformSel=document.getElementById('tvf-platform');
  const languageSel=document.getElementById('tvf-language');
  const indiaCheck=document.getElementById('tvf-india');
  const searchInp=document.getElementById('tvf-search');

  // Read initial values from DOM to ensure sync
  filters.canon=canonSel?.value||'all';
  filters.special=specialSel?.value||'all';
  filters.platform=platformSel?.value||'all';
  filters.language=languageSel?.value||'all';
  filters.indiaOnly=indiaCheck?.checked||false;
  filters.search=searchInp?.value||'';

  if(canonSel)canonSel.addEventListener('change',()=>{filters.canon=canonSel.value;renderEpisodes();});
  if(specialSel)specialSel.addEventListener('change',()=>{filters.special=specialSel.value;renderEpisodes();});
  if(platformSel)platformSel.addEventListener('change',()=>{filters.platform=platformSel.value;renderEpisodes();});
  if(languageSel)languageSel.addEventListener('change',()=>{filters.language=languageSel.value;renderEpisodes();});
  if(indiaCheck)indiaCheck.addEventListener('change',()=>{filters.indiaOnly=indiaCheck.checked;renderEpisodes();});
  if(searchInp)searchInp.addEventListener('input',debounce(()=>{filters.search=searchInp.value.trim();renderEpisodes();},150));

  // Check if episode has a specific language ON a specific platform
  function episodeHasLanguageOnPlatform(ep,langId,platId){
    // If no platform specified, just check if episode has the language anywhere
    if(platId==='all') return episodeHasLanguage(ep,langId);
    // If no language specified, just check if episode has the platform
    if(langId==='all') return episodeHasPlatform(ep,platId);

    const rows=getEpisodePlatformRows(ep);

    // ETV Bal Bharat is special - all its content is multi-language dubs
    if(platId==='etvbalb'){
      // Check if episode is on ETV Bal Bharat AND has the requested language
      if(!ep.etv) return false;
      // ETV Bal Bharat has all 12 regional Indian dubs
      const etvLangs=['hindi','tamil','telugu','malayalam','kannada','bengali','marathi','gujarati','odia','punjabi','assamese'];
      return etvLangs.includes(langId);
    }

    // For other platforms, check each platform row
    return rows.some(r=>{
      const pid=PLATFORM_ROUTE_BY_NAME[r.name];
      if(pid!==platId) return false;
      // Check if this platform row has the requested language
      const type=(r.type||'').toLowerCase();
      const note=(r.note||'').toLowerCase();
      const detail=(r.detail||'').toLowerCase();
      // Handle 'engsub' - English subtitles
      if(langId==='engsub' && (detail.includes('sub:') || type.includes('sub') || detail.includes('english'))) return true;
      if(langId==='sub' && type.includes('sub')) return true;
      if(langId==='dub' && (type.includes('dub') || note.includes('dub'))) return true;
      // Language-specific checks
      if(langId==='hindi' && (type.includes('hindi') || note.includes('hindi') || detail.includes('hindi'))) return true;
      if(langId==='tamil' && (type.includes('tamil') || note.includes('tamil') || detail.includes('tamil'))) return true;
      if(langId==='telugu' && (type.includes('telugu') || note.includes('telugu') || detail.includes('telugu'))) return true;
      if(langId==='malayalam' && (type.includes('malayalam') || note.includes('malayalam') || detail.includes('malayalam'))) return true;
      if(langId==='kannada' && (type.includes('kannada') || note.includes('kannada') || detail.includes('kannada'))) return true;
      if(langId==='bengali' && (type.includes('bengali') || note.includes('bengali') || detail.includes('bengali'))) return true;
      if(langId==='marathi' && (type.includes('marathi') || note.includes('marathi') || detail.includes('marathi'))) return true;
      if(langId==='gujarati' && (type.includes('gujarati') || note.includes('gujarati') || detail.includes('gujarati'))) return true;
      if(langId==='english' && (type.includes('english') || note.includes('english') || detail.includes('english'))) return true;
      return false;
    });
  }

  // Ensure initial render after DOM is ready
  setTimeout(()=>{
    filters.canon=canonSel?.value||'all';
    filters.special=specialSel?.value||'all';
    filters.platform=platformSel?.value||'all';
    filters.language=languageSel?.value||'all';
    filters.indiaOnly=indiaCheck?.checked||false;
    filters.search=searchInp?.value||'';
    renderEpisodes();
    refreshHover();
  },50);
}

// Toggle TV search floating panel
window.toggleTVSearch=function(){
  const panel=document.getElementById('tv-search-panel');
  const toggle=document.getElementById('tv-search-toggle');
  if(!panel)return;
  const isOpen=panel.classList.toggle('open');
  if(toggle)toggle.classList.toggle('active',isOpen);
  if(isOpen){
    const input=panel.querySelector('.tv-search-input');
    if(input)setTimeout(()=>input.focus(),100);
  }
};

// ─── SPINOFFS PAGE ───────────────────────────────────
function renderSpinoffsPage(){
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
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
        <div class="browse-grid">
          ${SPINOFFS.map((sp,i)=>`
            <div class="browse-card reveal" data-spinoff-id="${sp.id}" onclick="openSpinoffModal('${sp.id}')">
              <div class="browse-card-img" style="background-image:url('${getSpinoffPoster(sp, i+8)}')"></div>
              <div class="browse-card-grad"></div>
              <div class="browse-card-num">${i+1}</div>
              <div class="browse-card-content">
                <div class="browse-card-type">Spinoff · ${sp.year}</div>
                <div class="browse-card-title">${sp.title}</div>
                <div class="browse-card-meta">${sp.episodes} eps · <span class="tag tag-netflix" style="font-size:7px">Netflix</span></div>
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
  window.scrollTo({top:0,behavior:"instant"});
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
  // Reset any swiped card transforms
  modalPanel.querySelectorAll('.modal-ep,.lm-season-card,.lm-movie-card').forEach(card=>{
    card.style.transform='';
    card.style.opacity='';
  });
  // Reset panel transform
  modalPanel.style.transform='';
  modal.style.background='';
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
  let startScrollTop=0;
  let activeCard=null;
  const panel=modalPanel;
  const SWIPE_THRESHOLD=120;
  const CARD_SWIPE_THRESHOLD=120;

  let startX=0,isHorizontalScroll=false;

  function onStart(e){
    const t=e.touches?e.touches[0]:e;
    const rect=panel.getBoundingClientRect();
    const touchY=t.clientY-rect.top;

    // Store initial scroll position and touch X for direction detection
    startScrollTop=panel.scrollTop;
    startX=t.clientX;
    isHorizontalScroll=false;

    // If the touch is inside a horizontal scroll container, let the browser handle it
    const horizScrollSelectors=['.scroll-row','.lm-season-scroll','.lm-movie-scroll'];
    const inHorizScroll=horizScrollSelectors.some(sel=>e.target.closest(sel));
    if(inHorizScroll){ dragging=false; return; }

    // Check if touching a card element
    const target=e.target;
    const cardSelectors=['.modal-ep','.lm-season-card','.lm-movie-card','.spinoff-card','.content-card','.browse-card','.movie-big-card'];
    const cardEl=cardSelectors.map(sel=>target.closest(sel)).find(el=>el);

    if(cardEl && startScrollTop<=0){
      // Card swipe - track the specific card
      dragSource='card';
      activeCard=cardEl;
      startY=t.clientY;
      dragging=true;
      activeCard.style.transition='none';
      panel.style.transition='none';
    }else if(touchY<=80 || (modal.classList.contains('modal-fullpage') && startScrollTop<=0)){
      // For fullpage modals, allow swipe from anywhere when at top
      // For regular modals, only allow swipe from handle area (top 80px)
      dragSource='handle';
      startY=t.clientY;
      dragging=true;
      panel.style.transition='none';
      panel.classList.add('swipe-tracking');
    }
  }

  function onMove(e){
    if(!dragging)return;
    const t=e.touches?e.touches[0]:e;
    const deltaY=t.clientY-startY;
    const deltaX=Math.abs(t.clientX-startX);

    // If the gesture is more horizontal than vertical, abort and let browser scroll
    if(!isHorizontalScroll && deltaX>deltaY && deltaX>6){
      isHorizontalScroll=true;
      dragging=false;
      panel.classList.remove('swipe-tracking');
      return;
    }

    if(dragSource==='card' && deltaY>0){
      e.preventDefault();
      currentY=Math.max(0,deltaY);
      // Move the card with the finger
      if(activeCard){
        activeCard.style.transform=`translateY(${currentY}px)`;
        activeCard.style.opacity=Math.max(0.3,1-(currentY/400));
      }
      // Also move panel slightly for effect
      panel.style.transform=`translateY(${currentY*0.3}px)`;
      const prog=Math.min(currentY/300,1);
      modal.style.background=`rgba(7,7,15,${0.8*(1-prog*0.5)})`;
    }else if(dragSource==='handle' && deltaY>0){
      e.preventDefault();
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

    if(dragSource==='card' && activeCard){
      activeCard.style.transition='transform 0.35s var(--ease-out),opacity 0.35s';
      if(currentY>threshold){
        // Swipe far enough - animate card out and close modal
        activeCard.style.transform=`translateY(${window.innerHeight}px)`;
        activeCard.style.opacity='0';
        panel.style.transition='transform 0.35s var(--ease-out)';
        panel.style.transform='translateY(0)';
        setTimeout(()=>closeModal(),150);
      }else{
        // Snap back
        activeCard.style.transform='translateY(0)';
        activeCard.style.opacity='1';
        panel.style.transform='translateY(0)';
        modal.style.background='';
      }
    }else{
      panel.style.transition='transform 0.35s var(--ease-out)';
      modal.style.background='';
      if(currentY>threshold){
        closeModal();
      }else{
        panel.style.transform='translateY(0)';
      }
    }

    currentY=0;dragSource=null;activeCard=null;
    panel.classList.remove('swipe-tracking');
  }

  panel.addEventListener('touchstart',onStart,{passive:true});
  panel.addEventListener('touchmove',onMove,{passive:false});
  panel.addEventListener('touchend',onEnd,{passive:true});

  // Prevent background scrolling when touching modal panel during swipe
  document.addEventListener('touchmove',(e)=>{
    if(modal.classList.contains('open') && dragging){
      e.preventDefault();
    }
  },{passive:false});
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
  // Subtitles don't have voice cast - only dubs do
  const isSubtitles = langKey==='English Subtitles' || langName.includes('Subtitles');
  const hasCast = !isSubtitles && !!(VC_CHECK[resolvedCastKey]?.length ||
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

  // Generate unique ID for this modal instance
  const modalId='season-modal-'+Date.now();

  // Initial filter state - read from DOM elements after render
  let filters={
    canon: document.getElementById('tvf-canon')?.value || 'all',
    platform: document.getElementById('tvf-platform')?.value || 'all',
    language: document.getElementById('tvf-lang')?.value || 'all',
    avail: document.getElementById('tvf-avail')?.value || 'all',
    search: document.getElementById('tvf-search')?.value || ''
  };

  // Get all episodes for this season
  let allEps=(typeof EPISODES!=='undefined'?EPISODES:[]).filter(e=>e.season===sid&&typeof e.n==='number');
  if(r0!==undefined&&r1!==undefined)allEps=allEps.filter(e=>e.n>=r0&&e.n<=r1);
  if(etvOnly) allEps=allEps.filter(e=>e.etv);

  function specialStar(sp){
    if(!sp)return'';
    if(sp==='2hr')return' <span class="ep-star ep-star--2" title="2-Hour Special">★★</span>';
    return' <span class="ep-star" title="'+(sp==='1hr'?'1-Hour Special':'Special')+'">★</span>';
  }

  function renderEpisodes(){
    const grid=document.getElementById(modalId+'-ep-grid');
    if(!grid)return;

    let eps=allEps.filter(e=>{
      // Canon/Filler
      if(filterState.canon==='canon' && !isCanon(e)) return false;
      if(filterState.canon==='filler' && !isFiller(e)) return false;
      // Specials
      if(filterState.special==='1hr' && e.special!=='1hr') return false;
      if(filterState.special==='2hr' && e.special!=='2hr') return false;
      if(filterState.special==='special' && !e.special) return false;
      // ETV
      if(filterState.etv==='etv' && !e.etv) return false;
      // Search
      if(filterState.search){
        const q=filterState.search.toLowerCase();
        return e.title.toLowerCase().includes(q) || String(e.n).includes(q);
      }
      return true;
    });

    // Update count
    const countEl=document.getElementById(modalId+'-ep-count');
    if(countEl)countEl.textContent=`${eps.length} of ${allEps.length} Episodes`;

    grid.innerHTML=eps.map(e=>{
      const star=specialStar(e.special);
      const etvBadge=showETV&&e.etv?`<span class="modal-ep-etv">📺 ETV</span>`:'';
      const fillerBadge=isFiller(e)?`<span class="modal-ep-filler">TV Original</span>`:'';
      const still=getEpisodeStill(e,e.n+1);
      return`<div class="modal-ep${showETV&&e.etv?' modal-ep--etv':''}${ e.special?' modal-ep--special':''}${isFiller(e)?' modal-ep--filler':''}" data-ep-num="${e.n}" onclick="openEpisodeModal(${e.n})">
        <div class="modal-ep-thumb" style="background-image:url('${still}')"></div>
        <div class="modal-ep-body">
          <div class="modal-ep-num">EP ${e.n}${star}</div>
          <div class="modal-ep-title">${e.title}${etvBadge}${fillerBadge}</div>
        </div>
      </div>`;
    }).join('');
  }

  // Filter UI
  const filterHTML=`
    <div class="sm-filter-row" id="${modalId}-filters">
      <select class="sm-filter-select" data-filter="canon">
        <option value="all">All Episodes</option>
        <option value="canon">Canon (Manga)</option>
        <option value="filler">Filler (TV Original)</option>
      </select>
      <select class="sm-filter-select" data-filter="special">
        <option value="all">All Types</option>
        <option value="special">Specials Only</option>
        <option value="1hr">1-Hour Specials</option>
        <option value="2hr">2-Hour Specials</option>
      </select>
      ${showETV?`<select class="sm-filter-select" data-filter="etv">
        <option value="all">All</option>
        <option value="etv">ETV Only</option>
      </select>`:''}
      <input type="search" class="sm-filter-search" placeholder="Search episodes..." data-filter="search">
    </div>`;

  const etvSummary=showETV&&etvOnly
    ?`<div class="modal-etv-summary"><span style="color:#FF6B00">📺</span> <strong>${etvOnly?allEps.length:etvOnly}</strong> of ${allEps.length} episodes aired on <strong>ETV Bal Bharat</strong></div>`
    :'';

  const seasonThumb=getSeasonStillByLocalSeasonId(s.id,SEASONS.indexOf(s)+3);
  const thumbBanner=`<div class="modal-season-thumb" style="background-image:url('${seasonThumb}')">
    <div class="modal-season-thumb-overlay"></div>
    <div class="modal-season-thumb-num">${s.id}</div>
    <div class="modal-season-thumb-label">${s.label}</div>
    <div class="modal-season-thumb-eps">Eps ${s.epRange[0]}–${s.epRange[1]||'ongoing'} · ${s.year}</div>
  </div>`;

  // Platform info (if available)
  let platformsHTML='';
  if(s.available||etvOnly){
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
    platformsHTML=`<div class="modal-where-title">Where to Watch in India</div>
      <div class="modal-where">${platforms||'<p style="color:var(--muted);font-size:13px">No streaming info yet.</p>'}</div>`;
  }

  const unavailMsg=(!s.available&&!etvOnly)?`<div class="modal-unavail">🚫 <strong>Not Streaming in India</strong><br>${s.unavailableNote}</div>`:'';

  openModal(`<div class="modal-handle"></div>
    ${thumbBanner}
    <div class="modal-header">
      <div><div class="modal-badge">TV Series</div><div class="modal-title">${s.label}</div></div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-desc">Episodes ${s.epRange[0]}–${s.epRange[1]||'ongoing'} · ${s.year}</div>
    ${unavailMsg}
    ${platformsHTML}
    ${etvSummary}
    ${filterHTML}
    <div class="modal-where-title" id="${modalId}-ep-count" style="margin-top:12px">${allEps.length} Episodes</div>
    <div class="modal-ep-grid" id="${modalId}-ep-grid"></div>`,{fullPage:true});

  // Render initial episodes
  setTimeout(renderEpisodes,0);

  // Wire up filter handlers
  setTimeout(()=>{
    document.querySelectorAll('#'+modalId+'-filters [data-filter]').forEach(el=>{
      el.addEventListener('change',(e)=>{
        const key=e.target.dataset.filter;
        filterState[key]=e.target.value;
        renderEpisodes();
      });
      el.addEventListener('input',(e)=>{
        const key=e.target.dataset.filter;
        filterState[key]=e.target.value;
        renderEpisodes();
      });
    });
  },50);
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

// ─── COMPREHENSIVE WATCH GUIDE RENDERER ────────────────────────
function renderComprehensiveGuide() {
  if (!WATCH_GUIDE) return;
  
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
  const pg=document.createElement('div');
  pg.className='page-enter';

  // Split episode ranges into individual episodes and merge with old CONAN_DATA attributes
  const individualEpisodes = splitEpisodeRanges(WATCH_GUIDE.watchOrder);
  const enrichedEpisodes = enrichEpisodesWithAttributes(individualEpisodes);
  
  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('https://image.tmdb.org/t/p/w1280/vG4KHOzT1qk8ATnBMWUuvwGIlcR.jpg')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <div class="section-eyebrow">Based on XerBlade Guide</div>
        <h1 class="movies-page-title">Important Episodes <em>& Movies Guide</em></h1>
        <p class="movies-page-sub">Essential Detective Conan episodes and movies every fan should see. Curated from the renowned XerBlade Important Episode List with rich metadata and filtering.</p>
      </div>
    </section>

    <!-- Filter System -->
    <div class="filter-system-container">
      <!-- Single Row Filter Layout -->
      <div class="filter-row">
        <!-- Plot Tag Multi-select -->
        <div class="multi-select-dropdown" data-filter="guide-plot">
          <button class="multi-select-btn" onclick="toggleMultiSelect('guide-plot')">
            <span class="multi-select-value" id="guide-plot-value">Plot</span>
            <span class="multi-select-chevron">⌄</span>
          </button>
          <div class="multi-select-menu" id="guide-plot-menu">
            ${(window.ALL_TAGS || []).map(tag => {
              const def = (window.TAG_DEFINITIONS || {})[tag] || {};
              return `<label class="multi-select-option" title="${def.desc || ''}"><input type="checkbox" value="${tag}" data-parent="guide-plot"><span>${tag}</span></label>`;
            }).join('')}
          </div>
        </div>
        
        <!-- Quick Nav Dropdown -->
        <select class="filter-select" id="guide-quick-nav" onchange="if(this.value)scrollToEpisode(parseInt(this.value))">
          <option value="">Quick Nav</option>
          <option value="1">Episodes 1-100</option>
          <option value="200">Episodes 200-400</option>
          <option value="500">Episodes 500-700</option>
          <option value="800">Episodes 800+</option>
        </select>
      </div>
    </div>

    <!-- Episodes Grid -->
    <div class="episodes-grid-horizontal">
      ${enrichedEpisodes.map((ep, index) => renderConanWatchCard(ep, index)).join('')}
    </div>
    
    ${renderFooterHTML()}
  `;
  
  app.appendChild(pg);
  setTimeout(() => {observeAll();setupWatchGuideFilters();}, 100);
}

// ─── ENRICH EPISODES WITH ATTRIBUTES ─────────────────────────
function enrichEpisodesWithAttributes(episodes) {
  // Get the old CONAN_DATA structure for attributes
  const CONAN_DATA = {
    "meta": {
      "tags": {
        "main-plot": "Essential to the overall story arc (Black Organization, Conan's identity, key relationships)",
        "character": "Significant character introductions or development",
        "black-org": "Black Organization involvement",
        "heiji": "Hattori Heiji case or development",
        "kaito-kid": "Kaitou Kid involvement",
        "romance": "Romance development for main characters",
        "fbi": "FBI involvement",
        "shinichi": "Shinichi/Conan identity-related or Shinichi-as-himself episode",
        "police": "Metropolitan Police detective love story or police-focused",
        "setup": "Introduces gadgets, recurring elements, or world-building",
        "fun": "Notable for humor, meta references, or entertainment value",
        "movie-prequel": "Official prequel/pre-story to a specific movie",
        "movie-sequel": "Official sequel/post-story to a specific movie"
      }
    }
  };

  return episodes.map(item => {
    let enriched = { ...item };
    
    // Add content type and faction attributes based on item properties
    if (item.type === 'episode') {
      // Get episode data from EPISODES array using the episode number
      const ep = (typeof EPISODES !== 'undefined' ? EPISODES : []).find(e => e.n === item.episode);
      if (ep) {
        enriched.title = ep.title || `Episode ${item.episode}`;
        enriched.description = ep.title || `Episode ${item.episode}`;
      } else {
        enriched.title = `Episode ${item.episode}`;
        enriched.description = `Episode ${item.episode}`;
      }
      
      // Add tags based on episode properties
      enriched.tags = [];
      if (item.mainPlot) enriched.tags.push('main-plot');
      if (item.special) enriched.tags.push('character');
      
      // Add faction tags based on episode content (more specific logic)
      if (enriched.title && (
        enriched.title.includes('Black') || enriched.title.includes('Organization') || 
        enriched.title.includes('Gin') || enriched.title.includes('Vodka') || enriched.title.includes('Vermouth')
      )) {
        enriched.tags.push('black-org');
      }
      if (enriched.title && enriched.title.includes('Heiji')) {
        enriched.tags.push('heiji');
      }
      // More specific Kaito Kid detection - avoid false positives
      if (enriched.title && (
        enriched.title.includes('Kaitou Kid') || enriched.title.includes('Kaito Kid') || 
        enriched.title.includes('Kid Phantom') || enriched.title.includes('Phantom Thief')
      )) {
        enriched.tags.push('kaito-kid');
      }
      if (enriched.title && (
        enriched.title.includes('FBI') || enriched.title.includes('Akai') || enriched.title.includes('Jodie')
      )) {
        enriched.tags.push('fbi');
      }
      
    } else if (item.type === 'movie') {
      // Get movie data from MOVIES array
      const movieNum = item.numbers ? item.numbers.replace('Movie ', '') : '';
      const movie = (typeof MOVIES !== 'undefined' ? MOVIES : []).find(m => m.n.toString() === movieNum);
      if (movie) {
        enriched.title = movie.title;
        enriched.description = movie.desc || movie.title;
      } else {
        enriched.title = item.title || `Movie ${item.numbers}`;
        enriched.description = item.title || `Movie ${item.numbers}`;
      }
      
      // Assign faction tags based on movie content research
      enriched.tags = ['character'];
      if (item.mainPlot) enriched.tags.push('main-plot');
      
      // Movie-specific faction assignments
      const movieFactions = {
        '1': [], // Time-Bombed Skyscraper - no specific factions
        '2': ['romance'], // The Fourteenth Target - romance focused
        '3': ['kaito-kid'], // The Last Wizard of the Century - Kaito Kid
        '4': ['romance', 'police'], // Captured in Her Eyes - romance + police
        '5': ['main-plot'], // Countdown to Heaven - main plot
        '6': ['character'], // The Phantom of Baker Street - character development
        '7': ['heiji'], // Crossroad in the Ancient Capital - Heiji focused
        '8': ['kaito-kid'], // Magician of the Silver Sky - Kaito Kid
        '9': ['character'], // Strategy Above the Depths - character
        '10': ['romance'], // The Private Eyes' Requiem - romance
        '11': ['main-plot'], // Jolly Roger in the Deep Azure - main plot
        '12': ['character'], // Full Score of Fear - character
        '13': ['black-org'], // The Raven Chaser - Black Organization
        '14': ['character'], // The Lost Ship in the Sky - character
        '15': ['main-plot'], // Quarter of Silence - main plot
        '16': ['character'], // The Eleventh Striker - character
        '17': ['fbi'], // Private Eye in the Distant Sea - FBI
        '18': ['character'], // Sniper from Another Dimension - character
        '19': ['romance'], // The Sunflowers of Inferno - romance
        '20': ['main-plot'], // The Darkest Nightmare - Black Organization
        '21': ['character'], // The Crimson Love Letter - character
        '22': ['police'], // Zero the Enforcer - Police focused
        '23': ['character'], // The Fist of Blue Sapphire - character
        '24': ['main-plot'], // The Scarlet Bullet - main plot
        '25': ['romance', 'black-org'], // The Bride of Halloween - romance + Black Org
        '26': ['black-org', 'fbi'], // Black Iron Submarine - Black Org + FBI
        '27': ['kaito-kid'] // The Million Dollar Pentagram - Kaito Kid
      };
      
      const movieTag = movieFactions[movieNum];
      if (movieTag) {
        enriched.tags.push(...movieTag);
      }
      
      // Special handling for movies with Black Organization
      if (['13', '20', '25', '26'].includes(movieNum)) {
        if (!enriched.tags.includes('black-org')) {
          enriched.tags.push('black-org');
        }
      }
      
    } else if (item.type === 'magic-kaito') {
      enriched.title = `Magic Kaito 1412 Episode ${item.episode}`;
      enriched.description = `Magic Kaito 1412 Episode ${item.episode}`;
      enriched.tags = ['kaito-kid'];
      
    } else if (item.type === 'ova') {
      // Get OVA data from OVAS array
      const ovaNum = item.numbers ? item.numbers.replace('OVA ', '') : '';
      const ova = (typeof OVAS !== 'undefined' ? OVAS : []).find(o => o.id === `ova${ovaNum}`);
      if (ova) {
        enriched.title = ova.title;
        enriched.description = ova.desc || ova.title;
      } else {
        enriched.title = `OVA ${item.numbers}`;
        enriched.description = `OVA ${item.numbers}`;
      }
      
      enriched.tags = ['character'];
      
    } else {
      enriched.title = item.title || `${item.type} ${item.episode || item.numbers}`;
      enriched.description = item.title || `${item.type} ${item.episode || item.numbers}`;
      enriched.tags = ['character'];
    }
    
    return enriched;
  });
}

// ─── CONAN WATCH CARD RENDERER (OLD LAYOUT) ───────────────────
function renderConanWatchCard(ep, index) {
  // Determine image based on type, prioritizing TMDB stills for episodes
  let imageUrl;
  try {
    if (ep.type === 'episode' && ep.episode) {
      // Try to get TMDB still for episodes first
      const episodeData = (typeof EPISODES !== 'undefined' ? EPISODES : []).find(e => e.n === ep.episode);
      if (episodeData) {
        const stillUrl = getEpisodeStill(episodeData, parseInt(ep.episode));
        if (stillUrl) {
          imageUrl = stillUrl;
        }
      }
      // Fallback to character images if no TMDB still
      if (!imageUrl) {
        const episodeImages = [IMG.conan1, IMG.conan2, IMG.conan5, IMG.ran, IMG.heiji, IMG.ai];
        imageUrl = episodeImages[index % episodeImages.length];
      }
    } else if (ep.type === 'movie') {
      // Use movie poster images
      const movieNum = ep.numbers ? ep.numbers.replace('Movie ', '') : '';
      const movie = (typeof MOVIES !== 'undefined' ? MOVIES : []).find(m => m.n.toString() === movieNum);
      if (movie) {
        // Use movie poster with fallback
        imageUrl = getMoviePoster ? getMoviePoster(movie, parseInt(movieNum)) : IMG.conan3;
      } else {
        imageUrl = IMG.conan3;
      }
    } else if (ep.type === 'ova' || ep.type === 'magic-file') {
      // Try to get TMDB still for OVAs first
      
      // Magic File to OVA image mapping (Magic File episodes use OVA images)
      const magicFileToOVA = {
        '2': '15',  // Magic File 2 → OVA 15
        '3': '16',  // Magic File 3 → OVA 16
        '4': '19',  // Magic File 4 → OVA 19
        '5': '21'   // Magic File 5 → OVA 21
      };
      
      let ovaNum = ep.numbers ? ep.numbers.toString().replace('OVA ', '').replace('Magic File ', '') : '';
      
      // If it's a Magic File, map to the correct OVA for the image
      if (ep.type === 'magic-file' && magicFileToOVA[ovaNum]) {
        ovaNum = magicFileToOVA[ovaNum];
      }
      
      const ova = (typeof OVAS !== 'undefined' ? OVAS : []).find(o => o.id === `ova${ovaNum}`);
      if (ova) {
        // Use hardcoded still if available
        if (ova.still) {
          imageUrl = ova.still;
        } else {
          // Try cached still first
          const stillUrl = getEpisodeStill(ova, parseInt(ovaNum));
          if (stillUrl && stillUrl !== getImg(0)) {
            imageUrl = stillUrl;
          } else {
            // Try to fetch from TMDB for OVAs that might have TMDB data
            try {
              const cachedStill = window.OVA_STILLS?.get(ova.id);
              if (cachedStill) {
                imageUrl = cachedStill;
              } else {
                // Fallback to character-specific images for OVAs
                const ovaImages = [IMG.ran, IMG.heiji, IMG.kid, IMG.ai];
                imageUrl = ovaImages[index % ovaImages.length];
                // Try to fetch TMDB data for OVAs (Season 0 of main series)
                if (ova.episodeNumber) {
                  fetchTMDBOVAData(ova.id).then(data => {
                    if (data?.image) {
                      if (!window.OVA_STILLS) window.OVA_STILLS = new Map();
                      window.OVA_STILLS.set(ova.id, data.image);
                      // Update the card image (both episode-horizontal-img and browse-card-img for OVA panels)
                      document.querySelectorAll(`[data-ep-num="${ova.id}"] .episode-horizontal-img, [data-ep-num="${ova.id}"] .browse-card-img`).forEach(img => {
                        img.style.backgroundImage = `url('${data.image}')`;
                      });
                    }
                  });
                }
              }
            } catch (e) {
              // Fallback to character-specific images for OVAs
              const ovaImages = [IMG.ran, IMG.heiji, IMG.kid, IMG.ai];
              imageUrl = ovaImages[index % ovaImages.length];
            }
          }
        }
      } else {
        // Fallback to character-specific images for OVAs
        const ovaImages = [IMG.ran, IMG.heiji, IMG.kid, IMG.ai];
        imageUrl = ovaImages[index % ovaImages.length];
      }
    } else if (ep.type === 'tv-special') {
      // Use group images for TV specials
      imageUrl = IMG.conan2;
    } else if (ep.type === 'magic-kaito') {
      // Use the same TMDB approach as the modal - fetch directly from Magic Kaito TMDB series
      if (typeof MAGIC_KAITO !== 'undefined' && MAGIC_KAITO.tmdb) {
        // Try to get cached image first
        const mkMetaKey = `mk${ep.episode}`;
        const mkMeta = window.EPISODE_META.get(mkMetaKey);
        if (mkMeta && mkMeta.still) {
          imageUrl = mkMeta.still;
        } else {
          // Fetch directly from TMDB like the modal does
          try {
            // Use synchronous approach for card rendering
            const cachedStill = window.MAGIC_KAITO_STILLS?.get(ep.episode);
            if (cachedStill) {
              imageUrl = cachedStill;
            } else {
              imageUrl = IMG.kid;
              // Trigger async fetch for next time
              fetchTMBDEpisodeData(MAGIC_KAITO.tmdb, 1, ep.episode).then(data => {
                if (data?.image) {
                  if (!window.MAGIC_KAITO_STILLS) window.MAGIC_KAITO_STILLS = new Map();
                  window.MAGIC_KAITO_STILLS.set(ep.episode, data.image);
                  // Update the card image
                  document.querySelectorAll(`[data-ep-num="${ep.episode}"] .episode-horizontal-img`).forEach(img => {
                    img.style.backgroundImage = `url('${data.image}')`;
                  });
                }
              });
            }
          } catch (e) {
            imageUrl = IMG.kid;
          }
        }
      } else {
        imageUrl = IMG.kid;
      }
    } else {
      // Regular episodes fallback
      const episodeImages = [IMG.conan1, IMG.conan2, IMG.conan5, IMG.ran, IMG.heiji, IMG.ai];
      imageUrl = episodeImages[index % episodeImages.length];
    }
    
    // Ensure we have a valid URL
    if (!imageUrl || imageUrl === 'undefined' || imageUrl === 'null') {
      imageUrl = IMG.conan1; // Ultimate fallback
    }
  } catch (error) {
    imageUrl = IMG.conan1; // Ultimate fallback
  }
  
  // Format the type display
  let typeDisplay = ep.type;
  let typeClass = ep.type;
  if (ep.type === 'movie') {
    typeDisplay = 'movie';
    typeClass = 'movie';
  } else if (ep.type === 'ova') {
    typeDisplay = 'ova';
    typeClass = 'ova';
  } else if (ep.type === 'magic-file') {
    typeDisplay = 'magic-file';
    typeClass = 'magic-file';
  } else if (ep.type === 'tv-special') {
    typeDisplay = 'tv-special';
    typeClass = 'tv-special';
  } else if (ep.type === 'magic-kaito') {
    typeDisplay = 'magic-kaito';
    typeClass = 'magic-kaito';
  }
  
  const episodeNumber = ep.episode ? ep.episode.toString() : (ep.numbers || '');
  // Create distinct data-ep-num for OVA vs Magic File for proper filtering
  let dataEpNum = '';
  if (ep.type === 'ova') {
    dataEpNum = `ova${ep.numbers ? ep.numbers.toString().replace('OVA ', '') : ''}`;
  } else if (ep.type === 'magic-file') {
    dataEpNum = `mf${ep.numbers ? ep.numbers.toString().replace('Magic File ', '') : ''}`;
  } else {
    dataEpNum = ep.episode || '';
  }
  
  return `
    <div class="episode-horizontal-card reveal" onclick="openConanWatchModal('${ep.type}', '${episodeNumber}')" data-type="${ep.type}" data-tags="${ep.tags ? ep.tags.join(' ') : ''}">
      <div class="episode-horizontal-img" style="background-image: url('${imageUrl}')" data-ep-num="${dataEpNum}"></div>
      <div class="episode-horizontal-content">
        <div class="episode-horizontal-header">
          <div class="episode-horizontal-number">${episodeNumber}</div>
          <div class="episode-horizontal-type ${typeClass}">${typeDisplay}</div>
        </div>
        <h3 class="episode-horizontal-title">${ep.title}</h3>
        <div class="episode-horizontal-tags">
          ${ep.tags ? ep.tags.map(tag => `<span class="tag-badge ${tag}">${tag.replace('-', ' ')}</span>`).join('') : ''}
        </div>
        <p class="episode-horizontal-desc">${ep.description}</p>
      </div>
    </div>
  `;
}

// ─── OVA MODAL FUNCTION ───────────────────────────────────
window.showOVAModal = async function(ovaId) {
  const ova = (typeof OVAS !== 'undefined' ? OVAS : []).find(o => o.id === ovaId);
  if (!ova) {
    return;
  }

  // Use hardcoded still, cached still, or fall back to a character image
  const fallbackUrl = ova.still || window.OVA_STILLS?.get(ovaId) || IMG.kid;
  const isUnavailable = ova.available === false;
  
  // Get type label for modal
  const typeLabels = {
    'ova': 'Original Video Animation (OVA)',
    'magic-file': 'Magic File',
    'tv-special': 'TV Special',
    'drama-special': 'Drama Special',
    'wooo-ova': 'Wooo OVA',
    'police-academy': 'Police Academy Arc',
    'recap-special': 'Recap Special'
  };
  const typeLabel = typeLabels[ova.type] || 'Special';
  const badgeLabel = ova.type === 'ova' ? 'OVA' : 
                     ova.type === 'magic-file' ? 'MF' :
                     ova.type === 'tv-special' ? 'TVS' :
                     ova.type === 'drama-special' ? 'DS' :
                     ova.type === 'wooo-ova' ? 'WOOO' :
                     ova.type === 'police-academy' ? 'PA' : 'SP';

  const buildModalHtml = (imageUrl) => `
    <div class="modal-handle"></div>
    <div class="modal-season-thumb" id="ova-modal-thumb" style="background-image:url('${imageUrl}')">
      <div class="modal-season-thumb-overlay"></div>
      <div class="modal-season-thumb-num">${badgeLabel}</div>
      <div class="modal-season-thumb-label">${ova.title}</div>
      <div class="modal-season-thumb-eps">${ova.year} • ${typeLabel}</div>
    </div>
    <div class="modal-header">
      <div><div class="modal-badge">${badgeLabel}</div><div class="modal-title">${ova.title}</div></div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-desc">${ova.desc || ova.title}</div>
    ${isUnavailable ? `
      <div class="modal-unavail">🚫 <strong>Not Available in India</strong><br>${ova.unavailableNote || 'This content is not available for streaming in India.'}</div>
    ` : ''}
    <div class="modal-where-title">Details</div>
    <div class="modal-where">
      <div class="modal-where-row">
        <span class="modal-where-plat" style="color:#888">⬤ Release Year</span>
        <span class="modal-where-detail">${ova.year}</span>
      </div>
      <div class="modal-where-row">
        <span class="modal-where-plat" style="color:#888">⬤ Type</span>
        <span class="modal-where-detail">${typeLabel}</span>
      </div>
      <div class="modal-where-row">
        <span class="modal-where-plat" style="color:#${isUnavailable ? '#FF6B00' : '#888'}">⬤ Availability</span>
        <span class="modal-where-detail">${isUnavailable ? 'Not Available in India' : 'Available'}</span>
      </div>
    </div>
  `;

  // Open immediately with fallback image
  openModal(buildModalHtml(fallbackUrl), { fullPage: true });

  // If the OVA has a TMDB episode number, fetch the real still and swap it in
  if (ova.episodeNumber) {
    try {
      const data = await fetchTMDBOVAData(ovaId);
      if (data?.image) {
        if (!window.OVA_STILLS) window.OVA_STILLS = new Map();
        window.OVA_STILLS.set(ovaId, data.image);
        const thumb = document.getElementById('ova-modal-thumb');
        if (thumb) {
          thumb.style.backgroundImage = `url('${data.image}')`;
        }
      }
    } catch (err) {
      // Keep fallback image
    }
  }
};

// ─── MODAL HANDLER FOR CONAN WATCH CARDS ─────────────────────
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
    // Handle TV specials
    openSpecialModal(number);
  }
}

// ─── FILTER SETUP FOR WATCH GUIDE ───────────────────────────
function setupWatchGuideFilters() {
  // Refresh episode images with TMDB stills if available
  setTimeout(() => {
    refreshEpisodeSeasonVisuals();
    // Additional refresh for guide-specific images
    document.querySelectorAll('[data-ep-num]').forEach(el=>{
      const n = Number(el.dataset.epNum);
      if(!n) return;
      const ep = (typeof EPISODES!=='undefined'?EPISODES:[]).find(x=>x.n===n);
      if(!ep) return;
      const thumb = el.querySelector('.episode-horizontal-img');
      if(thumb) {
        const stillUrl = getEpisodeStill(ep, n);
        if(stillUrl) {
          thumb.style.backgroundImage = `url('${stillUrl}')`;
        }
      }
    });
  }, 1000);
  
  // Setup plot filter
  const plotCheckboxes = document.querySelectorAll('.multi-select-menu input[data-parent="guide-plot"]');
  const episodeCards = document.querySelectorAll('.episode-horizontal-card');
  
  function applyPlotFilter() {
    const checked = document.querySelectorAll('.multi-select-menu input[data-parent="guide-plot"]:checked');
    const selectedPlotTags = Array.from(checked).map(c => c.value);
    
    // Update display
    const displayEl = document.getElementById('guide-plot-value');
    if (displayEl) {
      if (selectedPlotTags.length === 0) displayEl.textContent = 'Plot';
      else if (selectedPlotTags.length === 1) displayEl.textContent = selectedPlotTags[0];
      else displayEl.textContent = `${selectedPlotTags.length} selected`;
    }
    
    // Filter cards
    episodeCards.forEach(card => {
      const tags = card.dataset.tags || '';
      
      let showCard = true;
      
      // Plot tag filter - OR logic
      if (selectedPlotTags.length > 0) {
        const hasMatch = selectedPlotTags.some(tag => tags.includes(tag));
        if (!hasMatch) showCard = false;
      }
      
      card.style.display = showCard ? 'block' : 'none';
    });
  }
  
  // Setup checkbox listeners
  plotCheckboxes.forEach(cb => {
    cb.addEventListener('change', applyPlotFilter);
  });
}

function renderModernWatchCard(item, index) {
  let imageUrl, title, clickAction, typeDisplay, typeClass, typeIcon;
  
  if (item.type === 'episode') {
    // Get episode data from EPISODES array
    const ep = (typeof EPISODES !== 'undefined' ? EPISODES : []).find(e => e.n === item.episode);
    
    // Try to get TMDB still, fallback to local images
    let stillUrl = null;
    if (ep) {
      const meta = getEpisodeMeta(ep);
      if (meta && meta.still) {
        stillUrl = meta.still;
      }
    }
    
    // Fallback images based on episode number
    const fallbackImages = [IMG.conan1, IMG.conan2, IMG.ran, IMG.heiji, IMG.kid, IMG.ai, IMG.agi];
    const fallbackIdx = item.episode % fallbackImages.length;
    
    imageUrl = stillUrl || fallbackImages[fallbackIdx];
    title = ep ? ep.title : `Episode ${item.episode}`;
    clickAction = `onclick="openEpisodeModal('${item.episode}')"`;
    typeDisplay = 'Episode';
    typeClass = 'episode';
    typeIcon = '📺';
  } else if (item.type === 'movie') {
    // Get movie data
    const movieNum = item.numbers.replace('Movie ', '');
    const movie = (typeof MOVIES !== 'undefined' ? MOVIES : []).find(m => m.id === movieNum.toLowerCase());
    
    // Try to get TMDB poster, fallback to local images
    let posterUrl = null;
    if (movie) {
      const cached = window.MOVIE_POSTERS.get(movie.id);
      if (cached) {
        posterUrl = cached.replace('/w154/','/w500/').replace('/w185/','/w500/');
      }
    }
    
    // Fallback images for movies
    const movieFallbacks = [IMG.conan1, IMG.conan2, IMG.ran, IMG.heiji];
    const fallbackIdx = parseInt(movieNum) % movieFallbacks.length;
    
    imageUrl = posterUrl || movieFallbacks[fallbackIdx];
    title = item.title || `Movie ${movieNum}`;
    clickAction = `onclick="openMovieModal('${movieNum.toLowerCase()}')"`;
    typeDisplay = 'Movie';
    typeClass = 'movie';
    typeIcon = '🎬';
  } else if (item.type === 'magic-kaito') {
    // Magic Kaito episodes
    const kaitoImages = [IMG.kid, IMG.conan1, IMG.ran, IMG.heiji];
    imageUrl = kaitoImages[item.episode % 4];
    title = `Magic Kaito 1412 Episode ${item.episode}`;
    clickAction = `onclick="openMagicKaitoEpisode('episode', ${item.episode})"`;
    typeDisplay = 'Magic Kaito';
    typeClass = 'magic-kaito';
    typeIcon = '🎩';
  } else if (item.type === 'ova') {
    // OVA items - find OVA data to get hardcoded still URL
    const ova = OVAS.find(o => o.id === item.id);
    const ovaImages = [IMG.ran, IMG.heiji, IMG.kid, IMG.ai];
    const ovaIndex = parseInt(item.id?.replace('ova', '') || '0');
    // Use hardcoded still if available, otherwise fallback to character images
    imageUrl = ova?.still || ovaImages[ovaIndex % 4];
    title = item.title || ova?.title || `OVA ${item.episode || ''}`;
    clickAction = `onclick="openMagicKaitoEpisode('ova', '${item.id}')"`;
    typeDisplay = 'OVA';
    typeClass = 'ova';
    typeIcon = '📼';
  } else {
    // Fallback
    imageUrl = IMG.conan1;
    title = item.title || `${item.type} ${item.episode || item.numbers}`;
    clickAction = '';
    typeDisplay = item.type;
    typeClass = item.type;
    typeIcon = '📋';
  }
  
  const mainPlotBadge = item.mainPlot ? '<span class="modern-badge modern-badge--main">Main Plot</span>' : '';
  const specialBadge = item.special ? `<span class="modern-badge modern-badge--special">${item.special}</span>` : '';
  const episodeNumber = item.episode ? item.episode.toString() : item.numbers;
  
  return `
    <div class="modern-watch-card reveal" ${clickAction} data-type="${item.type}" data-tags="${item.mainPlot ? 'main-plot' : ''} ${item.special ? 'special' : ''}" data-ep-id="${item.id || item.episode || ''}">
      <div class="modern-card-image">
        <div class="modern-card-img" style="background-image: url('${imageUrl}')" data-ep-num="${item.episode || item.id || ''}"></div>
        <div class="modern-card-overlay">
          <div class="modern-card-play">▶</div>
        </div>
        <div class="modern-card-type ${typeClass}">
          <span class="type-icon">${typeIcon}</span>
          <span class="type-text">${typeDisplay}</span>
        </div>
      </div>
      <div class="modern-card-content">
        <div class="modern-card-number">${episodeNumber}</div>
        <h3 class="modern-card-title">${title}</h3>
        <div class="modern-card-badges">
          ${mainPlotBadge}
          ${specialBadge}
        </div>
      </div>
    </div>
  `;
}

function renderWatchOrderCard(item, index) {
  let imageUrl, title, clickAction, typeDisplay, typeClass;
  
  if (item.type === 'episode') {
    // Get episode data from EPISODES array
    const ep = (typeof EPISODES !== 'undefined' ? EPISODES : []).find(e => e.n === item.episode);
    
    // Try to get TMDB still, fallback to local images
    let stillUrl = null;
    if (ep) {
      const meta = getEpisodeMeta(ep);
      if (meta && meta.still) {
        stillUrl = meta.still;
      }
    }
    
    // Fallback images based on episode number
    const fallbackImages = [IMG.conan1, IMG.conan2, IMG.ran, IMG.heiji, IMG.kid, IMG.ai, IMG.agi];
    const fallbackIdx = item.episode % fallbackImages.length;
    
    imageUrl = stillUrl || fallbackImages[fallbackIdx];
    title = ep ? ep.title : `Episode ${item.episode}`;
    clickAction = `onclick="openEpisodeModal('${item.episode}')"`;
    typeDisplay = 'Episode';
    typeClass = 'episode';
  } else if (item.type === 'movie') {
    // Get movie data
    const movieNum = item.numbers.replace('Movie ', '');
    const movie = (typeof MOVIES !== 'undefined' ? MOVIES : []).find(m => m.id === movieNum.toLowerCase());
    
    // Try to get TMDB poster, fallback to local images
    let posterUrl = null;
    if (movie) {
      const cached = window.MOVIE_POSTERS.get(movie.id);
      if (cached) {
        posterUrl = cached.replace('/w154/','/w500/').replace('/w185/','/w500/');
      }
    }
    
    // Fallback images for movies
    const movieFallbacks = [IMG.conan1, IMG.conan2, IMG.ran, IMG.heiji];
    const fallbackIdx = parseInt(movieNum) % movieFallbacks.length;
    
    imageUrl = posterUrl || movieFallbacks[fallbackIdx];
    title = item.title || `Movie ${movieNum}`;
    clickAction = `onclick="openMovieModal('${movieNum.toLowerCase()}')"`;
    typeDisplay = 'Movie';
    typeClass = 'movie';
  } else if (item.type === 'magic-kaito') {
    // Magic Kaito episodes
    const kaitoImages = [IMG.kid, IMG.conan1, IMG.ran, IMG.heiji];
    imageUrl = kaitoImages[item.episode % 4];
    title = `Magic Kaito 1412 Episode ${item.episode}`;
    clickAction = `onclick="openMagicKaitoEpisode('episode', ${item.episode})"`;
    typeDisplay = 'Magic Kaito';
    typeClass = 'magic-kaito';
  } else if (item.type === 'ova') {
    // OVA items - find OVA data to get hardcoded still URL
    const ova = OVAS.find(o => o.id === item.id);
    const ovaImages = [IMG.ran, IMG.heiji, IMG.kid, IMG.ai];
    const ovaIndex = parseInt(item.id?.replace('ova', '') || '0');
    // Use hardcoded still if available, otherwise fallback to character images
    imageUrl = ova?.still || ovaImages[ovaIndex % 4];
    title = item.title || ova?.title || `OVA ${item.episode || ''}`;
    clickAction = `onclick="openMagicKaitoEpisode('ova', '${item.id}')"`;
    typeDisplay = 'OVA';
    typeClass = 'ova';
  } else {
    // Fallback
    imageUrl = IMG.conan1;
    title = item.title || `${item.type} ${item.episode || item.numbers}`;
    clickAction = '';
    typeDisplay = item.type;
    typeClass = item.type;
  }
  
  const mainPlotBadge = item.mainPlot ? '<span class="tag-badge main-plot">Main Plot</span>' : '';
  const specialBadge = item.special ? `<span class="tag-badge special">${item.special}</span>` : '';
  const episodeNumber = item.episode ? item.episode.toString() : item.numbers;
  
  return `
    <div class="episode-horizontal-card reveal" ${clickAction} data-type="${item.type}" data-tags="${item.mainPlot ? 'main-plot' : ''} ${item.special ? 'special' : ''}" data-ep-id="${item.id || item.episode || ''}">
      <div class="episode-horizontal-img" style="background-image: url('${imageUrl}')" data-ep-num="${item.episode || item.id || ''}"></div>
      <div class="episode-horizontal-content">
        <div class="episode-horizontal-header">
          <div class="episode-horizontal-number">${episodeNumber}</div>
          <div class="episode-horizontal-type ${typeClass}">${typeDisplay}</div>
        </div>
        <h3 class="episode-horizontal-title">${title}</h3>
        <div class="episode-horizontal-tags">
          ${mainPlotBadge}
          ${specialBadge}
        </div>
      </div>
    </div>
  `;
}

// ─── MODERN WATCH GUIDE FUNCTIONALITY ───────────────────────
function setupModernWatchGuide() {
  // Filter tabs functionality
  const filterTabs = document.querySelectorAll('.filter-tab');
  const watchCards = document.querySelectorAll('.modern-watch-card');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Filter cards
      const filter = tab.dataset.filter;
      filterWatchCards(filter);
    });
  });
  
  // Search functionality
  const searchInput = document.querySelector('.guide-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      searchWatchCards(searchTerm);
    });
  }
}

function filterWatchCards(filter) {
  const watchCards = document.querySelectorAll('.modern-watch-card');
  const activeFilterTab = document.querySelector('.filter-tab.active');
  const currentFilter = activeFilterTab ? activeFilterTab.dataset.filter : 'all';
  
  watchCards.forEach(card => {
    const type = card.dataset.type || '';
    const tags = card.dataset.tags || '';
    const mainPlot = tags.includes('main-plot');
    
    let showCard = true;
    
    if (currentFilter === 'episode' && type !== 'episode') {
      showCard = false;
    } else if (currentFilter === 'movie' && type !== 'movie') {
      showCard = false;
    } else if (currentFilter === 'magic-kaito' && type !== 'magic-kaito') {
      showCard = false;
    } else if (currentFilter === 'main-plot' && !mainPlot) {
      showCard = false;
    }
    
    card.style.display = showCard ? 'block' : 'none';
  });
}

function searchWatchCards(searchTerm) {
  const watchCards = document.querySelectorAll('.modern-watch-card');
  
  watchCards.forEach(card => {
    const title = card.querySelector('.modern-card-title')?.textContent.toLowerCase() || '';
    const number = card.querySelector('.modern-card-number')?.textContent.toLowerCase() || '';
    const type = card.querySelector('.type-text')?.textContent.toLowerCase() || '';
    
    const matchesSearch = title.includes(searchTerm) || 
                         number.includes(searchTerm) || 
                         type.includes(searchTerm);
    
    card.style.display = matchesSearch ? 'block' : 'none';
  });
}

// ─── IMPORTANT EPISODES PAGE RENDERER ───────────────────────
function renderImportantEpisodesPage() {
  if (!WATCH_GUIDE) return;
  
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
  const pg=document.createElement('div');
  pg.className='page-enter';

  // Filter only main plot episodes and movies, then enrich with attributes
  const importantItems = WATCH_GUIDE.watchOrder.filter(item => 
    item.mainPlot || item.type === 'movie'
  );
  const individualEpisodes = splitEpisodeRanges(importantItems);
  const enrichedEpisodes = enrichEpisodesWithAttributes(individualEpisodes);
  
  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('https://image.tmdb.org/t/p/w1280/j2qXQ8kHpMMX6U9qkPLo0yw8fF4.jpg')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/guide')">← Watch Guide</button>
        <div class="section-eyebrow">Curated Episodes · Based on XerBlade Guide</div>
        <h1 class="movies-page-title">Important Episodes <em>XerBlade Guide</em></h1>
        <p class="movies-page-sub">The essential Detective Conan episodes every fan should see, from character introductions to main plot developments.</p>
      </div>
    </section>

    <!-- Filter System -->
    <div class="filter-system-container">
      <!-- Main Filter Options -->
      <div class="filter-main-options">
        <button class="filter-main-btn active" data-main-filter="important">All Important</button>
        <button class="filter-main-btn" data-main-filter="important-movies">Important + Movies</button>
        <button class="filter-main-btn" data-main-filter="complete">Important + Movies + Tie-ins</button>
      </div>
      
      <!-- Dropdown Filters -->
      <div class="filter-dropdowns">
        <select class="filter-dropdown" id="content-category-filter">
          <option value="">All Content Types</option>
          <option value="main-plot">Main Plot</option>
          <option value="character">Character Development</option>
          <option value="setup">Introduction & Setup</option>
          <option value="romance">Romance</option>
          <option value="fun">Entertainment Value</option>
          <option value="movie-prequel">Movie Prequels</option>
          <option value="movie-sequel">Movie Sequels</option>
        </select>
        
        <select class="filter-dropdown" id="faction-filter">
          <option value="">All Factions & Groups</option>
          <option value="black-org">Black Organization</option>
          <option value="fbi">FBI</option>
          <option value="heiji">Heiji & Osaka</option>
          <option value="kaito-kid">Kaitou Kid</option>
          <option value="police">Metropolitan Police</option>
        </select>
      </div>
    </div>

    <!-- Episodes Grid -->
    <div class="episodes-grid-horizontal">
      ${enrichedEpisodes.map((ep, index) => renderConanWatchCard(ep, index)).join('')}
    </div>
    
    <!-- About Section -->
    <section class="section">
      <div class="container">
        <div class="content-card">
          <h2>About the XerBlade Guide</h2>
          <p>This comprehensive episode guide is based on the renowned XerBlade Important Episode List, widely considered the go-to resource for Detective Conan fans seeking to watch the most significant episodes.</p>
        </div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  
  app.appendChild(pg);
  setTimeout(() => {observeAll();setupWatchGuideFilters();}, 100);
}

// ─── CANON EPISODES PAGE RENDERER ───────────────────────────
function renderCanonEpisodesPage() {
  if (!WATCH_GUIDE || typeof EPISODES === 'undefined') return;
  
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
  const pg=document.createElement('div');
  pg.className='page-enter';

  // Filter only canon episodes (non-filler) and enrich with attributes
  const canonEpisodes = EPISODES.filter(ep => !isFiller(ep));
  const canonItems = canonEpisodes.map(ep => ({
    type: 'episode',
    episode: ep.n,
    title: ep.title,
    mainPlot: false // Could be enhanced with logic to identify main plot canon episodes
  }));
  const enrichedEpisodes = enrichEpisodesWithAttributes(canonItems);
  
  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('https://image.tmdb.org/t/p/w1280/y7Wr1CbEiu1Lpv7ZQmVPwKovire.jpg')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/guide')">← Watch Guide</button>
        <div class="section-eyebrow">Manga Canon Only</div>
        <h1 class="movies-page-title">Detective Conan <em>Canon Episodes</em></h1>
        <p class="movies-page-sub">All canon episodes from the original manga - no filler content, with rich metadata and filtering options.</p>
      </div>
    </section>

    <!-- Episodes Grid -->
    <div class="episodes-grid-horizontal">
      ${enrichedEpisodes.map((ep, index) => renderConanWatchCard(ep, index)).join('')}
    </div>
    
    <!-- About Section -->
    <section class="section">
      <div class="container">
        <div class="content-card">
          <h2>About Canon Episodes</h2>
          <p>This guide contains only canon episodes that directly adapt content from the original manga by Gosho Aoyama. Filler episodes and anime-original content are excluded to provide the pure story experience.</p>
        </div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  
  app.appendChild(pg);
  setTimeout(() => {observeAll();}, 100);
}

// ─── SCROLL TO EPISODE FUNCTION ─────────────────────────
function scrollToEpisode(startNum) {
  const cards = document.querySelectorAll('.episode-horizontal-card');
  for (const card of cards) {
    const numEl = card.querySelector('.episode-horizontal-number');
    if (numEl) {
      const num = parseInt(numEl.textContent);
      if (!isNaN(num) && num >= startNum) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
    }
  }
}

// ─── WATCH GUIDES INDEX PAGE RENDERER ─────────────────────
function renderWatchGuidesIndex() {
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
  const pg=document.createElement('div');
  pg.className='page-enter';

  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('https://image.tmdb.org/t/p/w1280/vG4KHOzT1qk8ATnBMWUuvwGIlcR.jpg')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/')">← Home</button>
        <div class="section-eyebrow">Watch Guides</div>
        <h1 class="movies-page-title">Detective Conan <em>Watch Guides</em></h1>
        <p class="movies-page-sub">Curated watch orders and episode guides for every type of Detective Conan fan. Choose your perfect viewing experience.</p>
      </div>
    </section>

    <div class="container">
      <div class="browse-grid">
        <!-- Canon Episodes Guide Card -->
        <div class="browse-card reveal" onclick="Router.navigate('/guide/canon-episodes')">
          <div class="browse-card-img" style="background-image:url('https://image.tmdb.org/t/p/w500/y7Wr1CbEiu1Lpv7ZQmVPwKovire.jpg')"></div>
          <div class="browse-card-grad"></div>
          <div class="browse-card-num">01</div>
          <div class="browse-card-content">
            <div class="browse-card-type">Manga Canon Only</div>
            <div class="browse-card-title">Canon Episodes Guide</div>
            <div class="browse-card-meta">No Filler • Pure Story Experience</div>
          </div>
          <div class="browse-card-hover">
            <div class="browse-card-hover-desc">All canon episodes from the original manga by Gosho Aoyama. Filler episodes and anime-original content are excluded to provide the pure story experience.</div>
          </div>
        </div>

        <!-- Important Episodes & Movies Guide Card -->
        <div class="browse-card reveal" onclick="Router.navigate('/guide')">
          <div class="browse-card-img" style="background-image:url('https://image.tmdb.org/t/p/w500/j2qXQ8kHpMMX6U9qkPLo0yw8fF4.jpg')"></div>
          <div class="browse-card-grad"></div>
          <div class="browse-card-num">02</div>
          <div class="browse-card-content">
            <div class="browse-card-type">Based on XerBlade Guide</div>
            <div class="browse-card-title">Important Episodes & Movies</div>
            <div class="browse-card-meta">Essential Episodes • All Movies • Tie-ins</div>
          </div>
          <div class="browse-card-hover">
            <div class="browse-card-hover-desc">Essential Detective Conan episodes every fan should see, curated from the renowned XerBlade Important Episode List. Includes all movies, OVAs, and Magic Kaito 1412 with rich metadata and filtering.</div>
          </div>
        </div>
      </div>

      <!-- About Section -->
      <section class="section">
        <div class="container">
          <div class="content-card">
            <h2>About Our Watch Guides</h2>
            <p>Our comprehensive watch guides are designed to help you navigate the extensive Detective Conan universe. Whether you're a new fan looking for the essential episodes or a seasoned viewer wanting to experience the complete story, we have the perfect guide for you.</p>
            <div style="margin-top: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
              <div style="padding: 16px; background: var(--surface1); border-radius: 8px; border: 1px solid var(--border);">
                <h4 style="color: var(--red); margin-bottom: 8px;">🎯 Essential Episodes</h4>
                <p style="font-size: 14px; color: var(--text2);">Focus on the most important plot points and character developments.</p>
              </div>
              <div style="padding: 16px; background: var(--surface1); border-radius: 8px; border: 1px solid var(--border);">
                <h4 style="color: var(--red); margin-bottom: 8px;">📖 Manga Canon</h4>
                <p style="font-size: 14px; color: var(--text2);">Experience the story as intended by the original creator.</p>
              </div>
              <div style="padding: 16px; background: var(--surface1); border-radius: 8px; border: 1px solid var(--border);">
                <h4 style="color: var(--red); margin-bottom: 8px;">🔍 Rich Metadata</h4>
                <p style="font-size: 14px; color: var(--text2);">Detailed faction tags, content types, and advanced filtering.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    ${renderFooterHTML()}
  `;
  
  app.appendChild(pg);
  setTimeout(() => {observeAll();}, 100);
}

// Initialize modern watch guide when page loads
setTimeout(() => {
  if (document.querySelector('.modern-guide-container')) {
    setupModernWatchGuide();
  }
}, 500);

// ─── MOVIE MODAL ────────────────────────────────────────
window.openMovieModal=function(mid){
  const m=MOVIES.find(x=>x.id===mid);if(!m)return;
  const poster=getMoviePosterHiRes(m, MOVIES.indexOf(m)+2);
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
  // Use hi-res (w500) version — modal is big enough to benefit from it.
  if(!window.MOVIE_POSTERS.get(m.id)){
    [1000,4000].forEach(ms=>setTimeout(()=>{
      const url=window.MOVIE_POSTERS.get(m.id);
      if(url){
        const hiRes=url.replace('/w154/','/w500/').replace('/w185/','/w500/');
        const el=modalPanel.querySelector('.mml-poster-img');
        if(el) el.src=hiRes;
      }
    },ms));
  }
};

// ─── SPINOFF MODAL ───────────────────────────────────
window.openSpinoffModal=function(sid){
  const sp=SPINOFFS.find(x=>x.id===sid);if(!sp)return;
  const spImg = getSpinoffPoster(sp, 9);
  const dubTags = sp.languages.dub.map(l=>`<span class="tag tag-etv" style="font-size:11px">${l} Dub</span>`).join(' ');
  openModal(`<div class="modal-handle"></div>
    <div class="modal-movie-hero">
      <div class="mmh-poster" style="background-image:url('${spImg}');background-color:#111"></div>
      <div class="mmh-overlay" style="background:linear-gradient(to right, rgba(7,7,15,0.95) 0%, rgba(7,7,15,0.65) 50%, transparent 100%)"></div>
      <div class="mmh-info">
        <div class="mmh-badge">Spinoff Series · ${sp.year}</div>
        <div class="mmh-title">${sp.title}</div>
        <div class="mmh-meta" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:8px">
          <span style="font-size:13px;color:var(--text2)">${sp.episodes} Episodes</span>
          <span style="color:var(--border2)">·</span>
          ${dubTags}
          <span class="tag tag-netflix" style="font-size:11px">Eng Sub</span>
        </div>
      </div>
      <button class="modal-close mmh-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-movie-body">
      <p class="modal-desc">${sp.desc}</p>
      <div class="modal-where-title">Watch in India</div>
      <div class="modal-where" style="margin-bottom:20px">
        <div class="modal-where-row">
          ${renderWherePlatformLabel('Netflix','#E50914')}
          <span class="modal-where-detail">English Sub · ${sp.languages.dub.join(' · ')} Dub</span>
        </div>
      </div>
      <a class="watch-btn" href="https://www.netflix.com/title/80090370" target="_blank" rel="noopener"
        style="--btn-color:#E50914;--btn-bg:#1a0000;display:flex;text-decoration:none;margin-bottom:8px">
        <span class="watch-btn-name">Watch on Netflix</span>
        <span class="watch-btn-detail">Subscription required · All episodes available</span>
      </a>
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
  window.scrollTo({top:0,behavior:"instant"});
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
  window.scrollTo({top:0,behavior:"instant"});
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

        <!-- SEARCH BAR - Row 1 -->
        <div class="browse-search-row">
          <div class="browse-search-wrap">
            <span class="browse-search-icon">🔍</span>
            <input class="browse-search-input" id="browseSearch" type="search" placeholder="Search titles, descriptions…" autocomplete="off" spellcheck="false">
            <button class="browse-search-clear" id="browseSearchClear" title="Clear">✕</button>
          </div>
        </div>

        <!-- FILTERS - Row 2 -->
        <div class="browse-filters-row">
          <!-- Single-select Dropdowns -->
          <div class="browse-multi-filters">
            <label class="filter-dropdown-group">
              <select class="filter-select" data-bselect="type">
                <option value="all">All Content</option>
                <option value="movie">Movies</option>
                <option value="season">Seasons</option>
                <option value="ova">OVA &amp; Specials</option>
                <option value="kaito">Magic Kaito</option>
                <option value="spinoff">Spinoffs</option>
              </select>
            </label>

            <label class="filter-dropdown-group">
              <select class="filter-select" data-bselect="platform">
                <option value="all">All Platforms</option>
                <option value="netflix">Netflix</option>
                <option value="primevideo">Prime Video</option>
                <option value="appletv">Apple TV</option>
                <option value="etvbalb">ETV Bal Bharat</option>
                <option value="etvwin">ETV Win</option>
              </select>
            </label>

            <label class="filter-dropdown-group">
              <select class="filter-select" data-bselect="language">
                <option value="all">All Languages</option>
                <option value="English Sub">English Sub</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Kannada">Kannada</option>
                <option value="Bengali">Bengali</option>
                <option value="Marathi">Marathi</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Odia">Odia</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Assamese">Assamese</option>
                <option value="English">English</option>
              </select>
            </label>

            <!-- PLOT TAG MULTI-SELECT DROPDOWN -->
            <div class="multi-select-dropdown" data-filter="plot">
              <button class="multi-select-btn" onclick="toggleMultiSelect('plot')">
                <span class="multi-select-value" id="plot-value">Plot</span>
                <span class="multi-select-chevron">⌄</span>
              </button>
              <div class="multi-select-menu" id="plot-menu">
                ${(window.ALL_TAGS || []).map(tag => {
                  const def = (window.TAG_DEFINITIONS || {})[tag] || {};
                  return `<label class="multi-select-option" title="${def.desc || ''}"><input type="checkbox" value="${tag}" data-parent="plot"><span>${tag}</span></label>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
        
        <div id="browse-filter-results"></div>

        <div class="browse-page-meta" id="browse-page-meta"></div>
        <div class="browse-grid" id="browse-page-grid"></div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  app.appendChild(pg);

  // State - single select for type/platform/language, multi for plot
  const bs={type:'all',platform:'all',language:'all',plot:[],query:''};

  // Setup multi-select dropdowns (only for plot)
  setupMultiSelectListeners();
  
  // Setup single-select dropdowns
  pg.querySelectorAll('[data-bselect]').forEach(sel=>{
    sel.addEventListener('change',()=>{
      const g = sel.dataset.bselect;
      bs[g] = sel.value;
      runBrowse();
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.multi-select-dropdown')) {
      document.querySelectorAll('.multi-select-menu.active').forEach(menu => menu.classList.remove('active'));
    }
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

  function getContentTags(item, type) {
    // Get tags for content item based on type
    if (type === 'movie' && typeof MOVIE_TAGS !== 'undefined') {
      return MOVIE_TAGS.get(item.n) || new Set();
    }
    return new Set();
  }

  function itemVisible(item,type){
    // type filter - single select
    if(bs.type !== 'all' && bs.type !== type) return false;
    
    // platform filter - single select (AND logic)
    if(bs.platform !== 'all'){
      const itemPlatforms = type==='movie' ? getMoviePlatforms(item) 
        : type==='season' ? (item.platforms||[])
        : type==='ova' ? ['netflix', 'etvwin']
        : type==='kaito' ? ['amasian']
        : type==='spinoff' ? ['netflix']
        : [];
      if (!itemPlatforms.includes(bs.platform)) return false;
    }
    
    // language filter - single select (AND logic)
    if(bs.language !== 'all'){
      let langs;
      if(type==='movie') langs=getMovieLangs(item, bs.platform);
      else if(type==='season') langs=getSeasonLangs(item, bs.platform);
      else if(type==='ova') langs=new Set(['English Sub','Hindi','Tamil','Telugu']);
      else if(type==='kaito') langs=new Set(['English']);
      else langs=new Set(['English Sub','Hindi','English']);
      if (!langs.has(bs.language)) return false;
    }
    
    // plot tag filter for content items (movies, OVAs, Kaito) - OR logic
    if (bs.plot.length > 0) {
      let contentTags;
      if (type === 'movie') contentTags = MOVIE_TAGS?.get(item.n);
      else if (type === 'ova') contentTags = OVA_TAGS?.get(item.episodeNumber || item.id?.replace('ova', ''));
      else if (type === 'kaito') {
        // Aggregate all Kaito tags
        contentTags = new Set();
        if (typeof KAITO_TAGS !== 'undefined') {
          for (let i = 1; i <= 24; i++) {
            const epTags = KAITO_TAGS.get(i);
            if (epTags) epTags.forEach(t => contentTags.add(t));
          }
        }
      }
      
      if (contentTags) {
        // OR logic: content has ANY of the selected plot tags
        const hasMatch = bs.plot.some(tag => contentTags.has(tag));
        if (!hasMatch) return false;
      } else {
        return false; // No tags means doesn't match
      }
    }
    
    // text search — for seasons also match against individual episode titles/numbers
    if(bs.query){
      const hay=[
        type==='movie'?item.title:'',
        type==='movie'?item.desc:'',
        type==='season'?item.label:'',
        type==='ova'?item.title:'',
        type==='ova'?item.desc:'',
        type==='kaito'?item.title:'',
        type==='kaito'?item.desc:'',
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

  function setupMultiSelectListeners() {
    // Only handle plot filter (multi-select)
    document.querySelectorAll('.multi-select-menu input[data-parent="plot"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const checked = document.querySelectorAll('.multi-select-menu input[data-parent="plot"]:checked');
        const values = Array.from(checked).map(c => c.value);
        bs.plot = values;
        
        // Update display
        const displayEl = document.getElementById('plot-value');
        if (values.length === 0) {
          displayEl.textContent = 'All';
        } else if (values.length === 1) {
          displayEl.textContent = values[0];
        } else {
          displayEl.textContent = `${values.length} selected`;
        }
        
        runBrowse();
      });
    });
  }

  // Get episodes matching selected plot tags (OR logic)
  function getEpisodesByPlotTags(selectedTags) {
    if (!selectedTags || selectedTags.length === 0) return [];
    
    const matchingEpisodes = [];
    if (typeof EPISODES !== 'undefined' && typeof EPISODE_TAGS !== 'undefined') {
      for (const ep of EPISODES) {
        const epTags = EPISODE_TAGS.get(ep.n);
        if (epTags) {
          // OR logic: episode has ANY of the selected tags
          const hasMatch = selectedTags.some(tag => epTags.has(tag));
          if (hasMatch) {
            matchingEpisodes.push(ep);
          }
        }
      }
    }
    return matchingEpisodes;
  }

  // Global function for toggling dropdowns
  window.toggleMultiSelect = function(filter) {
    const menu = document.getElementById(`${filter}-menu`);
    const isActive = menu.classList.contains('active');
    
    // Close all menus
    document.querySelectorAll('.multi-select-menu').forEach(m => m.classList.remove('active'));
    
    // Toggle current
    if (!isActive) {
      menu.classList.add('active');
    }
  };

  function updateBrowseFilterResults(filterState) {
    const resultsInfo = document.getElementById('browse-filter-results');
    if (!resultsInfo) return;
    
    const { selectedTags, logic } = filterState;
    if (selectedTags.length === 0) {
      resultsInfo.innerHTML = '';
    } else {
      resultsInfo.innerHTML = `
        <div class="filter-results" style="margin-bottom: 16px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <span class="filter-results-count" style="font-weight: 600; color: var(--accent);">${selectedTags.length} tag${selectedTags.length !== 1 ? 's' : ''}</span>
          <span style="color: var(--text2);">match (${logic === 'AND' ? 'ALL' : 'ANY'})</span>
          <div class="filter-results-tags" style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${selectedTags.map(tag => `<span class="tag" style="font-size: 10px; background: rgba(204,34,51,0.2); color: var(--accent);">${tag}</span>`).join('')}
          </div>
        </div>
      `;
    }
  }

  function runBrowse(){
    const grid=document.getElementById('browse-page-grid');
    const meta=document.getElementById('browse-page-meta');
    if(!grid)return;

    const q=bs.query;
    const num=q?parseInt(q,10):NaN;

    // Get plot-tagged episodes when plot filters are selected
    let plotEpResults=[];
    if (bs.plot.length > 0 && typeof EPISODES !== 'undefined') {
      const matchingEps = getEpisodesByPlotTags(bs.plot);
      plotEpResults = matchingEps.map(e=>{
        const s=SEASONS.find(x=>x.id===e.season)||{};
        // Get episode tags for badges
        const epTags = EPISODE_TAGS?.get(e.n);
        const tagBadges = epTags ? Array.from(epTags).slice(0, 3).map(tag => {
          const def = TAG_DEFINITIONS?.[tag] || { color: '#666' };
          return `<span class="content-tag" style="--tag-color: ${def.color}; font-size: 8px; padding: 2px 6px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-right: 4px;">${tag}</span>`;
        }).join('') : '';
        
        return`<div class="browse-card ep-result-card" data-ep-num="${e.n}" data-tags="${epTags ? Array.from(epTags).join(',') : ''}" onclick="openEpisodeModal(${e.n})">
          <div class="browse-card-img" style="background-image:url('${getEpisodeStill(e,e.n+1)}')"></div>
          <div class="browse-card-grad"></div>
          <div class="browse-card-num">${e.n}</div>
          <div class="browse-card-badges"><span class="tag tag-plex" style="font-size:8px">EP</span></div>
          <div class="browse-card-content">
            <div class="browse-card-type">${s.label||e.season} · ${e.etv?'ETV ·':''} ${e.special?'Special':''}</div>
            <div class="browse-card-title">${e.title}</div>
            ${tagBadges ? `<div class="browse-card-tags" style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 4px;">${tagBadges}</div>` : ''}
          </div>
        </div>`;
      });
    }

    // Episode-level results from search query only (not plot tags)
    let searchEpResults=[];
    if(q && typeof EPISODES !== 'undefined'){
      const matched=EPISODES.filter(e=>
        typeof e.n==='number'&&(
          (!isNaN(num)&&e.n===num)||
          (e.title&&e.title.toLowerCase().includes(q))
        )
      ).slice(0,24);
      searchEpResults=matched.map(e=>{
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
      ...(typeof OVAS !== 'undefined' ? OVAS.map((o,i)=>({item:o,type:'ova',idx:i})) : []),
      ...(typeof MAGIC_KAITO !== 'undefined' ? [{item:MAGIC_KAITO,type:'kaito',idx:0}] : []),
    ].filter(({item,type})=>itemVisible(item,type));

    const totalCount=searchEpResults.length+plotEpResults.length+items.length;
    const plotFilterText = bs.plot.length > 0 ? ` · ${bs.plot.length} plot tag${bs.plot.length!==1?'s':''}` : '';
    meta.textContent=`Showing ${totalCount} result${totalCount!==1?'s':''}${q?' for "'+searchEl.value+'"':''}${plotFilterText}`;

    if(totalCount===0){
      grid.innerHTML=`<div class="no-results empty-state" style="grid-column:1/-1"><div class="empty-state-illustration">🧭</div><div class="empty-state-title">No results found</div><div class="empty-state-sub">Try a different title or episode number, or reset all filters to return to the full catalog.</div><button class="empty-state-action" onclick="Router.navigate('/browse')">Reset Browse</button></div>`;
      return;
    }

    // Build sections: search episodes first, then content items, then plot-tagged episodes at bottom
    const searchEpSection=searchEpResults.length
      ?`<div class="browse-ep-heading" style="grid-column:1/-1">Episodes (${searchEpResults.length})</div>${searchEpResults.join('')}`
      :'';
    
    const cardSection=items.length
      ?`${items.map(({item,type,idx})=>renderBrowseCard(item,type,idx)).join('')}`
      :'';
    
    const plotEpSection=plotEpResults.length
      ?`<div class="browse-ep-heading" style="grid-column:1/-1;margin-top:24px;">Episodes matching plot tags (${plotEpResults.length})</div>${plotEpResults.join('')}`
      :'';

    grid.innerHTML=searchEpSection+cardSection+plotEpSection;
    setTimeout(()=>{observeAll();refreshHover();},60);
  }

  runBrowse();
  setTimeout(()=>{refreshHover();searchEl.focus();},120);
}

// ─── LANGUAGES PAGE ──────────────────────────────────
function renderLanguagesPage(){
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
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
  window.scrollTo({top:0,behavior:"instant"});
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
  window.scrollTo({top:0,behavior:"instant"});
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

// ─── WATCH GUIDE PAGE ────────────────────────────────
function renderGuidePage(){
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
  const pg=document.createElement('div');
  pg.className='page-enter';

  pg.innerHTML=renderComprehensiveGuide() + renderFooterHTML();

  app.appendChild(pg);
  setTimeout(()=>pg.classList.remove('page-enter'),10);
  initScrollReveal();
}

// ─── IMPORTANT EPISODES GUIDE PAGE ─────────────────────
function renderImportantEpisodesPage(){
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
  const pg=document.createElement('div');
  pg.className='page-enter';

  // Complete data from JSON - process all items into individual cards
  const CONAN_DATA = {
    "meta": {
      "description": "Detective Conan important episodes, movies, and movie tie-in specials. Data sourced from detectiveconanworld.com and xerblade.com guide.",
      "episodeNumbering": "Japanese original numbering (jpn). INTL numbers included where different.",
      "tags": {
        "main-plot": "Essential to the overall story arc (Black Organization, Conan's identity, key relationships)",
        "character": "Significant character introductions or development",
        "black-org": "Black Organization involvement",
        "heiji": "Hattori Heiji case or development",
        "kaito-kid": "Kaitou Kid involvement",
        "romance": "Romance development for main characters",
        "fbi": "FBI involvement",
        "shinichi": "Shinichi/Conan identity-related or Shinichi-as-himself episode",
        "police": "Metropolitan Police detective love story or police-focused",
        "setup": "Introduces gadgets, recurring elements, or world-building",
        "fun": "Notable for humor, meta references, or entertainment value",
        "movie-prequel": "Official prequel/pre-story to a specific movie",
        "movie-sequel": "Official sequel/post-story to a specific movie"
      }
    },
    "sequence": [
      { "id": "ep1-2", "type": "episode", "jpn": "1-2", "intl": "1-2", "title": "Initial Setup (Roller Coaster Murder Case / Introduction)", "tags": ["main-plot"], "description": "Series premiere. Shinichi shrinks into Conan. Introduces Ran, Kogoro, Agasa, Megure, Gin, and Vodka." },
      { "id": "ep3", "type": "episode", "jpn": "3", "intl": "3", "title": "Idol Stalking Case", "tags": ["character"], "description": "Character development and recurring elements introduced for the first time." },
      { "id": "ep4", "type": "episode", "jpn": "4", "intl": "4", "title": "Shinkansen Bomb Case", "tags": ["character"], "description": "Mitsuhiko, Ayumi, and Genta's first focus episode." },
      { "id": "ep5", "type": "episode", "jpn": "5", "intl": "5", "title": "Haunted Mansion Murder Case", "tags": ["character"], "description": "Minor character development and foreshadowing for episode 7." },
      { "id": "ep7", "type": "episode", "jpn": "7", "intl": "7", "title": "Locked Room in the Sky / Ran's Suspicion", "tags": ["main-plot", "romance"], "description": "First time Ran comes close to exposing Conan's identity. Major character development." },
      { "id": "ep10", "type": "episode", "jpn": "10", "intl": "10", "title": "Bicycle Race Accident Case", "tags": ["setup"], "description": "Introduces minor recurring elements referenced many times in the future." },
      { "id": "ep11", "type": "episode", "jpn": "11", "intl": "11-12", "title": "Moonlight Sonata Murder Case", "tags": ["character"], "description": "Events referenced in character development in episodes 77-78. (1 Hour Special)" },
      { "id": "ep12", "type": "episode", "jpn": "12", "intl": "13", "title": "Drive-by Shooting Case", "tags": ["setup", "character"], "description": "Introduces the turbo skateboard and detective badge. Formalizes the Detective Boys." },
      { "id": "ep13", "type": "episode", "jpn": "13", "intl": "14", "title": "Tenkaichi Night Festival Murder Case", "tags": ["main-plot", "character"], "description": "Introduces Miyano Akemi. Critically important to the main plot." },
      { "id": "ep18", "type": "episode", "jpn": "18", "intl": "19", "title": "Conan Edogawa Kidnapping Case", "tags": ["character"], "description": "Introduces Superintendent Matsumoto." },
      { "id": "ep20", "type": "episode", "jpn": "20", "intl": "21", "title": "The Wealthy Daughter Murder Case", "tags": ["setup"], "description": "Introduces the Elasticity Suspenders." },
      { "id": "ep27-28", "type": "episode", "jpn": "27-28", "intl": "28-29", "title": "Kogoro Mouri Character Development Case", "tags": ["character"], "description": "Mori Kogoro character development." },
      { "id": "ep32", "type": "episode", "jpn": "32", "intl": "33", "title": "Art Museum Owner Murder Case", "tags": ["character"], "description": "Introduces Kisaki Eri, Ran's mother." },
      { "id": "ep34-35", "type": "episode", "jpn": "34-35", "intl": "35-36", "title": "Kogoro's Class Reunion Murder Case", "tags": ["character"], "description": "Suzuki Sonoko development. Her first manga appearance adapted." },
      { "id": "ep43", "type": "episode", "jpn": "43", "intl": "44", "title": "Conan vs. Kid vs. Yaiba Bomb Case", "tags": ["main-plot", "character", "black-org"], "description": "Introduces two characters central to many future main plot events. Black Organization reference." },
      { "id": "ep48-50", "type": "episode", "jpn": "48-50", "intl": "49-51", "title": "Conan vs. Heiji, Battle of Deductions", "tags": ["main-plot", "character", "heiji"], "description": "Introduces Hattori Heiji. First time Conan temporarily returns to his original body." },
      { "id": "ep54", "type": "episode", "jpn": "54", "intl": "56", "title": "Murder in the Locked Apartment", "tags": ["main-plot", "black-org"], "description": "Black Organization involvement." },
      { "id": "ep57-58", "type": "episode", "jpn": "57-58", "intl": "59-60", "title": "Final Screening Murder Case", "tags": ["main-plot", "heiji"], "description": "Hattori Heiji major development." },
      { "id": "mk-ep1-2", "type": "magic-kaito", "jpn": "MK1-2", "title": "Magic Kaito 1412 Episodes 1-2", "tags": ["kaito-kid", "character"], "description": "Introduces Kaitou Kid and Nakamori Ginzo. Watch before episode 76." },
      { "id": "ep76", "type": "episode", "jpn": "76", "intl": "78-79", "title": "The Kaitou Kid's Miraculous Midair Walk", "tags": ["kaito-kid", "character"], "description": "First appearance of Kaitou Kid in Detective Conan. (1 Hour Special)" },
      { "id": "ep77-78", "type": "episode", "jpn": "77-78", "intl": "80-81", "title": "Conan and Heiji's Locked Room", "tags": ["heiji", "character"], "description": "Heiji case. Some Conan development." },
      { "id": "ep81-82", "type": "episode", "jpn": "81-82", "intl": "84-85", "title": "The Forgotten Crow", "tags": ["fun"], "description": "Voice actor references galore." },
      { "id": "ep96", "type": "episode", "jpn": "96", "intl": "99-102", "title": "The Vanished Detective", "tags": ["character", "romance"], "description": "Main character development. (2 Hour Special)" },
      { "id": "movie1", "type": "movie", "number": 1, "title": "The Time-Bombed Skyscraper", "year": 1997, "tags": ["romance", "character"], "description": "A chain of bombing cases linked to Shinichi's past investigations.", "relatedEpisodes": [] },
      { "id": "ep100-101", "type": "episode", "jpn": "100-101", "intl": "106-107", "title": "The Two Faces of Haibara Ai", "tags": ["shinichi", "character"], "description": "Shinichi case. Main character development." },
      { "id": "ep118", "type": "episode", "jpn": "118", "intl": "124-125", "title": "Heiji and Kazuha in Grave Danger!", "tags": ["heiji", "character"], "description": "Heiji case. Introduces Toyama Kazuha. Builds on Conan development from eps 11 and 77-79. (1 Hour Special)" },
      { "id": "ep128", "type": "episode", "jpn": "128", "intl": "135", "title": "The Black Organization: One Billion Yen Robbery Case", "tags": ["main-plot", "black-org"], "description": "Black Organization major event." },
      { "id": "ep129", "type": "episode", "jpn": "129", "intl": "136-139", "title": "The Shi Shi Oh Murder Case / Haibara Ai Introduction", "tags": ["main-plot", "character", "black-org"], "description": "Introduces Haibara Ai, the second most central character to the plot. (2 Hour Special)" },
      { "id": "ep130-131", "type": "episode", "jpn": "130-131", "intl": "140-141", "title": "The Night Baron Murder Case", "tags": ["character"], "description": "Introduces Sato Miwako." },
      { "id": "ep132-134", "type": "episode", "jpn": "132-134", "intl": "142-144", "title": "Conan, Ran, and the Black Organization", "tags": ["kaito-kid"], "description": "Kaitou Kid case." },
      { "id": "ep136-137", "type": "episode", "jpn": "136-137", "intl": "146-147", "title": "The Man Who Died Twice", "tags": ["character"], "description": "Character development." },
      { "id": "ep141-142", "type": "episode", "jpn": "141-142", "intl": "151-152", "title": "The Locked Room in the Sky", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep146-147", "type": "episode", "jpn": "146-147", "intl": "156-157", "title": "Metropolitan Police Detective Love Story", "tags": ["police", "character"], "description": "Metropolitan Police Detective Love Story. Introduces Miyamoto Yumi." },
      { "id": "ep153-154", "type": "episode", "jpn": "153-154", "intl": "163-164", "title": "The Zombie Murder Case", "tags": ["character"], "description": "Introduces Kyogoku Makoto." },
      { "id": "ep156-157", "type": "episode", "jpn": "156-157", "intl": "166-167", "title": "Metropolitan Police Detective Love Story 2", "tags": ["police", "character"], "description": "Metropolitan Police Detective Love Story 2." },
      { "id": "ep162", "type": "episode", "jpn": "162", "intl": "172-173", "title": "The Locked Room in the Sky: Shinichi's First Case", "tags": ["shinichi", "main-plot"], "description": "The Locked Room in the Sky: Kudo Shinichi's First Case. (1 Hour Special)" },
      { "id": "movie2", "type": "movie", "number": 2, "title": "The Fourteenth Target", "year": 1998, "tags": ["character", "romance", "character-pasts"], "description": "People close to Kogoro are attacked in a pattern resembling The A.B.C. Murders.", "relatedEpisodes": [] },
      { "id": "ep166-168", "type": "episode", "jpn": "166-168", "intl": "177-179", "title": "The Shinkansen Transport Case", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep170-171", "type": "episode", "jpn": "170-171", "intl": "181-182", "title": "The Snowy Mountain Hut Case", "tags": ["main-plot", "character"], "description": "Introduces Araide Tomoaki. Becomes extremely important later on." },
      { "id": "ep174", "type": "episode", "jpn": "174", "intl": "185-188", "title": "The Desperate Revival Arc", "tags": ["heiji"], "description": "Heiji case. (2 Hour Special)" },
      { "id": "ep176-178", "type": "episode", "jpn": "176-178", "intl": "190-192", "title": "Reunion with the Black Organization", "tags": ["main-plot", "black-org"], "description": "Reunion with the Black Organization major arc." },
      { "id": "movie3", "type": "movie", "number": 3, "title": "The Last Wizard of the Century", "year": 1999, "tags": ["character", "kaito-kid"], "description": "Kaitou Kid seeks a treasure connected to the Romanovs.", "relatedEpisodes": [] },
      { "id": "ep188-193", "type": "episode", "jpn": "188-193", "intl": "203-208", "title": "The Desperate Revival", "tags": ["main-plot", "shinichi", "romance"], "description": "The Desperate Revival arc. Major main character development." },
      { "id": "ep199-200", "type": "episode", "jpn": "199-200", "intl": "214-215", "title": "The Jet Black Mystery Train", "tags": ["character"], "description": "Character development." },
      { "id": "ep205-206", "type": "episode", "jpn": "205-206", "intl": "220-221", "title": "Metropolitan Police Detective Love Story 3", "tags": ["police", "character"], "description": "Metropolitan Police Detective Love Story 3." },
      { "id": "ep212-213", "type": "episode", "jpn": "212-213", "intl": "228-229", "title": "Haibara Development Case", "tags": ["character", "black-org"], "description": "Haibara development." },
      { "id": "ep217-218", "type": "episode", "jpn": "217-218", "intl": "233-234", "title": "Megure's Sealed Secret", "tags": ["character"], "description": "Megure development." },
      { "id": "mk-ep4-6", "type": "magic-kaito", "jpn": "MK4-6", "title": "Magic Kaito 1412 Episodes 4-6", "tags": ["kaito-kid", "character"], "description": "Introduces Hakuba Saguru and the origin of the rivalry between Conan and Kid. Watch before episode 219." },
      { "id": "ep219", "type": "episode", "jpn": "219", "intl": "235-238", "title": "Conan vs. Kid vs. Yaiba: Battle for the Sword", "tags": ["main-plot", "kaito-kid"], "description": "Kaitou Kid case. Background info important for later plot. (2 Hour Special)" },
      { "id": "ep220-221", "type": "episode", "jpn": "220-221", "intl": "239-240", "title": "The Locked Room in the Sky 2", "tags": ["heiji", "character"], "description": "Introduces Heiji's mother." },
      { "id": "ep222-224", "type": "episode", "jpn": "222-224", "intl": "241-243", "title": "Heiji and the Vampire Mansion", "tags": ["heiji", "character"], "description": "Heiji case. Some Conan development." },
      { "id": "ep226-227", "type": "episode", "jpn": "226-227", "intl": "245-246", "title": "The Cornered Famous Detective", "tags": ["main-plot", "fbi", "character"], "description": "Introduces Jodie Saintemillion." },
      { "id": "ep230-231", "type": "episode", "jpn": "230-231", "intl": "249-250", "title": "The Mysterious Package", "tags": ["main-plot", "fbi", "black-org", "character"], "description": "Introduces Akai Shuichi. Jodie and Araide development. Black Organization activity." },
      { "id": "ep238-239", "type": "episode", "jpn": "238-239", "intl": "257-258", "title": "Heiji Hattori's Desperate Battle", "tags": ["heiji", "character"], "description": "Heiji case. Conan development." },
      { "id": "ova2-16suspects", "type": "ova", "title": "OVA 2: 16 Suspects!?", "tags": ["movie-prequel", "character"], "relatedMovie": "movie4", "relatedMovieTitle": "Captured in Her Eyes", "preOrPost": "prequel", "description": "Features Shiratori's wine collection which is drunk in Movie 4. Watch before Movie 4." },
      { "id": "movie4", "type": "movie", "number": 4, "title": "Captured in Her Eyes", "year": 2000, "tags": ["romance", "character", "character-pasts"], "description": "Ran witnesses a murder and loses her memory from shock.", "relatedEpisodes": ["ova2-16suspects"] },
      { "id": "ep240-241", "type": "episode", "jpn": "240-241", "intl": "259-260", "title": "The Groaning Cliff Castle", "tags": ["character"], "description": "Character development." },
      { "id": "ep242", "type": "episode", "jpn": "242", "intl": "261", "title": "The Mysterious Passengers on the Shinkansen", "tags": ["character", "black-org"], "description": "Haibara development and minor Black Organization info." },
      { "id": "ep246-247", "type": "episode", "jpn": "246-247", "intl": "265-266", "title": "Haibara Ai's Critical Moment", "tags": ["character", "black-org"], "description": "Haibara development." },
      { "id": "ep253-254", "type": "episode", "jpn": "253-254", "intl": "272-273", "title": "Metropolitan Police Detective Love Story 4", "tags": ["main-plot", "police", "romance"], "description": "Metropolitan Police Detective Love Story 4." },
      { "id": "ep258-259", "type": "episode", "jpn": "258-259", "intl": "277-278", "title": "The Trembling Metropolitan Police Headquarters", "tags": ["main-plot", "fbi", "character"], "description": "Introduces James Black. Shuichi development." },
      { "id": "ep263", "type": "episode", "jpn": "263", "intl": "282-285", "title": "The Osaka Perfect Crime Case", "tags": ["heiji"], "description": "Heiji case. (2 Hour Special)" },
      { "id": "ep266-268", "type": "episode", "jpn": "266-268", "intl": "288-290", "title": "The Mysterious Woman from the Past", "tags": ["main-plot", "fbi", "character"], "description": "Makoto development. More Shuichi. Black Organization connections." },
      { "id": "ep269-272", "type": "episode", "jpn": "269-272", "intl": "291-294", "title": "The Black Organization's Trap", "tags": ["main-plot", "black-org", "fbi"], "description": "Black Organization info and Jodie development. More Shuichi." },
      { "id": "ep277-278", "type": "episode", "jpn": "277-278", "intl": "299-300", "title": "The Unusual Combination of Heiji and Jodie", "tags": ["main-plot", "heiji", "fbi"], "description": "Lots of Heiji and Jodie development." },
      { "id": "movie5", "type": "movie", "number": 5, "title": "Countdown to Heaven", "year": 2001, "tags": ["character", "romance", "black-org"], "description": "The Black Organization and twin towers bombing plot.", "relatedEpisodes": [] },
      { "id": "ep279-280", "type": "episode", "jpn": "279-280", "intl": "301-302", "title": "The Scar That Evokes the Past", "tags": ["main-plot", "character", "black-org"], "description": "Haibara development and Black Organization clues." },
      { "id": "ep284-285", "type": "episode", "jpn": "284-285", "intl": "306-307", "title": "The Haunting of Shinichi", "tags": ["main-plot", "fbi"], "description": "More Shuichi development." },
      { "id": "ep286-288", "type": "episode", "jpn": "286-288", "intl": "308-310", "title": "Kudo Shinichi's New York Case", "tags": ["main-plot", "fbi", "shinichi"], "description": "Shinichi's New York Case. Extremely important Shuichi development." },
      { "id": "ep289-290", "type": "episode", "jpn": "289-290", "intl": "311-312", "title": "The Pitch Black Darkness in the Detective's Office", "tags": ["main-plot", "black-org"], "description": "Black Organization info." },
      { "id": "ep291-293", "type": "episode", "jpn": "291-293", "intl": "313-315", "title": "Heiji Hattori vs. Shinichi Kudo: Battle of Deductions", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep301-304", "type": "episode", "jpn": "301,302,304", "intl": "323,324,326-329", "title": "The Missing Melody in Fallen Snow", "tags": ["police", "character"], "description": "Sato and Takagi development. (304 is 2 Hour Special)" },
      { "id": "ep307-308", "type": "episode", "jpn": "307-308", "intl": "332-333", "title": "The Unseen Man's Alibi Case", "tags": ["main-plot", "black-org"], "description": "Black Organization buildup." },
      { "id": "ep309-311", "type": "episode", "jpn": "309-311", "intl": "334-336", "title": "Contact with the Black Organization", "tags": ["main-plot", "black-org", "fbi"], "description": "Contact with the Black Organization major arc." },
      { "id": "ep312-313", "type": "episode", "jpn": "312-313", "intl": "337-338", "title": "The Secret of the Organization's Betrayal", "tags": ["main-plot", "black-org", "character"], "description": "Followup to Contact arc. Haibara development. Black Organization backstory." },
      { "id": "movie6", "type": "movie", "number": 6, "title": "The Phantom of Baker Street", "year": 2002, "tags": ["romance"], "description": "Virtual reality game where children are trapped in a simulation of Victorian London.", "relatedEpisodes": [] },
      { "id": "ep323-327", "type": "episode", "jpn": "323-327", "intl": "348-352", "title": "Murder in the Orient Express", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep329-330", "type": "episode", "jpn": "329-330", "intl": "354-355", "title": "The Flower of Fantasista", "tags": ["character", "black-org"], "description": "Haibara development." },
      { "id": "ep333-334", "type": "episode", "jpn": "333-334", "intl": "358-359", "title": "The Wandering Red Butterfly", "tags": ["character"], "description": "Character development." },
      { "id": "ep335-336", "type": "episode", "jpn": "335-336", "intl": "360-361", "title": "Kudo Yukiko's Hollywood Case", "tags": ["main-plot", "fbi", "character"], "description": "Yukiko development and more Shuichi." },
      { "id": "ep338-339", "type": "episode", "jpn": "338-339", "intl": "363-364", "title": "The Footsteps of the Dark Organization", "tags": ["main-plot", "fbi", "character", "black-org"], "description": "Haibara, Shuichi, Jodie, and Araide development." },
      { "id": "ep340-341", "type": "episode", "jpn": "340-341", "intl": "365-366", "title": "The Pitch-Black Darkness of the Big City", "tags": ["main-plot", "character"], "description": "Haibara development." },
      { "id": "ep343-344", "type": "episode", "jpn": "343-344", "intl": "369-370", "title": "The Beautiful Assassin", "tags": ["main-plot", "character", "romance"], "description": "Jodie and Ran development." },
      { "id": "ep345", "type": "episode", "jpn": "345", "intl": "371-375", "title": "Head-to-Head Match with the Black Organization", "tags": ["main-plot", "black-org", "fbi"], "description": "Head-to-Head Match with the Black Organization: A Dual Mystery on a Full Moon Night. (2.5 Hour Special)" },
      { "id": "ova3-heijivanshed", "type": "ova", "title": "OVA 3: Conan, Heiji, and the Vanished Boy", "tags": ["movie-prequel", "heiji", "character"], "relatedMovie": "movie7", "relatedMovieTitle": "Crossroad in the Ancient Capital", "preOrPost": "prequel", "description": "Conan and Heiji help find a missing boy in Osaka. Watch before Movie 7." },
      { "id": "movie7", "type": "movie", "number": 7, "title": "Crossroad in the Ancient Capital", "year": 2003, "tags": ["character", "romance", "character-pasts", "heiji"], "description": "A serial killer in Kyoto with connections to the past.", "relatedEpisodes": ["ova3-heijivanshed"] },
      { "id": "ep346-347", "type": "episode", "jpn": "346-347", "intl": "376-377", "title": "The Frozen Fingerprint", "tags": ["character", "black-org"], "description": "Haibara followup development." },
      { "id": "mk-ep16", "type": "magic-kaito", "jpn": "MK16", "title": "Magic Kaito 1412 Episode 16", "tags": ["kaito-kid"], "description": "Crossover with Detective Conan episode 356. Watch before episode 356." },
      { "id": "ep356", "type": "episode", "jpn": "356", "intl": "386-387", "title": "Kaitou Kid and the Four Masterworks", "tags": ["kaito-kid"], "description": "Kaitou Kid case. (1 Hour Special)" },
      { "id": "ep358-359", "type": "episode", "jpn": "358-359", "intl": "389-390", "title": "Metropolitan Police Detective Love Story 5", "tags": ["police", "character"], "description": "Metropolitan Police Detective Love Story 5." },
      { "id": "ep361-362", "type": "episode", "jpn": "361-362", "intl": "392-393", "title": "The Dark Night's Visitor", "tags": ["main-plot", "fbi", "character"], "description": "Jodie and Araide development." },
      { "id": "ep381-383", "type": "episode", "jpn": "381-383", "intl": "412-417", "title": "The Locked Room in the Sky: Shinichi's First Case Part 2", "tags": ["heiji"], "description": "Heiji case. (383 is 2 Hour Special)" },
      { "id": "ep385-387", "type": "episode", "jpn": "385-387", "intl": "419-421", "title": "The Shadow of the Black Organization", "tags": ["main-plot", "black-org"], "description": "Black Organization info." },
      { "id": "ova4-crystalmother", "type": "ova", "title": "OVA 4: Conan, Kid, and the Crystal Mother", "tags": ["movie-prequel", "kaito-kid"], "relatedMovie": "movie8", "relatedMovieTitle": "Magician of the Silver Sky", "preOrPost": "prequel", "description": "Kid attempts to steal a jewel. Watch before Movie 8." },
      { "id": "movie8", "type": "movie", "number": 8, "title": "Magician of the Silver Sky", "year": 2004, "tags": ["character", "romance", "kaito-kid"], "description": "Kaitou Kid impersonates Ran's father on a plane hijacking case.", "relatedEpisodes": ["ova4-crystalmother"] },
      { "id": "ep390-391", "type": "episode", "jpn": "390-391", "intl": "424-425", "title": "Metropolitan Police Detective Love Story 6", "tags": ["police", "character", "romance"], "description": "Metropolitan Police Detective Love Story 6." },
      { "id": "ep394-396", "type": "episode", "jpn": "394-396", "intl": "428-430", "title": "Kaitou Kid and the Blush Mermaid", "tags": ["kaito-kid"], "description": "Kaitou Kid case." },
      { "id": "ep398-399", "type": "episode", "jpn": "398-399", "intl": "432-433", "title": "The Shadow of the Black Organization 2", "tags": ["main-plot", "black-org"], "description": "Setup and building suspense." },
      { "id": "ep400", "type": "episode", "jpn": "400", "intl": "434", "title": "Illustrated Diary of a Middle School Detective", "tags": ["main-plot", "character"], "description": "Major character development." },
      { "id": "ep406-408", "type": "episode", "jpn": "406-408", "intl": "440-442", "title": "The Big Monster Gomera Murder Case", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep421-422", "type": "episode", "jpn": "421-422", "intl": "455-456", "title": "The Shinkansen Transport Case 2", "tags": ["character"], "description": "Agasa development." },
      { "id": "ep425", "type": "episode", "jpn": "425", "intl": "459-463", "title": "Black Impact! The Moment the Black Organization Reaches Out", "tags": ["main-plot", "black-org"], "description": "Black Impact! The Moment the Black Organization Reaches Out. (2.5 Hour Special)" },
      { "id": "ep429-430", "type": "episode", "jpn": "429-430", "intl": "467-468", "title": "The Case of the Hunted Detective", "tags": ["main-plot", "character"], "description": "Introduces Hondo Eisuke." },
      { "id": "ep431-432", "type": "episode", "jpn": "431-432", "intl": "469-470", "title": "Metropolitan Police Detective Love Story 7", "tags": ["police", "character", "romance"], "description": "Metropolitan Police Detective Love Story 7." },
      { "id": "movie9", "type": "movie", "number": 9, "title": "Strategy Above the Depths", "year": 2005, "tags": ["character", "character-pasts"], "description": "A murder aboard a cruise ship.", "relatedEpisodes": [] },
      { "id": "ep449", "type": "episode", "jpn": "449", "intl": "487-488", "title": "Metropolitan Police Detective Love Story: Fake Wedding", "tags": ["police", "romance"], "description": "Metropolitan Police Detective Love Story — Fake Wedding. (1 Hour Special)" },
      { "id": "ep457-458", "type": "episode", "jpn": "457-458", "intl": "497-498", "title": "Conan and Heiji vs. Kid: The Impossible Alibi", "tags": ["character", "romance"], "description": "Sonoko and Makoto development." },
      { "id": "ep462-465", "type": "episode", "jpn": "462-465", "intl": "502-505", "title": "The Shadow of the Black Organization 3", "tags": ["main-plot", "black-org", "character"], "description": "The Shadow of the Black Organization major arc." },
      { "id": "ep469-470", "type": "episode", "jpn": "469-470", "intl": "509-510", "title": "Kaitou Kid and the Amazing Detective Team", "tags": ["kaito-kid"], "description": "Kaitou Kid case." },
      { "id": "ep472-473", "type": "episode", "jpn": "472-473", "intl": "512-513", "title": "The Dream of the Kudo Shinichi US Tour", "tags": ["kaito-kid", "shinichi"], "description": "Kaitou Kid + Shinichi case." },
      { "id": "movie10", "type": "movie", "number": 10, "title": "The Private Eyes' Requiem", "year": 2006, "tags": ["kaito-kid"], "description": "Kogoro is blackmailed at a theme park.", "relatedEpisodes": [] },
      { "id": "ep479", "type": "episode", "jpn": "479", "intl": "519-522", "title": "Heiji's Desperate Situation", "tags": ["heiji"], "description": "Heiji case. (2 Hour Special)" },
      { "id": "ep484-485", "type": "episode", "jpn": "484-485", "intl": "527-528", "title": "The Confrontation with the Black Organization: A Trap with a Postcard on a Switchback", "tags": ["main-plot", "character"], "description": "Eisuke development." },
      { "id": "ep487", "type": "episode", "jpn": "487", "intl": "530-531", "title": "Metropolitan Police Detective Love Story 8", "tags": ["police", "romance"], "description": "Metropolitan Police Detective Love Story 8: The Left Hand's Ring Finger. (1 Hour Special)" },
      { "id": "ep490", "type": "episode", "jpn": "490", "intl": "536-537", "title": "The Desperate Situation", "tags": ["heiji"], "description": "Heiji case. (1 Hour Special)" },
      { "id": "ep491-504", "type": "episode", "jpn": "491-504", "intl": "538-551", "title": "Clash of Red and Black", "tags": ["main-plot", "black-org", "fbi"], "description": "Clash of Red and Black. The longest Black Organization arc to date. Major development." },
      { "id": "ova7-agasa", "type": "ova", "title": "OVA 7: A Challenge from Agasa! Agasa vs. Conan and the Detective Boys", "tags": ["movie-prequel", "character"], "relatedMovie": "movie11", "relatedMovieTitle": "Jolly Roger in the Deep Azure", "preOrPost": "prequel", "description": "Agasa challenges the Detective Boys to solve his mystery. Watch before Movie 11." },
      { "id": "movie11", "type": "movie", "number": 11, "title": "Jolly Roger in the Deep Azure", "year": 2007, "tags": ["character"], "description": "Conan and the group investigate a mystery on a tropical island.", "relatedEpisodes": ["ova7-agasa"] },
      { "id": "ep507-508", "type": "episode", "jpn": "507-508", "intl": "554-555", "title": "The Jet-Black Impact", "tags": ["main-plot", "character"], "description": "Eisuke development." },
      { "id": "ep509-511", "type": "episode", "jpn": "509-511", "intl": "556-558", "title": "The Crisis Aboard the Luxury Liner", "tags": ["main-plot", "character", "black-org"], "description": "Introduces Okiya Subaru. Black Organization info." },
      { "id": "mk-ep21", "type": "magic-kaito", "jpn": "MK21", "title": "Magic Kaito 1412 Episode 21", "tags": ["kaito-kid"], "description": "Crossover with Detective Conan episode 515. Watch alongside or before episode 515." },
      { "id": "ep515", "type": "episode", "jpn": "515", "intl": "562-563", "title": "Kaitou Kid and the Blush Mermaid 2", "tags": ["kaito-kid"], "description": "Kaitou Kid case. (1 Hour Special)" },
      { "id": "ep516-517", "type": "episode", "jpn": "516-517", "intl": "564-566", "title": "The Osaka Prefectural Police's Dark Plot", "tags": ["heiji", "character"], "description": "Heiji case. Introduces Yamato Kansuke and Uehara Yui. (516 is 1 Hour Special)" },
      { "id": "mf2-shinichi", "type": "magic-file", "number": 2, "title": "Magic File 2: Shinichi Kudo, The Case of the Mysterious Wall and the Black Lab", "tags": ["movie-prequel", "shinichi", "character"], "relatedMovie": "movie12", "relatedMovieTitle": "Full Score of Fear", "preOrPost": "prequel", "description": "A Shinichi-as-protagonist prequel to Movie 12. Watch immediately before Movie 12." },
      { "id": "movie12", "type": "movie", "number": 12, "title": "Full Score of Fear", "year": 2008, "tags": ["character-pasts"], "description": "Murder at a concert hall involving a musical prodigy.", "relatedEpisodes": ["mf2-shinichi"] },
      { "id": "ep521-525", "type": "episode", "jpn": "521-525", "intl": "570-576", "title": "The Red Shadow of Darkness", "tags": ["main-plot", "shinichi", "heiji"], "description": "Shinichi case. Major development for main characters including Heiji. (521 and 522 are 1 Hour Specials)" },
      { "id": "ep532-535", "type": "episode", "jpn": "532-535", "intl": "583-586", "title": "Superintendent Matsumoto's Tragedy", "tags": ["police", "character"], "description": "Development for Superintendent Matsumoto, Takagi, and Sato." },
      { "id": "ep537-538", "type": "episode", "jpn": "537-538", "intl": "588-589", "title": "Kaitou Kid and the Sky High Showdown", "tags": ["kaito-kid"], "description": "Kaitou Kid case." },
      { "id": "ep542-543", "type": "episode", "jpn": "542-543", "intl": "593-594", "title": "The Conspiracy of the Wandering Man", "tags": ["main-plot", "character"], "description": "Subaru development." },
      { "id": "ep557-561", "type": "episode", "jpn": "557-561", "intl": "608-612", "title": "The Red Fuji Case", "tags": ["character"], "description": "Character stuff for main characters. Introduces Morofushi Takaaki. Yamato and Uehara development." },
      { "id": "ep563-564", "type": "episode", "jpn": "563-564", "intl": "614-615", "title": "Big Bang of the Betrayal", "tags": ["main-plot", "fbi", "black-org"], "description": "FBI and Black Organization major events." },
      { "id": "ep568-569", "type": "episode", "jpn": "568-569", "intl": "619-620", "title": "The Full Moon Night's Double Mystery", "tags": ["character"], "description": "Inspector Shiratori and Kobayashi-sensei development." },
      { "id": "lupin-vs-dc-tv", "type": "tv-special", "title": "Lupin III vs. Detective Conan (TV Special)", "tags": ["movie-prequel", "kaito-kid", "fbi"], "relatedMovie": "lupin-movie", "relatedMovieTitle": "Lupin III vs. Detective Conan: The Movie", "preOrPost": "prequel", "description": "TV crossover special that precedes the theatrical crossover film." },
      { "id": "mf3-shinichi-ran", "type": "magic-file", "number": 3, "title": "Magic File 3: Shinichi and Ran, Memories of Mahjong Tiles and Tanabata", "tags": ["movie-prequel", "shinichi", "romance"], "relatedMovie": "movie13", "relatedMovieTitle": "The Raven Chaser", "preOrPost": "prequel", "description": "Flashback to Shinichi and Ran's middle school days. Ends with the Detective Boys inviting Conan beetle hunting, leading into the movie. Watch immediately before Movie 13." },
      { "id": "movie13", "type": "movie", "number": 13, "title": "The Raven Chaser", "year": 2009, "tags": ["character", "black-org"], "description": "A serial murder case where all victims were investigated by the same detective, linked to the Black Organization.", "relatedEpisodes": ["mf3-shinichi-ran"] },
      { "id": "ep573-574", "type": "episode", "jpn": "573-574", "intl": "624-625", "title": "The Threatening Package", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep578-581", "type": "episode", "jpn": "578-581", "intl": "629-632", "title": "The Gathering of the Detectives", "tags": ["main-plot", "fbi", "black-org", "character"], "description": "Subaru and Jodie development. Black Organization activity." },
      { "id": "ep583-585", "type": "episode", "jpn": "583-585", "intl": "634-636", "title": "Love Story at the Police Headquarters", "tags": ["character"], "description": "Inspector Shiratori and Kobayashi-sensei development." },
      { "id": "ep586-587", "type": "episode", "jpn": "586-587", "intl": "637-638", "title": "Kaitou Kid and the Blush Mermaid 3", "tags": ["kaito-kid"], "description": "Kaitou Kid case." },
      { "id": "ep592-593", "type": "episode", "jpn": "592-593", "intl": "643-644", "title": "Ran's Crisis!", "tags": ["character", "romance"], "description": "Ran development." },
      { "id": "ep610-613", "type": "episode", "jpn": "610-613", "intl": "661-664", "title": "The Aichi Heiji Case", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep616-621", "type": "episode", "jpn": "616-621", "intl": "667-672", "title": "Holmes' Revelation", "tags": ["main-plot", "shinichi", "fbi", "character"], "description": "Holmes' Revelation arc. Major development for main characters." },
      { "id": "ep622-623", "type": "episode", "jpn": "622-623", "intl": "673-674", "title": "The Suspect is Kogoro Mouri!", "tags": ["main-plot", "character", "black-org"], "description": "Haibara and Subaru development." },
      { "id": "ep624", "type": "episode", "jpn": "624", "intl": "675", "title": "The Ryoma Treasure Case", "tags": ["character"], "description": "Introduces Miike Naeko." },
      { "id": "mk-ep9-11", "type": "magic-kaito", "jpn": "MK9-11", "title": "Magic Kaito 1412 Episodes 9-11", "tags": ["kaito-kid"], "description": "Lead-in to Detective Conan episodes 627-628. These MK episodes should be watched before DC 627-628." },
      { "id": "ep627-628", "type": "episode", "jpn": "627-628", "intl": "678-679", "title": "Kaitou Kid vs. the Strongest Safe", "tags": ["kaito-kid"], "description": "Kaitou Kid case. Magic Kaito 1412 eps 9-11 serve as the prologue to this." },
      { "id": "mf4-osaka", "type": "magic-file", "number": 4, "title": "Magic File 4: The Osaka Okonomiyaki Odyssey", "tags": ["movie-prequel", "heiji", "character"], "relatedMovie": "movie14", "relatedMovieTitle": "The Lost Ship in the Sky", "preOrPost": "prequel", "description": "Heiji and Kazuha adventure in Osaka. Watch immediately before Movie 14." },
      { "id": "movie14", "type": "movie", "number": 14, "title": "The Lost Ship in the Sky", "year": 2010, "tags": ["romance", "kaito-kid", "character-pasts"], "description": "Kaitou Kid and a hijacked airship. Introduces Jirokichi Suzuki.", "relatedEpisodes": ["mf4-osaka"] },
      { "id": "ep646-647", "type": "episode", "jpn": "646-647", "intl": "697-698", "title": "The Handcuff Trick Case", "tags": ["main-plot", "character"], "description": "Introduces Sera Masumi." },
      { "id": "ep648-650", "type": "episode", "jpn": "648-650", "intl": "699-701", "title": "A Dangerous Duo", "tags": ["main-plot", "character"], "description": "Sera development." },
      { "id": "mf5-niigata", "type": "magic-file", "number": 5, "title": "Magic File 5: Niigata~Tokyo Souvenir Capriccio", "tags": ["movie-prequel", "character"], "relatedMovie": "movie15", "relatedMovieTitle": "Quarter of Silence", "preOrPost": "prequel", "description": "Conan and friends on a trip that leads into the movie setting. Watch immediately before Movie 15." },
      { "id": "movie15", "type": "movie", "number": 15, "title": "Quarter of Silence", "year": 2011, "tags": ["character"], "description": "A murder in a snowy mountain village threatened by a dam project.", "relatedEpisodes": ["mf5-niigata"] },
      { "id": "ep651", "type": "episode", "jpn": "651", "intl": "702-703", "title": "The Suspects are All Managers", "tags": ["main-plot", "heiji", "character"], "description": "Heiji case. Some Sera development. (1 Hour Special)" },
      { "id": "ep652-655", "type": "episode", "jpn": "652-655", "intl": "704-707", "title": "The Heiji and Kazuha Case", "tags": ["heiji", "character"], "description": "Heiji case. Introduces Yonehara Sakurako." },
      { "id": "ep656-657", "type": "episode", "jpn": "656-657", "intl": "708-709", "title": "The Murderous Game at the Detective Agency", "tags": ["main-plot", "character", "fbi"], "description": "Sera and Subaru development." },
      { "id": "ep659-660", "type": "episode", "jpn": "659-660", "intl": "711-712", "title": "Chiba and Miike Case", "tags": ["character"], "description": "Detective Chiba and Miike development." },
      { "id": "ep667-668", "type": "episode", "jpn": "667-668", "intl": "719-720", "title": "The Mystery of Naniwa Winery", "tags": ["main-plot", "character", "black-org"], "description": "Introduces Amuro Toru." },
      { "id": "ep671-674", "type": "episode", "jpn": "671-674", "intl": "723-726", "title": "Detectives' Nocturne", "tags": ["main-plot", "character", "black-org", "fbi"], "description": "Detectives' Nocturne. Major development for Subaru, Sera, and Amuro. Black Organization activity." },
      { "id": "ep675-676", "type": "episode", "jpn": "675-676", "intl": "727-728", "title": "The Duel of the Detectives", "tags": ["main-plot", "character", "black-org"], "description": "Sera development and Black Organization buildup." },
      { "id": "ep681-683", "type": "episode", "jpn": "681-683", "intl": "733-735", "title": "The Life-Threatening Broadcast of Love", "tags": ["main-plot", "police", "romance", "character"], "description": "The Life-Threatening Broadcast of Love. Major Sato and Takagi development. Sera and Amuro development." },
      { "id": "ep684-685", "type": "episode", "jpn": "684-685", "intl": "736-737", "title": "The Dangerous Two Weeks", "tags": ["main-plot", "character", "black-org"], "description": "Haibara and Subaru development." },
      { "id": "ep690-691", "type": "episode", "jpn": "690-691", "intl": "742-743", "title": "The Trembling Metropolitan Police Headquarters 2", "tags": ["main-plot", "fbi", "character"], "description": "Subaru, Sera, and Conan's dad development." },
      { "id": "ep694-prequel-m17", "type": "episode", "jpn": "694", "intl": "746", "title": "The Missing Sweets in the Old Shop", "tags": ["movie-prequel", "character"], "relatedMovie": "movie17", "relatedMovieTitle": "Private Eye in the Distant Sea", "preOrPost": "prequel", "description": "Pre-story for Movie 17. Conan and group travel to Kyoto, ending with the warship Hotaka anchoring at Maizuru Bay — where Movie 17 begins. Watch immediately before Movie 17." },
      { "id": "bonusfile1-fantasista", "type": "bonus-file", "title": "Bonus File 1: Flower of Fantasista", "tags": ["movie-prequel", "character"], "relatedMovie": "movie16", "relatedMovieTitle": "The Eleventh Striker", "preOrPost": "prequel", "description": "Football-themed pre-story for Movie 16." },
      { "id": "movie16", "type": "movie", "number": 16, "title": "The Eleventh Striker", "year": 2012, "tags": ["character-pasts"], "description": "Bomb threats at J-League football stadiums.", "relatedEpisodes": ["bonusfile1-fantasista", "ep742-jleague", "ep907-jleague", "ep1083-jleague"] },
      { "id": "movie17", "type": "movie", "number": 17, "title": "Private Eye in the Distant Sea", "year": 2013, "tags": ["character", "romance"], "description": "Murder aboard a Maritime Self-Defense Force warship.", "relatedEpisodes": ["ep694-prequel-m17"] },
      { "id": "ep699-700", "type": "episode", "jpn": "699-700", "intl": "751-752", "title": "Haibara and Sera's Crisis", "tags": ["main-plot", "character", "black-org"], "description": "Haibara and Sera development with Subaru and Amuro. Buildup for the next major event." },
      { "id": "ep701-704", "type": "episode", "jpn": "701-704", "intl": "753-756", "title": "The Pitch Black Mystery Train", "tags": ["main-plot", "black-org", "kaito-kid", "character"], "description": "The Pitch Black Mystery Train. Major Black Organization event. Important development for Haibara, Conan's mom, Shuichi, Subaru, Sera, and Amuro." },
      { "id": "ep705-706", "type": "episode", "jpn": "705-706", "intl": "757-758", "title": "The Trembling Metropolitan Police Headquarters 3", "tags": ["main-plot", "character", "black-org"], "description": "Followup with plan details and Amuro." },
      { "id": "ep710-715", "type": "episode", "jpn": "710-715", "intl": "762-767", "title": "Heiji Hattori and the Vampire Mansion", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep722-723", "type": "episode", "jpn": "722-723", "intl": "774-775", "title": "The Raven Chaser II", "tags": ["main-plot", "character"], "description": "Amuro and Subaru development." },
      { "id": "ep724-725", "type": "episode", "jpn": "724-725", "intl": "776-777", "title": "Kaitou Kid and the Blush Mermaid 4", "tags": ["kaito-kid"], "description": "Kaitou Kid case." },
      { "id": "ep727-728", "type": "episode", "jpn": "727-728", "intl": "779-780", "title": "The Detective Agency Murder Case", "tags": ["main-plot", "character"], "description": "Slight Sera development." },
      { "id": "ep731-732", "type": "episode", "jpn": "731-732", "intl": "783-784", "title": "Shukichi and Yumi's Love Story", "tags": ["main-plot", "character"], "description": "Introduces Haneda Shukichi. Yumi development. Chiba and Miike development." },
      { "id": "ep734", "type": "episode", "jpn": "734", "intl": "786-787", "title": "Jodie's Memories and the Cherry Blossom Viewing Trap", "tags": ["main-plot", "black-org", "fbi"], "description": "Black Organization activity with Jodie development. (1 Hour Special)" },
      { "id": "ep735-prequel-m18", "type": "episode", "jpn": "735", "intl": "788", "title": "The Coded Invitation", "tags": ["movie-prequel", "character"], "relatedMovie": "movie18", "relatedMovieTitle": "Dimensional Sniper", "preOrPost": "prequel", "description": "Pre-story for Movie 18. Watch immediately before Movie 18." },
      { "id": "movie18", "type": "movie", "number": 18, "title": "Dimensional Sniper", "year": 2014, "tags": ["character", "fbi"], "description": "A sniper is targeting tall buildings in Tokyo; Akai Shuichi returns.", "relatedEpisodes": ["ep735-prequel-m18"] },
      { "id": "ep742-jleague", "type": "episode", "jpn": "742", "intl": "795", "title": "Promise with a J-Leaguer", "tags": ["movie-sequel", "character"], "relatedMovie": "movie16", "relatedMovieTitle": "The Eleventh Striker", "preOrPost": "sequel", "description": "Post-story for Movie 16. Features Sanada from Movie 16." },
      { "id": "ep740-741", "type": "episode", "jpn": "740-741", "intl": "793-794", "title": "The Haunted Mansion Case", "tags": ["character"], "description": "Minor Sera development." },
      { "id": "ep744-745", "type": "episode", "jpn": "744-745", "intl": "797-798", "title": "The Makoto and Sonoko Abduction Case", "tags": ["main-plot", "character", "romance"], "description": "Significant Sera and Makoto development." },
      { "id": "ep746-747", "type": "episode", "jpn": "746-747", "intl": "799-800", "title": "Kaitou Kid vs. Kyogoku Makoto", "tags": ["kaito-kid", "character"], "description": "Kaitou Kid vs. Kyogoku Makoto." },
      { "id": "ep748-749", "type": "episode", "jpn": "748-749", "intl": "801-802", "title": "Metropolitan Police Detective Love Story 9", "tags": ["police", "romance"], "description": "Metropolitan Police Detective Love Story 9." },
      { "id": "ep754-756", "type": "episode", "jpn": "754-756", "intl": "807-809", "title": "Sera Masumi and the Assassin's Bullet", "tags": ["main-plot", "character", "fbi"], "description": "Sera development. Introduces Mary (Sera's sister from outside the territory)." },
      { "id": "ep759-760", "type": "episode", "jpn": "759-760", "intl": "812-813", "title": "The Mystery Train Departure", "tags": ["main-plot", "character", "fbi"], "description": "Sera and Mary development." },
      { "id": "ep763-764", "type": "episode", "jpn": "763-764", "intl": "816-817", "title": "The Truth Behind the Darkness", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep770-771", "type": "episode", "jpn": "770-771", "intl": "823-824", "title": "Kogoro's Dangerous Investigation", "tags": ["main-plot", "character"], "description": "Amuro development." },
      { "id": "ep772-773", "type": "episode", "jpn": "772-773", "intl": "825-826", "title": "Shinichi Case: The Desperate Situation", "tags": ["shinichi", "character"], "description": "Shinichi case." },
      { "id": "ep774-prequel-m19", "type": "episode", "jpn": "774", "intl": "827", "title": "Munch's Missing Scream", "tags": ["movie-prequel", "kaito-kid", "character"], "relatedMovie": "movie19", "relatedMovieTitle": "Sunflowers of Inferno", "preOrPost": "prequel", "description": "Pre-story for Movie 19. Munch's Scream stolen during transport. Watch immediately before Movie 19." },
      { "id": "ep779-783", "type": "episode", "jpn": "779-783", "intl": "832-836", "title": "The Scarlet Series", "tags": ["main-plot", "black-org", "fbi", "character"], "description": "The Scarlet series. Major development for Amuro, Subaru, and all significant FBI characters." },
      { "id": "movie19", "type": "movie", "number": 19, "title": "Sunflowers of Inferno", "year": 2015, "tags": ["romance", "kaito-kid", "character-pasts"], "description": "Kaitou Kid goes after Van Gogh's lost Sunflowers painting.", "relatedEpisodes": ["ep774-prequel-m19"] },
      { "id": "ep785-786", "type": "episode", "jpn": "785-786", "intl": "838-839", "title": "The Shukichi and Yumi Wedding Case", "tags": ["main-plot", "character", "fbi"], "description": "Haneda Shukichi and Yumi development. Subaru and Mary development." },
      { "id": "ep787-788", "type": "episode", "jpn": "787-788", "intl": "840-841", "title": "Sera and Mary's Secret", "tags": ["main-plot", "character", "fbi"], "description": "Sera and Mary development." },
      { "id": "ep792-793", "type": "episode", "jpn": "792-793", "intl": "845-846", "title": "The Organization's Trap", "tags": ["main-plot", "black-org"], "description": "Black Organization info." },
      { "id": "ep808-809", "type": "episode", "jpn": "808-809", "intl": "863-864", "title": "Heiji's Desperate Battle 2", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep810-812", "type": "episode", "jpn": "810-812", "intl": "865-867", "title": "The Man Called Zero", "tags": ["main-plot", "character"], "description": "Introduces Kuroda Hyoe. Yamato, Uehara, and Morofushi development." },
      { "id": "ep813-prequel-m20", "type": "episode", "jpn": "813", "intl": "868", "title": "The Shadow Approaching Amuro", "tags": ["movie-prequel", "character", "black-org"], "relatedMovie": "movie20", "relatedMovieTitle": "The Darkest Nightmare", "preOrPost": "prequel", "description": "Pre-story for Movie 20. A mysterious man stalks Amuro at Cafe Poirot. Watch immediately before Movie 20." },
      { "id": "ep814-815", "type": "episode", "jpn": "814-815", "intl": "869-870", "title": "The Kuroda Development Case", "tags": ["main-plot", "character"], "description": "Kuroda followup." },
      { "id": "movie20", "type": "movie", "number": 20, "title": "The Darkest Nightmare", "year": 2016, "tags": ["character", "black-org", "fbi"], "description": "A PSB spy with amnesia washes ashore; the Black Organization hunts her.", "relatedEpisodes": ["ep813-prequel-m20"] },
      { "id": "ep822-823", "type": "episode", "jpn": "822-823", "intl": "877-878", "title": "Kogoro's Deduction Showdown", "tags": ["main-plot", "character"], "description": "Kuroda followup." },
      { "id": "ep827-828", "type": "episode", "jpn": "827-828", "intl": "882-883", "title": "Sera Masumi's True Identity", "tags": ["main-plot", "character", "fbi"], "description": "Sera, Shukichi, and Mary development." },
      { "id": "ep830-832", "type": "episode", "jpn": "830-832", "intl": "885-887", "title": "The Great Detective of the West Case", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep836-837", "type": "episode", "jpn": "836-837", "intl": "891-892", "title": "The Mystery of the Scream", "tags": ["main-plot", "fbi", "character"], "description": "Amuro, Sera, and Shuichi development." },
      { "id": "ep843-844", "type": "episode", "jpn": "843-844", "intl": "898-899", "title": "The Trembling Metropolitan Police Headquarters 4", "tags": ["main-plot", "character"], "description": "Hints related to Mary." },
      { "id": "ep847-848", "type": "episode", "jpn": "847-848", "intl": "902-903", "title": "Chiba and Miike Love Story", "tags": ["character", "police"], "description": "Detective Chiba and Miike development. Recap of main plot details." },
      { "id": "ep849-850", "type": "episode", "jpn": "849-850", "intl": "904-905", "title": "Shukichi's Important Background", "tags": ["main-plot", "character"], "description": "Yumi development. Important background on Haneda Shukichi. Relevant to Shuichi." },
      { "id": "ep853-854", "type": "episode", "jpn": "853-854", "intl": "908-909", "title": "Shinichi and Ran's Memories", "tags": ["shinichi", "romance", "character"], "description": "Shinichi case." },
      { "id": "ep855-prequel-m21", "type": "episode", "jpn": "855", "intl": "910", "title": "The Mystery of the Vanished Black Belt", "tags": ["movie-prequel", "character", "romance"], "relatedMovie": "movie21", "relatedMovieTitle": "The Crimson Love Letter", "preOrPost": "prequel", "description": "Pre-story for Movie 21. Sonoko and Makoto in Osaka at a karate dojo. Watch immediately before Movie 21." },
      { "id": "ep861-867", "type": "episode", "jpn": "861-864,866,867", "intl": "916-919,921,922", "title": "Black Organization Setup Arc", "tags": ["main-plot", "black-org", "fbi", "character"], "description": "Black Organization setup with Subaru, Amuro, Sera, and Mary development." },
      { "id": "movie21", "type": "movie", "number": 21, "title": "The Crimson Love Letter", "year": 2017, "tags": ["character", "romance", "character-pasts", "heiji"], "description": "Heiji and Kazuha caught up in a karuta tournament and bombing plot in Kyoto.", "relatedEpisodes": ["ep855-prequel-m21"], "note": "Reasonably necessary if following the Heiji/Kazuha plotline. Some aspects of the Scarlet School Trip case won't make sense if skipped." },
      { "id": "ep872-874", "type": "episode", "jpn": "872-874", "intl": "927-929", "title": "Heiji Hattori and the Vampire Mansion 2", "tags": ["heiji", "character"], "description": "Heiji case. Introduces Ooka Momiji." },
      { "id": "ep878-879", "type": "episode", "jpn": "878-879", "intl": "933-934", "title": "Sera Masumi Development Case 2", "tags": ["main-plot", "character", "fbi"], "description": "Sera development." },
      { "id": "ep881-882", "type": "episode", "jpn": "881-882", "intl": "936-937", "title": "Shinichi Case: The Night Conan Was Almost Discovered", "tags": ["main-plot", "shinichi", "fbi", "character"], "description": "Shinichi case with Sera, Shuichi development." },
      { "id": "ep885-886", "type": "episode", "jpn": "885-886", "intl": "940-941", "title": "Heiji and Amuro Case", "tags": ["heiji", "character"], "description": "Heiji and Amuro case. Introduces Iori Muga. Momiji development." },
      { "id": "ep887-888", "type": "episode", "jpn": "887-888", "intl": "942-943", "title": "Kaitou Kid and the Luna Memoria", "tags": ["kaito-kid"], "description": "Kaitou Kid case." },
      { "id": "ep889-890", "type": "episode", "jpn": "889-890", "intl": "944-945", "title": "The Mystery of the Missing Princess", "tags": ["main-plot", "character"], "description": "Introduces Wakasa Rumi." },
      { "id": "ep894-895", "type": "episode", "jpn": "894-895", "intl": "949-950", "title": "The Workplace Murder Case", "tags": ["main-plot", "character", "black-org"], "description": "Introduces Wakita Kanenori." },
      { "id": "ep896-897", "type": "episode", "jpn": "896-897", "intl": "951-952", "title": "Rumi-sensei Development Case", "tags": ["main-plot", "character"], "description": "Rumi-sensei development." },
      { "id": "ep898-prequel-m22", "type": "episode", "jpn": "898", "intl": "953", "title": "The Melting Cake!", "tags": ["movie-prequel", "character"], "relatedMovie": "movie22", "relatedMovieTitle": "Zero the Enforcer", "preOrPost": "prequel", "description": "Pre-story for Movie 22. Amuro's cake mysteriously melts at Cafe Poirot. Watch immediately before Movie 22." },
      { "id": "ep907-jleague", "type": "episode", "jpn": "907", "intl": "962", "title": "The J League Bodyguard", "tags": ["movie-sequel", "character"], "relatedMovie": "movie16", "relatedMovieTitle": "The Eleventh Striker", "preOrPost": "sequel", "description": "Post-story for Movie 16. Commemorates 25th J-League anniversary. Features Yasuhito Endo from Movie 16." },
      { "id": "ep909-910", "type": "episode", "jpn": "909-910", "intl": "964-965", "title": "The Kuroda Development Case 2", "tags": ["main-plot", "character"], "description": "Kuroda and Rumi-sensei development." },
      { "id": "ep916-917", "type": "episode", "jpn": "916-917", "intl": "971-972", "title": "Heiji Hattori's Desperate Battle 3", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "movie22", "type": "movie", "number": 22, "title": "Zero the Enforcer", "year": 2018, "tags": ["character", "black-org"], "description": "Amuro (Zero) is suspected of bombing the Tokyo Summit.", "relatedEpisodes": ["ep898-prequel-m22"] },
      { "id": "ep919-920-925-926", "type": "episode", "jpn": "919-920,925-926", "intl": "974-975,980-981", "title": "The Threatening Letter Setup", "tags": ["main-plot", "character"], "description": "Setup. Slight Amuro development." },
      { "id": "ep927-928", "type": "episode", "jpn": "927-928", "intl": "982-985", "title": "Scarlet School Trip", "tags": ["main-plot", "shinichi", "fbi", "romance", "character"], "description": "Scarlet School Trip. Shinichi case. Main character development. Sera Masumi and Mary development. (Both 1 Hour Specials)" },
      { "id": "ep936-prequel-m23", "type": "episode", "jpn": "936", "intl": "991", "title": "Intrigue at the Food Court", "tags": ["movie-prequel", "character"], "relatedMovie": "movie23", "relatedMovieTitle": "The Fist of Blue Sapphire", "preOrPost": "prequel", "description": "Pre-story for Movie 23. Detective Boys overhear a sinister conversation at a food festival. Watch immediately before Movie 23." },
      { "id": "ep941-942", "type": "episode", "jpn": "941-942", "intl": "998-999", "title": "Followup from Scarlet School Trip", "tags": ["main-plot", "black-org", "character"], "description": "Followup. Kuroda, Rumi-sensei, and Wakita development. Black Organization development." },
      { "id": "movie23", "type": "movie", "number": 23, "title": "The Fist of Blue Sapphire", "year": 2019, "tags": ["character", "romance", "kaito-kid"], "description": "Kaitou Kid in Singapore, Makoto's championship match, and a serial murder case.", "relatedEpisodes": ["ep936-prequel-m23"] },
      { "id": "ep952-954", "type": "episode", "jpn": "952-954", "intl": "1009-1011", "title": "Amuro's Desperate Battle", "tags": ["main-plot", "character"], "description": "Amuro development." },
      { "id": "ep971-974", "type": "episode", "jpn": "971-974", "intl": "1028-1031", "title": "The Complex Alibi Case", "tags": ["main-plot", "character", "police"], "description": "Chiba, Miike, Kuroda, Amuro, Yumi, and Shukichi development." },
      { "id": "ep983-984", "type": "episode", "jpn": "983-984", "intl": "1040-1041", "title": "Heiji and Kaitou Kid Development Case", "tags": ["main-plot", "heiji", "kaito-kid", "character"], "description": "Heiji case, Kaitou Kid, Morofushi, Amuro, and Hiromitsu development." },
      { "id": "ep993-995", "type": "episode", "jpn": "993-995", "intl": "1050-1052", "title": "Sera Masumi Development Arc", "tags": ["main-plot", "character", "romance"], "description": "Sera Masumi development. Makoto is around." },
      { "id": "ep1002-prequel-m24", "type": "episode", "jpn": "1002", "intl": "1059", "title": "The Beika City Shopping Center Garbage Bin Mystery", "tags": ["movie-prequel", "character"], "relatedMovie": "movie24", "relatedMovieTitle": "The Scarlet Bullet", "preOrPost": "prequel", "description": "Pre-story for Movie 24. Originally scheduled as ep 975 but delayed due to COVID-19. Watch immediately before Movie 24." },
      { "id": "ep1003-1005", "type": "episode", "jpn": "1003-1005", "intl": "1060-1062", "title": "The 36-Cell Perfect Game", "tags": ["main-plot", "character"], "description": "Hiromitsu and Wakita development." },
      { "id": "movie24", "type": "movie", "number": 24, "title": "The Scarlet Bullet", "year": 2021, "tags": ["character", "romance", "fbi"], "description": "World Sports Games in Tokyo; FBI linked kidnappings; Akai family focus.", "relatedEpisodes": ["ep1002-prequel-m24"] },
      { "id": "ep1011-1012", "type": "episode", "jpn": "1011-1012", "intl": "1068-1069", "title": "Rumi-sensei Development Case 2", "tags": ["main-plot", "character"], "description": "Rumi-sensei development." },
      { "id": "ep1018-1020", "type": "episode", "jpn": "1018-1020", "intl": "1075-1077", "title": "Subaru and Sera's Secret", "tags": ["main-plot", "character", "fbi"], "description": "Subaru, Sera Masumi, and Mary development." },
      { "id": "ep1024-1025", "type": "episode", "jpn": "1024-1025", "intl": "1081-1082", "title": "Heiji Case: Haneda Koji Development", "tags": ["main-plot", "heiji", "character"], "description": "Heiji case. Haneda Koji development." },
      { "id": "ep1033-1035", "type": "episode", "jpn": "1033-1035", "intl": "1090-1092", "title": "Shukichi, Yumi, Shuichi, and Mary Development", "tags": ["main-plot", "character", "fbi"], "description": "Shukichi, Yumi, Shuichi, and Mary development." },
      { "id": "ep1039-prequel-m25", "type": "episode", "jpn": "1039", "intl": "1096", "title": "The Flying Jack-o'-lantern", "tags": ["movie-prequel", "character"], "relatedMovie": "movie25", "relatedMovieTitle": "The Bride of Halloween", "preOrPost": "prequel", "description": "Pre-story for Movie 25. Jack-o'-lantern thefts at Beika Shopping Centre Halloween event. Watch immediately before Movie 25." },
      { "id": "ep1045-1046", "type": "episode", "jpn": "1045-1046", "intl": "1102-1103", "title": "Sera Masumi and Mary: Black Organization Arc", "tags": ["main-plot", "character", "black-org", "fbi"], "description": "Sera Masumi and Mary development and Black Organization activity." },
      { "id": "movie25", "type": "movie", "number": 25, "title": "The Bride of Halloween", "year": 2022, "tags": ["romance", "black-org", "character-pasts"], "description": "A serial murder case targeting police officers on Halloween, connected to the Black Organization.", "relatedEpisodes": ["ep1039-prequel-m25"] },
      { "id": "ep1053-1054", "type": "episode", "jpn": "1053-1054", "intl": "1110-1111", "title": "Rumi Development Case 3", "tags": ["main-plot", "character"], "description": "Rumi development." },
      { "id": "ep1059-1060", "type": "episode", "jpn": "1059-1060", "intl": "1116-1117", "title": "Wakita Development Case 2", "tags": ["main-plot", "character"], "description": "Wakita development." },
      { "id": "ep1071-1072", "type": "episode", "jpn": "1071-1072", "intl": "1128-1129", "title": "Kaitou Kid: Important Plot Episode", "tags": ["main-plot", "kaito-kid", "character"], "description": "Kaitou Kid case. Plot-important." },
      { "id": "ep1077-1079", "type": "episode", "jpn": "1077-1079", "intl": "1134-1136", "title": "The Black Organization's Scheme", "tags": ["main-plot", "black-org", "character"], "description": "The Black Organization's Scheme major arc." },
      { "id": "ep1080-prequel-m26", "type": "episode", "jpn": "1080", "intl": "1137", "title": "The Cameras Targeting Haibara", "tags": ["movie-prequel", "character", "black-org"], "relatedMovie": "movie26", "relatedMovieTitle": "Black Iron Submarine", "preOrPost": "prequel", "description": "Pre-story for Movie 26. Suspicious men seem to be watching Haibara at a department store. Watch immediately before Movie 26." },
      { "id": "ep1083-jleague", "type": "episode", "jpn": "1083", "intl": "1140", "title": "Behind the Scenes of the J League Finals", "tags": ["movie-sequel", "character"], "relatedMovie": "movie16", "relatedMovieTitle": "The Eleventh Striker", "preOrPost": "sequel", "description": "Post-story for Movie 16. Commemorates 30th J-League anniversary. Detective Boys at a Kawasaki Frontale vs FC Tokyo match." },
      { "id": "ep1085-1086", "type": "episode", "jpn": "1085-1086", "intl": "1142-1143", "title": "Heiji Case: Post Movie 26", "tags": ["heiji"], "description": "Heiji case." },
      { "id": "ep1093-1094", "type": "episode", "jpn": "1093-1094", "intl": "1150-1151", "title": "Haibara and Rumi Development", "tags": ["main-plot", "character"], "description": "Haibara and Rumi development." },
      { "id": "ep1098-1099", "type": "episode", "jpn": "1098-1099", "intl": "1155-1156", "title": "Hagiwara Chihaya Introduction", "tags": ["character"], "description": "Introduces Hagiwara Chihaya." },
      { "id": "ep1105-1106", "type": "episode", "jpn": "1105-1106", "intl": "1162-1163", "title": "Kaitou Kid and the Siren's Splash", "tags": ["kaito-kid", "main-plot", "character"], "description": "Kaitou Kid case. Wakita development." },
      { "id": "ep1109-1110", "type": "episode", "jpn": "1109-1110", "intl": "1166-1167", "title": "Takagi Development Case", "tags": ["character", "police"], "description": "Takagi development." },
      { "id": "ep1115-1116", "type": "episode", "jpn": "1115-1116", "intl": "1172-1173", "title": "Hagiwara Chihaya Development", "tags": ["character"], "description": "Hagiwara Chihaya development." },
      { "id": "movie26", "type": "movie", "number": 26, "title": "Black Iron Submarine", "year": 2023, "tags": ["character", "black-org", "fbi"], "description": "A PSB submarine and Black Organization linked plot. Haibara-focused.", "relatedEpisodes": ["ep1080-prequel-m26"] },
      { "id": "ep1120-prequel-m27", "type": "episode", "jpn": "1120", "intl": "1177", "title": "Mystery of the Lost Treasure", "tags": ["movie-prequel", "character", "kaito-kid"], "relatedMovie": "movie27", "relatedMovieTitle": "The Million-dollar Pentagram", "preOrPost": "prequel", "description": "Pre-story for Movie 27. Conan and Sonoko investigate a stolen pottery collection. Watch immediately before Movie 27." },
      { "id": "ep1135-1136", "type": "episode", "jpn": "1135-1136", "intl": "1192-1193", "title": "Heiji Case: Kuroda Development", "tags": ["main-plot", "heiji", "character"], "description": "Heiji case. Kuroda development." },
      { "id": "movie27", "type": "movie", "number": 27, "title": "The Million-dollar Pentagram", "year": 2024, "tags": ["kaito-kid"], "description": "Kaitou Kid in Hakodate seeking a legendary sword. Heiji-focused.", "relatedEpisodes": ["ep1120-prequel-m27"] },
      { "id": "ep1144-1145", "type": "episode", "jpn": "1144-1145", "intl": "1201-1202", "title": "The Hotel Serial Bombing Case", "tags": ["main-plot", "character", "black-org"], "description": "Sera Masumi and Mary development. Black Organization buildup." },
      { "id": "ep1148-1149", "type": "episode", "jpn": "1148-1149", "intl": "1205-1206", "title": "The Detective Boys and the Two Leaders", "tags": ["main-plot", "character"], "description": "Rumi development." },
      { "id": "ep1150-1151", "type": "episode", "jpn": "1150-1151", "intl": "1207-1208", "title": "Kaitou Kid and the Crown Trick", "tags": ["main-plot", "kaito-kid", "character"], "description": "Kaitou Kid case. Wakita development." },
      { "id": "ep1161-sequel-m28", "type": "episode", "jpn": "1161", "intl": "1218", "title": "The Secret's Afterimage", "tags": ["movie-sequel", "character", "police"], "relatedMovie": "movie28", "relatedMovieTitle": "One-eyed Flashback", "preOrPost": "sequel", "description": "Post-story for Movie 28. Megure brings a case to Kogoro connected to events in the movie. Watch after Movie 28." },
      { "id": "ep1164-1167", "type": "episode", "jpn": "1164-1167", "intl": "1221-1224", "title": "The 17-Year-Old Truth", "tags": ["main-plot", "character", "black-org"], "description": "Chess Tournament Murder Case. Kuroda, Rumi, and Wakita development." },
      { "id": "ep1169-1170", "type": "episode", "jpn": "1169-1170", "intl": "1226-1227", "title": "The Mystery of the Man-Eating Classroom", "tags": ["character"], "description": "Standalone case." },
      { "id": "ep1171-1172", "type": "episode", "jpn": "1171-1172", "intl": "1228-1229", "title": "The Reason He Became a Butler", "tags": ["character"], "description": "Standalone case." },
      { "id": "ep1178-1179", "type": "episode", "jpn": "1178-1179", "intl": "1235-1236", "title": "The Crimson Skeleton of Mt. Washio", "tags": ["character"], "description": "Standalone case." },
      { "id": "ep1184-1185", "type": "episode", "jpn": "1184-1185", "intl": "1241-1242", "title": "The Red-Brick Warehouse and the Vanishing Kidnapper", "tags": ["character"], "description": "Standalone case." },
      { "id": "ep1187", "type": "episode", "jpn": "1187", "intl": "1244", "title": "Episode ZERO: The Shinichi Kudo Aquarium Case", "tags": ["shinichi", "romance", "character"], "description": "30th anniversary special. Shinichi case adapted from a special edition manga. (1 Hour Special)" },
      { "id": "ep1193-1194", "type": "episode", "jpn": "1193-1194", "intl": "1250-1251", "title": "Kid VS Hakuba: The Azure Throne", "tags": ["kaito-kid", "character"], "description": "Kaitou Kid vs. Hakuba Saguru case." },
      { "id": "movie28", "type": "movie", "number": 28, "title": "One-eyed Flashback", "year": 2025, "tags": ["character", "fbi"], "description": "A case connected to a 17-year-old unsolved case; Akai family focus.", "relatedEpisodes": ["ep1161-sequel-m28"] },
      { "id": "ep1197-prequel-m29", "type": "episode", "jpn": "1197", "intl": "1254", "title": "The Cosplay Rider of the Wind", "tags": ["movie-prequel", "character"], "relatedMovie": "movie29", "relatedMovieTitle": "Fallen Angel of the Highway", "preOrPost": "prequel", "description": "Pre-story for Movie 29. Purse-snatching incidents by motorcycle thieves. Watch immediately before Movie 29." },
      { "id": "movie29", "type": "movie", "number": 29, "title": "Fallen Angel of the Highway", "year": 2026, "tags": ["character"], "description": "Movie 29. (2026)", "relatedEpisodes": ["ep1197-prequel-m29"] }
    ]
  };

  // Function to process JSON data into individual episode cards
  function processConanData(data) {
    const processedEpisodes = [];
    
    data.sequence.forEach(item => {
      if (item.type === 'episode') {
        // Split episode ranges into individual episodes
        const episodeRanges = item.jpn.split(',');
        episodeRanges.forEach(range => {
          if (range.includes('-')) {
            // Handle range like "1-2" or "188-193"
            const [start, end] = range.split('-').map(n => parseInt(n.trim()));
            for (let i = start; i <= end; i++) {
              processedEpisodes.push({
                episodes: i.toString(),
                title: item.title,
                description: item.description,
                type: item.tags[0] || 'character',
                tags: item.tags,
                id: item.id,
                jpn: i.toString(),
                intl: item.intl
              });
            }
          } else {
            // Handle single episode
            processedEpisodes.push({
              episodes: range.trim(),
              title: item.title,
              description: item.description,
              type: item.tags[0] || 'character',
              tags: item.tags,
              id: item.id,
              jpn: range.trim(),
              intl: item.intl
            });
          }
        });
      } else if (item.type === 'movie') {
        // Handle movies
        processedEpisodes.push({
          episodes: `Movie ${item.number}`,
          title: `${item.title} (${item.year})`,
          description: item.description,
          type: 'movie',
          tags: item.tags,
          id: item.id,
          jpn: `M${item.number}`,
          intl: `M${item.number}`,
          year: item.year
        });
      } else {
        // Handle OVAs, Magic Files, TV Specials, etc.
        const typeMap = {
          'ova': 'OVA',
          'magic-file': 'Magic File',
          'tv-special': 'TV Special',
          'magic-kaito': 'Magic Kaito',
          'bonus-file': 'Bonus File'
        };
        
        const prefix = typeMap[item.type] || item.type;
        const number = item.number || '';
        
        processedEpisodes.push({
          episodes: `${prefix} ${number}`,
          title: item.title,
          description: item.description,
          type: item.type,
          tags: item.tags,
          id: item.id,
          jpn: item.jpn || prefix,
          intl: item.intl || prefix
        });
      }
    });
    
    return processedEpisodes;
  }

  // Process all the data
  const allEpisodes = processConanData(CONAN_DATA);

  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.conan3}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/guide')">← Watch Guides</button>
        <div class="section-eyebrow">Curated Episodes · Based on XerBlade Guide</div>
        <h1 class="movies-page-title">Important Episodes <em>XerBlade Guide</em></h1>
        <p class="movies-page-sub">The essential Detective Conan episodes every fan should see, from character introductions to main plot developments.</p>
      </div>
    </section>

    <!-- Filter System -->
    <div class="filter-system-container">
      <!-- Main Filter Options -->
      <div class="filter-main-options">
        <button class="filter-main-btn active" data-main-filter="important">All Important</button>
        <button class="filter-main-btn" data-main-filter="important-movies">Important + Movies</button>
        <button class="filter-main-btn" data-main-filter="complete">Important + Movies + Tie-ins</button>
      </div>
      
      <!-- Dropdown Filters -->
      <div class="filter-dropdowns">
        <select class="filter-dropdown" id="content-category-filter">
          <option value="">All Content Types</option>
          <option value="main-plot">Main Plot</option>
          <option value="character">Character Development</option>
          <option value="setup">Introduction & Setup</option>
          <option value="romance">Romance</option>
          <option value="fun">Entertainment Value</option>
          <option value="movie-prequel">Movie Prequels</option>
          <option value="movie-sequel">Movie Sequels</option>
        </select>
        
        <select class="filter-dropdown" id="faction-filter">
          <option value="">All Factions</option>
          <option value="black-org">Black Organization</option>
          <option value="fbi">FBI</option>
          <option value="heiji">Heiji Hattori</option>
          <option value="kaito-kid">Kaitou Kid</option>
          <option value="police">Police</option>
          <option value="romance">Romance</option>
        </select>
        </div>
      </div>
    </div>

    <!-- Season Navigator -->
    <div class="season-navigator-container">
      <div class="season-nav-header">
        <h3>Quick Navigation</h3>
      </div>
      <div class="season-nav-grid">
        <button class="season-nav-btn" onclick="scrollToSeason('early')">Episodes 1-100</button>
        <button class="season-nav-btn" onclick="scrollToSeason('mid')">Episodes 200-400</button>
        <button class="season-nav-btn" onclick="scrollToSeason('late')">Episodes 500-700</button>
        <button class="season-nav-btn" onclick="scrollToSeason('current')">Episodes 800+</button>
        <button class="season-nav-btn" onclick="scrollToSeason('movies')">Movies</button>
        <button class="season-nav-btn" onclick="scrollToSeason('specials')">Specials & OVAs</button>
      </div>
    </div>

    <!-- Episodes Grid -->
    <div class="episodes-grid-horizontal">
      ${allEpisodes.map((ep, index) => {
        const isEven = index % 2 === 0;
        const episodeNumber = ep.episodes.includes('Movie') ? ep.episodes : (ep.episodes.includes('Episode') ? ep.episodes : parseInt(ep.episodes) || 0);
        
        // Determine image based on type using reliable images with fallbacks
        let imageUrl;
        try {
          if (ep.type === 'movie') {
            // Use specific movie images
            imageUrl = ep.year && parseInt(ep.year) >= 2020 ? IMG.conan3 : IMG.conan4;
          } else if (ep.type === 'ova' || ep.type === 'magic-file') {
            // Use character-specific images for OVAs
            const ovaImages = [IMG.haibara, IMG.ran, IMG.heiji, IMG.kid];
            imageUrl = ovaImages[index % ovaImages.length];
          } else if (ep.type === 'tv-special') {
            // Use group images for TV specials
            imageUrl = IMG.group;
          } else if (ep.type === 'magic-kaito') {
            // Use Kaitou Kid image for Magic Kaito episodes
            imageUrl = IMG.kid;
          } else {
            // Regular episodes - cycle through main character images
            const episodeImages = [IMG.conan1, IMG.conan2, IMG.conan5, IMG.ran, IMG.heiji, IMG.haibara];
            imageUrl = episodeImages[index % episodeImages.length];
          }
          
          // Ensure we have a valid URL
          if (!imageUrl || imageUrl === 'undefined' || imageUrl === 'null') {
            imageUrl = IMG.conan1; // Ultimate fallback
          }
        } catch (error) {
          imageUrl = IMG.conan1; // Ultimate fallback
        }
        
        // Format the type display
        let typeDisplay = ep.type;
        let typeClass = ep.type;
        if (ep.type === 'movie') {
          typeDisplay = 'movie';
          typeClass = 'movie';
        } else if (ep.type === 'episode') {
          typeDisplay = 'episode';
          typeClass = 'episode';
        } else if (ep.type === 'ova') {
          typeDisplay = 'ova';
          typeClass = 'ova';
        } else if (ep.type === 'magic-file') {
          typeDisplay = 'magic-file';
          typeClass = 'magic-file';
        } else if (ep.type === 'tv-special') {
          typeDisplay = 'tv-special';
          typeClass = 'tv-special';
        } else if (ep.type === 'magic-kaito') {
          typeDisplay = 'magic-kaito';
          typeClass = 'magic-kaito';
        }
        
        return `
          <div class="episode-horizontal-card" onclick="openEpisodeModal('${ep.episodes}')" data-type="${ep.type}" data-tags="${ep.tags ? ep.tags.join(' ') : ''}">
            <div class="episode-horizontal-img" style="background-image: url('${imageUrl}')"></div>
            <div class="episode-horizontal-content">
              <div class="episode-horizontal-header">
                <div class="episode-horizontal-number">${ep.episodes}</div>
                <div class="episode-horizontal-type ${typeClass}">${typeDisplay}</div>
              </div>
              <h3 class="episode-horizontal-title">${ep.title}</h3>
              <div class="episode-horizontal-tags">
                ${ep.tags ? ep.tags.map(tag => `<span class="tag-badge ${tag}">${tag.replace('-', ' ')}</span>`).join('') : ''}
              </div>
              <p class="episode-horizontal-desc">${ep.description}</p>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    
    <!-- About Section -->
    <section class="section">
      <div class="container">
        <div class="content-card">
          <h2>About the XerBlade Guide</h2>
          <p>This comprehensive episode guide is based on the renowned XerBlade Important Episode List, widely considered the go-to resource for Detective Conan fans seeking to watch the most significant episodes.</p>
        </div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  
  app.appendChild(pg);
  
  // Setup plot filter for watch guide
  setTimeout(() => {
    const plotCheckboxes = pg.querySelectorAll('.multi-select-menu input[data-parent="guide-plot"]');
    const episodeCards = pg.querySelectorAll('.episode-horizontal-card');
    
    function applyPlotFilter() {
      const checked = pg.querySelectorAll('.multi-select-menu input[data-parent="guide-plot"]:checked');
      const selectedPlotTags = Array.from(checked).map(c => c.value);
      
      // Update display
      const displayEl = document.getElementById('guide-plot-value');
      if (displayEl) {
        if (selectedPlotTags.length === 0) displayEl.textContent = 'Plot';
        else if (selectedPlotTags.length === 1) displayEl.textContent = selectedPlotTags[0];
        else displayEl.textContent = `${selectedPlotTags.length} selected`;
      }
      
      // Filter cards
      episodeCards.forEach(card => {
        const tags = card.dataset.tags || '';
        
        let showCard = true;
        
        // Plot tag filter - OR logic
        if (selectedPlotTags.length > 0) {
          const hasMatch = selectedPlotTags.some(tag => tags.includes(tag));
          if (!hasMatch) showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
      });
    }
    
    // Setup checkbox listeners
    plotCheckboxes.forEach(cb => {
      cb.addEventListener('change', applyPlotFilter);
    });
    
    observeAll();
    refreshHover();
    refreshEpisodeSeasonVisuals();
  }, 100);
}

// Setup draggable carousel functionality
function setupDraggableCarousel(element) {
  if (!element) return;
  
  let isDown = false;
  let startX;
  let scrollLeft;
  
  element.addEventListener('mousedown', (e) => {
    // Only enable drag on desktop (not touch devices)
    if (window.matchMedia('(pointer: fine)').matches) {
      isDown = true;
      element.style.cursor = 'grabbing';
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
      e.preventDefault();
    }
  });
  
  element.addEventListener('mouseleave', () => {
    isDown = false;
    element.style.cursor = 'grab';
  });
  
  element.addEventListener('mouseup', () => {
    isDown = false;
    element.style.cursor = 'grab';
  });
  
  element.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    element.scrollLeft = scrollLeft - walk;
  });
}

// Season navigator function
function scrollToSeason(season) {
  const episodeCards = document.querySelectorAll('.episode-horizontal-card');
  let targetCard = null;
  
  switch(season) {
    case 'early':
      // Find first episode around 1-100
      episodeCards.forEach(card => {
        const epNum = card.querySelector('.episode-horizontal-number').textContent;
        const num = parseInt(epNum);
        if (num >= 1 && num <= 100 && !targetCard) {
          targetCard = card;
        }
      });
      break;
    case 'mid':
      // Find first episode around 200-400
      episodeCards.forEach(card => {
        const epNum = card.querySelector('.episode-horizontal-number').textContent;
        const num = parseInt(epNum);
        if (num >= 200 && num <= 400 && !targetCard) {
          targetCard = card;
        }
      });
      break;
    case 'late':
      // Find first episode around 500-700
      episodeCards.forEach(card => {
        const epNum = card.querySelector('.episode-horizontal-number').textContent;
        const num = parseInt(epNum);
        if (num >= 500 && num <= 700 && !targetCard) {
          targetCard = card;
        }
      });
      break;
    case 'current':
      // Find first episode 800+
      episodeCards.forEach(card => {
        const epNum = card.querySelector('.episode-horizontal-number').textContent;
        const num = parseInt(epNum);
        if (num >= 800 && !targetCard) {
          targetCard = card;
        }
      });
      break;
    case 'movies':
      // Find first movie
      episodeCards.forEach(card => {
        if (card.dataset.type === 'movie' && !targetCard) {
          targetCard = card;
        }
      });
      break;
    case 'specials':
      // Find first special (OVA, TV Special, etc.)
      episodeCards.forEach(card => {
        const type = card.dataset.type;
        if ((type === 'ova' || type === 'tv-special' || type === 'magic-file' || type === 'magic-kaito') && !targetCard) {
          targetCard = card;
        }
      });
      break;
  }
  
  if (targetCard) {
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Add highlight effect
    targetCard.style.transform = 'scale(1.05)';
    targetCard.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
    setTimeout(() => {
      targetCard.style.transform = '';
      targetCard.style.boxShadow = '';
    }, 2000);
  }
}

// ─── NO FILLER GUIDE PAGE ───────────────────────────────
function renderNoFillerPage(){
  app.innerHTML='';
  window.scrollTo({top:0,behavior:"instant"});
  const pg=document.createElement('div');
  pg.className='page-enter';

  // Get all non-filler episodes
  const canonEpisodes = (typeof EPISODES !== 'undefined' ? EPISODES : []).filter(ep => isCanon(ep));
  
  // Group by season
  const episodesBySeason = {};
  canonEpisodes.forEach(ep => {
    if (!episodesBySeason[ep.season]) {
      episodesBySeason[ep.season] = [];
    }
    episodesBySeason[ep.season].push(ep);
  });

  pg.innerHTML=`
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('https://image.tmdb.org/t/p/w1280/j2qXQ8kHpMMX6U9qkPLo0yw8fF4.jpg')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/guide')">← Watch Guides</button>
        <div class="section-eyebrow">Canon Only · Skip All Fillers</div>
        <h1 class="movies-page-title">No <em>Filler Guide</em></h1>
        <p class="movies-page-sub">Watch only the story-essential episodes based on the manga. Skip all anime-original filler content.</p>
      </div>
    </section>
    <section class="movies-page-body">
      <div class="section-max">
        <div class="no-filler-stats">
          <div class="stat-card">
            <div class="stat-number">${canonEpisodes.length}</div>
            <div class="stat-label">Canon Episodes</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${typeof EPISODES !== 'undefined' ? EPISODES.length - canonEpisodes.length : 0}</div>
            <div class="stat-label">Filler Episodes</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${Math.round((canonEpisodes.length / (typeof EPISODES !== 'undefined' ? EPISODES.length : 1)) * 100)}%</div>
            <div class="stat-label">Canon Ratio</div>
          </div>
        </div>

        <div class="episodes-list-vertical">
          ${canonEpisodes.map((ep, index) => `
            <div class="episode-vertical-card reveal" data-year="${ep.aired ? ep.aired.split('-')[0] : ''}">
              <div class="episode-vertical-img" style="background-image:url('${getEpisodeStill(ep, index)}')" data-ep-num="${ep.n}"></div>
              <div class="episode-vertical-content">
                <div class="episode-vertical-header">
                  <div class="episode-vertical-number">Episode ${ep.n}</div>
                  <div class="episode-vertical-type episode">Canon Episode</div>
                </div>
                <h3 class="episode-vertical-title">${ep.title}</h3>
                <div class="episode-vertical-tags">
                  <span class="tag-badge canon">Canon</span>
                  <span class="tag-badge season-${ep.season}">Season ${ep.season}</span>
                </div>
                <p class="episode-vertical-desc">This episode is based on the manga and advances the main story. Skip filler episodes and focus on the canon content.</p>
                <div class="episode-vertical-meta">
                  <span>📅 Aired: ${ep.aired || 'Unknown'}</span>
                  <span>📺 Season ${ep.season}</span>
                  ${ep.etv ? `<span>🇮🇳 ETV: ${ep.etv}</span>` : ''}
                </div>
                <div class="episode-vertical-actions">
                  <button class="episode-watch-btn" onclick="goToEpisodeWatch(${ep.n})">
                    <span>▶</span> Watch Episode ${ep.n}
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="guide-footer-note reveal">
          <div class="guide-footer-icon">💡</div>
          <div>
            <strong>What counts as filler?</strong> Episodes marked as "TV Original" are anime-original stories not based on Gosho Aoyama's manga. 
            All other episodes are canon and adapt the original manga storylines.
          </div>
        </div>
        
        <!-- Floating Season Jump Button -->
        <div class="floating-season-jump" id="nofillerSeasonJumpBtn">
          <button class="season-jump-toggle" onclick="toggleNoFillerSeasonJump()">
            <span>📍</span> Jump to Season
          </button>
          <div class="season-jump-menu" id="nofillerSeasonJumpMenu">
            <div class="season-jump-content">
              <h4>Jump to Season</h4>
              <div class="season-quick-links">
                <a href="#season-1" onclick="scrollToNoFillerSeason('1')">Season 1</a>
                <a href="#season-2" onclick="scrollToNoFillerSeason('2')">Season 2</a>
                <a href="#season-3" onclick="scrollToNoFillerSeason('3')">Season 3</a>
                <a href="#season-4" onclick="scrollToNoFillerSeason('4')">Season 4</a>
                <a href="#season-5" onclick="scrollToNoFillerSeason('5')">Season 5</a>
                <a href="#season-6" onclick="scrollToNoFillerSeason('6')">Season 6</a>
                <a href="#season-7" onclick="scrollToNoFillerSeason('7')">Season 7</a>
                <a href="#season-8" onclick="scrollToNoFillerSeason('8')">Season 8</a>
                <a href="#season-9" onclick="scrollToNoFillerSeason('9')">Season 9</a>
                <a href="#season-10" onclick="scrollToNoFillerSeason('10')">Season 10</a>
                <a href="#season-11" onclick="scrollToNoFillerSeason('11')">Season 11</a>
                <a href="#season-12" onclick="scrollToNoFillerSeason('12')">Season 12</a>
                <a href="#season-13" onclick="scrollToNoFillerSeason('13')">Season 13</a>
                <a href="#season-14" onclick="scrollToNoFillerSeason('14')">Season 14</a>
                <a href="#season-15" onclick="scrollToNoFillerSeason('15')">Season 15</a>
                <a href="#season-16" onclick="scrollToNoFillerSeason('16')">Season 16</a>
                <a href="#season-17" onclick="scrollToNoFillerSeason('17')">Season 17</a>
                <a href="#season-18" onclick="scrollToNoFillerSeason('18')">Season 18</a>
                <a href="#season-19" onclick="scrollToNoFillerSeason('19')">Season 19</a>
                <a href="#season-20" onclick="scrollToNoFillerSeason('20')">Season 20</a>
                <a href="#season-21" onclick="scrollToNoFillerSeason('21')">Season 21</a>
                <a href="#season-22" onclick="scrollToNoFillerSeason('22')">Season 22</a>
                <a href="#season-23" onclick="scrollToNoFillerSeason('23')">Season 23</a>
                <a href="#season-24" onclick="scrollToNoFillerSeason('24')">Season 24</a>
                <a href="#season-25" onclick="scrollToNoFillerSeason('25')">Season 25</a>
                <a href="#season-26" onclick="scrollToNoFillerSeason('26')">Season 26</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${renderFooterHTML()}
  `;
  
  app.appendChild(pg);
  setTimeout(() => {observeAll();refreshHover();refreshEpisodeSeasonVisuals();}, 100);
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
    if(route==='/tvshows') return 'tvshows';
    if(route==='/movies') return 'movies';
    return 'more';
  }

  // Use document-level event delegation since bar gets recreated
  document.addEventListener('click',(e)=>{
    const tab=e.target.closest('.mbb-tab');
    if(!tab) return;

    const page=tab.getAttribute('data-mbb');
    if(!page) return;

    // Update active state on all tabs
    document.querySelectorAll('.mbb-tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');

    // Navigate based on page
    if(page==='home') Router.navigate('/');
    else if(page==='browse') Router.navigate('/browse');
    else if(page==='languages') Router.navigate('/languages');
    else if(page==='tvshows') Router.navigate('/tvshows');
    else if(page==='movies') Router.navigate('/movies');
    else if(page==='more'){
      const mm=document.getElementById('mbbMoreMenu');
      if(mm){
        mm.classList.add('open');
        mm.style.display='block';
        setTimeout(()=>mm.style.opacity='1',10);
      }
    }
  });

  // Close more menu when clicking outside
  document.addEventListener('click',(e)=>{
    const mm=document.getElementById('mbbMoreMenu');
    const bb=document.getElementById('mobileBottomBar');
    if(!mm || !bb) return;
    if(!mm.contains(e.target) && !bb.contains(e.target)){
      mm.classList.remove('open');
      mm.style.opacity='0';
      setTimeout(()=>mm.style.display='none',250);
    }
  });

  // More menu items - delegation
  document.addEventListener('click',(e)=>{
    const a=e.target.closest('#mbbMoreMenu a[data-nav]');
    if(!a) return;
    e.preventDefault();
    const href=a.getAttribute('href');
    const mm=document.getElementById('mbbMoreMenu');
    if(mm){
      mm.classList.remove('open');
      mm.style.opacity='0';
      setTimeout(()=>mm.style.display='none',250);
    }
    Router.navigate(href);
  });

  // More handle toggle - delegation
  document.addEventListener('click',(e)=>{
    const handle=e.target.closest('.mbb-more-handle');
    if(!handle) return;
    e.stopPropagation();
    const mm=document.getElementById('mbbMoreMenu');
    if(!mm) return;
    mm.classList.toggle('open');
    if(mm.classList.contains('open')){
      mm.style.display='block';
      setTimeout(()=>mm.style.opacity='1',10);
    }else{
      mm.style.opacity='0';
      setTimeout(()=>mm.style.display='none',250);
    }
  });

  // Tap backdrop behind more menu
  document.addEventListener('click',e=>{
    if(moreMenu.classList.contains('open') && !moreMenu.contains(e.target) && !bar.contains(e.target)){
      moreMenu.classList.remove('open');
      moreMenu.style.opacity='0';
      setTimeout(()=>moreMenu.style.display='none',250);
    }
  });

  // Swipe-down to close More menu
  let moreStartY=0;
  moreMenu.addEventListener('touchstart',e=>{moreStartY=e.touches[0].clientY;},{passive:true});
  moreMenu.addEventListener('touchend',e=>{
    if(e.changedTouches[0].clientY - moreStartY > 60){
      moreMenu.classList.remove('open');
      moreMenu.style.opacity='0';
      setTimeout(()=>moreMenu.style.display='none',250);
      document.body.style.overflow='';
    }
  },{passive:true});

  // Sync active tab on route change
  window.addEventListener('hashchange',()=>{
    moreMenu.classList.remove('open');
    document.body.style.overflow='';
    const route = decodeURIComponent(window.location.hash.slice(1)) || '/';
    setActive(routeToTab(route));
  });

  // Set initial active state on page load using Router's current route
  const initialRoute = Router.currentRoute || decodeURIComponent(window.location.hash.slice(1)) || '/';
  setActive(routeToTab(initialRoute));
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

// ─── OVA PAGE ───────────────────────────────────────
function renderOVAsPage(){
  const pg = document.getElementById('page');
  pg.innerHTML = `
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.conan3}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/guide')">← Watch Guides</button>
        <div class="section-eyebrow">Special Content · Original Video Animations</div>
        <h1 class="movies-page-title">Detective Conan <em>OVAs</em></h1>
        <p class="movies-page-sub">33 original video animations featuring special cases, character development, and unique storylines not seen in the main series.</p>
      </div>
    </section>

    <div class="movies-page-content">
      <div class="movies-grid">
        ${OVAS.map((ova, index) => {
          // Use hardcoded still if available, otherwise fallback to character images
          const fallbackImages = [IMG.haibara, IMG.ran, IMG.heiji, IMG.kid];
          const imageUrl = ova.still || fallbackImages[index % 4];
          return `
            <div class="movie-card reveal" onclick="showOVAModal('${ova.id}')">
              <div class="movie-poster">
                <img src="${imageUrl}" alt="${ova.title}" loading="lazy">
                <div class="movie-overlay">
                  <div class="movie-play-icon">▶</div>
                </div>
              </div>
              <div class="movie-info">
                <div class="movie-number">OVA ${ova.episodeNumber}</div>
                <h3 class="movie-title">${ova.title}</h3>
                <p class="movie-year">${ova.year}</p>
                <div class="movie-desc">${ova.desc}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  revealElements();
}

// ─── MAGIC KAITO PAGE ───────────────────────────────────
function renderMagicKaitoPage(){
  const pg = document.getElementById('page');
  const amasianPlatform = PLATFORMS.find(p => p.id === 'amasiantv');
  
  pg.innerHTML = `
    <section class="movies-page-hero">
      <div class="movies-page-hero-bg" style="background-image:url('${IMG.kid}')"></div>
      <div class="movies-page-hero-overlay"></div>
      <div class="movies-page-hero-content">
        <button class="pp-hero-back" onclick="Router.navigate('/guide')">← Watch Guides</button>
        <div class="section-eyebrow">Spinoff Series · Phantom Thief Adventures</div>
        <h1 class="movies-page-title">Magic Kaito <em>1412</em></h1>
        <p class="movies-page-sub">Follow Kaito Kuroba as he becomes the phantom thief Kaitou Kid, seeking the mysterious Pandora Gem while outsmarting rivals.</p>
      </div>
    </section>

    <div class="platform-section" style="margin-top: 32px;">
      <div class="platform-card reveal" data-platform="amasiantv">
        <div class="platform-header">
          <div class="platform-logo">
            <img src="${amasianPlatform.logoUrl}" alt="${amasianPlatform.name}" style="height: 40px;">
          </div>
          <div class="platform-info">
            <h3>${amasianPlatform.name}</h3>
            <p class="platform-badge">${amasianPlatform.badge}</p>
          </div>
        </div>
        <div class="platform-details">
          <p>${amasianPlatform.description}</p>
          <div class="platform-languages">
            <strong>Languages:</strong> ${amasianPlatform.languages.dub.join(', ')} dub
          </div>
          <div class="platform-note">
            <strong>Note:</strong> ${amasianPlatform.note}
          </div>
          <button class="platform-watch-btn" onclick="window.open('${MAGIC_KAITO.amasianUrl}', '_blank')">
            Watch Now →
          </button>
        </div>
      </div>
    </div>

    <div class="episodes-section" style="margin-top: 48px;">
      <h2 class="section-title">All Episodes</h2>
      <div class="episodes-grid">
        ${Array.from({length: MAGIC_KAITO.episodes}, (_, i) => i + 1).map(epNum => {
          const imageUrl = [IMG.kid, IMG.conan1, IMG.ran, IMG.heiji][epNum % 4];
          return `
            <div class="episode-card reveal" onclick="event.preventDefault(); event.stopPropagation(); openMagicKaitoEpisode('episode', ${epNum});">
              <div class="episode-poster">
                <img src="${imageUrl}" alt="Episode ${epNum}" loading="lazy">
                <div class="episode-overlay">
                  <div class="episode-play-icon">▶</div>
                </div>
              </div>
              <div class="episode-info">
                <div class="episode-number">Episode ${epNum}</div>
                <h3 class="episode-title">Episode ${epNum}</h3>
                <p class="episode-year">2014</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  revealElements();
}

// ─── TMDB API INTEGRATION ───────────────────────────────
// Using existing TMDB_KEY from line 184
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';

async function fetchTMBDEpisodeData(seriesId, seasonNumber, episodeNumber) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${TMDB_KEY}`);
    if (!response.ok) throw new Error('Episode data not found');
    const data = await response.json();
    return {
      title: data.name,
      description: data.overview,
      image: data.still_path ? `https://image.tmdb.org/t/p/w780${data.still_path}` : null,
      airDate: data.air_date,
      episodeNumber: data.episode_number,
      seasonNumber: data.season_number
    };
  } catch (error) {
    return null;
  }
}

async function fetchTMDBOVAData(ovaId) {
  const ova = OVAS.find(o => o.id === ovaId);
  if (!ova || !ova.episodeNumber) {
    return null;
  }
  
  // Use hardcoded still URL if available
  if (ova.still) {
    return {
      title: ova.title,
      description: ova.desc,
      image: ova.still,
      year: ova.year,
      episodeNumber: ova.episodeNumber
    };
  }
  
  try {
    // OVAs are on TMDB as Season 0 (specials) of the main series
    const response = await fetch(`https://api.themoviedb.org/3/tv/${TMDB_TV_ID}/season/0/episode/${ova.episodeNumber}?api_key=${TMDB_KEY}&language=en-US`);
    if (!response.ok) return null;
    
    const data = await response.json();
    return {
      title: data.name || ova.title,
      description: data.overview || ova.desc,
      image: data.still_path ? (TMDB_STILL + data.still_path) : null,
      year: ova.year,
      episodeNumber: ova.episodeNumber
    };
  } catch (error) {
    return null;
  }
}

// Load TMDB images for Magic Kaito episodes on platform page
async function loadMagicKaitoTMDBImages() {
  // TMDB API key is configured, proceed with loading images

  const grid = document.getElementById('magic-kaito-episodes-grid');
  if (!grid) return;

  const episodeCards = grid.querySelectorAll('.browse-card');
  
  for (let card of episodeCards) {
    const episodeNum = parseInt(card.dataset.episode);
    if (!episodeNum) continue;

    try {
      const episodeData = await fetchTMBDEpisodeData(MAGIC_KAITO.tmdb, 1, episodeNum);
      if (episodeData && episodeData.image) {
        const imgElement = card.querySelector('.browse-card-img');
        if (imgElement) {
          imgElement.style.backgroundImage = `url('${episodeData.image}')`;
        }
      }
    } catch (error) {
      // Keep fallback image
    }
  }
}

// Load TMDB images for OVA cards on platform page
async function loadOVATMDBImages(ovaIds) {
  if (!ovaIds || !ovaIds.length) return;
  
  for (const ovaId of ovaIds) {
    try {
      const ovaData = await fetchTMDBOVAData(ovaId);
      if (ovaData && ovaData.image) {
        // Update any card with this OVA ID
        document.querySelectorAll(`[data-ep-num="${ovaId}"] .browse-card-img`).forEach(img => {
          img.style.backgroundImage = `url('${ovaData.image}')`;
        });
      }
    } catch (error) {
      // Keep fallback image
    }
  }
}

// ─── MODAL FUNCTIONS ─────────────────────────────────────
// OVA modal functionality moved to unified openMagicKaitoEpisode function

async function showMagicKaitoEpisodeModal(episodeNumber) {
  const amasianPlatform = PLATFORMS.find(p => p.id === 'amasiantv');
  
  // Close any existing modals first
  const existingModal = document.querySelector('.modal');
  if (existingModal) {
    document.body.removeChild(existingModal);
    document.body.classList.remove('modal-open');
  }
  
  // Show loading modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'magic-kaito-episode-modal';
  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeMagicKaitoModal()"></div>
    <div class="modal-content">
      <button class="modal-close" onclick="closeMagicKaitoModal()">×</button>
      <div class="modal-header">
        <h2>Episode ${episodeNumber}</h2>
        <p class="modal-year">Magic Kaito 1412 • 2014</p>
      </div>
      <div class="modal-body">
        <div class="modal-loading">Loading episode details...</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.classList.add('modal-open');
  setTimeout(() => modal.classList.add('show'), 10);
  
  // Fetch episode data from TMDB
  const episodeData = await fetchTMBDEpisodeData(MAGIC_KAITO.tmdb, 1, episodeNumber);
  
  if (episodeData) {
    // Update modal with fetched data
    modal.querySelector('.modal-body').innerHTML = `
      ${episodeData.image ? `<img src="${episodeData.image}" alt="Episode ${episodeNumber}" style="width: 100%; border-radius: 8px; margin-bottom: 16px;">` : ''}
      <h3>${episodeData.title}</h3>
      <p class="modal-description">${episodeData.description || 'No description available.'}</p>
      ${episodeData.airDate ? `<p class="modal-airdate"><strong>Air Date:</strong> ${new Date(episodeData.airDate).toLocaleDateString()}</p>` : ''}
      
      <div class="platform-card" style="margin-top: 24px;">
        <div class="platform-header">
          <div class="platform-logo">
            <img src="${amasianPlatform.logoUrl}" alt="${amasianPlatform.name}" style="height: 32px;">
          </div>
          <div class="platform-info">
            <h4>${amasianPlatform.name}</h4>
            <p class="platform-badge">${amasianPlatform.badge}</p>
          </div>
        </div>
        <div class="platform-details">
          <p>${amasianPlatform.description}</p>
          <div class="platform-languages">
            <strong>Languages:</strong> ${amasianPlatform.languages.dub.join(', ')} dub
          </div>
          <button class="platform-watch-btn" onclick="window.open('${MAGIC_KAITO.amasianUrl}', '_blank')">
            Watch Now →
          </button>
        </div>
      </div>
    `;
  } else {
    // Fallback if TMDB fetch fails
    modal.querySelector('.modal-body').innerHTML = `
      <p class="modal-description">Watch this episode of Magic Kaito 1412 with English dub on Amasian TV.</p>
      
      <div class="platform-card" style="margin-top: 24px;">
        <div class="platform-header">
          <div class="platform-logo">
            <img src="${amasianPlatform.logoUrl}" alt="${amasianPlatform.name}" style="height: 32px;">
          </div>
          <div class="platform-info">
            <h4>${amasianPlatform.name}</h4>
            <p class="platform-badge">${amasianPlatform.badge}</p>
          </div>
        </div>
        <div class="platform-details">
          <p>${amasianPlatform.description}</p>
          <div class="platform-languages">
            <strong>Languages:</strong> ${amasianPlatform.languages.dub.join(', ')} dub
          </div>
          <button class="platform-watch-btn" onclick="window.open('${MAGIC_KAITO.amasianUrl}', '_blank')">
            Watch Now →
          </button>
        </div>
      </div>
    `;
  }
}

function closeMagicKaitoModal() {
  const modal = document.getElementById('magic-kaito-episode-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
      document.body.classList.remove('modal-open');
    }, 300);
  }
}

// Test function to verify modal is working
function testMagicKaitoModal() {
  showMagicKaitoEpisodeModal(1);
}

// Make the function globally accessible for testing
window.showMagicKaitoEpisodeModal = showMagicKaitoEpisodeModal;
window.testMagicKaitoModal = testMagicKaitoModal;

// ─── UNIFIED MAGIC KAITO MODAL SYSTEM ───────────────────────────────
async function openMagicKaitoEpisode(type, number) {
  let badge, title, desc, content;
  
  if (type === 'episode') {
    badge = 'Magic Kaito 1412';
    title = `Episode ${number}`;
    desc = '2014 • English Dub Available';
    content = `<div class="modal-loading">Loading episode details...</div>`;
  } else if (type === 'ova') {
    const ova = OVAS.find(o => o.id === number);
    badge = 'OVA';
    title = ova ? ova.title : `OVA ${number}`;
    desc = ova ? `${ova.year} • Special` : 'Special';
    content = `<div class="modal-loading">Loading OVA details...</div>`;
  }
  
  // Show loading modal first
  openModal(`
    <div class="modal-handle"></div>
    <div class="modal-header">
      <div>
        <div class="modal-badge">${badge}</div>
        <div class="modal-title">${title}</div>
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-desc">${desc}</div>
    <div class="modal-body">
      ${content}
    </div>
  `);
  
  // Fetch data and update modal
  try {
    let data, watchContent;
    
    if (type === 'episode') {
      data = await fetchTMBDEpisodeData(MAGIC_KAITO.tmdb, 1, number);
      
      if (data) {
        watchContent = `
          ${data.image ? `<img src="${data.image}" alt="Episode ${number}" style="width: 100%; border-radius: 8px; margin-bottom: 16px;">` : ''}
          <h3 style="margin: 0 0 8px 0; color: var(--text); font-size: 18px;">${data.title}</h3>
          <p style="margin: 0 0 12px 0; color: var(--text-secondary); line-height: 1.5;">${data.description || 'No description available.'}</p>
          ${data.airDate ? `<p style="margin: 0 0 16px 0; color: var(--muted); font-size: 14px;"><strong>Air Date:</strong> ${new Date(data.airDate).toLocaleDateString()}</p>` : ''}
        `;
      } else {
        watchContent = `<p style="color: var(--text-secondary); margin-bottom: 16px;">Watch this episode of Magic Kaito 1412 with English dub on Amasian TV.</p>`;
      }
    } else if (type === 'ova') {
      data = await fetchTMDBOVAData(number);
      const ova = OVAS.find(o => o.id === number);
      
      if (data) {
        watchContent = `
          ${data.image ? `<img src="${data.image}" alt="OVA ${data.episodeNumber}" style="width: 100%; border-radius: 8px; margin-bottom: 16px;">` : ''}
          <p style="margin: 0 0 12px 0; color: var(--text-secondary); line-height: 1.5;">${data.description}</p>
        `;
      } else if (ova) {
        watchContent = `<p style="margin: 0 0 12px 0; color: var(--text-secondary); line-height: 1.5;">${ova.desc}</p>`;
      } else {
        watchContent = `<p style="color: var(--text-secondary); margin-bottom: 16px;">Unable to load OVA details.</p>`;
      }
    }
    
    // Add watch section - only update modal-body content, preserve header
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
      if (type === 'episode') {
        modalBody.innerHTML = `
          ${watchContent}
          <div class="modal-where-title">Where to Watch in India</div>
          <div class="watch-btns">
            <a class="watch-btn" href="${MAGIC_KAITO.amasianUrl}" target="_blank" rel="noopener" style="--btn-color:#FF6B35;--btn-bg:#1a0f00">
              <span class="watch-btn-name">Amasian TV</span>
              <span class="watch-btn-detail">Free Streaming · English Dub</span>
            </a>
          </div>
        `;
      } else if (type === 'ova') {
        modalBody.innerHTML = `
          ${watchContent}
          <div class="modal-note" style="background: var(--surface2); padding: 12px; border-radius: 6px; margin-top: 16px;">
            <strong style="color: var(--text);">Note:</strong> This OVA is not currently available on Indian streaming platforms.
          </div>
        `;
      }
    }
  } catch (error) {
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <p style="color: var(--text-secondary); margin-bottom: 16px;">Unable to load details. Please try again.</p>
        ${type === 'episode' ? `
          <div class="modal-where-title">Where to Watch in India</div>
          <div class="watch-btns">
            <a class="watch-btn" href="${MAGIC_KAITO.amasianUrl}" target="_blank" rel="noopener" style="--btn-color:#FF6B35;--btn-bg:#1a0f00">
              <span class="watch-btn-name">Amasian TV</span>
              <span class="watch-btn-detail">Free Streaming · English Dub</span>
            </a>
          </div>
        ` : ''}
      `;
    }
  }
}

// Make function globally available
window.openMagicKaitoEpisode = openMagicKaitoEpisode;

// Test function to verify modal close works
function testModalClose() {
  openModal(`
    <div class="modal-header">
      <div>
        <div class="modal-badge">Test</div>
        <div class="modal-title">Test Modal</div>
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-desc">This is a test to see if close works</div>
    <div class="modal-body">
      <p>Click the X button or press ESC to close.</p>
    </div>
  `);
}

window.testModalClose = testModalClose;

// DISABLED - This function causes routing conflicts by removing onclick attributes
// The direct onclick handlers in the HTML work correctly without this function
// Alternative approach using event listeners after page loads
function setupMagicKaitoEpisodeListeners() {
  setTimeout(() => {
    const episodeCards = document.querySelectorAll('[data-episode]');
    
    episodeCards.forEach(card => {
      const episodeNum = card.dataset.episode;
      
      // Remove existing onclick to prevent double handling
      if (card.onclick) {
        card.onclick = null;
      }
      
      // Add fresh click listener
      card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openMagicKaitoEpisode(parseInt(episodeNum));
      });
    });
  }, 1000);
}

// closeModal function already exists in the main code - using that one