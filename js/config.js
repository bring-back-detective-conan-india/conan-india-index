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

