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
  console.log('--- SYNCING NETFLIX SIMULCAST EPISODES ---');
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
    // Use eval safely since it's our own local file, or parse as JSON-like
    EPISODES = eval(rawArray);
  } catch (err) {
    console.error('Error parsing episodes array:', err);
    return;
  }

  const latestCatalogedEp = EPISODES[EPISODES.length - 1];
  const lastEpNum = latestCatalogedEp ? latestCatalogedEp.n : 0;
  console.log(`Latest cataloged episode: Ep ${lastEpNum} ("${latestCatalogedEp?.title}")`);

  // 2. Fetch from TMDB Season 1 (where TMDB stores all Detective Conan episodes)
  const tmdbUrl = `https://api.themoviedb.org/3/tv/${TMDB_TV_ID}/season/1?api_key=${TMDB_KEY}&language=en-US`;
  try {
    const res = await fetch(tmdbUrl);
    if (!res.ok) {
      console.error(`TMDB API returned error: ${res.status}`);
      return;
    }
    const data = await res.json();
    const tmdbEpisodes = Array.isArray(data.episodes) ? data.episodes : [];
    console.log(`Retrieved ${tmdbEpisodes.length} episodes from TMDB.`);

    const todayStr = new Date().toISOString().split('T')[0];
    let newEpisodesAdded = [];

    for (const te of tmdbEpisodes) {
      const epNum = te.episode_number;
      if (epNum > lastEpNum) {
        // Only catalog episodes that have already aired (or air today)
        if (te.air_date && te.air_date <= todayStr) {
          const airYear = te.air_date.substring(2, 4); // Get YY from YYYY
          const newEp = {
            n: epNum,
            title: te.name || `Episode ${epNum}`,
            season: `S${airYear}`,
            aired: te.air_date,
            etv: null,
            src: "TV Original"
          };
          EPISODES.push(newEp);
          newEpisodesAdded.push(newEp);
          console.log(`Added Ep ${epNum}: "${newEp.title}" (Aired ${newEp.aired})`);
        }
      }
    }

    if (newEpisodesAdded.length > 0) {
      // 3. Write back to episodes.js
      const formattedEpisodes = JSON.stringify(EPISODES, null, 2);
      const newEpisodesContent = `const EPISODES = ${formattedEpisodes};\n`;
      fs.writeFileSync(episodesFilePath, newEpisodesContent, 'utf8');
      console.log(`Successfully appended ${newEpisodesAdded.length} new episodes to episodes.js!`);

      // 4. Update the fallback latestEpNum in app.js
      const newMaxEpNum = EPISODES[EPISODES.length - 1].n;
      let appContent = fs.readFileSync(appFilePath, 'utf8');
      
      // Update let latestEpNum = 1201; fallback in app.js
      appContent = appContent.replace(
        /let latestEpNum = \d+; \/\/ Default fallback/,
        `let latestEpNum = ${newMaxEpNum}; // Default fallback`
      );

      // Also update the description fallback if present
      appContent = appContent.replace(
        /let latestEpTitle = ".*";/,
        `let latestEpTitle = "${EPISODES[EPISODES.length - 1].title.replace(/"/g, '\\"')}";`
      );
      
      // Update the still path if present
      const latestTMDBStill = tmdbEpisodes.find(x => x.episode_number === newMaxEpNum)?.still_path;
      if (latestTMDBStill) {
        appContent = appContent.replace(
          /let latestEpStill = ".*";/,
          `let latestEpStill = "${latestTMDBStill}";`
        );
      }

      fs.writeFileSync(appFilePath, appContent, 'utf8');
      console.log(`Successfully bumped app.js default fallback to Ep ${newMaxEpNum}!`);
    } else {
      console.log('No new aired episodes found to add.');
    }
  } catch (err) {
    console.error('Error fetching/processing TMDB episodes:', err);
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

async function run() {
  try {
    await updateNetflixEpisodes();
    await updateMangaReleases();
    console.log('\nAuto-update process complete!');
  } catch (err) {
    console.error('Fatal error during auto-update run:', err);
  }
}

run();
