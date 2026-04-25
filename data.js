// ══════════════════════════════════════════════════════
//  DATA.JS — Detective Conan India Watch Guide
// ══════════════════════════════════════════════════════

const PLATFORMS = [
  {
    id:"netflix", name:"Netflix", type:"streaming",
    color:"#E50914", bg:"#141414",
    url:"https://www.netflix.com/title/80090370",
    badge:"Subscription Required", tagline:"S1–10 · S23–27 · All 26 Movies · Spinoffs",
    description:"Netflix India carries Detective Conan across multiple collections — Seasons 1–10 and 23–27 in Japanese with English subtitles. All 26 movies are available with English subs. Both spinoffs are also on Netflix.",
    note:"Requires a Netflix subscription. The main series and movies are Japanese audio with English subtitles only — no Hindi dub. The spinoffs (Zero's Tea Time and The Culprit Hanzawa) have English and Hindi dubs.",
    seriesSeasons:["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S23","S24","S25","S26","S27"],
    movies:"all", spinoffs:["zerosteatime","culprithanzawa"],
    languages:{sub:["English"],dub:[]}
  },
  {
    id:"primevideo", name:"Anime Times", nameSub:"via Prime Video", type:"streaming",
    color:"#1A98FF", bg:"#0F1111",
    url:"https://www.primevideo.com/region/eu/detail/0HIFDMYH3JG6WFIM4I7XI2EU96/ref=atv_dp_amz_c_TS5124c5_1_1?jic=16|CgNhbGwSA2FsbA%3D%3D",
    badge:"Hindi Dub + Eng Sub", tagline:"Episodes 1–97 · Select Movies",
    description:"Anime Times is a dedicated anime streaming add-on available on Amazon Prime Video and Apple TV. It does not require a Prime subscription — it is a separate add-on subscription. They frequently run special offers, so check their Instagram for deals.",
    note:"Anime Times is a standalone add-on, not included with Prime Video. Check @animetimes_in on Instagram for offers and updates.",
    socialUrl:"https://www.instagram.com/animetimes_in/",
    seriesRange:[1,97],
    movies:["crossroad","magiciansilver","privateeyesreq","lostship","sunflowers","crimsonlove","fistblue","bridehalloween","blackiron","milliondollar"],
    languages:{sub:["English"],dub:["Hindi"]}
  },
  {
    id:"appletv", name:"Apple TV", nameSub:"via Anime Times", type:"streaming",
    color:"#A2AAAD", bg:"#1C1C1E",
    url:"https://tv.apple.com/in/show/case-closed-detective-conan/umc.cmc.o4e5fbtkmgjivlpghedf8a6x",
    badge:"Hindi Dub + Eng Sub", tagline:"Episodes 1–97 · Select Movies",
    description:"Access Anime Times through Apple TV as a channel add-on subscription (Apple TV+ subscription not required). Watch episodes 1–97 with Hindi dub and English subtitles — same content as Prime Video.",
    note:"Anime Times is a channel add-on on Apple TV — you subscribe to Anime Times through the Apple TV app, not Apple TV+ itself.",
    seriesRange:[1,97],
    movies:["crossroad","magiciansilver","privateeyesreq","lostship","sunflowers","crimsonlove","fistblue","bridehalloween","blackiron","milliondollar"],
    languages:{sub:["English"],dub:["Hindi"]}
  },
  {
    id:"etvbalb", name:"ETV Bal Bharat", nameSub:"& ETV Bal Bharat HD", type:"tv",
    color:"#FF6B00", bg:"#1A0A00",
    url:null, badge:"12 Languages · 11PM Daily",
    tagline:"Episodes 1–538 · Select Movies",
    description:"ETV Bal Bharat broadcasts Detective Conan nightly at 11PM in up to 12 regional language dubs. Available on paid cable and DTH packages across India.",
    dubNote:"⚠️ Not all episodes have been dubbed in all 12 languages. Dubbing is selective — earlier episodes (roughly 1–200) have the broadest coverage. Later episodes may only have Hindi or a few languages.",
    note:"Paid DTH/cable channel. Available on Airtel Digital TV (Ch 466), Tata Play SD 680 / HD 679, Dish TV (Ch 990), d2h (Ch 1111), Sun Direct (Ch 529), NXT Digital (Ch 913).",
    socialUrl:"https://www.instagram.com/etvbalbharat/",
    providers:[
      {name:"Airtel Digital TV", sd:466, hd:null},
      {name:"Tata Play",         sd:680, hd:679},
      {name:"Dish TV",           sd:990, hd:null},
      {name:"d2h",              sd:1111,hd:null},
      {name:"Sun Direct",        sd:529, hd:null},
      {name:"NXT Digital",       sd:913, hd:null}
    ],
    seriesRange:[1,538],
    movies:[1,2,3,4,5,6,7,16,17,18,19,20,21,22,23,24,25],
    languages:{dub:["Hindi","Tamil","Telugu","Malayalam","Kannada","Bengali","Marathi","Gujarati","Odia","Punjabi","Assamese","English*"]}
  },
  {
    id:"etvwin", name:"ETV Win", type:"streaming",
	color:"#FF9500", bg:"#1A0A00",
    url:"https://www.etvwin.com",
    badge:"Subscription Required", tagline:"Select Movies",
    description:"ETV Win is ETV's official streaming platform. A subscription is required to watch. Select movies that aired on ETV Bal Bharat are available to stream online in all the same regional language dubs.",
    note:"Requires an ETV Win subscription.",
    movies:[2,4,5],
    languages:{dub:["Hindi","Tamil","Telugu","Malayalam","Kannada","Bengali","Marathi","Gujarati","Odia","Punjabi","Assamese"]}
  },
  {
    id:"amasiantv", name:"Amasian TV", type:"streaming",
    color:"#FF6B35", bg:"#1A0F00",
    url:"https://amasian.tv",
    logoUrl:"https://images.plex.tv/photo?size=large-1920&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F464ba63c-620f-4b2b-8de3-e69c3bc3ee4e%2FAmasian_TV_logo_dark_-_Jason_Hwang.png",
    badge:"Free Streaming", tagline:"Magic Kaito 1412 · English Dub",
    description:"Amasian TV is a free streaming platform offering Magic Kaito 1412 with English dub. No subscription required - watch directly in your browser.",
    note:"Completely free to watch. Features Magic Kaito 1412 series with English audio.",
    magicKaito:true,
    magicKaitoEpisodes:Array.from({length: 24}, (_, i) => i + 1),
    ovas: ["ova1"],
    languages:{dub:["English"],sub:[]}
  }
];

