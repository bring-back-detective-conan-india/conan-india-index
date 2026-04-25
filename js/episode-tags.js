/* ======================================================
   EPISODE-TAGS.JS - Plot Tag System for Episodes
   Source: episode_tags_corrected.json
   Multi-select filter support for plot-based episode discovery
   ====================================================== */

// Tag definitions with descriptions and colors
const TAG_DEFINITIONS = {
  'Black Organization': {
    desc: 'Episodes where the Black Organization is a central or significant plot element.',
    color: '#8B0000',
    icon: 'skull',
    priority: 1
  },
  'FBI': {
    desc: 'Episodes prominently featuring Shuichi Akai, Jodie Starling, James Black, Andre Camel, or FBI operations.',
    color: '#1E3A8A',
    icon: 'shield',
    priority: 2
  },
  'Heiji Hattori': {
    desc: 'Episodes where Heiji Hattori appears as a major character.',
    color: '#166534',
    icon: 'sword',
    priority: 3
  },
  'Kaitou Kid': {
    desc: 'Episodes featuring Kaitou Kid heists or significant appearances.',
    color: '#7C3AED',
    icon: 'hat',
    priority: 4
  },
  'Shinichi/Ran': {
    desc: 'Episodes centered on the Shinichi-Ran romance, Shinichi reverting, near identity-reveals, or key emotional moments.',
    color: '#BE185D',
    icon: 'heart',
    priority: 5
  },
  'Detective Boys': {
    desc: 'Episodes where Ayumi, Genta, Mitsuhiko, and/or Haibara are the central plot focus.',
    color: '#EA580C',
    icon: 'users',
    priority: 6
  },
  'Character Development': {
    desc: 'Canon episodes with significant development for a recurring character.',
    color: '#0891B2',
    icon: 'trending-up',
    priority: 7
  },
  'Character Pasts': {
    desc: 'Episodes that delve substantially into a character\'s backstory or history.',
    color: '#7C2D12',
    icon: 'clock',
    priority: 8
  },
  'New Character': {
    desc: 'Canon episodes introducing a major recurring character for the first time.',
    color: '#059669',
    icon: 'user-plus',
    priority: 9
  }
};

// All available tag keys for iteration
const ALL_TAGS = Object.keys(TAG_DEFINITIONS);

