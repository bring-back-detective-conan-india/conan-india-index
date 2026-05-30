const fs = require('fs');
const path = require('path');

// Configuration
const TMDB_TV_ID = 30983;
const TMDB_KEY = 'fe92cb30660fb8e7aab54dc2cfb699eb';

// Static database of pre-scheduled manga volumes
// As Viz Media announces new volumes, they can be added here.
const UPCOMING_MANGA_RELEASES = [
  { vol: 97, date: "2026-11-13", isbn10: "1974761843", isbn13: "9781974761843" },
  { vol: 98, date: "2027-03-09", isbn10: "1974765660", isbn13: "9781974765669" },
  { vol: 99, date: "2027-07-13", isbn10: "1974769003", isbn13: "9781974769001" }
];

async function updateNetflixEpisodes() {
  console.log('--- SYNCING NETFLIX SIMULCAST EPISODES (HYBRID WIKI & TMDB) ---');
  const episodesFilePath = path.join(__dirname, '../episodes.js');
  const appFilePath = path.join(__dirname, '../app.js');

  // 1. Read episodes.js
  let episodesContent = fs.readFileSync(episodesFilePath, 'utf8');
  
  // Extract the EPISODES array content
  const arrayStartIdx = episodesContent.indexOf('[');
  const arrayEndIdx = episodesContent.lastIndexOf(']');
  if (arrayStartIdx === -1 || arrayEndIdx === -1) {
    console.error('Could not locate EPISODES array in episodes.js');
    return false;
  }

  // Parse the existing episodes safely using JSON.parse
  let EPISODES = [];
  try {
    const rawArray = episodesContent.substring(arrayStartIdx, arrayEndIdx + 1);
    EPISODES = JSON.parse(rawArray);
  } catch (err) {
    console.error('Error parsing episodes array:', err);
    return false;
  }

  const latestCatalogedEp = EPISODES[EPISODES.length - 1];
  const lastEpNum = latestCatalogedEp ? latestCatalogedEp.n : 0;
  console.log(`Latest cataloged episode: Ep ${lastEpNum} ("${latestCatalogedEp?.title}")`);

  // 2. Fetch all episodes from Detective Conan World Wiki
  console.log('Fetching episode index from Detective Conan World Wiki...');
  const wikiUrl = 'https://www.detectiveconanworld.com/wiki/Anime';
  let wikiEpisodes = [];
  try {
    const wikiRes = await fetch(wikiUrl);
    if (!wikiRes.ok) {
      console.error(`Wiki request failed: ${wikiRes.status}`);
      return false;
    }
    const html = await wikiRes.text();
    
    // Custom row-by-row parser for MediaWiki HTML
    const trParts = html.split(/<tr[^>]*>/i);
    let colIndices = { jpn: 1, title: 3, aired: 4, plot: 6, source: 7 }; // defaults
    
    for (let i = 1; i < trParts.length; i++) {
      const trHtml = trParts[i].split(/<\/tr>/i)[0];
      
      // Check if this is a header row to dynamically determine column indices
      if (/<th[^>]*>/i.test(trHtml)) {
        const thParts = trHtml.split(/<th[^>]*>/i);
        if (thParts.length >= 5) {
          let tempIndices = { jpn: -1, title: -1, aired: -1, plot: -1, source: -1 };
          for (let idx = 1; idx < thParts.length; idx++) {
            const cellContent = thParts[idx].split(/<\/th>/i)[0];
            const text = cellContent.replace(/<[^>]*>/g, '').trim().toLowerCase();
            if (text.includes('jpn') || text.includes('japanese') || text === 'no.' || text === '#') {
              tempIndices.jpn = idx;
            } else if (text.includes('title')) {
              tempIndices.title = idx;
            } else if (text.includes('broadcast') && (text.includes('original') || text.includes('jpn') || (!text.includes('dub') && !text.includes('english')))) {
              tempIndices.aired = idx;
            } else if (text.includes('plot')) {
              tempIndices.plot = idx;
            } else if (text.includes('source') || text.includes('manga')) {
              tempIndices.source = idx;
            }
          }
          if (tempIndices.jpn !== -1 && tempIndices.title !== -1 && tempIndices.aired !== -1) {
            colIndices = {
              jpn: tempIndices.jpn,
              title: tempIndices.title,
              aired: tempIndices.aired,
              plot: tempIndices.plot !== -1 ? tempIndices.plot : colIndices.plot,
              source: tempIndices.source !== -1 ? tempIndices.source : colIndices.source
            };
          }
        }
        continue; // Skip the header row itself
      }
      
      const tdParts = trHtml.split(/<td[^>]*>/i);
      const getTdContent = (idx) => {
        if (idx < 0 || idx >= tdParts.length) return "";
        return tdParts[idx].split(/<\/td>/i)[0];
      };
      
      const maxRequiredIdx = Math.max(colIndices.jpn, colIndices.title, colIndices.aired, colIndices.plot, colIndices.source);
      if (tdParts.length > maxRequiredIdx) {
        const jpnNumRaw = getTdContent(colIndices.jpn).replace(/<[^>]*>/g, '').trim();
        const jpnNum = parseInt(jpnNumRaw, 10);
        if (isNaN(jpnNum)) continue;
        
        // Title cell
        const titleCell = getTdContent(colIndices.title);
        const titleMatch = titleCell.match(/title="([^"]*)"/);
        const title = titleMatch ? titleMatch[1] : titleCell.replace(/<[^>]*>/g, '').trim();
        
        // Airdate cell
        const dateRaw = getTdContent(colIndices.aired).replace(/<[^>]*>/g, '').trim();
        
        // Plot tags cell
        const plotHtml = getTdContent(colIndices.plot);
        const tags = [];
        if (plotHtml.includes('Plot-BO.png') || plotHtml.includes('Black Organization')) tags.push('main-plot');
        if (plotHtml.includes('Plot-Char.png') || plotHtml.includes('Character development')) tags.push('character');
        if (plotHtml.includes('Plot-Romance.png') || plotHtml.includes('Romance')) tags.push('romance');
        if (plotHtml.includes('Plot-New.png') || plotHtml.includes('New character')) tags.push('character-intro');
        
        // Manga source cell
        const sourceHtml = getTdContent(colIndices.source);
        const srcRaw = sourceHtml.replace(/<[^>]*>/g, '').trim().split('\n')[0].trim();
        const src = srcRaw || (tags.includes('main-plot') || tags.includes('character') ? "Manga Canon" : "TV Original");
        
        const d = new Date(dateRaw);
        if (!isNaN(d.getTime())) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          const dateStr = `${y}-${m}-${day}`;
          
          wikiEpisodes.push({
            n: jpnNum,
            title: title,
            aired: dateStr,
            src: src,
            tags: tags
          });
        }
      }
    }
    console.log(`Parsed ${wikiEpisodes.length} episodes from the fan wiki.`);
  } catch (err) {
    console.error('Error fetching/parsing from fan wiki:', err);
    return false;
  }

  // 3. Fetch images and metadata from TMDB Season 1 (Primary source)
  console.log('Fetching episode catalog from TMDB...');
  const tmdbUrl = `https://api.themoviedb.org/3/tv/${TMDB_TV_ID}/season/1?api_key=${TMDB_KEY}&language=en-US`;
  const tmdbMap = new Map();
  try {
    const tmdbRes = await fetch(tmdbUrl);
    if (tmdbRes.ok) {
      const tmdbData = await tmdbRes.json();
      const tmdbEpisodes = Array.isArray(tmdbData.episodes) ? tmdbData.episodes : [];
      console.log(`Retrieved ${tmdbEpisodes.length} episodes from TMDB API.`);
      for (const te of tmdbEpisodes) {
        tmdbMap.set(te.episode_number, te);
      }
    } else {
      console.warn(`TMDB API returned error ${tmdbRes.status}, falling back completely to Wiki.`);
    }
  } catch (err) {
    console.warn('TMDB API connection failed, falling back completely to Wiki:', err);
  }

  // 4. Combine sources: Loop from last cataloged episode upwards
  let newEpisodesAdded = [];
  let currentEpNum = lastEpNum + 1;
  const maxSearchLimit = Math.max(
    wikiEpisodes.length > 0 ? wikiEpisodes[wikiEpisodes.length - 1].n : 0,
    tmdbMap.size > 0 ? Math.max(...Array.from(tmdbMap.keys())) : 0
  );

  while (currentEpNum <= maxSearchLimit) {
    const tmdbEp = tmdbMap.get(currentEpNum);
    const wikiEp = wikiEpisodes.find(x => x.n === currentEpNum);
    
    let title = null;
    let airedDate = null;
    let srcLabel = "Manga Canon";

    if (tmdbEp) {
      // Primary: TMDB API
      title = tmdbEp.name || `Episode ${currentEpNum}`;
      airedDate = tmdbEp.air_date;
      srcLabel = wikiEp ? wikiEp.src : "TV Original";
    } else if (wikiEp) {
      // Secondary Fallback: Conan World Wiki
      console.log(`Ep ${currentEpNum} not found in TMDB. Falling back to fan wiki metadata!`);
      title = wikiEp.title;
      airedDate = wikiEp.aired;
      srcLabel = wikiEp.src;
    }

    if (title && airedDate) {
      // Calculate correct sequential season ID (S1 = 1996, S2 = 1997... S31 = 2026)
      const airYearNum = parseInt(airedDate.substring(0, 4), 10);
      const seasonNum = airYearNum - 1996 + 1;
      const seasonId = `S${seasonNum}`;
      
      // Determine if it is a television special
      let specialType = null;
      if (title.toLowerCase().includes('1-hour special') || title.toLowerCase().includes('1 hour special')) {
        specialType = "1hr";
      } else if (title.toLowerCase().includes('2-hour special') || title.toLowerCase().includes('2 hour special')) {
        specialType = "2hr";
      }

      const newEp = {
        n: currentEpNum,
        title: title,
        season: seasonId,
        aired: airedDate,
        etv: null,
        netflix: null,       // Direct Calendar Switch for Netflix India Drop Date
        animetimes: null,    // Direct Calendar Switch for Anime Times Prime Video Drop Date
        src: srcLabel
      };

      if (specialType) {
        newEp.special = specialType;
      }
      
      if (wikiEp && wikiEp.tags && wikiEp.tags.length > 0) {
        newEp.tags = wikiEp.tags;
      }
      
      EPISODES.push(newEp);
      newEpisodesAdded.push(newEp);
      console.log(`Added Ep ${currentEpNum}: "${newEp.title}" (Scheduled: ${newEp.aired} - Source: ${newEp.src})`);
    } else {
      // Gap in data (neither TMDB nor Wiki has cataloged it yet). Stop.
      break;
    }
    
    currentEpNum++;
  }

  // 5. Save updates back to database
  if (newEpisodesAdded.length > 0) {
    const formattedEpisodes = JSON.stringify(EPISODES, null, 2);
    const newEpisodesContent = `const EPISODES = ${formattedEpisodes};\n`;
    fs.writeFileSync(episodesFilePath, newEpisodesContent, 'utf8');
    console.log(`Successfully appended ${newEpisodesAdded.length} new wiki-sourced episodes to episodes.js!`);

    const newMaxEpNum = EPISODES[EPISODES.length - 1].n;
    let appContent = fs.readFileSync(appFilePath, 'utf8');
    
    // Bump fallback variables
    appContent = appContent.replace(
      /let latestEpNum = \d+; \/\/ Default fallback/,
      `let latestEpNum = ${newMaxEpNum}; // Default fallback`
    );

    appContent = appContent.replace(
      /let nextEpNum = \d+;/,
      `let nextEpNum = ${newMaxEpNum + 1};`
    );

    appContent = appContent.replace(
      /let latestEpTitle = ".*";/,
      `let latestEpTitle = "${EPISODES[EPISODES.length - 1].title.replace(/"/g, '\\"')}";`
    );
    
    // Retrieve still backdrop from TMDB map for the latest bumped episode
    const latestStillObj = tmdbMap.get(newMaxEpNum);
    const latestStillPath = latestStillObj ? latestStillObj.still_path : null;
    if (latestStillPath) {
      appContent = appContent.replace(
        /let latestEpStill = ".*";/,
        `let latestEpStill = "${latestStillPath}";`
      );
    }

    fs.writeFileSync(appFilePath, appContent, 'utf8');
    console.log(`Successfully bumped app.js default fallback to Ep ${newMaxEpNum}!`);
    return true;
  } else {
    console.log('No new aired episodes found from the fan wiki.');
    return false;
  }
}