const MOVIES = [
  {n:1,  id:"timebombed",        tmdb:21422,  title:"The Time-Bombed Skyscraper",       year:1997, colors:["#8B1A1A","#C0392B"],
   netflix:true,  etv:true,  pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/title/70055218',
   desc:"Conan races against time to stop a bomber targeting iconic buildings across Tokyo."},
  {n:2,  id:"fourteenth",        tmdb:21452,  title:"The Fourteenth Target",            year:1998, colors:["#1A3A5C","#2980B9"],
   netflix:true,  etv:true,  pvr:false, animetimes:false, etvwin:true,
   netflixUrl:'https://www.netflix.com/watch/70082582',
   desc:"A serial killer targets people connected to Kogoro Mouri using playing cards as calling cards."},
  {n:3,  id:"lastwizard",        tmdb:28808,  title:"The Last Wizard of the Century",   year:1999, colors:["#3A1A6B","#8E44AD"],
   netflix:true,  etv:true,  pvr:false, animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/title/70126871',
   animetimesUrl:'https://www.primevideo.com/detail/0NX0LODCWYKSIGT0GIAYDLYEMH/ref=atv_dp_amz_c_TS5124c5_1_12?jic=16%7CCgNhbGwSA2FsbA%3D%3D',
   desc:"Kaitou Kid and Conan clash over a legendary Fabergé egg with a hidden secret inside."},
  {n:4,  id:"capturedineyes",    tmdb:20677,  title:"Captured in Her Eyes",             year:2000, colors:["#6B1A50","#E91E8C"],
   netflix:true,  etv:true,  pvr:false, animetimes:false, etvwin:true,
   netflixUrl:'https://www.netflix.com/title/70126872',
   desc:"Ran witnesses a murder and loses her memory. Conan must protect her while finding the truth."},
  {n:5,  id:"countdown",         tmdb:32022,  title:"Countdown to Heaven",              year:2001, colors:["#1C3A6B","#2196F3"],
   netflix:true,  etv:true,  pvr:false, animetimes:false, etvwin:true,
   netflixUrl:'https://www.netflix.com/title/70128058',
   desc:"A killer strikes inside twin luxury skyscrapers during their glamorous opening ceremony."},
  {n:6,  id:"phantombaker",      tmdb:26662,  title:"The Phantom of Baker Street",      year:2002, colors:["#4A3000","#8B6914"],
   netflix:true,  etv:true,  pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/70129025',
   desc:"A hundred children are trapped inside a Victorian London virtual reality — and one will die."},
  {n:7,  id:"crossroad",         tmdb:39202,  title:"Crossroad in the Ancient Capital",  year:2003, colors:["#7B1F1F","#C0392B"],
   netflix:true,  etv:true,  pvr:false, animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/title/81757599',
   animetimesUrl:'https://www.primevideo.com/detail/0KLBD948DUW9CN5GFVNF5RHXMO/ref=atv_dp_amz_c_TS5124c5_1_3?jic=16%7CCgNhbGwSA2FsbA%3D%3D',
   desc:"A series of scroll thefts leads Conan and Heiji through the ancient streets of Kyoto."},
  {n:8,  id:"magiciansilver",    tmdb:39203,  title:"Magician of the Silver Sky",       year:2004, colors:["#1A4030","#27AE60"],
   netflix:true,  etv:false, pvr:false, animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/title/81757598',
   animetimesUrl:'https://www.primevideo.com/detail/0IW0VX0AVLG5VQ5WI3USXAR2Z9/ref=atv_dp_amz_c_TS5124c5_1_6?jic=16%7CCgNhbGwSA2FsbA%3D%3D',
   desc:"Kaitou Kid hijacks a passenger plane mid-flight. Conan must outsmart him at 30,000 feet."},
  {n:9,  id:"strategyabove",     tmdb:39204,  title:"Strategy Above the Depths",        year:2005, colors:["#0D2137","#1565C0"],
   netflix:true,  etv:false, pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757585',
   desc:"A murder unfolds aboard a luxury cruise ship with the Detective Boys as key witnesses."},
  {n:10, id:"privateeyesreq",    tmdb:39205,  title:"The Private Eye's Requiem",        year:2006, colors:["#1A1A2E","#E94560"],
   netflix:true,  etv:false, pvr:false, animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/title/81757597',
   animetimesUrl:'https://www.primevideo.com/detail/0FVFHWVYS9TZR0QMAETWBMFTPB/ref=atv_dp_amz_c_TS5124c5_1_5?jic=16%7CCgNhbGwSA2FsbA%3D%3D',
   desc:"A bomb planted in Conan and Mouri's detective badges forces them into solving a deadly case."},
  {n:11, id:"jollyroger",        tmdb:39206,  title:"Jolly Roger in the Deep Azure",    year:2007, colors:["#0A2744","#0288D1"],
   netflix:true,  etv:false, pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/title/81757588',
   desc:"A legendary pirate treasure hunt on a tropical island turns deadly."},
  {n:12, id:"fullscore",         tmdb:39207,  title:"Full Score of Fear",               year:2008, colors:["#1A0A2E","#7B1FA2"],
   netflix:true,  etv:false, pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/title/81757587',
   desc:"Murder strikes a prestigious concert hall during the premiere of a legendary lost symphony."},
  {n:13, id:"ravenchaser",       tmdb:28764,  title:"The Raven Chaser",                 year:2009, colors:["#0D0D0D","#B71C1C"],
   netflix:true,  etv:false, pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757586',
   desc:"The Black Organization resurfaces — and Conan is directly in their crosshairs."},
  {n:14, id:"lostship",          tmdb:97375,  title:"The Lost Ship in the Sky",         year:2010, colors:["#0D1B2A","#1E88E5"],
   netflix:true,  etv:false, pvr:false, animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/title/81757579',
   animetimesUrl:'https://www.primevideo.com/detail/0N7NO0I70YHNQM1Q2RCJ5MJPK2/ref=atv_dp_amz_c_TS5124c5_1_4?jic=16%7CCgNhbGwSA2FsbA%3D%3D',
   desc:"Kaitou Kid seizes a massive airship, but terrorists carrying a deadly virus turn it into a standoff."},
  {n:15, id:"quartersilence",    tmdb:77617,  title:"Quarter of Silence",               year:2011, colors:["#1A2A3A","#78909C"],
   netflix:true,  etv:false, pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757580',
   desc:"A murder during a snowfield soccer championship sends Conan hunting a dangerous killer."},
  {n:16, id:"eleventhstriker",   tmdb:122583,  title:"The Eleventh Striker",             year:2012, colors:["#1A3A1A","#388E3C"],
   netflix:true,  etv:true,  pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/title/81757602',
   desc:"A bomber threatens to detonate inside a packed football stadium during the finals."},
  {n:17, id:"privateeyedist",    tmdb:228805,  title:"Private Eye in the Distant Sea",   year:2013, colors:["#0D1F3C","#0D47A1"],
   netflix:true,  etv:true,  pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757603',
   desc:"A murder aboard an Aegis destroyer threatens national security — and the Detective Boys are witnesses."},
  {n:18, id:"dimensionalsniper", tmdb:257512,  title:"Dimensional Sniper",               year:2014, colors:["#1A1A1A","#607D8B"],
   netflix:true,  etv:true,  pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/title/81757601',
   desc:"A sniper is eliminating witnesses to a cold case — and Conan must connect the dots before more die."},
  {n:19, id:"sunflowers",        tmdb:316873,  title:"Sunflowers of Inferno",            year:2015, colors:["#3D2B00","#F9A825"],
   netflix:true,  etv:true,  pvr:false, animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/title/81757600',
   animetimesUrl:'https://www.primevideo.com/detail/0JLV9FTCG6KTR5SUJL0HDR8HKN/ref=atv_dp_amz_c_TS5124c5_1_4?jic=16%7CCgNhbGwSA2FsbA%3D%3D',
   desc:"Kaitou Kid and Conan chase a lost Van Gogh masterpiece — with very deadly competition."},
  {n:20, id:"darkestnightmare",  tmdb:374856,  title:"The Darkest Nightmare",            year:2016, colors:["#0A0A1A","#1A237E"],
   netflix:true,  etv:true,  pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757584',
   desc:"A woman with no memory washes ashore — and she may be the key to exposing the Black Organization."},
  {n:21, id:"crimsonlove",       tmdb:438058,  title:"The Crimson Love Letter",          year:2017, colors:["#3D0000","#C62828"],
   netflix:true,  etv:true,  pvr:false, animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757605',
   animetimesUrl:'https://www.primevideo.com/detail/0HQ08OOX30LUL2897SPTHAQW9I/ref=atv_sr_fle_c_sr782405_pvsearchresults_1_3',
   desc:"During a traditional karuta competition in Osaka, murders begin striking the tournament."},
  {n:22, id:"zeroenforcer",      tmdb:493006,  title:"Zero the Enforcer",                year:2018, colors:["#0A1A2A","#0288D1"],
   netflix:true,  etv:true,  pvr:false, animetimes:false, etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757618',
   desc:"Kogoro is framed for a summit bombing — and Conan uncovers a conspiracy that goes to the very top."},
  {n:23, id:"fistblue",          tmdb:566555,  title:"The Fist of Blue Sapphire",        year:2019, colors:["#001A3A","#0052D9"],
   netflix:true,  etv:true,  pvr:false, animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757604',
   animetimesUrl:'https://www.primevideo.com/detail/0QPIKJ3SI05KQFII0HYLLZ4G0Q/ref=atv_dp_amz_c_TS5124c5_1_10?jic=16%7CCgNhbGwSA2FsbA%3D%3D',
   desc:"Kaitou Kid steals the legendary Blue Sapphire in Singapore, and Conan gives chase across the city."},
  {n:24, id:"scarletbullet",     tmdb:662638,  title:"The Scarlet Bullet",               year:2021, colors:["#3D0000","#FF1744"],
   netflix:true,  etv:true,  pvr:false, animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757619',
   animetimesUrl:'https://www.primevideo.com/detail/0U8UFG6SAHZFTE2I47SAPXI8R0/ref=atv_dp_amz_c_TS5124c5_1_8?jic=16%7CCgNhbGwSA2FsbA%3D%3D',
   desc:"A wave of kidnappings at Tokyo's World Sports Games leads Conan to a shocking conspiracy."},
  {n:25, id:"bridehalloween",    tmdb:903939,  title:"The Bride of Halloween",           year:2022, colors:["#2A0A3A","#7B1FA2"],
   netflix:true,  etv:true,  pvr:false, animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757621',
   animetimesUrl:'https://www.primevideo.com/detail/0G9HOB7I3OLR0IKFGEKTHQKY8S/ref=atv_dp_amz_c_TS5124c5_1_9?jic=16%7CCgNhbGwSA2FsbA%3D%3D',
   desc:"Murders targeting police officers' partners put the entire Tokyo MPD on edge before Halloween."},
  {n:26, id:"blackiron",         tmdb:1047041,  title:"Black Iron Submarine",             year:2023, colors:["#0A1A1A","#006064"],
   netflix:true,  etv:false, pvr:true,  animetimes:true,  etvwin:false,
   netflixUrl:'https://www.netflix.com/watch/81757620',
   animetimesUrl:'https://www.primevideo.com/detail/Detective-Conan-The-Movie-Black-Iron-Submarine/0LOT9J6JU00WTVYLY7R7CUWI7K',
   pvrDetail:"Screened at PVR Cinemas India",
   desc:"A remote island prison holding the world's most dangerous criminals — and a plot to free them all."},
  {n:27, id:"milliondollar",     tmdb:1209217,  title:"The Million Dollar Pentagram",     year:2024, colors:["#1A1000","#B8860B"],
   netflix:false, etv:false, pvr:true,  animetimes:true,  etvwin:false,
   animetimesUrl:'https://www.primevideo.com/detail/Detective-Conan-The-Movie-The-Million-dollar-Pentagram/0TNZYG7W823R6Q2LSX1JXVAOJQ',
   pvrDetail:"Screened at PVR Cinemas India",
   desc:"A golden seal worth millions draws Conan and Heiji to Hokkaido and a web of interconnected murders."},
  {n:28, id:"oneyedflashback",   tmdb:1396965,   title:"The One-Eyed Flashback",           year:2025, colors:["#1A1A2E","#546E7A"],
   netflix:false, etv:false, pvr:false, animetimes:false, etvwin:false, noIndiaAnnouncement:true,
   desc:"Released in Japan April 2025. No India release has been announced."},
  {n:29, id:"fallenangel",       tmdb:1545621,   title:"Fallen Angel of the Highway",      year:2026, colors:["#0A0A1A","#3949AB"],
   netflix:false, etv:false, pvr:false, animetimes:false, etvwin:false, noIndiaAnnouncement:true,
   desc:"Released in Japan April 2026. No India release has been announced."},
  {n:30, id:"movie30",           tmdb:null,   title:"Untitled Movie 30",                year:2027, colors:["#0A1A0A","#1B5E20"],
   netflix:false, etv:false, pvr:false, animetimes:false, etvwin:false, noIndiaAnnouncement:true,
   desc:"No title announced yet. Expected Japan release 2027. No India announcement."}
];

