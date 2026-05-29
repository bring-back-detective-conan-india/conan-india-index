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
    return;
  }

  // Parse the existing episodes
  let EPISODES = [];
  try {
    const rawArray = episodesContent.substring(arrayStartIdx, arrayEndIdx + 1);
    EPISODES = eval(rawArray);
  } catch (err) {
    console.error('Error parsing episodes array:', err);
    return;
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
      return;
    }
    const html = await wikiRes.text();
    
    // Custom row-by-row parser for MediaWiki HTML
    const trParts = html.split(/<tr[^>]*>/i);
    for (let i = 1; i < trParts.length; i++) {
      const trHtml = trParts[i].split(/<\/tr>/i)[0];
      const tdParts = trHtml.split(/<td[^>]*>/i);
      
      // A standard row has at least 8 elements (first element is empty before the first td split)
      if (tdParts.length >= 8) {
        const jpnNumRaw = tdParts[1].replace(/<[^>]*>/g, '').trim();
        const jpnNum = parseInt(jpnNumRaw, 10);
        if (isNaN(jpnNum)) continue;
        
        // Title cell is index 3
        const titleMatch = tdParts[3].match(/title="([^"]*)"/);
        const title = titleMatch ? titleMatch[1] : tdParts[3].replace(/<[^>]*>/g, '').trim();
        
        // Airdate cell is index 4
        const dateRaw = tdParts[4].replace(/<[^>]*>/g, '').trim();
        
        // Plot cell is index 6
        const plotHtml = tdParts[6];
        const tags = [];
        if (plotHtml.includes('Plot-BO.png') || plotHtml.includes('Black Organization')) tags.push('main-plot');
        if (plotHtml.includes('Plot-Char.png') || plotHtml.includes('Character development')) tags.push('character');
        if (plotHtml.includes('Plot-Romance.png') || plotHtml.includes('Romance')) tags.push('romance');
        if (plotHtml.includes('Plot-New.png') || plotHtml.includes('New character')) tags.push('character-intro');
        
        // Manga source cell is index 7
        const sourceHtml = tdParts[7];
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
    return;
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
  const todayStr = new Date().toISOString().split('T')[0];
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
      srcLabel = "TV Original"; // TMDB default fallback
    } else if (wikiEp) {
      // Secondary Fallback: Conan World Wiki
      console.log(`Ep ${currentEpNum} not found in TMDB. Falling back to fan wiki metadata!`);
      title = wikiEp.title;
      airedDate = wikiEp.aired;
      
      const isTvOriginal = wikiEp.title.includes('Digital Remaster') || wikiEp.title.includes('TV Original');
      srcLabel = isTvOriginal ? "TV Original" : "Manga Canon";
    }

    if (title && airedDate) {
      const airYear = airedDate.substring(2, 4); // YY from YYYY
      
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
        season: `S${airYear}`,
        aired: airedDate,
        etv: null,
        netflix: null,       // Direct Calendar Switch for Netflix India Drop Date
        animetimes: null,    // Direct Calendar Switch for Anime Times Prime Video Drop Date
        src: srcLabel
      };

      if (specialType) {
        newEp.special = specialType;
      }
      
      const wikiEp = wikiEpisodes.find(x => x.n === currentEpNum);
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
  } else {
    console.log('No new aired episodes found from the fan wiki.');
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
    return;
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
        /const UPCOMING_RELEASES = \{[\s\S]*?\};/,
        `const UPCOMING_RELEASES = {\n    ${nextUpcoming.vol}: 'Releasing ${formattedDate}'\n  };`
      );
      console.log(`Updated UPCOMING_RELEASES to point to Vol ${nextUpcoming.vol} (Releasing ${formattedDate}).`);
    } else {
      // Clear releases if none are scheduled
      appContent = appContent.replace(
        /const UPCOMING_RELEASES = \{[\s\S]*?\};/,
        `const UPCOMING_RELEASES = {};`
      );
    }
    
    fs.writeFileSync(appFilePath, appContent, 'utf8');
    console.log(`Updated app.js LATEST_VOL to ${newestVolNum}!`);

    // 3. Update MANGA_ISBNS in data.js
    let dataContent = fs.readFileSync(dataFilePath, 'utf8');
    
    // We will append the promoted volume ISBNs to MANGA_ISBNS
    for (const vol of promotedVols) {
      const isbnVal = vol.isbn10 || vol.isbn13;
      
      // Let's parse and inject: e.g. target `94:"978..."` or similar at the end
      // Let's replace the closing brace of MANGA_ISBNS
      const isbnMatchStr = `  93:"9781974751532",  94:"9781974752393"`;
      
      // Find the end of MANGA_ISBNS definition
      const isbnBlockEndIdx = dataContent.indexOf('};', dataContent.indexOf('const MANGA_ISBNS'));
      if (isbnBlockEndIdx !== -1) {
        // Let's rebuild the final lines dynamically
        let entriesToAppend = promotedVols.map(v => `  ${v.vol}:"${v.isbn10 || v.isbn13}"`).join(',\n');
        
        // Find the last entry before the closing brace
        const lastEntryIndex = dataContent.lastIndexOf('"', isbnBlockEndIdx);
        const insertionPoint = dataContent.indexOf('\n', lastEntryIndex) + 1;
        
        dataContent = dataContent.slice(0, insertionPoint) + entriesToAppend + '\n' + dataContent.slice(isbnBlockEndIdx);
        console.log(`Appended ISBNs for Volumes ${promotedVols.map(v => v.vol).join(', ')} directly to data.js!`);
      }
    }

    fs.writeFileSync(dataFilePath, dataContent, 'utf8');
  } else {
    console.log('No new manga volumes to release today.');
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
    // Track if any updates happened
    await updateNetflixEpisodes();
    await updateMangaReleases();
    
    // Always bump versions so that updates reflect instantly for clients
    bumpIndexHtmlVersion();
    
    console.log('\nAuto-update process complete!');
  } catch (err) {
    console.error('Fatal error during auto-update run:', err);
  }
}

run();