async function updateMangaReleases() {
  console.log('\n--- SYNCING MANGA VOLUME RELEASES ---');
  const appFilePath = path.join(__dirname, '../app.js');
  const dataFilePath = path.join(__dirname, '../data.js');

  // Read current LATEST_VOL from app.js
  let appContent = fs.readFileSync(appFilePath, 'utf8');
  const latestVolMatch = appContent.match(/let LATEST_VOL = (\d+);/);
  if (!latestVolMatch) {
    console.error('Could not parse LATEST_VOL from app.js');
    return false;
  }
  let currentLatestVol = parseInt(latestVolMatch[1], 10);
  console.log(`Current LATEST_VOL limit: Volume ${currentLatestVol}`);

  const todayStr = new Date().toISOString().split('T')[0];
  let promotedVols = [];

  // Scan through pre-scheduled volumes
  for (const volInfo of UPCOMING_MANGA_RELEASES) {
    if (volInfo.vol > currentLatestVol) {
      if (volInfo.date <= todayStr) {
        promotedVols.push(volInfo);
        console.log(`Volume ${volInfo.vol} has officially released (Release date: ${volInfo.date})!`);
      }
    }
  }

  if (promotedVols.length > 0) {
    // We have new volumes to promote!
    const newestVolNum = promotedVols[promotedVols.length - 1].vol;
    
    // 1. Update LATEST_VOL in app.js
    appContent = appContent.replace(
      /let LATEST_VOL = \d+; \/\/ Official Viz Media latest volume limit in India/,
      `let LATEST_VOL = ${newestVolNum}; // Official Viz Media latest volume limit in India`
    );

    // 2. Update UPCOMING_RELEASES in app.js
    // Find the next upcoming volume that hasn't released yet
    const nextUpcoming = UPCOMING_MANGA_RELEASES.find(x => x.vol > newestVolNum);
    if (nextUpcoming) {
      const dateObj = new Date(nextUpcoming.date);
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options); // e.g., "November 13, 2026"
      
      appContent = appContent.replace(
        /(\s*)const UPCOMING_RELEASES = \{[\s\S]*?\};/,
        `$1const UPCOMING_RELEASES = {\n$1  ${nextUpcoming.vol}: 'Releasing ${formattedDate}'\n$1};`
      );
      console.log(`Updated UPCOMING_RELEASES to point to Vol ${nextUpcoming.vol} (Releasing ${formattedDate}).`);
    } else {
      // Clear releases if none are scheduled
      appContent = appContent.replace(
        /(\s*)const UPCOMING_RELEASES = \{[\s\S]*?\};/,
        `$1const UPCOMING_RELEASES = {};`
      );
    }
    
    fs.writeFileSync(appFilePath, appContent, 'utf8');
    console.log(`Updated app.js LATEST_VOL to ${newestVolNum}!`);

    // 3. Update MANGA_ISBNS in data.js
    let dataContent = fs.readFileSync(dataFilePath, 'utf8');
    
    const isbnStartIdx = dataContent.indexOf('{', dataContent.indexOf('const MANGA_ISBNS'));
    const isbnEndIdx = dataContent.indexOf('};', isbnStartIdx);
    if (isbnStartIdx !== -1 && isbnEndIdx !== -1) {
      const rawIsbnsContent = dataContent.substring(isbnStartIdx, isbnEndIdx + 1);
      
      // Parse the existing key-value pairs using Regex
      const matches = rawIsbnsContent.matchAll(/(\d+)\s*:\s*"([^"]+)"/g);
      const isbns = {};
      for (const match of matches) {
        isbns[parseInt(match[1], 10)] = match[2];
      }
      
      // Add all promoted volume ISBNs
      for (const vol of promotedVols) {
        isbns[vol.vol] = vol.isbn13 || vol.isbn10;
      }
      
      // Rebuild and format beautifully (4 items per row)
      let formattedRows = [];
      let currentRow = [];
      const sortedVols = Object.keys(isbns).map(Number).sort((a, b) => a - b);
      for (const v of sortedVols) {
        const val = isbns[v];
        const keyStr = String(v).padStart(4, ' ');
        currentRow.push(`${keyStr}:"${val}"`);
        if (currentRow.length === 4) {
          formattedRows.push(`   ` + currentRow.join(', '));
          currentRow = [];
        }
      }
      if (currentRow.length > 0) {
        formattedRows.push(`   ` + currentRow.join(', '));
      }
      
      const newIsbnsBlock = `{\n${formattedRows.join(',\n')}\n}`;
      dataContent = dataContent.slice(0, isbnStartIdx) + newIsbnsBlock + dataContent.slice(isbnEndIdx + 2);
      
      fs.writeFileSync(dataFilePath, dataContent, 'utf8');
      console.log(`Successfully updated and formatted MANGA_ISBNS in data.js to include Volumes ${promotedVols.map(v => v.vol).join(', ')}!`);
    } else {
      console.error('Could not locate MANGA_ISBNS block in data.js');
    }
    return true;
  } else {
    console.log('No new manga volumes to release today.');
    return false;
  }
}