// ─── VOICE CAST DATA ─────────────────────────────────
const VOICE_CAST = {
  'English Sub': [
    {character:'Shinichi Kudo',   artist:'Sachin Suresh'},
    {character:'Conan Edogawa',   artist:'Shashwati Kumar'},
    {character:'Ran Mouri',       artist:'Shashwati Kumar'},
    {character:'Insp. Megure',    artist:'Laatesh Puujari'},
    {character:'Ai Haibara',      artist:'Bhakti Javeri'},
    {character:'Sonoko Suzuki',   artist:'Sushmita Benal'},
    {character:'Ayumi',           artist:'Shaily Vyas'},
    {character:'Mitsuhiko',       artist:'Shaily Vyas'},
    {character:'Genta',           artist:'Sumeet Jain'},
    {character:'Yusaku Kudo',     artist:'Abhijit Chalakar'},
    {character:'Hattori',         artist:'Abhijit Chalakar'},
    {character:'Insp. Takagi',    artist:'Lovennist'},
    {character:'Insp. Sato',      artist:'Megha Joshi'},
    {character:'Kaito',           artist:'Aakarsh Aryan'},
  ],
  'Hindi': [
    {character:'Shinichi Kudo',   artist:'Harshwardhan Sharma'},
    {character:'Conan Edogawa',   artist:'Merlyn'},
    {character:'Ran Mouri',       artist:'Surbhi R Wadhwani'},
    {character:'Kogoro Mouri',    artist:'Sanchit Wartak'},
    {character:'Gin',             artist:'Rajat Chandna'},
    {character:'Vodka',           artist:'Sanchit Wartak'},
    {character:'Dr. Agasa',       artist:'Rajat Chandna'},
    {character:'Insp. Megure',    artist:'Sanchit Wartak'},
    {character:'Ai Haibara',      artist:'Sabina Mausam Mallik'},
    {character:'Ayumi',           artist:'Merlyn'},
    {character:'Mitsuhiko',       artist:'Sabina Mausam Mallik'},
    {character:'Genta',           artist:'Harshwardhan Sharma'},
    {character:'Yusaku Kudo',     artist:'Jeetendra Dasadia'},
    {character:'Yukiko Kudo',     artist:'Surbhi R Wadhwani'},
    {character:'Jodie Starling',  artist:'Surbhi R Wadhwani'},
    {character:'Hattori',         artist:'Rajat Chandna'},
    {character:'Kazuha',          artist:'Sabina Mausam Mallik'},
    {character:'Kaito',           artist:'Rajat Chandna'},
  ],
  'Hindi (Anime Times)': [
    {character:'Shinichi Kudo',   artist:'Hemant Saini'},
    {character:'Conan Edogawa',   artist:'Jyoti Bhatt'},
    {character:'Ran Mouri',       artist:'Rutu Ranjon'},
    {character:'Kogoro Mouri',    artist:'Subroto Mukharjee'},
    {character:'Dr. Agasa',       artist:'Hemant Saini'},
    {character:'Insp. Megure',    artist:'Salim'},
    {character:'Ayumi',           artist:'Rishu Singh'},
    {character:'Mitsuhiko',       artist:'Ginni Nirvan'},
    {character:'Genta',           artist:'Salim'},
    {character:'Kaito',           artist:'Ayush Gaur'},
  ],
  'Tamil': [
    {character:'Shinichi Kudo',   artist:'Sai Abhijith'},
    {character:'Conan Edogawa',   artist:'Prabhu Dev'},
    {character:'Ran Mouri',       artist:'Fathima'},
    {character:'Gin',             artist:'Keerthi Vasan'},
    {character:'Dr. Agasa',       artist:'Keerthi Vasan'},
    {character:'Ai Haibara',      artist:'Bhuvaneswari V N'},
    {character:'Sonoko Suzuki',   artist:'Bhuvaneswari V N'},
    {character:'Mitsuhiko',       artist:'Sarath Kumar'},
    {character:'Genta',           artist:'Vicky Vignesh'},
    {character:'Insp. Shiratori', artist:'Sarath Kumar'},
    {character:'Insp. Takagi',    artist:'Sarath Kumar'},
    {character:'Insp. Sato',      artist:'Bhuvaneswari V N'},
    {character:'Makoto Kyogoku',  artist:'Sarath Kumar'},
    {character:'Insp. Matsuda',   artist:'Sarath Kumar'},
    {character:'Insp. Chiba',     artist:'Vicky Vignesh'},
    {character:'Akai Shuichi',    artist:'Sarath Kumar'},
    {character:'Jodie Starling',  artist:'Bhuvaneswari V N'},
    {character:'Hattori',         artist:'Sarath Kumar'},
    {character:'Kazuha',          artist:'Bhuvaneswari V N'},
    {character:'Kaito',           artist:'Sarath Kumar'},
    {character:'Kir',             artist:'Bhuvaneswari V N'},
  ],
  'Telugu': [
    {character:'Shinichi Kudo',   artist:'Roshni'},
  ],
  'Gujarati': [
    {character:'Shinichi Kudo',   artist:'Akshar Joshi'},
    {character:'Ran Mouri',       artist:'Preeta Pandya'},
    {character:'Ai Haibara',      artist:'Vaishali Panchmatia Buch'},
    {character:'Sonoko Suzuki',   artist:'Vaishali Panchmatia Buch'},
    {character:'Genta',           artist:'Ashish D'},
    {character:'Hattori',         artist:'Ashish D'},
  ],
  'Bengali': [
    {character:'Shinichi Kudo',   artist:'Shovan Som Kamila'},
    {character:'Ran Mouri',       artist:'Debasri Mukherjee'},
    {character:'Kogoro Mouri',    artist:'Shyamashis Pahari'},
    {character:'Dr. Agasa',       artist:'Rupan Dasgupta'},
    {character:'Insp. Megure',    artist:'Shantanu Dutta'},
  ],
  'Odia': [
    {character:'Shinichi Kudo',   artist:'Somya Sephalika Jena'},
  ],
  'Assamese': [
    {character:'Conan Edogawa',   artist:'Nimisha Bharali'},
    {character:'Ayumi',           artist:'Nimisha Bharali'},
  ],
  'Malayalam': [
    {character:'Shinichi Kudo',   artist:'Jasal'},
    {character:'Conan Edogawa',   artist:'Jincy Jacob'},
    {character:'Ran Mouri',       artist:'Swetha Prasad'},
  ],
};

