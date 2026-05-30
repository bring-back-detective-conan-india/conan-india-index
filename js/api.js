// ─── MANGA COVERS API ──────────────────────────────

// A pre-verified Set of Detective Conan English volumes that have valid cover assets on Open Library.
// This completely avoids hitting 404s and clogging the browser console or network on startup.
const VALID_MANGA_COVERS = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 36, 39, 40, 41, 46,
  47, 51, 55, 56, 59, 63, 65, 69, 70, 74, 75, 77, 85, 86
]);

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
  
  // Priority 1: Open Library verified covers (to avoid 404s)
  if (VALID_MANGA_COVERS.has(n) && typeof MANGA_ISBNS !== 'undefined' && MANGA_ISBNS[n]) {
    return window.optimizeImage(`https://covers.openlibrary.org/b/isbn/${MANGA_ISBNS[n]}-L.jpg?default=false`);
  }
  
  // Priority 2: Amazon CDN via converted ISBN-10
  if (typeof MANGA_ISBNS !== 'undefined' && MANGA_ISBNS[n]) {
    const isbn10 = convertISBN13to10(MANGA_ISBNS[n]);
    return window.optimizeImage(`https://images-na.ssl-images-amazon.com/images/P/${isbn10}.01.LZZZZZZZ.jpg`);
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