function bumpIndexHtmlVersion() {
  console.log('\n--- BUMPING CACHE-BUSTING VERSIONS ---');
  const indexFilePath = path.join(__dirname, '../index.html');
  if (!fs.existsSync(indexFilePath)) {
    console.error('index.html not found');
    return;
  }
  let indexContent = fs.readFileSync(indexFilePath, 'utf8');

  // Bump style.css?v=XX and app.js?v=YY
  indexContent = indexContent.replace(/style\.css\?v=(\d+)/, (match, v) => {
    const newV = parseInt(v, 10) + 1;
    console.log(`Bumping style.css version: v=${v} -> v=${newV}`);
    return `style.css?v=${newV}`;
  });

  indexContent = indexContent.replace(/app\.js\?v=(\d+)/, (match, v) => {
    const newV = parseInt(v, 10) + 1;
    console.log(`Bumping app.js version: v=${v} -> v=${newV}`);
    return `app.js?v=${newV}`;
  });

  fs.writeFileSync(indexFilePath, indexContent, 'utf8');
}

async function run() {
  try {
    const episodesUpdated = await updateNetflixEpisodes();
    const mangaUpdated = await updateMangaReleases();
    
    if (episodesUpdated || mangaUpdated) {
      bumpIndexHtmlVersion();
      console.log('\nUpdates detected. Cache-busting versions bumped in index.html.');
    } else {
      console.log('\nNo updates detected. Skipping cache-busting version bump.');
    }
    
    console.log('\nAuto-update process complete!');
  } catch (err) {
    console.error('Fatal error during auto-update run:', err);
  }
}

run();