// Corrected PVR archive events
const PVR_EVENTS = [
  {
    id:"pvr_m26", type:"movie", movieId:"blackiron",
    title:"Black Iron Submarine",
    subtitle:"Movie 26 · 2023",
    colors:["#0A1A1A","#006064"],
    detail:"Screened theatrically at PVR Cinemas across India."
  },
  {
    id:"pvr_m27", type:"movie", movieId:"milliondollar",
    title:"The Million Dollar Pentagram",
    subtitle:"Movie 27 · 2024",
    colors:["#1A1000","#B8860B"],
    detail:"Screened theatrically at PVR Cinemas across India."
  },
  {
    id:"pvr_kidrecap", type:"special", tmdb:1244064,
    title:"Detective Conan vs. Kid the Phantom Thief",
    subtitle:"Recap Movie · 2024",
    colors:["#0A0030","#5C00C7"],
    detail:"A theatrical recap compilation film featuring Kaitou Kid's greatest confrontations with Conan. Screened at PVR Cinemas India."
  },
  {
    id:"pvr_airecap", type:"special", tmdb:1058906,
    title:"Story of Ai Haibara",
    subtitle:"Black Iron Mystery Train · Recap · 2024",
    colors:["#1A0A00","#8B1A00"],
    detail:"A theatrical recap film focusing on Ai Haibara's story arc. Screened at PVR Cinemas India."
  },
  {
    id:"pvr_jff", type:"festival",
    title:"Japan Film Festival",
    subtitle:"Festival Screenings · 2023",
    colors:["#001A3A","#CC0000"],
    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Japan_Film_Festival_logo.svg/320px-Japan_Film_Festival_logo.svg.png",
    detail:"Select Detective Conan films screened as part of the Japan Film Festival across Indian cities."
  }
];

