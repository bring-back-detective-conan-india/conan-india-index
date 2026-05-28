async function fetchTMDBPosters(){
  const CACHE_KEY = 'tmdb_posters_v3';
  const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if(cached && (Date.now() - cached.ts) < CACHE_TTL){
      cached.posters.forEach(([id, url]) => window.MOVIE_POSTERS.set(id, url));
      if (cached.backdrops) {
        if(!window.MOVIE_BACKDROPS) window.MOVIE_BACKDROPS = new Map();
        cached.backdrops.forEach(([id, url]) => window.MOVIE_BACKDROPS.set(id, url));
      }
      if(typeof refreshMoviePosters === 'function') refreshMoviePosters();
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
      if(j.backdrop_path){
        if(!window.MOVIE_BACKDROPS) window.MOVIE_BACKDROPS = new Map();
        window.MOVIE_BACKDROPS.set(m.id, TMDB_IMG + j.backdrop_path);
      }
    } catch(_e){}
  }));
  // Safety guard: only cache if we successfully retrieved almost all movie posters to avoid caching glitched states
  if (window.MOVIE_POSTERS.size >= movies.length - 2) {
    try {
      const backdropsData = window.MOVIE_BACKDROPS ? [...window.MOVIE_BACKDROPS] : [];
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        ts: Date.now(),
        posters: [...window.MOVIE_POSTERS],
        backdrops: backdropsData
      }));
    } catch(_){}
  }
  if(typeof refreshMoviePosters === 'function') refreshMoviePosters();
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
  if(typeof refreshSpinoffPosters === 'function') refreshSpinoffPosters();
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

// A pre-verified Set of Detective Conan English volumes that have valid cover assets on Open Library.
// This completely avoids hitting 404s and clogging the browser console or network on startup.
const VALID_MANGA_COVERS = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46,
  47, 51, 55, 56, 59, 63, 65, 69, 70, 74, 75, 77, 85, 86
]);

window.MANGA_COVERS = new Map();

window.ISBN_DB = {
  "95": "1974755401",
  "96": "1974758532",
  "97": "1974761843"
};

function convertISBN13to10(isbn13) {
  if (!isbn13 || isbn13.length !== 13 || !isbn13.startsWith("978")) return isbn13;
  const core = isbn13.substring(3, 12);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(core[i], 10) * (10 - i);
  }
  const rem = sum % 11;
  const checkVal = 11 - rem;
  const checkDigit = checkVal === 10 ? 'X' : (checkVal === 11 ? '0' : checkVal.toString());
  return core + checkDigit;
}

function getMangaCover(vol){
  const n = Number(vol);
  
  // Priority 1: Amazon CDN via converted ISBN-10
  if (typeof MANGA_ISBNS !== 'undefined' && MANGA_ISBNS[n]) {
    const isbn10 = convertISBN13to10(MANGA_ISBNS[n]);
    return window.optimizeImage(`https://images-na.ssl-images-amazon.com/images/P/${isbn10}.01.LZZZZZZZ.jpg`);
  }
  
  // Priority 2: Open Library verified covers (to avoid 404s)
  if (VALID_MANGA_COVERS.has(n) && typeof MANGA_ISBNS !== 'undefined' && MANGA_ISBNS[n]) {
    return window.optimizeImage(`https://covers.openlibrary.org/b/isbn/${MANGA_ISBNS[n]}-L.jpg?default=false`);
  }
  
  // Priority 3: MangaDex cover via pre-generated cover mapping (CORS-friendly CDN)
  if (typeof MANGADEX_COVERS !== 'undefined' && MANGADEX_COVERS[n.toString()]) {
    const fileName = MANGADEX_COVERS[n.toString()];
    return window.optimizeImage(`https://uploads.mangadex.org/covers/7f30dfc3-0b80-4dcc-a3b9-0cd746fac005/${fileName}.512.jpg`);
  }
  
  return '';
}

async function fetchMangaCovers(){
  // Static verified mapping is loaded instantly! No network requests needed on initial page load.
  if(typeof refreshMangaCovers === 'function') refreshMangaCovers();
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
      if(typeof normalizeTitle !== 'function') return;
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
  if(typeof fetchMagicKaitoTMDBMeta === 'function') await fetchMagicKaitoTMDBMeta();
  // Fetch Yaiba: Samurai Legend poster
  if(typeof fetchYaibaTMDBPoster === 'function') fetchYaibaTMDBPoster();
  
  // Mark OVAs as not available in India
  if(typeof markOVAsAsUnavailable === 'function') markOVAsAsUnavailable();
  
  // Refresh season images now that we have TMDB data
  if(typeof refreshEpisodeSeasonVisuals === 'function') refreshEpisodeSeasonVisuals();
}

function getEpisodeMeta(ep){
  if(!ep || typeof ep.n !== 'number') return null;
  return window.EPISODE_META.get(ep.n) || null;
}

function getEpisodeStill(ep, fallbackIdx=0){
  return window.optimizeImage(getEpisodeMeta(ep)?.still || getImg(fallbackIdx));
}

function getSeasonStillByLocalSeasonId(sid, fallbackIdx=0){
  return window.optimizeImage(window.SEASON_STILLS.get(sid) || getImg(fallbackIdx));
}

function getMoviePosterHiRes(m, fallbackIdx){
  const cached = window.MOVIE_POSTERS.get(m.id);
  if(cached) return window.optimizeImage(cached.replace('/w154/','/w500/').replace('/w185/','/w500/'));
  return window.optimizeImage(getImg(fallbackIdx !== undefined ? fallbackIdx : m.n));
}

function getMovieBackdrop(m, fallbackIdx){
  if(!window.MOVIE_BACKDROPS) return getMoviePoster(m, fallbackIdx);
  const cached = window.MOVIE_BACKDROPS.get(m.id);
  if(cached) return window.optimizeImage(cached);
  return getMoviePoster(m, fallbackIdx);
}

function getMoviePoster(m, fallbackIdx){
  const cached = window.MOVIE_POSTERS.get(m.id);
  if(cached) return window.optimizeImage(cached);
  return window.optimizeImage(getImg(fallbackIdx !== undefined ? fallbackIdx : m.n));
}

function getPVREventPoster(ev, fallbackIdx){
  if(ev.poster) return window.optimizeImage(ev.poster); // hardcoded (e.g. JFF)
  if(ev.movieId){
    const m = (typeof MOVIES!=='undefined'?MOVIES:[]).find(x=>x.id===ev.movieId);
    if(m) return getMoviePoster(m, fallbackIdx);
  }
  if(ev.tmdb){
    const cached = window.PVR_SPECIAL_POSTERS.get(ev.id);
    if(cached) return window.optimizeImage(cached);
  }
  return window.optimizeImage(getImg(fallbackIdx !== undefined ? fallbackIdx : 0));
}

function getSpinoffPoster(sp, fallbackIdx){
  if(!sp) return window.optimizeImage(getImg(fallbackIdx || 0));
  const cached = window.SPINOFF_POSTERS.get(sp.id);
  if(cached) return window.optimizeImage(cached);
  return window.optimizeImage(getImg(fallbackIdx !== undefined ? fallbackIdx : 0));
}