// Episode tag data - Map for O(1) lookup
// Format: episodeNumber -> Set of tags
const EPISODE_TAGS = new Map([
  [1, new Set(['Black Organization', 'New Character', 'Shinichi/Ran', 'Character Development', 'Character Pasts', 'Detective Boys'])],
  [2, new Set(['Shinichi/Ran', 'New Character', 'Character Development'])],
  [5, new Set(['Character Development', 'Black Organization', 'Detective Boys'])],
  [7, new Set(['Shinichi/Ran', 'Character Development'])],
  [12, new Set(['Detective Boys', 'Character Development'])],
  [13, new Set(['Black Organization', 'New Character', 'Character Development'])],
  [20, new Set(['Detective Boys', 'Character Development'])],
  [27, new Set(['Character Development', 'New Character'])],
  [28, new Set(['Character Development'])],
  [32, new Set(['New Character'])],
  [33, new Set(['Character Development', 'Detective Boys'])],
  [34, new Set(['New Character'])],
  [35, new Set(['New Character'])],
  [40, new Set(['Shinichi/Ran'])],
  [42, new Set(['Shinichi/Ran'])],
  [48, new Set(['Heiji Hattori', 'New Character'])],
  [49, new Set(['Heiji Hattori', 'Character Development'])],
  [52, new Set(['Character Development'])],
  [54, new Set(['Black Organization', 'New Character'])],
  [57, new Set(['Heiji Hattori'])],
  [58, new Set(['Heiji Hattori', 'Character Development'])],
  [68, new Set(['Black Organization'])],
  [69, new Set(['Character Development'])],
  [70, new Set(['Character Development'])],
  [76, new Set(['Kaitou Kid', 'New Character', 'Character Development'])],
  [77, new Set(['Heiji Hattori', 'Character Pasts'])],
  [78, new Set(['Heiji Hattori', 'Character Pasts'])],
  [96, new Set(['New Character', 'Character Development'])],
  [98, new Set(['Shinichi/Ran', 'Character Pasts'])],
  [99, new Set(['Shinichi/Ran', 'Character Pasts'])],
  [100, new Set(['Shinichi/Ran'])],
  [101, new Set(['Shinichi/Ran'])],
  [112, new Set(['New Character'])],
  [113, new Set(['Character Development'])],
  [117, new Set(['Heiji Hattori'])],
  [118, new Set(['Heiji Hattori'])],
  [128, new Set(['Black Organization', 'Character Pasts'])],
  [129, new Set(['Black Organization', 'New Character'])],
  [130, new Set(['Character Development'])],
  [131, new Set(['Character Development'])],
  [141, new Set(['Heiji Hattori'])],
  [142, new Set(['Heiji Hattori'])],
  [144, new Set(['Character Development'])],
  [145, new Set(['Character Development'])],
  [146, new Set(['Character Development'])],
  [147, new Set(['Character Development'])],
  [162, new Set(['Kaitou Kid', 'New Character'])],
  [163, new Set(['Kaitou Kid'])],
  [164, new Set(['Kaitou Kid'])],
  [166, new Set(['Heiji Hattori'])],
  [167, new Set(['Heiji Hattori'])],
  [168, new Set(['Heiji Hattori'])],
  [170, new Set(['Character Pasts'])],
  [171, new Set(['Character Pasts'])],
  [172, new Set(['Character Pasts'])],
  [173, new Set(['Character Pasts'])],
  [174, new Set(['Heiji Hattori'])],
  [176, new Set(['Black Organization'])],
  [177, new Set(['Black Organization'])],
  [178, new Set(['Black Organization'])],
  [188, new Set(['Shinichi/Ran', 'Character Development'])],
  [189, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [190, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [191, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [192, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [193, new Set(['Shinichi/Ran'])],
  [199, new Set(['Shinichi/Ran'])],
  [200, new Set(['Shinichi/Ran'])],
  [205, new Set(['Shinichi/Ran'])],
  [206, new Set(['Shinichi/Ran'])],
  [212, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [213, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [217, new Set(['New Character'])],
  [219, new Set(['Kaitou Kid'])],
  [220, new Set(['Kaitou Kid'])],
  [221, new Set(['Heiji Hattori'])],
  [222, new Set(['Heiji Hattori'])],
  [238, new Set(['Heiji Hattori'])],
  [239, new Set(['Heiji Hattori'])],
  [240, new Set(['Heiji Hattori', 'Character Development'])],
  [241, new Set(['Heiji Hattori', 'Character Development'])],
  [263, new Set(['Black Organization', 'New Character'])],
  [264, new Set(['Black Organization', 'Character Development'])],
  [265, new Set(['Black Organization', 'Character Development'])],
  [266, new Set(['Black Organization', 'Character Pasts'])],
  [267, new Set(['Black Organization', 'Character Pasts'])],
  [268, new Set(['Black Organization'])],
  [269, new Set(['Black Organization'])],
  [270, new Set(['Black Organization'])],
  [271, new Set(['Black Organization'])],
  [272, new Set(['Black Organization'])],
  [273, new Set(['Black Organization'])],
  [274, new Set(['Black Organization'])],
  [275, new Set(['Black Organization'])],
  [276, new Set(['Black Organization'])],
  [277, new Set(['Black Organization'])],
  [278, new Set(['Black Organization'])],
  [279, new Set(['Black Organization'])],
  [280, new Set(['Black Organization'])],
  [281, new Set(['Black Organization'])],
  [282, new Set(['Black Organization'])],
  [283, new Set(['Black Organization'])],
  [284, new Set(['Black Organization'])],
  [285, new Set(['Black Organization'])],
  [286, new Set(['Black Organization'])],
  [287, new Set(['Black Organization'])],
  [288, new Set(['Black Organization'])],
  [289, new Set(['Black Organization'])],
  [290, new Set(['Black Organization', 'FBI', 'New Character'])],
  [291, new Set(['Black Organization', 'FBI'])],
  [292, new Set(['Black Organization'])],
  [293, new Set(['Black Organization'])],
  [294, new Set(['Black Organization'])],
  [295, new Set(['Black Organization', 'New Character'])],
  [296, new Set(['Black Organization'])],
  [297, new Set(['Black Organization'])],
  [298, new Set(['Black Organization'])],
  [299, new Set(['Black Organization'])],
  [300, new Set(['Black Organization'])],
  [301, new Set(['Black Organization', 'New Character'])],
  [302, new Set(['Black Organization'])],
  [303, new Set(['Black Organization'])],
  [304, new Set(['Black Organization'])],
  [305, new Set(['Black Organization'])],
  [306, new Set(['Black Organization'])],
  [307, new Set(['Black Organization'])],
  [308, new Set(['Black Organization'])],
  [309, new Set(['Black Organization', 'FBI'])],
  [310, new Set(['Black Organization', 'FBI'])],
  [311, new Set(['Black Organization', 'FBI'])],
  [312, new Set(['Black Organization', 'FBI'])],
  [313, new Set(['Black Organization', 'New Character'])],
  [329, new Set(['Kaitou Kid'])],
  [330, new Set(['Kaitou Kid'])],
  [345, new Set(['Black Organization'])],
  [381, new Set(['Kaitou Kid'])],
  [382, new Set(['Kaitou Kid'])],
  [383, new Set(['Kaitou Kid'])],
  [414, new Set(['Heiji Hattori', 'New Character'])],
  [415, new Set(['Heiji Hattori'])],
  [425, new Set(['Black Organization', 'Character Development'])],
  [449, new Set(['Heiji Hattori'])],
  [450, new Set(['Heiji Hattori'])],
  [462, new Set(['Black Organization'])],
  [463, new Set(['Black Organization'])],
  [464, new Set(['Black Organization'])],
  [465, new Set(['Black Organization'])],
  [484, new Set(['Shinichi/Ran'])],
  [485, new Set(['Shinichi/Ran'])],
  [487, new Set(['Heiji Hattori'])],
  [488, new Set(['Heiji Hattori'])],
  [489, new Set(['Heiji Hattori'])],
  [490, new Set(['Heiji Hattori'])],
  [491, new Set(['Black Organization', 'FBI'])],
  [492, new Set(['Black Organization', 'FBI'])],
  [493, new Set(['Black Organization', 'FBI'])],
  [494, new Set(['Black Organization', 'FBI'])],
  [495, new Set(['Black Organization', 'FBI'])],
  [496, new Set(['Black Organization', 'FBI'])],
  [497, new Set(['Black Organization', 'FBI', 'New Character'])],
  [498, new Set(['Black Organization', 'FBI'])],
  [499, new Set(['Black Organization', 'FBI'])],
  [500, new Set(['Black Organization', 'FBI', 'Character Development'])],
  [504, new Set(['Black Organization', 'FBI'])],
  [505, new Set(['Black Organization', 'FBI'])],
  [507, new Set(['Heiji Hattori'])],
  [508, new Set(['Heiji Hattori'])],
  [509, new Set(['Heiji Hattori', 'New Character'])],
  [510, new Set(['Heiji Hattori'])],
  [511, new Set(['Heiji Hattori'])],
  [512, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [513, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [519, new Set(['Black Organization', 'New Character'])],
  [521, new Set(['Black Organization', 'FBI'])],
  [522, new Set(['Black Organization', 'FBI'])],
  [523, new Set(['Black Organization', 'FBI', 'Character Development'])],
  [538, new Set(['Black Organization', 'FBI'])],
  [539, new Set(['Black Organization', 'FBI'])],
  [540, new Set(['Black Organization', 'FBI'])],
  [541, new Set(['Black Organization', 'FBI'])],
  [542, new Set(['Black Organization', 'FBI', 'Character Development'])],
  [558, new Set(['Heiji Hattori'])],
  [559, new Set(['Heiji Hattori'])],
  [562, new Set(['Kaitou Kid'])],
  [563, new Set(['Kaitou Kid'])],
  [564, new Set(['Kaitou Kid'])],
  [565, new Set(['Kaitou Kid'])],
  [566, new Set(['Kaitou Kid'])],
  [609, new Set(['New Character'])],
  [610, new Set(['Black Organization', 'New Character'])],
  [611, new Set(['Black Organization', 'FBI', 'New Character', 'Character Pasts'])],
  [612, new Set(['Black Organization', 'FBI', 'New Character', 'Character Pasts'])],
  [613, new Set(['Black Organization', 'FBI', 'New Character', 'Character Pasts'])],
  [614, new Set(['Black Organization', 'FBI'])],
  [615, new Set(['Black Organization', 'FBI'])],
  [617, new Set(['Black Organization', 'New Character'])],
  [618, new Set(['Black Organization', 'FBI'])],
  [624, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [625, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [633, new Set(['Heiji Hattori', 'Character Pasts'])],
  [634, new Set(['Heiji Hattori', 'Character Pasts'])],
  [651, new Set(['Kaitou Kid'])],
  [652, new Set(['Kaitou Kid'])],
  [667, new Set(['Character Development'])],
  [668, new Set(['Character Development'])],
  [690, new Set(['Heiji Hattori'])],
  [691, new Set(['Heiji Hattori'])],
  [701, new Set(['Black Organization', 'FBI'])],
  [702, new Set(['Black Organization', 'FBI'])],
  [712, new Set(['Heiji Hattori'])],
  [713, new Set(['Heiji Hattori'])],
  [719, new Set(['Kaitou Kid'])],
  [720, new Set(['Kaitou Kid'])],
  [721, new Set(['Kaitou Kid'])],
  [763, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [764, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [779, new Set(['Black Organization', 'FBI', 'Character Development'])],
  [780, new Set(['Black Organization', 'FBI'])],
  [783, new Set(['Heiji Hattori'])],
  [784, new Set(['Heiji Hattori'])],
  [804, new Set(['Kaitou Kid'])],
  [805, new Set(['Kaitou Kid'])],
  [816, new Set(['Heiji Hattori'])],
  [817, new Set(['Heiji Hattori'])],
  [818, new Set(['Heiji Hattori'])],
  [821, new Set(['Heiji Hattori'])],
  [822, new Set(['Heiji Hattori'])],
  [836, new Set(['Shinichi/Ran', 'Character Development'])],
  [863, new Set(['Kaitou Kid'])],
  [864, new Set(['Kaitou Kid'])],
  [916, new Set(['Heiji Hattori', 'Character Development'])],
  [917, new Set(['Heiji Hattori', 'Character Development'])],
  [921, new Set(['Kaitou Kid'])],
  [922, new Set(['Kaitou Kid'])],
  [936, new Set(['Heiji Hattori'])],
  [937, new Set(['Heiji Hattori'])],
  [938, new Set(['Heiji Hattori'])],
  [953, new Set(['Shinichi/Ran', 'Character Development'])],
  [954, new Set(['Shinichi/Ran', 'Character Development'])],
  [983, new Set(['Heiji Hattori'])],
  [984, new Set(['Heiji Hattori', 'Kaitou Kid'])],
  [995, new Set(['Black Organization'])],
  [1000, new Set(['Character Pasts'])],
  [1001, new Set(['Character Pasts'])],
  [1004, new Set(['Black Organization'])],
  [1005, new Set(['Black Organization'])],
  [1011, new Set(['Character Pasts'])],
  [1012, new Set(['Character Pasts'])],
  [1018, new Set(['Black Organization', 'Heiji Hattori'])],
  [1019, new Set(['Black Organization', 'Heiji Hattori'])],
  [1020, new Set(['Heiji Hattori'])],
  [1024, new Set(['Heiji Hattori', 'New Character'])],
  [1025, new Set(['Heiji Hattori', 'Black Organization', 'New Character'])],
  [1029, new Set(['Character Pasts'])],
  [1033, new Set(['Heiji Hattori', 'Black Organization'])],
  [1034, new Set(['Black Organization'])],
  [1035, new Set(['Heiji Hattori', 'Black Organization'])],
  [1038, new Set(['Character Pasts'])],
  [1042, new Set(['Character Pasts'])],
  [1045, new Set(['Black Organization'])],
  [1046, new Set(['Black Organization'])],
  [1052, new Set(['Detective Boys'])],
  [1061, new Set(['Character Pasts'])],
  [1068, new Set(['Detective Boys', 'Character Development'])],
  [1072, new Set(['Black Organization'])],
  [1077, new Set(['Black Organization', 'FBI'])],
  [1078, new Set(['Black Organization', 'FBI'])],
  [1079, new Set(['Black Organization', 'FBI'])],
  [1080, new Set(['Black Organization'])],
  [1085, new Set(['Heiji Hattori', 'Character Development'])],
  [1086, new Set(['Heiji Hattori', 'Character Development'])],
  [1087, new Set(['Detective Boys'])],
  [1093, new Set(['Character Pasts', 'Black Organization'])],
  [1094, new Set(['Character Pasts', 'Black Organization'])],
  [1096, new Set(['Detective Boys', 'Character Development'])],
  [1098, new Set(['Character Pasts'])],
  [1099, new Set(['Character Pasts'])],
  [1105, new Set(['Kaitou Kid', 'New Character'])],
  [1106, new Set(['Kaitou Kid', 'New Character'])],
  [1109, new Set(['Character Pasts', 'Character Development'])],
  [1110, new Set(['Character Pasts', 'Character Development'])],
  [1115, new Set(['Character Pasts'])],
  [1116, new Set(['Character Pasts'])],
  [1125, new Set(['Detective Boys'])],
  [1130, new Set(['Character Pasts'])],
  [1131, new Set(['Character Pasts'])],
  [1132, new Set(['Detective Boys', 'Character Development'])],
  [1135, new Set(['Heiji Hattori', 'Character Development'])],
  [1136, new Set(['Heiji Hattori', 'Character Development'])],
  [1141, new Set(['Black Organization'])],
  [1144, new Set(['Black Organization', 'FBI'])],
  [1145, new Set(['Black Organization', 'FBI'])],
  [1148, new Set(['Detective Boys', 'New Character'])],
  [1149, new Set(['Detective Boys', 'New Character'])],
  [1150, new Set(['Kaitou Kid'])],
  [1151, new Set(['Kaitou Kid'])],
  [1158, new Set(['Detective Boys'])],
  [1162, new Set(['Detective Boys'])],
  [1164, new Set(['Black Organization', 'Character Pasts'])],
  [1165, new Set(['Black Organization', 'Character Pasts'])],
  [1166, new Set(['Black Organization', 'Character Pasts'])],
  [1167, new Set(['Black Organization', 'Character Pasts'])],
  [1168, new Set(['Detective Boys'])],
  [1171, new Set(['Heiji Hattori', 'Character Pasts'])],
  [1172, new Set(['Heiji Hattori', 'Character Pasts'])],
  [1178, new Set(['Heiji Hattori'])],
  [1179, new Set(['Heiji Hattori'])],
  [1183, new Set(['Character Development'])],
  [1184, new Set(['New Character'])],
  [1185, new Set(['New Character'])],
  [1187, new Set(['Shinichi/Ran', 'Character Pasts'])],
  [1188, new Set(['Character Development'])],
  [1190, new Set(['Shinichi/Ran'])],
  [1191, new Set(['Shinichi/Ran'])],
  [1192, new Set(['Detective Boys'])],
  [1193, new Set(['Kaitou Kid'])],
  [1194, new Set(['Kaitou Kid'])],
  [1199, new Set(['Detective Boys'])],
]);

// =======================================================
// MOVIE TAGS - Cross-referenced with Detective Conan World Wiki
// =======================================================
const MOVIE_TAGS = new Map([
  [1, new Set(['Shinichi/Ran', 'Character Development'])],    // The Time-Bombed Skyscraper - Ran/red string of fate
  [2, new Set(['Character Pasts', 'Character Development'])],     // The Fourteenth Target - Ran's parents restaurant
  [3, new Set(['Kaitou Kid', 'Heiji Hattori', 'New Character'])], // The Last Wizard of the Century - First Kid movie, Heiji appears!
  [4, new Set(['Shinichi/Ran', 'Character Pasts'])],            // Captured in Her Eyes - Ran amnesia case
  [5, new Set(['Detective Boys', 'Character Development'])],      // Countdown to Heaven
  [6, new Set(['Character Development', 'Detective Boys'])],    // The Phantom of Baker Street - Sherlock Holmes VR
  [7, new Set(['Heiji Hattori', 'Character Development', 'Shinichi/Ran'])], // Crossroad in the Ancient Capital - Heiji's first love
  [8, new Set(['Kaitou Kid'])],                                 // Magician of the Silver Sky - Airplane heist
  [9, new Set(['Detective Boys'])],                             // Strategy Above the Depths - Cruise ship
  [10, new Set(['Kaitou Kid', 'Heiji Hattori'])],               // The Private Eyes' Requiem
  [11, new Set(['Character Development'])],                     // Jolly Roger in the Deep Azure
  [12, new Set(['Character Development'])],                     // Full Score of Fear
  [13, new Set(['Black Organization', 'Character Development'])], // The Raven Chaser - BO returns, Irish introduced
  [14, new Set(['Kaitou Kid'])],                                // The Lost Ship in the Sky - Airship heist
  [15, new Set(['Character Development'])],                     // Quarter of Silence
  [16, new Set(['Character Development'])],                     // The Eleventh Striker
  [17, new Set(['Detective Boys', 'Character Development'])],   // Private Eye in the Distant Sea
  [18, new Set(['FBI', 'Character Development'])],              // Dimensional Sniper - Shuichi Akai center stage
  [19, new Set(['Kaitou Kid'])],                                // Sunflowers of Inferno - Van Gogh painting
  [20, new Set(['Black Organization', 'FBI', 'New Character'])], // The Darkest Nightmare - Curaçao, Rum's agent
  [21, new Set(['Heiji Hattori', 'Character Development', 'Shinichi/Ran'])], // The Crimson Love Letter - Heiji/Kazuha, karuta
  [22, new Set(['FBI', 'Character Development'])],              // Zero the Enforcer - Amuro/Zero focus
  [23, new Set(['Kaitou Kid', 'Heiji Hattori'])],               // The Fist of Blue Sapphire - Singapore
  [24, new Set(['FBI', 'Character Development'])],              // The Scarlet Bullet - FBI major story
  [25, new Set(['FBI', 'Character Development'])],              // The Bride of Halloween - Takagi/Sato wedding
  [26, new Set(['Black Organization', 'FBI', 'Detective Boys'])], // Black Iron Submarine - Haibara/Pinga, PSB
  [27, new Set(['Heiji Hattori', 'Kaitou Kid', 'Shinichi/Ran'])], // The Million-dollar Pentagram - Hakodate
  [28, new Set(['FBI', 'Character Pasts'])],                    // One-eyed Flashback - Yamato Kansuke backstory
  [29, new Set(['FBI', 'Character Development', 'New Character'])], // Fallen Angel of the Highway - Chihaya Hagiwara
]);

// =======================================================
// OVA TAGS - Cross-referenced with Detective Conan World Wiki
// =======================================================
const OVA_TAGS = new Map([
  // REGULAR OVAs (Secret File Vol.1-4)
  [1, new Set(['Kaitou Kid', 'Detective Boys'])],              // Conan vs. Kid vs. Yaiba - The Grand Battle for the Treasure Sword!!
  [2, new Set(['Character Development'])],                      // 16 Suspects!? - Mystery at Shinichi's house
  [3, new Set(['Heiji Hattori', 'Character Development'])],   // Conan, Heiji, and the Vanished Boy
  [4, new Set(['Kaitou Kid', 'Detective Boys'])],             // Conan, Kid, and the Crystal Mother
  [5, new Set(['Detective Boys'])],                           // The Target is Kogoro!! The Detective Boys' Secret Report
  [6, new Set(['Heiji Hattori', 'Kaitou Kid'])],              // Follow the Vanished Diamond! Conan & Heiji vs. Kid!
  [7, new Set(['Detective Boys'])],                           // A Challenge from Agasa! Agasa vs. Conan and the Detective Boys
  [8, new Set(['Character Development'])],                   // The Casebook of Female High-School Detective Sonoko Suzuki
  [9, new Set(['Shinichi/Ran', 'Character Pasts'])],        // The Stranger from Ten Years Later - Future/Ran focus
  [10, new Set(['Kaitou Kid'])],                              // Kid in Trap Island
  [11, new Set(['Character Development'])],                   // A Secret Order From London
  [12, new Set(['Character Development'])],                   // The Miracle of Excalibur
  
  // TV SPECIALS / OVA HYBRIDS
  [13, new Set(['New Character', 'Shinichi/Ran', 'Black Organization', 'Character Pasts'])], // Episode "ONE" - The Great Detective Turned Small (ORIGIN)
  [14, new Set(['Black Organization', 'FBI', 'Character Development'])], // Amuro Secret Call - Toru Amuro/Bourbon focus
  [15, new Set(['Shinichi/Ran'])],                            // The Disappearance of Conan Edogawa: The Worst Two Days in History
  [16, new Set(['Heiji Hattori', 'Character Development'])],  // Heiji Hattori vs. Kazuha Toyama
  [17, new Set(['Heiji Hattori'])],                           // The Satsuma Temple Mystery
  [18, new Set(['Heiji Hattori'])],                           // The Mystery of the Vanishing Haunted House
  
  // MAGIC FILE SERIES (Movie tie-ins)
  [19, new Set(['Detective Boys', 'Character Development'])], // Big Adventure in the Eccentric Mansion
  [20, new Set(['Detective Boys'])],                          // The Great Dog Spirit Quest
  [21, new Set(['Detective Boys'])],                          // The Mysterious Sniper Murder Case
  [22, new Set(['Character Development'])],                  // Love Story at Police Headquarters ~Wedding Eve~
  [23, new Set(['Kaitou Kid'])],                              // The Great London Adventure
  [24, new Set(['Kaitou Kid'])],                              // Kid's Phantom Thief Gathering
  
  // BLACK HISTORY SPECIALS
  [25, new Set(['Black Organization', 'FBI', 'Character Pasts'])], // Black History - BO/FBI recap special (Clash of Red and Black)
  [26, new Set(['Black Organization', 'FBI'])],                // Black History 2
  
  // MAGIC FILE / BONUS FILE
  [27, new Set(['Detective Boys'])],                         // Magic File series
  [28, new Set(['Detective Boys'])],
  [29, new Set(['Detective Boys'])],
  [30, new Set(['Detective Boys'])],
  [31, new Set(['Detective Boys'])],
  [32, new Set(['Detective Boys'])],
  [33, new Set(['Detective Boys'])],
]);

// =======================================================
// MAGIC KAITO 1412 EPISODE TAGS
// =======================================================
const KAITO_TAGS = new Map([
  [1, new Set(['Character Pasts', 'New Character'])],           // Origin story
  [2, new Set(['Character Development'])],
  [3, new Set(['Character Development'])],
  [4, new Set(['Character Development'])],
  [5, new Set(['Character Development'])],
  [6, new Set(['Character Development'])],
  [7, new Set(['Character Development'])],
  [8, new Set(['Character Development'])],
  [9, new Set(['Character Development'])],
  [10, new Set(['Character Development'])],
  [11, new Set(['Character Development'])],
  [12, new Set(['Shinichi/Ran'])],                             // Conan crossover
  [13, new Set(['Character Development'])],
  [14, new Set(['Character Development'])],
  [15, new Set(['Character Development'])],
  [16, new Set(['Character Development'])],
  [17, new Set(['Character Development'])],
  [18, new Set(['Character Development'])],
  [19, new Set(['Character Development'])],
  [20, new Set(['Shinichi/Ran'])],                             // Conan crossover
  [21, new Set(['Character Development'])],
  [22, new Set(['Character Development'])],
  [23, new Set(['Character Development'])],
  [24, new Set(['Character Development', 'Character Pasts'])],   // Finale
]);

// =======================================================
// UNIFIED CONTENT TYPE HELPERS
// =======================================================

/**
 * Get content type identifier
 * @param {string} type - 'episode', 'movie', 'ova', 'kaito'
 * @param {number|string} id - Content ID/number
 * @returns {string} Unified content key
 */
function getContentKey(type, id) {
  return `${type}-${id}`;
}

/**
 * Get tags for any content type
 * @param {string} type - 'episode', 'movie', 'ova', 'kaito'
 * @param {number|string} id - Content ID
 * @returns {Set<string>} Set of tag names
 */
function getContentTags(type, id) {
  switch (type) {
    case 'episode': return EPISODE_TAGS.get(id) || new Set();
    case 'movie': return MOVIE_TAGS.get(id) || new Set();
    case 'ova': return OVA_TAGS.get(id) || new Set();
    case 'kaito': return KAITO_TAGS.get(id) || new Set();
    default: return new Set();
  }
}

/**
 * Check if any content has a specific tag
 * @param {string} type - Content type
 * @param {number|string} id - Content ID
 * @param {string} tag - Tag name
 * @returns {boolean}
 */
function contentHasTag(type, id, tag) {
  const tags = getContentTags(type, id);
  return tags.has(tag);
}

/**
 * Get all content IDs of a specific type that have a tag
 * @param {string} type - Content type
 * @param {string} tag - Tag name
 * @returns {Array} Array of content IDs
 */
function getContentByTag(type, tag) {
  let sourceMap;
  switch (type) {
    case 'episode': sourceMap = EPISODE_TAGS; break;
    case 'movie': sourceMap = MOVIE_TAGS; break;
    case 'ova': sourceMap = OVA_TAGS; break;
    case 'kaito': sourceMap = KAITO_TAGS; break;
    default: return [];
  }
  
  const results = [];
  for (const [id, tags] of sourceMap) {
    if (tags.has(tag)) results.push(id);
  }
  return results.sort((a, b) => a - b);
}

/**
 * Get ALL content across types matching a tag
 * @param {string} tag - Tag name
 * @returns {Object} Object with arrays per content type
 */
function getAllContentByTag(tag) {
  return {
    episodes: getContentByTag('episode', tag),
    movies: getContentByTag('movie', tag),
    ovas: getContentByTag('ova', tag),
    kaito: getContentByTag('kaito', tag)
  };
}

// =======================================================
// LEGACY EPISODE-SPECIFIC HELPERS (maintained for compatibility)
// =======================================================

/**
 * Get tags for a specific episode
 * @param {number} episodeNum - Episode number
 * @returns {Set<string>} Set of tag names
 */
function getEpisodeTags(episodeNum) {
  return EPISODE_TAGS.get(episodeNum) || new Set();
}

/**
 * Check if episode has a specific tag
 * @param {number} episodeNum - Episode number
 * @param {string} tag - Tag name to check
 * @returns {boolean}
 */
function episodeHasTag(episodeNum, tag) {
  const tags = EPISODE_TAGS.get(episodeNum);
  return tags ? tags.has(tag) : false;
}

/**
 * Get all episodes that have a specific tag
 * @param {string} tag - Tag name
 * @returns {number[]} Array of episode numbers
 */
function getEpisodesByTag(tag) {
  const episodes = [];
  for (const [epNum, tags] of EPISODE_TAGS) {
    if (tags.has(tag)) episodes.push(epNum);
  }
  return episodes.sort((a, b) => a - b);
}

/**
 * Get episodes matching ALL selected tags (AND logic)
 * @param {string[]} selectedTags - Array of tag names
 * @returns {number[]} Array of episode numbers
 */
function getEpisodesByAllTags(selectedTags) {
  if (!selectedTags || selectedTags.length === 0) return [];
  
  const episodes = [];
  for (const [epNum, tags] of EPISODE_TAGS) {
    const hasAll = selectedTags.every(tag => tags.has(tag));
    if (hasAll) episodes.push(epNum);
  }
  return episodes.sort((a, b) => a - b);
}

/**
 * Get episodes matching ANY selected tags (OR logic)
 * @param {string[]} selectedTags - Array of tag names
 * @returns {number[]} Array of episode numbers
 */
function getEpisodesByAnyTags(selectedTags) {
  if (!selectedTags || selectedTags.length === 0) return [];
  
  const episodes = [];
  for (const [epNum, tags] of EPISODE_TAGS) {
    const hasAny = selectedTags.some(tag => tags.has(tag));
    if (hasAny) episodes.push(epNum);
  }
  return episodes.sort((a, b) => a - b);
}

/**
 * Get tag statistics - count of episodes per tag
 * @returns {Object} Tag -> count mapping
 */
function getTagStats() {
  const stats = {};
  for (const tag of ALL_TAGS) {
    stats[tag] = getEpisodesByTag(tag).length;
  }
  return stats;
}

/**
 * Enrich episode object with tags
 * @param {Object} episode - Episode object
 * @returns {Object} Episode with tags array added
 */
function enrichEpisodeWithTags(episode) {
  const tags = getEpisodeTags(episode.ep || episode.n);
  return {
    ...episode,
    tags: Array.from(tags),
    hasTags: tags.size > 0
  };
}

/**
 * Filter episodes by tags with AND/OR logic
 * @param {Object[]} episodes - Array of episode objects
 * @param {string[]} selectedTags - Selected tags
 * @param {string} logic - 'AND' or 'OR'
 * @returns {Object[]} Filtered episodes
 */
function filterEpisodesByTags(episodes, selectedTags, logic = 'OR') {
  if (!selectedTags || selectedTags.length === 0) return episodes;
  
  return episodes.filter(ep => {
    const epTags = getEpisodeTags(ep.ep || ep.n);
    if (logic === 'AND') {
      return selectedTags.every(tag => epTags.has(tag));
    }
    return selectedTags.some(tag => epTags.has(tag));
  });
}

// Total tagged content counts
const TOTAL_TAGGED_EPISODES = EPISODE_TAGS.size;
const TOTAL_TAGGED_MOVIES = MOVIE_TAGS.size;
const TOTAL_TAGGED_OVAS = OVA_TAGS.size;
const TOTAL_TAGGED_KAITO = KAITO_TAGS.size;
const TOTAL_ALL_TAGGED = TOTAL_TAGGED_EPISODES + TOTAL_TAGGED_MOVIES + TOTAL_TAGGED_OVAS + TOTAL_TAGGED_KAITO;

console.log(`[ContentTags] Cross-referenced with Detective Conan World Wiki`);
console.log(`[ContentTags] Loaded ${TOTAL_ALL_TAGGED} tagged items:`);
console.log(`  - TV Episodes: ${TOTAL_TAGGED_EPISODES} (1-1199)`);
console.log(`  - Movies: ${TOTAL_TAGGED_MOVIES} (1-29)`);
console.log(`  - OVAs: ${TOTAL_TAGGED_OVAS} (1-33 + Specials)`);
console.log(`  - Magic Kaito: ${TOTAL_TAGGED_KAITO} (1-24)`);
console.log(`  - Plot Categories: ${ALL_TAGS.length}`);
console.log(`[ContentTags] Source: https://www.detectiveconanworld.com/wiki/`);

// =======================================================
// UNIFIED MULTI-CONTENT FILTERING
// =======================================================

/**
 * Filter ANY content type by tags with AND/OR logic
 * @param {string} type - 'episode', 'movie', 'ova', 'kaito'
 * @param {string[]} selectedTags - Selected tags
 * @param {string} logic - 'AND' or 'OR'
 * @returns {Array} Matching content IDs
 */
function filterContentByTags(type, selectedTags, logic = 'OR') {
  if (!selectedTags || selectedTags.length === 0) {
    // Return all IDs of this type
    const sourceMap = { episode: EPISODE_TAGS, movie: MOVIE_TAGS, ova: OVA_TAGS, kaito: KAITO_TAGS }[type];
    return sourceMap ? [...sourceMap.keys()].sort((a, b) => a - b) : [];
  }
  
  const sourceMap = { episode: EPISODE_TAGS, movie: MOVIE_TAGS, ova: OVA_TAGS, kaito: KAITO_TAGS }[type];
  if (!sourceMap) return [];
  
  const results = [];
  for (const [id, tags] of sourceMap) {
    const matches = logic === 'AND'
      ? selectedTags.every(tag => tags.has(tag))
      : selectedTags.some(tag => tags.has(tag));
    if (matches) results.push(id);
  }
  return results.sort((a, b) => a - b);
}

/**
 * Filter ALL content types by tags
 * @param {string[]} selectedTags - Selected tags
 * @param {string} logic - 'AND' or 'OR'
 * @returns {Object} Results per content type
 */
function filterAllContentByTags(selectedTags, logic = 'OR') {
  return {
    episodes: filterContentByTags('episode', selectedTags, logic),
    movies: filterContentByTags('movie', selectedTags, logic),
    ovas: filterContentByTags('ova', selectedTags, logic),
    kaito: filterContentByTags('kaito', selectedTags, logic)
  };
}

/**
 * Get total count of matches from filter results
 * @param {Object} filterResults - Results from filterAllContentByTags
 * @returns {number} Total matches
 */
function getTotalMatches(filterResults) {
  return filterResults.episodes.length + 
         filterResults.movies.length + 
         filterResults.ovas.length + 
         filterResults.kaito.length;
}

window.TAG_DEFINITIONS = TAG_DEFINITIONS;
window.ALL_TAGS = ALL_TAGS;
window.MOVIE_TAGS = MOVIE_TAGS;
window.OVA_TAGS = OVA_TAGS;
window.KAITO_TAGS = KAITO_TAGS;
window.EPISODE_TAGS = EPISODE_TAGS;
window.getContentTags = getContentTags;
window.contentHasTag = contentHasTag;
window.getContentByTag = getContentByTag;
window.getAllContentByTag = getAllContentByTag;
window.getEpisodeTags = getEpisodeTags;
window.episodeHasTag = episodeHasTag;
window.getEpisodesByTag = getEpisodesByTag;
window.getEpisodesByAllTags = getEpisodesByAllTags;
window.getEpisodesByAnyTags = getEpisodesByAnyTags;
window.getTagStats = getTagStats;
window.enrichEpisodeWithTags = enrichEpisodeWithTags;
window.filterEpisodesByTags = filterEpisodesByTags;
window.filterContentByTags = filterContentByTags;
window.filterAllContentByTags = filterAllContentByTags;
window.getTotalMatches = getTotalMatches;