const SEASONS = [
  {id:"S1",  label:"Season 1 (1996)",  year:1996, epRange:[1,42],    available:true,
   platforms:["netflix","primevideo","appletv","etvbalb"]},
  {id:"S2",  label:"Season 2 (1997)",  year:1997, epRange:[43,85],    available:true,
   platforms:["netflix","primevideo","appletv","etvbalb"]},
  {id:"S3",  label:"Season 3 (1998)",  year:1998, epRange:[86,128],    available:true,
   platforms:["netflix","primevideo","appletv","etvbalb"]},
  {id:"S4",  label:"Season 4 (1999)",  year:1999, epRange:[129,173],    available:true,
   platforms:["netflix","primevideo","appletv","etvbalb"]},
  {id:"S5",  label:"Season 5 (2000)",  year:2000, epRange:[174,218],    available:true,
   platforms:["netflix","etvbalb"]},
  {id:"S6",  label:"Season 6 (2001)",  year:2001, epRange:[219,262],    available:true,
   platforms:["netflix","etvbalb"]},
  {id:"S7",  label:"Season 7 (2002)",  year:2002, epRange:[263,303],    available:true,
   platforms:["netflix","etvbalb"]},
  {id:"S8",  label:"Season 8 (2003)",  year:2003, epRange:[304,344],    available:true,
   platforms:["netflix","etvbalb"]},
  {id:"S9",  label:"Season 9 (2004)",  year:2004, epRange:[345,383],    available:true,
   platforms:["netflix","etvbalb"]},
  {id:"S10",  label:"Season 10 (2005)",  year:2005, epRange:[384,424],    available:true,
   platforms:["netflix","etvbalb"]},
  {id:"S11",  label:"Season 11 (2006)",  year:2006, epRange:[425,459],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S12",  label:"Season 12 (2007)",  year:2007, epRange:[460,490],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S13",  label:"Season 13 (2008)",  year:2008, epRange:[491,520],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S14",  label:"Season 14 (2009)",  year:2009, epRange:[521,561],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S15",  label:"Season 15 (2010)",  year:2010, epRange:[562,601],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S16",  label:"Season 16 (2011)",  year:2011, epRange:[602,641],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S17",  label:"Season 17 (2012)",  year:2012, epRange:[642,680],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S18",  label:"Season 18 (2013)",  year:2013, epRange:[681,723],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S19",  label:"Season 19 (2014)",  year:2014, epRange:[724,762],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S20",  label:"Season 20 (2015)",  year:2015, epRange:[763,803],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S21",  label:"Season 21 (2016)",  year:2016, epRange:[804,844],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S22",  label:"Season 22 (2017)",  year:2017, epRange:[845,886],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S23",  label:"Season 23 (2018)",  year:2018, epRange:[887,926],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S24",  label:"Season 24 (2019)",  year:2019, epRange:[927,964],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S25",  label:"Season 25 (2020)",  year:2020, epRange:[965,992],    available:false,
   platforms:[], unavailableNote:"Not available on any Indian streaming platform."},
  {id:"S26",  label:"Season 26 (2021)",  year:2021, epRange:[993,1032],    available:true,
   platforms:["netflix"]},
  {id:"S27",  label:"Season 27 (2022)",  year:2022, epRange:[1033,1067],    available:true,
   platforms:["netflix"]},
  {id:"S28",  label:"Season 28 (2023)",  year:2023, epRange:[1068,1108],    available:true,
   platforms:["netflix"]},
  {id:"S29",  label:"Season 29 (2024)",  year:2024, epRange:[1109,1147],    available:false,
   platforms:[], unavailableNote:"Currently airing in Japan. Not yet on any Indian platform."},
  {id:"S30",  label:"Season 30 (2025)",  year:2025, epRange:[1148,1186],    available:false,
   platforms:[], unavailableNote:"Currently airing in Japan. Not yet on any Indian platform."},
  {id:"S31",  label:"Season 31 (2026)",  year:2026, epRange:[1187,null],    available:false,
   platforms:[], unavailableNote:"Currently airing in Japan. Not yet on any Indian platform."},
];

const SPINOFFS = [
  {
    id:"zerosteatime", title:"Zero's Tea Time", year:2022, episodes:13,
    colors:["#0A2A4A","#1565C0"], netflix:true,
    desc:"A charming slice-of-life spinoff following Toru Amuro (Rei Furuya / Zero) as he runs a cozy café in Haido City.",
    languages:{dub:["English","Hindi"],sub:["English"]}
  },
  {
    id:"culprithanzawa", title:"The Culprit Hanzawa", year:2022, episodes:12,
    colors:["#2A0A0A","#B71C1C"], netflix:true,
    desc:"A darkly comedic spinoff following the unnamed 'culprit' silhouette as he navigates daily life in Beika Town.",
    languages:{dub:["English","Hindi"],sub:["English"]}
  }
];

// ─── DETECTIVE CONAN SPECIALS ───────────────────────────
// TMDB Season 0 mixed content mapped to correct Wiki numbering
// See: https://www.detectiveconanworld.com/wiki/OVAs
// See: https://www.detectiveconanworld.com/wiki/Specials
const OVAS = [
  // ═══════════════════════════════════════════════════════
  // OVA SERIES (1-12) - Original Video Animations
  // ═══════════════════════════════════════════════════════
  {
    id:"ova1", tmdbEp:1, title:"OVA 1: Conan vs. Kid vs. Yaiba - The Grand Battle for the Treasure Sword!!", year:2000, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#1A2A4A","#4A90E2"], episodeNumber:1,
    still: "https://image.tmdb.org/t/p/w500/133XH39X32Htq5CAsAMztzsn2p7.jpg",
    desc:"Conan, Kaito Kid, and Yaiba clash in a battle over a legendary treasure sword."
  },
  {
    id:"ova2", tmdbEp:2, title:"OVA 2: 16 Suspects!?", year:2002, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#2A1A3A","#6A4C93"], episodeNumber:2,
    still: "https://image.tmdb.org/t/p/w500/9GD5K65E3VkKB9O44xg5qpKae54.jpg",
    desc:"The gang gathers at Inspector Shiratori's villa for a murder mystery with 16 suspects."
  },
  {
    id:"ova3", tmdbEp:3, title:"OVA 3: Conan, Heiji, and the Vanished Boy", year:2003, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#1A3A2A","#27AE60"], episodeNumber:3,
    still: "https://image.tmdb.org/t/p/w500/6Jy2IaUtbVrbR43GycVms6oVIhj.jpg",
    desc:"Conan and Ran visit Heiji in Osaka and encounter lookalikes of the Detective Boys."
  },
  {
    id:"ova4", tmdbEp:4, title:"OVA 4: Conan, Kid, and the Crystal Mother", year:2004, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#3A1A1A","#C0392B"], episodeNumber:4,
    still: "https://image.tmdb.org/t/p/w500/425liZqczC5PtEaCKF1TQ4PEt9Z.jpg",
    desc:"Kaito Kid targets the Crystal Mother jewel, leading to another showdown with Conan."
  },
  {
    id:"ova5", tmdbEp:6, title:"OVA 5: The Target is Kogoro!! The Detective Boys' Secret Report", year:2005, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#2A2A1A","#F39C12"], episodeNumber:5,
    still: "https://image.tmdb.org/t/p/w500/1Osjk2CU8m9zj3l071HyyYRO7WZ.jpg",
    desc:"The Detective Boys investigate mysterious activities targeting Kogoro."
  },
  {
    id:"ova6", tmdbEp:7, title:"OVA 6: Follow the Vanished Diamond! Conan & Heiji vs. Kid!", year:2006, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#1A2A2A","#16A085"], episodeNumber:6,
    still: "https://image.tmdb.org/t/p/w500/11BOUmixdkdoUOOn3vi8fTPRfkY.jpg",
    desc:"A vanished diamond sparks a three-way confrontation between Conan, Heiji, and Kid."
  },
  {
    id:"ova7", tmdbEp:9, title:"OVA 7: A Challenge from Agasa! Agasa vs. Conan and the Detective Boys", year:2007, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#3A2A1A","#D35400"], episodeNumber:7,
    still: "https://image.tmdb.org/t/p/w500/jMrBNxGt3GAD7ZTM7aoXbc7JA2S.jpg",
    desc:"Professor Agasa challenges Conan and the Detective Boys to solve his mystery."
  },
  {
    id:"ova8", tmdbEp:14, title:"OVA 8: High School Girl Detective Sonoko Suzuki's Case Files", year:2008, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#2A1A1A","#E74C3C"], episodeNumber:8,
    still: "https://image.tmdb.org/t/p/w500/s0HCyegKgbV5MFo43w3cPaRh79j.jpg",
    desc:"Sonoko Suzuki takes the lead as a high school detective in her own case."
  },
  {
    id:"ova9", tmdbEp:17, title:"OVA 9: The Stranger from Ten Years Later", year:2009, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#2A1A3A","#9B59B6"], episodeNumber:9,
    still: "https://image.tmdb.org/t/p/w500/4494r2R0sahWgkscC1NhEsK7aHD.jpg",
    desc:"A mysterious stranger from ten years in the future appears with a message."
  },
  {
    id:"ova10", tmdbEp:18, title:"OVA 10: Kid in Trap Island", year:2010, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#1A3A1A","#16A085"], episodeNumber:10,
    still: "https://image.tmdb.org/t/p/w500/vowq6vWhBaCBan8UT6hPGXj9Frk.jpg",
    desc:"Kaito Kid finds himself trapped on a mysterious island."
  },
  {
    id:"ova11", tmdbEp:23, title:"OVA 11: A Secret Order from London", year:2011, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#1A1A3A","#5C6BC0"], episodeNumber:11,
    still: "https://image.tmdb.org/t/p/w500/uaZP0DU0ysEXIn9YvX7YCa37vZX.jpg",
    desc:"A secret order from London draws Conan into an international case."
  },
  {
    id:"ova12", tmdbEp:27, title:"OVA 12: The Miracle of Excalibur", year:2012, type:"ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#3A2A1A","#E67E22"], episodeNumber:12,
    still: "https://image.tmdb.org/t/p/w500/1I5tlyhOIBp9yZgqSufACU5rpGk.jpg",
    desc:"A case involving the legendary sword Excalibur and its miraculous powers."
  },

  // ═══════════════════════════════════════════════════════
  // MAGIC FILES (MF 1-6) - Movie companion specials
  // ═══════════════════════════════════════════════════════
  {
    id:"mf1", tmdbEp:10, title:"Magic File 1: Magic File", year:2007, type:"magic-file",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Magic_File",
    note:"Compilation only, no new content",
    colors:["#1A2A3A","#2980B9"], episodeNumber:1,
    still: "https://image.tmdb.org/t/p/w500/7cln5D2sxflrhgK3ADVZxolwIY3.jpg",
    desc:"Compilation of previously aired content accompanying Movie 11."
  },
  {
    id:"mf2", tmdbEp:15, title:"Magic File 2: Shinichi Kudo, The Case of the Mysterious Wall and the Black Lab", year:2008, type:"magic-file",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Magic_File",
    colors:["#2A1A2A","#C0392B"], episodeNumber:2,
    still: "https://image.tmdb.org/t/p/w500/iz0CLEAUGEx642NccmpCtGGCQ8t.jpg",
    desc:"Shinichi investigates a mysterious wall and a black laboratory."
  },
  {
    id:"mf3", tmdbEp:16, title:"Magic File 3: Shinichi and Ran, Memories of Mahjong Tiles and Tanabata", year:2009, type:"magic-file",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Magic_File",
    colors:["#3A2A2A","#E67E22"], episodeNumber:3,
    still: "https://image.tmdb.org/t/p/w500/gV1QnIUsexlOLrzLyEqcpxX0l07.jpg",
    desc:"A nostalgic story of Shinichi and Ran with mahjong tiles and Tanabata festival."
  },
  {
    id:"mf4", tmdbEp:19, title:"Magic File 4: The Osaka Okonomiyaki Odyssey", year:2010, type:"magic-file",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Magic_File",
    colors:["#3A1A1A","#D35400"], episodeNumber:4,
    still: "https://image.tmdb.org/t/p/w500/9oMLpkIsmZIL9KEr0KIg8jSpSzh.jpg",
    desc:"An Osaka culinary adventure featuring okonomiyaki and mystery."
  },
  {
    id:"mf5", tmdbEp:21, title:"Magic File 5: Niigata~Tokyo Souvenir Capriccio", year:2011, type:"magic-file",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Magic_File",
    colors:["#1A1A2A","#34495E"], episodeNumber:5,
    still: "https://image.tmdb.org/t/p/w500/nLr33bW9mEmFVXg64xxFH1riy2n.jpg",
    desc:"A journey from Niigata to Tokyo with mysterious souvenirs."
  },
  {
    id:"mf6", tmdbEp:26, title:"Magic File 6: Flower of Fantasista", year:2012, type:"magic-file",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Magic_File",
    note:"Also known as Bonus File 1",
    colors:["#1A3A2A","#2980B9"], episodeNumber:6,
    still: "https://image.tmdb.org/t/p/w500/dpaXRE08yRCSDDNiQQp6Ll3ppJ5.jpg",
    desc:"A case centered around the mysterious Flower of Fantasista."
  },

  // ═══════════════════════════════════════════════════════
  // TV SPECIALS - Television broadcast specials
  // ═══════════════════════════════════════════════════════
  {
    id:"tvs1", tmdbEp:5, title:"TV Special 1: Time Travel of the Silver Sky", year:2004, type:"tv-special",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Specials",
    colors:["#1A1A3A","#5C6BC0"], episodeNumber:1,
    still: "https://image.tmdb.org/t/p/w500/9rH1zBx1Rl4YL5aTKk91jwYUTL7.jpg",
    desc:"A time-travel adventure involving the Silver Sky gemstone."
  },
  {
    id:"tvs2", tmdbEp:12, title:"TV Special 2: Black History", year:2009, type:"tv-special",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Specials",
    colors:["#2A1A2A","#8E44AD"], episodeNumber:2,
    still: "https://image.tmdb.org/t/p/w500/oleyBnHXzusIQKbqRWBgty7ANmn.jpg",
    desc:"A look into the dark history surrounding the Black Organization."
  },
  {
    id:"tvs4", tmdbEp:29, title:"TV Special 4: Fugitive: Kogoro Mouri", year:2014, type:"tv-special",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Fugitive:_Kogoro_Mouri",
    note:"TMDB Ep 29-30 are the same special (continued broadcast)",
    colors:["#3A2A1A","#E67E22"], episodeNumber:4,
    still: "https://image.tmdb.org/t/p/w500/x5IgkiahZYjpTKpLcll8KPeZCIe.jpg",
    desc:"Kogoro Mouri becomes a fugitive on the run from the law."
  },

  // ═══════════════════════════════════════════════════════
  // DRAMA SPECIALS - Live-action TV dramas
  // ═══════════════════════════════════════════════════════
  {
    id:"ds1", tmdbEp:8, title:"Drama Special 1: A Challenge Letter to Shinichi Kudo ~Prologue Until Goodbye~", year:2006, type:"drama-special",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Specials#Drama_Specials",
    colors:["#2A3A1A","#27AE60"], episodeNumber:1,
    still: "https://image.tmdb.org/t/p/w500/scgrZFlZ0pkCokAhyZd4Sgfc4UG.jpg",
    desc:"Live-action drama: Shinichi receives a challenge letter in this prologue story."
  },
  {
    id:"ds2", tmdbEp:11, title:"Drama Special 2: Shinichi Kudo Returns! Confrontation with the Black Organization", year:2007, type:"drama-special",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Specials#Drama_Specials",
    colors:["#3A1A2A","#C0392B"], episodeNumber:2,
    still: "https://image.tmdb.org/t/p/w500/sf0fDsUo1KOstXnIYCp7o5qHjcN.jpg",
    desc:"Live-action drama: Shinichi temporarily returns to confront the Black Organization."
  },
  {
    id:"ds3", tmdbEp:20, title:"Drama Special 3: A Challenge Letter to Shinichi Kudo ~The Mystery of the Legendary Bird~", year:2011, type:"drama-special",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Specials#Drama_Specials",
    colors:["#2A2A1A","#F39C12"], episodeNumber:3,
    still: "https://image.tmdb.org/t/p/w500/dGOYJvK5E2d2ixQlFHYZg83HVOy.jpg",
    desc:"Live-action drama: Shinichi faces a challenge involving a legendary mysterious bird."
  },
  {
    id:"ds4", tmdbEp:25, title:"Drama Special 4: Shinichi Kudo and the Kyoto Shinsengumi Murder Case", year:2012, type:"drama-special",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Specials#Drama_Specials",
    colors:["#2A1A1A","#E74C3C"], episodeNumber:4,
    still: "https://image.tmdb.org/t/p/w500/nbhbFYOp6VYdVnTXKXG7OLLzn0e.jpg",
    desc:"Live-action drama: Shinichi investigates a murder in Kyoto tied to the Shinsengumi."
  },

  // ═══════════════════════════════════════════════════════
  // WOOO OVAs - Special collaboration episodes
  // ═══════════════════════════════════════════════════════
  {
    id:"wooo1", tmdbEp:22, title:"Wooo OVA 1: Fatuous Detective!? Kogoro Mouri", year:2011, type:"wooo-ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#1A2A3A","#2980B9"], episodeNumber:1,
    still: "https://image.tmdb.org/t/p/w500/wsc27OXYgzJyfH0TBqdRCL92B7I.jpg",
    desc:"Kogoro Mouri finds himself in a seemingly foolish detective situation."
  },
  {
    id:"wooo2", tmdbEp:24, title:"Wooo OVA 2: Television Personality Maomi Yuki's Worries", year:2012, type:"wooo-ova",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/OVAs",
    colors:["#3A2A3A","#8E44AD"], episodeNumber:2,
    still: "https://image.tmdb.org/t/p/w500/scgrZFlZ0pkCokAhyZd4Sgfc4UG.jpg",
    desc:"TV personality Maomi Yuki seeks help with her worries from Conan."
  },

  // ═══════════════════════════════════════════════════════
  // POLICE ACADEMY ARC - Wild Police Story
  // ═══════════════════════════════════════════════════════
  {
    id:"police1", tmdbEp:31, title:"Police Academy Arc: Wild Police Story CASE. Rei Furuya", year:2020, type:"police-academy",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Police_Academy_Arc_Wild_Police_Story_CASE._Rei_Furuya",
    note:"TMDB Ep 31-32 are the same (deduplicated)",
    colors:["#2A1A3A","#9B59B6"], episodeNumber:1,
    still: "https://image.tmdb.org/t/p/w500/eXPBajtrI00td7hy5ZO83ea4Juv.jpg",
    desc:"Focuses on Furuya Rei's police academy days in the Wild Police Story arc."
  },

  // ═══════════════════════════════════════════════════════
  // OTHER SPECIALS
  // ═══════════════════════════════════════════════════════
  {
    id:"komei", tmdbEp:33, title:"Kid vs. Komei: The Targeted Lips", year:2016, type:"recap-special",
    wikiUrl:"https://www.detectiveconanworld.com/wiki/Specials",
    note:"Recap special - uses Episode 983 image from main series",
    useEpisodeStill: 983,
    colors:["#3A1A2A","#9B59B6"], episodeNumber:1,
    still: "https://image.tmdb.org/t/p/w500/9PYBb4JU60g0ewJcLZP1ipV9QdU.jpg",
    desc:"Recap special featuring Kaito Kid vs. Komei with targeted lips."
  }
];

// TMDB episodes to SKIP (not shown as cards):
// TMDB Ep 13: Skip (use Episode 311 image if needed)
// TMDB Ep 28: Remove - do not show
// TMDB Ep 30: Same as Ep 29 (Fugitive continuation)
// TMDB Ep 32: Same as Ep 31 (Police Academy duplicate)

// ─── MAGIC KAITO 1412 ───────────────────────────────────
const MAGIC_KAITO = {
  id:"magickaito1412", tmdb:68573, title:"Magic Kaito 1412", year:2014, type:"series",
  seasons:1, episodes:24,
  colors:["#1A0030","#5C00C7"],
  desc:"When Kaito Kuroba's father dies under mysterious circumstances, he finds out his father's secret identity; a famous international criminal known as International Criminal 1412: the Phantom Thief. He vows to stop the organization from obtaining the Pandora Gem – a jewel that grants immortality.",
  languages:{dub:["English"],sub:["English"]},
  netflix:false, amasiantv:true, availableInIndia:true,
  note:"Available for free on Amasian TV with English dub. Features Kaitou Kid as the main character with occasional Detective Conan crossovers.",
  amasianUrl:"https://amasian.tv/video/series/magic-kaito-1412-eng-dub",
  cast:[
    {character:"Kaito Kuroba / Shinichi Kudo", voice:"Kappei Yamaguchi"},
    {character:"Nakamori Aoko", voice:"Mao Ichimichi"},
    {character:"Conan Edogawa", voice:"Minami Takayama"},
    {character:"Hakuba Saguru", voice:"Mamoru Miyano"},
    {character:"Jii Kounosuke", voice:"Michio Hazama"},
    {character:"Koizumi Akako", voice:"Eri Kitamura"},
    {character:"Konno Erika", voice:"Satsuki Yukino"},
    {character:"Kuroba Chikage", voice:"Michie Tomizawa"},
    {character:"Kuroba Touichi", voice:"Shuichi Ikeda"}
  ]
};

const HERO_SLIDES = [
  {
    title:"30th Anniversary",
    subtitle:"Detective Conan",
    desc:"Celebrating 30 years of mystery, deduction, and thrilling cases. The journey continues with new episodes and movies.",
    img:"https://mysticotaku.com/wp-content/uploads/2025/12/blog_800x450_detective.webp",
    bgColor:"#000000",
    accent:"#CC2233",
    tag:"30 Years · 1994–2024",
    emoji:"🎉",
    ctaLabel:"Explore Content →",
    ctaAction:"Router.navigate('/browse')"
  },
  {
    title:"The Complete India Guide",
    subtitle:"Detective Conan",
    desc:"Every platform. Every language. Every episode and movie available in India — all in one place.",
    img:"https://i.postimg.cc/b86XR0Wv/BBDCI-Logo-use-for-dark-mode.png",
    bgColor:"#000000",
    accent:"#CC2233",
    tag:"India Watch Guide 2025",
    emoji:"🔍",
    imgMode:"contain-right",
    ctaLabel:"Browse All Platforms ↓",
    ctaAction:"scrollToSection('platforms')"
  },
  {
    title:"Hindi Dub Now Available",
    subtitle:"on Anime Times",
    desc:"Episodes 1–97 dubbed in Hindi — stream via Anime Times on Prime Video or Apple TV. Check their Instagram for current offers.",
    img:"https://m.media-amazon.com/images/S/pv-target-images/437090be3baa8904267e6d86c59eeb92bd31cb8e2c22a80e15f6b0bc09f3314c.jpg",
    bgColor:"#000000",
    accent:"#1A98FF",
    tag:"Latest Addition · Anime Times",
    emoji:"🎙️",
    ctaLabel:"Watch on Anime Times →",
    ctaAction:"Router.navigate('/platform/primevideo')"
  },
  {
    title:"26 Movies",
    subtitle:"All on Netflix India",
    desc:"From The Time-Bombed Skyscraper (1997) to The Million Dollar Pentagram (2024) — 26 films with English subs.",
    img:"https://i.postimg.cc/MxskY0N8/sagsfdgsdfhsrzh-ASZgsdbb.jpg",
    bgColor:"#000000",
    accent:"#E50914",
    tag:"Complete Film Collection",
    emoji:"🎬",
    ctaLabel:"View All Movies →",
    ctaAction:"Router.navigate('/movies')"
  },
  {
    title:"12 Language Dubs",
    subtitle:"on ETV Bal Bharat",
    desc:"Watch Detective Conan dubbed in Hindi, Tamil, Telugu, Malayalam, Kannada and 7 more — nightly at 11PM on cable & DTH.",
    img:"https://i.postimg.cc/X32MgKhT/etv-bal-bharat-conan-at-night-11pm.jpg",
    bgColor:"#000000",
    accent:"#FF6B00",
    tag:"TV Broadcast · 12 Dubs",
    imgMode:"contain-right",
    emoji:"🇮🇳",
    ctaLabel:"View Language Guide →",
    ctaAction:"Router.navigate('/languages')"
  },
  {
    title:"600+ Episodes",
    subtitle:"Streaming in India",
    desc:"From Season 1 (1996) all the way to Season 28 — watch across Netflix, Anime Times, Apple TV, and ETV Bal Bharat.",
    img:"https://i.postimg.cc/4Z8C1vqg/Detective-conan-netflix.webp",
    bgColor:"#000000",
    accent:"#27AE60",
    tag:"Sub & Dub Available",
    emoji:"📺",
    ctaLabel:"View TV Seasons →",
    ctaAction:"Router.navigate('/tvshows')"
  }
];
// ─── MANGA ISBNs (Case Closed / Viz Media) ───────────────────────────────
// ISBN-13 for each volume — used to fetch Google Books cover art
const MANGA_ISBNS = {
   1:"9781591163275",   2:"9781591165873",   3:"9781591165897",   4:"9781591166320",
   5:"9781591166337",   6:"9781591168386",   7:"9781591169789",   8:"9781421501116",
   9:"9781421501666",  10:"9781421503165",  11:"9781421504414",  12:"9781421504421",
  13:"9781421504438",  14:"9781421504445",  15:"9781421504452",  16:"9781421508818",
  17:"9781421508825",  18:"9781421508832",  19:"9781421508849",  20:"9781421508856",
  21:"9781421514567",  22:"9781421516745",  23:"9781421516752",  24:"9781421516769",
  25:"9781421516776",  26:"9781421516783",  27:"9781421516790",  28:"9781421521961",
  29:"9781421521978",  30:"9781421521985",  31:"9781421521992",  32:"9781421528847",
  33:"9781421528847",  34:"9781421528854",  35:"9781421528861",  36:"9781421528878",
  37:"9781421528885",  38:"9781421528892",  39:"9781421534992",  40:"9781421535005",
  41:"9781421536071",  42:"9781421536088",  43:"9781421536095",  44:"9781421536101",
  45:"9781421536118",  46:"9781421536125",  47:"9781421536132",  48:"9781421536149",
  49:"9781421555065",  50:"9781421555072",  51:"9781421565071",  52:"9781421565088",
  53:"9781421565095",  54:"9781421565101",  55:"9781421577845",  56:"9781421577845",
  57:"9781421577852",  58:"9781421577869",  59:"9781421583853",  60:"9781421583860",
  61:"9781421586847",  62:"9781421586854",  63:"9781421594446",  64:"9781421594453",
  65:"9781421596891",  66:"9781421597089",  67:"9781421598604",  68:"9781421598611",
  69:"9781421598673",  70:"9781421598680",  71:"9781974706556",  72:"9781974706563",
  73:"9781974709618",  74:"9781974709625",  75:"9781974714957",  76:"9781974717002",
  77:"9781974714964",  78:"9781974720606",  79:"9781974721146",  80:"9781974721153",
  81:"9781974721160",  82:"9781974721177",  83:"9781974729098",  84:"9781974729104",
  85:"9781974732678",  86:"9781974732685",  87:"9781974737437",  88:"9781974740574",
  89:"9781974742820",  90:"9781974743384",  91:"9781974746002",  92:"9781974748969",
  93:"9781974751532",  94:"9781974752393"
};