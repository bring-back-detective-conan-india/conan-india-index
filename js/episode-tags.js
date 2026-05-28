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

// Expose globals for app.js
window.TAG_DEFINITIONS = TAG_DEFINITIONS;
window.ALL_TAGS = ALL_TAGS;

// Episode tag data - Map for O(1) lookup
// Format: episodeNumber -> Set of tags
// Source: episode_tags_corrected.json (last updated 2026-04-25, covers eps 1-1199)
const EPISODE_TAGS = new Map([
  [1, new Set(['Black Organization', 'Shinichi/Ran', 'Detective Boys', 'Character Development', 'Character Pasts', 'New Character'])],
  [2, new Set(['Shinichi/Ran', 'Character Development', 'New Character'])],
  [3, new Set(['Detective Boys', 'Character Development', 'New Character'])],
  [4, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [5, new Set(['Black Organization', 'Detective Boys', 'Character Development'])],
  [6, new Set(['Shinichi/Ran', 'Character Development', 'New Character'])],
  [7, new Set(['Character Development'])],
  [8, new Set(['Detective Boys', 'New Character'])],
  [9, new Set(['New Character'])],
  [10, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development', 'New Character'])],
  [11, new Set(['Character Development'])],
  [12, new Set(['Detective Boys', 'Character Development'])],
  [13, new Set(['Black Organization', 'Character Development', 'New Character'])],
  [14, new Set(['Detective Boys'])],
  [15, new Set(['Detective Boys'])],
  [16, new Set(['Shinichi/Ran', 'Character Development'])],
  [17, new Set(['Detective Boys'])],
  [18, new Set(['New Character'])],
  [19, new Set(['New Character'])],
  [20, new Set(['Detective Boys', 'Character Development'])],
  [21, new Set(['New Character'])],
  [22, new Set(['New Character'])],
  [23, new Set(['New Character'])],
  [27, new Set(['Character Development', 'New Character'])],
  [28, new Set(['Character Development'])],
  [29, new Set(['Character Development'])],
  [32, new Set(['New Character'])],
  [33, new Set(['Detective Boys', 'Character Development'])],
  [34, new Set(['New Character'])],
  [36, new Set(['Detective Boys'])],
  [39, new Set(['New Character'])],
  [40, new Set(['Shinichi/Ran'])],
  [41, new Set(['Shinichi/Ran'])],
  [42, new Set(['Shinichi/Ran'])],
  [43, new Set(['New Character'])],
  [44, new Set(['New Character'])],
  [48, new Set(['Heiji Hattori', 'New Character'])],
  [49, new Set(['Heiji Hattori', 'Character Development'])],
  [50, new Set(['Detective Boys', 'Character Development'])],
  [51, new Set(['Character Development'])],
  [52, new Set(['Character Development'])],
  [54, new Set(['Black Organization', 'New Character'])],
  [57, new Set(['Heiji Hattori'])],
  [58, new Set(['Heiji Hattori', 'Character Development'])],
  [59, new Set(['Detective Boys'])],
  [60, new Set(['Character Development'])],
  [63, new Set(['Detective Boys', 'New Character'])],
  [65, new Set(['New Character'])],
  [68, new Set(['Character Development'])],
  [70, new Set(['Character Development'])],
  [72, new Set(['New Character'])],
  [73, new Set(['Detective Boys'])],
  [74, new Set(['New Character'])],
  [75, new Set(['New Character'])],
  [76, new Set(['Kaitou Kid', 'Character Development', 'New Character'])],
  [77, new Set(['Heiji Hattori', 'Character Pasts'])],
  [78, new Set(['Heiji Hattori', 'Character Pasts'])],
  [80, new Set(['Detective Boys'])],
  [81, new Set(['Detective Boys', 'Character Development', 'New Character'])],
  [82, new Set(['Detective Boys'])],
  [84, new Set(['Character Development', 'New Character'])],
  [85, new Set(['Character Development'])],
  [86, new Set(['Detective Boys', 'Character Development'])],
  [88, new Set(['Character Development'])],
  [91, new Set(['Detective Boys'])],
  [96, new Set(['Character Development', 'New Character'])],
  [98, new Set(['New Character'])],
  [101, new Set(['Shinichi/Ran'])],
  [104, new Set(['New Character'])],
  [107, new Set(['Detective Boys'])],
  [108, new Set(['Detective Boys'])],
  [109, new Set(['Detective Boys'])],
  [112, new Set(['Detective Boys', 'New Character'])],
  [116, new Set(['New Character'])],
  [117, new Set(['Heiji Hattori'])],
  [118, new Set(['Heiji Hattori', 'New Character'])],
  [119, new Set(['Detective Boys'])],
  [123, new Set(['Detective Boys'])],
  [126, new Set(['Detective Boys', 'New Character'])],
  [127, new Set(['Detective Boys'])],
  [128, new Set(['Black Organization', 'Character Development', 'New Character'])],
  [129, new Set(['Black Organization', 'Detective Boys', 'Character Development', 'Character Pasts', 'New Character'])],
  [130, new Set(['Detective Boys', 'New Character'])],
  [131, new Set(['Detective Boys'])],
  [132, new Set(['Kaitou Kid'])],
  [134, new Set(['Kaitou Kid'])],
  [135, new Set(['Detective Boys'])],
  [136, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [137, new Set(['Detective Boys'])],
  [138, new Set(['Detective Boys', 'New Character'])],
  [139, new Set(['Detective Boys'])],
  [140, new Set(['Detective Boys'])],
  [141, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [142, new Set(['Heiji Hattori'])],
  [146, new Set(['Shinichi/Ran', 'Character Development', 'New Character'])],
  [147, new Set(['Shinichi/Ran'])],
  [148, new Set(['Detective Boys'])],
  [149, new Set(['Shinichi/Ran'])],
  [150, new Set(['Character Pasts', 'New Character'])],
  [151, new Set(['Character Development', 'Character Pasts'])],
  [152, new Set(['New Character'])],
  [153, new Set(['New Character'])],
  [154, new Set(['Shinichi/Ran', 'Character Development'])],
  [156, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [157, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [158, new Set(['Detective Boys'])],
  [162, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development', 'Character Pasts'])],
  [163, new Set(['Detective Boys'])],
  [164, new Set(['Detective Boys'])],
  [165, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [166, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [167, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [168, new Set(['Heiji Hattori'])],
  [170, new Set(['Shinichi/Ran', 'Character Development', 'New Character'])],
  [171, new Set(['Shinichi/Ran'])],
  [173, new Set(['Shinichi/Ran'])],
  [174, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development', 'Character Pasts'])],
  [176, new Set(['Black Organization', 'Character Pasts', 'New Character'])],
  [177, new Set(['Black Organization'])],
  [178, new Set(['Black Organization', 'Character Pasts'])],
  [179, new Set(['Detective Boys'])],
  [182, new Set(['Detective Boys'])],
  [183, new Set(['Detective Boys'])],
  [188, new Set(['Detective Boys', 'Character Development'])],
  [189, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [190, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [191, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [192, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys'])],
  [193, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [194, new Set(['Detective Boys', 'Character Development'])],
  [195, new Set(['Detective Boys'])],
  [196, new Set(['Character Development'])],
  [199, new Set(['Shinichi/Ran'])],
  [200, new Set(['Shinichi/Ran', 'Character Development'])],
  [205, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development', 'Character Pasts', 'New Character'])],
  [206, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development', 'Character Pasts'])],
  [209, new Set(['Detective Boys'])],
  [212, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys'])],
  [213, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [217, new Set(['Shinichi/Ran', 'Character Development', 'Character Pasts'])],
  [218, new Set(['Shinichi/Ran', 'Character Development', 'Character Pasts', 'New Character'])],
  [219, new Set(['Kaitou Kid', 'Character Pasts', 'New Character'])],
  [220, new Set(['New Character'])],
  [221, new Set(['Heiji Hattori', 'Character Development'])],
  [222, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [223, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [224, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [225, new Set(['Detective Boys'])],
  [226, new Set(['Heiji Hattori', 'Character Development', 'New Character'])],
  [227, new Set(['Heiji Hattori', 'Character Development'])],
  [228, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [229, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [230, new Set(['Black Organization', 'Detective Boys', 'Character Development', 'Character Pasts', 'New Character'])],
  [231, new Set(['Black Organization', 'Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [233, new Set(['Detective Boys', 'Character Development'])],
  [234, new Set(['Detective Boys'])],
  [238, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development', 'Character Pasts'])],
  [239, new Set(['Heiji Hattori', 'Character Development'])],
  [240, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [241, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [242, new Set(['Detective Boys', 'Character Development'])],
  [246, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [247, new Set(['Heiji Hattori', 'Detective Boys', 'Character Development'])],
  [249, new Set(['Heiji Hattori', 'Shinichi/Ran', 'New Character'])],
  [250, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [252, new Set(['Detective Boys'])],
  [253, new Set(['Shinichi/Ran', 'Character Development'])],
  [254, new Set(['Shinichi/Ran', 'Character Development'])],
  [255, new Set(['Shinichi/Ran'])],
  [257, new Set(['Detective Boys'])],
  [258, new Set(['Detective Boys', 'Character Development', 'New Character'])],
  [259, new Set(['Detective Boys', 'Character Development'])],
  [261, new Set(['Detective Boys', 'Character Development'])],
  [263, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [264, new Set(['Shinichi/Ran', 'Character Development', 'New Character'])],
  [265, new Set(['Shinichi/Ran', 'Character Development'])],
  [266, new Set(['Shinichi/Ran'])],
  [268, new Set(['Shinichi/Ran'])],
  [269, new Set(['Detective Boys', 'Character Development'])],
  [270, new Set(['Detective Boys', 'Character Development'])],
  [271, new Set(['Black Organization','Shinichi/Ran', 'Character Development'])],
  [272, new Set(['Black Organization', 'Shinichi/Ran'])],
  [273, new Set(['Detective Boys'])],
  [276, new Set(['Detective Boys'])],
  [277, new Set(['FBI', 'Heiji Hattori', 'Character Development'])],
  [278, new Set(['FBI', 'Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [279, new Set(['Detective Boys', 'Character Development', 'New Character'])],
  [280, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [281, new Set(['Detective Boys'])],
  [284, new Set(['Character Development', 'Character Pasts', 'New Character'])],
  [285, new Set(['Shinichi/Ran', 'Character Development', 'Character Pasts'])],
  [286, new Set(['Character Pasts'])],
  [287, new Set(['Shinichi/Ran'])],
  [288, new Set(['FBI', 'Shinichi/Ran', 'Character Development'])],
  [289, new Set(['Detective Boys', 'Character Development', 'New Character'])],
  [290, new Set(['Black Organization', 'Detective Boys', 'Character Development'])],
  [291, new Set(['Heiji Hattori'])],
  [292, new Set(['Heiji Hattori'])],
  [293, new Set(['Heiji Hattori'])],
  [294, new Set(['Detective Boys'])],
  [295, new Set(['Detective Boys'])],
  [301, new Set(['Shinichi/Ran', 'Detective Boys', 'New Character'])],
  [302, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [303, new Set(['Detective Boys'])],
  [304, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development', 'Character Pasts', 'New Character'])],
  [305, new Set(['Shinichi/Ran', 'Character Pasts'])],
  [306, new Set(['Shinichi/Ran'])],
  [307, new Set(['Black Organization', 'New Character'])],
  [308, new Set(['Black Organization', 'FBI'])],
  [309, new Set(['Black Organization', 'Character Development'])],
  [310, new Set(['Black Organization'])],
  [311, new Set(['Black Organization'])],
  [312, new Set(['Character Development', 'New Character'])],
  [313, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [321, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [322, new Set(['Detective Boys'])],
  [323, new Set(['Heiji Hattori'])],
  [324, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [325, new Set(['Heiji Hattori', 'Character Development', 'New Character'])],
  [326, new Set(['Heiji Hattori', 'Detective Boys', 'Character Pasts', 'New Character'])],
  [327, new Set(['Heiji Hattori', 'Detective Boys', 'Character Pasts'])],
  [328, new Set(['Detective Boys', 'Character Pasts'])],
  [329, new Set(['Black Organization', 'Detective Boys', 'Character Development', 'New Character'])],
  [330, new Set(['Detective Boys', 'Character Development'])],
  [332, new Set(['Black Organization', 'New Character'])],
  [333, new Set(['Character Pasts'])],
  [334, new Set(['Shinichi/Ran'])],
  [335, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [336, new Set(['Detective Boys', 'Character Development'])],
  [338, new Set(['Black Organization', 'FBI'])],
  [339, new Set(['Black Organization', 'FBI', 'Character Development'])],
  [340, new Set(['Black Organization', 'Character Development'])],
  [341, new Set(['Black Organization', 'Character Development'])],
  [342, new Set(['Shinichi/Ran'])],
  [343, new Set(['Character Development', 'New Character'])],
  [344, new Set(['Character Development'])],
  [345, new Set(['Black Organization', 'FBI', 'Heiji Hattori', 'Character Development', 'Character Pasts', 'New Character'])],
  [346, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [347, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [348, new Set(['Detective Boys', 'New Character'])],
  [349, new Set(['Detective Boys'])],
  [350, new Set(['New Character'])],
  [352, new Set(['Detective Boys'])],
  [353, new Set(['Detective Boys'])],
  [354, new Set(['Shinichi/Ran'])],
  [355, new Set(['Detective Boys', 'Character Development'])],
  [356, new Set(['Kaitou Kid', 'New Character'])],
  [357, new Set(['Shinichi/Ran'])],
  [358, new Set(['Shinichi/Ran', 'Detective Boys', 'New Character'])],
  [359, new Set(['Detective Boys'])],
  [360, new Set(['Detective Boys'])],
  [361, new Set(['Heiji Hattori', 'Character Development', 'New Character'])],
  [362, new Set(['Heiji Hattori'])],
  [363, new Set(['Detective Boys'])],
  [366, new Set(['Detective Boys', 'Character Development', 'New Character'])],
  [367, new Set(['Detective Boys'])],
  [369, new Set(['Detective Boys'])],
  [370, new Set(['Detective Boys'])],
  [373, new Set(['Detective Boys'])],
  [374, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys'])],
  [375, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys'])],
  [376, new Set(['Detective Boys'])],
  [377, new Set(['Detective Boys'])],
  [378, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [381, new Set(['Heiji Hattori'])],
  [382, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [383, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Pasts'])],
  [387, new Set(['Black Organization'])],
  [390, new Set(['Detective Boys', 'New Character'])],
  [391, new Set(['Detective Boys'])],
  [394, new Set(['Black Organization', 'Kaitou Kid', 'Detective Boys'])],
  [395, new Set(['Kaitou Kid', 'Detective Boys'])],
  [396, new Set(['Kaitou Kid', 'Detective Boys'])],
  [398, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [399, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [400, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development', 'Character Pasts'])],
  [401, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys'])],
  [402, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys'])],
  [403, new Set(['Detective Boys'])],
  [404, new Set(['Detective Boys'])],
  [406, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [407, new Set(['Heiji Hattori', 'Detective Boys'])],
  [408, new Set(['Heiji Hattori', 'Character Development'])],
  [409, new Set(['Detective Boys'])],
  [410, new Set(['Detective Boys'])],
  [411, new Set(['Detective Boys'])],
  [412, new Set(['Detective Boys'])],
  [413, new Set(['Detective Boys'])],
  [414, new Set(['Detective Boys'])],
  [418, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [421, new Set(['Detective Boys', 'Character Pasts'])],
  [422, new Set(['Detective Boys', 'New Character'])],
  [423, new Set(['Detective Boys'])],
  [425, new Set(['Black Organization', 'FBI', 'New Character'])],
  [426, new Set(['Shinichi/Ran'])],
  [427, new Set(['Detective Boys'])],
  [428, new Set(['Detective Boys'])],
  [429, new Set(['Black Organization', 'Heiji Hattori', 'New Character'])],
  [430, new Set(['Black Organization', 'Heiji Hattori', 'Kaitou Kid'])],
  [431, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [432, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [435, new Set(['Detective Boys', 'Character Development'])],
  [436, new Set(['Detective Boys', 'Character Development'])],
  [437, new Set(['Character Pasts'])],
  [440, new Set(['Detective Boys'])],
  [442, new Set(['Detective Boys'])],
  [443, new Set(['Heiji Hattori', 'Detective Boys'])],
  [444, new Set(['Heiji Hattori', 'Detective Boys'])],
  [445, new Set(['Heiji Hattori', 'New Character'])],
  [446, new Set(['Heiji Hattori'])],
  [447, new Set(['Heiji Hattori', 'Character Development'])],
  [449, new Set(['Shinichi/Ran'])],
  [453, new Set(['Detective Boys'])],
  [454, new Set(['Detective Boys'])],
  [455, new Set(['Detective Boys'])],
  [457, new Set(['Shinichi/Ran'])],
  [458, new Set(['Shinichi/Ran'])],
  [459, new Set(['Detective Boys'])],
  [460, new Set(['Detective Boys', 'New Character'])],
  [461, new Set(['Detective Boys'])],
  [462, new Set(['FBI'])],
  [463, new Set(['Black Organization', 'Character Development'])],
  [464, new Set(['Black Organization', 'Character Development'])],
  [465, new Set(['Black Organization'])],
  [466, new Set(['Detective Boys'])],
  [467, new Set(['Detective Boys'])],
  [468, new Set(['Detective Boys'])],
  [469, new Set(['Kaitou Kid'])],
  [470, new Set(['Kaitou Kid'])],
  [472, new Set(['Detective Boys', 'Character Pasts'])],
  [473, new Set(['Kaitou Kid', 'Shinichi/Ran', 'Detective Boys', 'Character Pasts'])],
  [476, new Set(['Detective Boys'])],
  [477, new Set(['Detective Boys'])],
  [479, new Set(['Heiji Hattori', 'Kaitou Kid', 'Shinichi/Ran', 'New Character'])],
  [481, new Set(['Detective Boys'])],
  [482, new Set(['Detective Boys'])],
  [483, new Set(['Detective Boys'])],
  [484, new Set(['Heiji Hattori', 'Character Development', 'Character Pasts'])],
  [485, new Set(['Heiji Hattori', 'Character Development', 'Character Pasts', 'New Character'])],
  [487, new Set(['Heiji Hattori', 'Kaitou Kid'])],
  [488, new Set(['Heiji Hattori', 'Kaitou Kid', 'Detective Boys'])],
  [490, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Pasts'])],
  [491, new Set(['Black Organization', 'FBI', 'Heiji Hattori', 'Character Pasts'])],
  [492, new Set(['Black Organization', 'FBI', 'Character Pasts', 'New Character'])],
  [495, new Set(['Black Organization', 'FBI', 'Character Development', 'Character Pasts'])],
  [496, new Set(['Black Organization', 'FBI', 'Character Development', 'New Character'])],
  [497, new Set(['Black Organization', 'FBI', 'Character Development', 'Character Pasts', 'New Character'])],
  [498, new Set(['Black Organization', 'FBI'])],
  [499, new Set(['Black Organization', 'FBI'])],
  [500, new Set(['Black Organization', 'FBI'])],
  [501, new Set(['Black Organization', 'FBI', 'Detective Boys'])],
  [502, new Set(['Black Organization', 'FBI', 'Detective Boys'])],
  [503, new Set(['Black Organization', 'FBI', 'Detective Boys'])],
  [504, new Set(['Black Organization', 'FBI', 'Detective Boys', 'Character Development'])],
  [508, new Set(['Character Development'])],
  [509, new Set(['Black Organization', 'FBI', 'Detective Boys', 'Character Development', 'New Character'])],
  [510, new Set(['Heiji Hattori', 'Kaitou Kid', 'Detective Boys'])],
  [511, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [512, new Set(['Shinichi/Ran'])],
  [515, new Set(['Heiji Hattori', 'Kaitou Kid'])],
  [516, new Set(['Heiji Hattori', 'Shinichi/Ran', 'New Character'])],
  [517, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [518, new Set(['Detective Boys'])],
  [519, new Set(['Detective Boys'])],
  [521, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [522, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [523, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [524, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys'])],
  [525, new Set(['Heiji Hattori', 'Detective Boys'])],
  [526, new Set(['Heiji Hattori'])],
  [530, new Set(['Shinichi/Ran'])],
  [531, new Set(['Shinichi/Ran'])],
  [533, new Set(['Shinichi/Ran'])],
  [534, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [535, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [536, new Set(['Detective Boys'])],
  [537, new Set(['Kaitou Kid'])],
  [538, new Set(['Kaitou Kid'])],
  [542, new Set(['Detective Boys'])],
  [543, new Set(['Detective Boys', 'Character Development'])],
  [545, new Set(['Character Development'])],
  [549, new Set(['Detective Boys'])],
  [550, new Set(['Detective Boys'])],
  [551, new Set(['Detective Boys', 'New Character'])],
  [552, new Set(['Detective Boys'])],
  [554, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys'])],
  [555, new Set(['Heiji Hattori', 'Detective Boys'])],
  [558, new Set(['New Character'])],
  [563, new Set(['FBI', 'Detective Boys', 'Character Development', 'New Character'])],
  [564, new Set(['Detective Boys'])],
  [565, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [566, new Set(['Shinichi/Ran'])],
  [568, new Set(['Detective Boys'])],
  [569, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [571, new Set(['Heiji Hattori', 'Kaitou Kid', 'Shinichi/Ran'])],
  [572, new Set(['Heiji Hattori', 'Kaitou Kid', 'Detective Boys'])],
  [573, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [574, new Set(['Heiji Hattori'])],
  [576, new Set(['Shinichi/Ran'])],
  [577, new Set(['Detective Boys'])],
  [578, new Set(['FBI', 'Detective Boys', 'Character Development'])],
  [579, new Set(['Black Organization', 'FBI'])],
  [580, new Set(['Black Organization', 'FBI'])],
  [581, new Set(['Black Organization', 'FBI'])],
  [583, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [584, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [585, new Set(['Kaitou Kid', 'Shinichi/Ran', 'Detective Boys'])],
  [586, new Set(['Kaitou Kid', 'Detective Boys'])],
  [587, new Set(['Kaitou Kid', 'Detective Boys'])],
  [588, new Set(['Kaitou Kid'])],
  [589, new Set(['Kaitou Kid'])],
  [590, new Set(['Shinichi/Ran'])],
  [591, new Set(['Detective Boys'])],
  [592, new Set(['Shinichi/Ran'])],
  [593, new Set(['Shinichi/Ran'])],
  [594, new Set(['New Character'])],
  [597, new Set(['Detective Boys'])],
  [598, new Set(['Detective Boys'])],
  [606, new Set(['Detective Boys'])],
  [607, new Set(['Detective Boys'])],
  [608, new Set(['Shinichi/Ran'])],
  [609, new Set(['Shinichi/Ran'])],
  [610, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [611, new Set(['Heiji Hattori', 'Character Pasts'])],
  [612, new Set(['Heiji Hattori', 'Character Pasts'])],
  [613, new Set(['Heiji Hattori', 'Character Pasts'])],
  [614, new Set(['Detective Boys'])],
  [615, new Set(['Detective Boys'])],
  [616, new Set(['Character Development', 'New Character'])],
  [617, new Set(['Shinichi/Ran', 'Character Development'])],
  [618, new Set(['Character Development'])],
  [619, new Set(['Character Development'])],
  [621, new Set(['Shinichi/Ran', 'Character Development'])],
  [622, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Pasts'])],
  [623, new Set(['Detective Boys'])],
  [624, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Pasts', 'New Character'])],
  [625, new Set(['Shinichi/Ran', 'Character Pasts'])],
  [627, new Set(['Kaitou Kid', 'New Character'])],
  [628, new Set(['Kaitou Kid', 'Character Development'])],
  [629, new Set(['Detective Boys'])],
  [630, new Set(['Detective Boys'])],
  [631, new Set(['Detective Boys'])],
  [633, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys', 'Character Pasts'])],
  [634, new Set(['Heiji Hattori', 'Character Pasts'])],
  [639, new Set(['Shinichi/Ran'])],
  [642, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [643, new Set(['Detective Boys'])],
  [644, new Set(['New Character'])],
  [646, new Set(['Shinichi/Ran', 'New Character'])],
  [647, new Set(['Character Development'])],
  [648, new Set(['Detective Boys', 'Character Development'])],
  [649, new Set(['Detective Boys'])],
  [650, new Set(['Detective Boys', 'Character Development'])],
  [651, new Set(['FBI', 'Heiji Hattori', 'Character Development'])],
  [652, new Set(['Heiji Hattori', 'New Character'])],
  [653, new Set(['Heiji Hattori', 'Character Development'])],
  [654, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [655, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [656, new Set(['Detective Boys', 'Character Development'])],
  [657, new Set(['Detective Boys', 'Character Development'])],
  [658, new Set(['Shinichi/Ran'])],
  [659, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [660, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [663, new Set(['Detective Boys', 'New Character'])],
  [664, new Set(['Detective Boys'])],
  [667, new Set(['Black Organization','New Character'])],
  [668, new Set(['Black Organization','Character Development'])],
  [669, new Set(['Detective Boys'])],
  [670, new Set(['Detective Boys'])],
  [671, new Set(['Black Organization','Character Development'])],
  [672, new Set(['Black Organization'])],
  [673, new Set(['Black Organization','Character Development'])],
  [674, new Set(['Black Organization', 'Character Development'])],
  [675, new Set(['Black Organization','Detective Boys', 'Character Development', 'Character Pasts'])],
  [676, new Set(['Detective Boys'])],
  [680, new Set(['Shinichi/Ran'])],
  [681, new Set(['Black Organization','Detective Boys', 'Character Development', 'New Character'])],
  [682, new Set(['Detective Boys', 'Character Pasts'])],
  [683, new Set(['Black Organization','Shinichi/Ran', 'Detective Boys', 'Character Development', 'Character Pasts'])],
  [684, new Set(['Detective Boys', 'Character Development'])],
  [685, new Set(['Detective Boys', 'Character Development'])],
  [686, new Set(['Detective Boys'])],
  [687, new Set(['Detective Boys'])],
  [688, new Set(['Detective Boys'])],
  [690, new Set(['Character Development', 'Character Pasts'])],
  [691, new Set(['Character Development', 'Character Pasts'])],
  [694, new Set(['Detective Boys', 'New Character'])],
  [696, new Set(['Detective Boys'])],
  [698, new Set(['Detective Boys'])],
  [699, new Set(['Detective Boys'])],
  [700, new Set(['Black Organization', 'Detective Boys', 'Character Development'])],
  [701, new Set(['Black Organization', 'Detective Boys', 'Character Development', 'Character Pasts'])],
  [702, new Set(['Black Organization', 'Detective Boys', 'Character Development', 'Character Pasts'])],
  [703, new Set(['Black Organization', 'Detective Boys', 'Character Development'])],
  [704, new Set(['Black Organization', 'Kaitou Kid', 'Detective Boys', 'Character Development'])],
  [705, new Set(['Black Organization', 'Character Development'])],
  [706, new Set(['Black Organization', 'Character Development'])],
  [708, new Set(['Detective Boys'])],
  [710, new Set(['Heiji Hattori', 'Character Development'])],
  [711, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [712, new Set(['Heiji Hattori'])],
  [713, new Set(['Heiji Hattori'])],
  [714, new Set(['Heiji Hattori'])],
  [715, new Set(['Heiji Hattori'])],
  [720, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [721, new Set(['Detective Boys'])],
  [722, new Set(['Detective Boys'])],
  [723, new Set(['Black Organization', 'Shinichi/Ran', 'Detective Boys'])],
  [724, new Set(['Kaitou Kid', 'Character Development'])],
  [725, new Set(['Kaitou Kid', 'Character Development'])],
  [727, new Set(['Character Development'])],
  [728, new Set(['Character Development'])],
  [730, new Set(['Detective Boys'])],
  [731, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development', 'New Character'])],
  [732, new Set(['Detective Boys'])],
  [734, new Set(['Black Organization', 'FBI', 'Detective Boys', 'Character Pasts'])],
  [735, new Set(['Detective Boys'])],
  [737, new Set(['Detective Boys'])],
  [738, new Set(['Character Development'])],
  [739, new Set(['Black Organization', 'Character Development'])],
  [740, new Set(['Black Organization', 'Character Development'])],
  [741, new Set(['Character Development'])],
  [742, new Set(['Detective Boys'])],
  [744, new Set(['Shinichi/Ran', 'Character Development'])],
  [745, new Set(['Character Development'])],
  [746, new Set(['Kaitou Kid', 'Shinichi/Ran', 'Character Development'])],
  [747, new Set(['Kaitou Kid', 'Shinichi/Ran', 'Character Development'])],
  [748, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [749, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [750, new Set(['Detective Boys'])],
  [751, new Set(['Detective Boys'])],
  [752, new Set(['Detective Boys'])],
  [756, new Set(['New Character'])],
  [759, new Set(['Shinichi/Ran'])],
  [760, new Set(['Character Development'])],
  [763, new Set(['Heiji Hattori', 'Detective Boys', 'Character Development'])],
  [764, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys'])],
  [765, new Set(['Detective Boys'])],
  [766, new Set(['Detective Boys', 'Character Development'])],
  [767, new Set(['Detective Boys'])],
  [768, new Set(['Detective Boys'])],
  [769, new Set(['Detective Boys'])],
  [770, new Set(['Black Organization', 'Shinichi/Ran', 'Character Pasts'])],
  [771, new Set(['Black Organization', 'Character Pasts'])],
  [772, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Pasts'])],
  [773, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Pasts'])],
  [774, new Set(['Detective Boys'])],
  [777, new Set(['Detective Boys', 'New Character'])],
  [779, new Set(['Black Organization', 'FBI', 'Detective Boys', 'Character Development', 'Character Pasts', 'New Character'])],
  [780, new Set(['Black Organization', 'FBI', 'Character Development'])],
  [781, new Set(['Black Organization', 'FBI', 'Character Development'])],
  [782, new Set(['Black Organization', 'FBI', 'Character Development'])],
  [783, new Set(['Black Organization', 'FBI', 'Detective Boys'])],
  [785, new Set(['Detective Boys', 'New Character'])],
  [786, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [787, new Set(['Character Development'])],
  [788, new Set(['Character Pasts'])],
  [790, new Set(['Detective Boys'])],
  [791, new Set(['Character Development'])],
  [792, new Set(['Detective Boys', 'Character Development'])],
  [793, new Set(['Detective Boys', 'Character Development'])],
  [794, new Set(['Character Development'])],
  [795, new Set(['Detective Boys'])],
  [798, new Set(['Detective Boys'])],
  [799, new Set(['Detective Boys'])],
  [800, new Set(['Kaitou Kid', 'Shinichi/Ran', 'Character Development'])],
  [801, new Set(['New Character'])],
  [803, new Set(['Detective Boys'])],
  [804, new Set(['Detective Boys'])],
  [805, new Set(['Detective Boys'])],
  [808, new Set(['Heiji Hattori'])],
  [809, new Set(['Heiji Hattori'])],
  [810, new Set(['New Character'])],
  [813, new Set(['Black Organization', 'Detective Boys'])],
  [814, new Set(['Detective Boys'])],
  [815, new Set(['Detective Boys', 'Character Development'])],
  [816, new Set(['Detective Boys'])],
  [821, new Set(['Detective Boys'])],
  [822, new Set(['Detective Boys'])],
  [823, new Set(['Detective Boys'])],
  [824, new Set(['Detective Boys'])],
  [827, new Set(['Character Development'])],
  [828, new Set(['Character Development'])],
  [829, new Set(['Detective Boys', 'Character Pasts'])],
  [830, new Set(['Heiji Hattori'])],
  [831, new Set(['Heiji Hattori'])],
  [832, new Set(['Black Organization', 'FBI', 'Heiji Hattori', 'Detective Boys', 'Character Development', 'Character Pasts', 'New Character'])],
  [836, new Set(['Character Development', 'Character Pasts', 'New Character'])],
  [837, new Set(['Character Development'])],
  [838, new Set(['Detective Boys', 'New Character'])],
  [839, new Set(['Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [843, new Set(['Detective Boys'])],
  [844, new Set(['Detective Boys', 'Character Development'])],
  [845, new Set(['Detective Boys'])],
  [846, new Set(['Detective Boys'])],
  [847, new Set(['Shinichi/Ran', 'Character Development'])],
  [848, new Set(['Shinichi/Ran'])],
  [849, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [850, new Set(['Detective Boys', 'Character Development'])],
  [853, new Set(['Character Pasts'])],
  [854, new Set(['Shinichi/Ran'])],
  [855, new Set(['Character Pasts'])],
  [859, new Set(['Detective Boys'])],
  [861, new Set(['FBI', 'Character Development', 'New Character'])],
  [862, new Set(['Black Organization', 'FBI'])],
  [863, new Set(['Black Organization','Character Development'])],
  [864, new Set(['Black Organization', 'Character Development'])],
  [865, new Set(['Detective Boys'])],
  [866, new Set(['Black Organization', 'Character Pasts'])],
  [867, new Set(['Black Organization', 'Character Development', 'Character Pasts'])],
  [868, new Set(['Detective Boys', 'New Character'])],
  [869, new Set(['Detective Boys'])],
  [870, new Set(['Detective Boys'])],
  [871, new Set(['Detective Boys'])],
  [872, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [873, new Set(['Heiji Hattori'])],
  [874, new Set(['Heiji Hattori', 'Shinichi/Ran', 'New Character'])],
  [877, new Set(['Detective Boys'])],
  [878, new Set(['Character Pasts'])],
  [879, new Set(['Character Development'])],
  [880, new Set(['Detective Boys'])],
  [881, new Set(['FBI', 'Character Development', 'Character Pasts'])],
  [882, new Set(['FBI', 'Character Development', 'Character Pasts', 'New Character'])],
  [885, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development', 'New Character'])],
  [886, new Set(['Heiji Hattori', 'Shinichi/Ran', 'New Character'])],
  [887, new Set(['Kaitou Kid'])],
  [888, new Set(['Kaitou Kid', 'Shinichi/Ran'])],
  [889, new Set(['Detective Boys', 'New Character'])],
  [890, new Set(['Detective Boys'])],
  [891, new Set(['Character Development', 'Character Pasts', 'New Character'])],
  [892, new Set(['Character Development'])],
  [894, new Set(['New Character'])],
  [895, new Set(['Character Development'])],
  [896, new Set(['Detective Boys', 'Character Pasts'])],
  [897, new Set(['Detective Boys', 'Character Development'])],
  [898, new Set(['Detective Boys'])],
  [902, new Set(['Shinichi/Ran', 'Character Development'])],
  [904, new Set(['Detective Boys'])],
  [907, new Set(['FBI', 'Detective Boys'])],
  [909, new Set(['Detective Boys', 'Character Development'])],
  [910, new Set(['Detective Boys', 'Character Development'])],
  [912, new Set(['Detective Boys'])],
  [915, new Set(['Character Development'])],
  [916, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [917, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development', 'New Character'])],
  [918, new Set(['Detective Boys'])],
  [920, new Set(['Character Development'])],
  [922, new Set(['Detective Boys'])],
  [923, new Set(['Detective Boys'])],
  [925, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Detective Boys', 'Character Development'])],
  [926, new Set(['Detective Boys', 'New Character'])],
  [927, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [928, new Set(['Heiji Hattori', 'Kaitou Kid', 'Shinichi/Ran', 'Character Development'])],
  [929, new Set(['Detective Boys'])],
  [930, new Set(['Detective Boys'])],
  [936, new Set(['Detective Boys'])],
  [937, new Set(['Detective Boys'])],
  [938, new Set(['Detective Boys'])],
  [939, new Set(['Detective Boys'])],
  [941, new Set(['Black Organization', 'Heiji Hattori', 'Detective Boys', 'Character Development'])],
  [942, new Set(['Black Organization', 'Heiji Hattori', 'Detective Boys', 'Character Development'])],
  [944, new Set(['Detective Boys'])],
  [945, new Set(['Detective Boys'])],
  [948, new Set(['Detective Boys'])],
  [951, new Set(['Detective Boys'])],
  [952, new Set(['FBI'])],
  [953, new Set(['Black Organization', 'Character Development', 'Character Pasts', 'New Character'])],
  [954, new Set(['FBI'])],
  [955, new Set(['Detective Boys'])],
  [960, new Set(['Detective Boys'])],
  [962, new Set(['Detective Boys'])],
  [964, new Set(['Detective Boys'])],
  [965, new Set(['Heiji Hattori', 'Detective Boys', 'New Character'])],
  [966, new Set(['Heiji Hattori', 'Detective Boys', 'New Character'])],
  [967, new Set(['Heiji Hattori', 'Detective Boys', 'New Character'])],
  [968, new Set(['Heiji Hattori', 'Detective Boys', 'New Character'])],
  [971, new Set(['Detective Boys'])],
  [972, new Set(['Detective Boys'])],
  [973, new Set(['Shinichi/Ran'])],
  [974, new Set(['Shinichi/Ran', 'Character Development'])],
  [976, new Set(['New Character'])],
  [978, new Set(['Detective Boys'])],
  [981, new Set(['Detective Boys'])],
  [982, new Set(['Detective Boys'])],
  [983, new Set(['Heiji Hattori', 'Kaitou Kid', 'Shinichi/Ran'])],
  [984, new Set(['Heiji Hattori', 'Kaitou Kid', 'Shinichi/Ran', 'Character Development', 'Character Pasts'])],
  [989, new Set(['Detective Boys', 'New Character'])],
  [993, new Set(['Shinichi/Ran'])],
  [994, new Set(['Shinichi/Ran', 'Character Development', 'Character Pasts'])],
  [995, new Set(['Black Organization', 'Shinichi/Ran', 'Detective Boys', 'Character Development', 'Character Pasts'])],
  [997, new Set(['Detective Boys'])],
  [1002, new Set(['FBI', 'Detective Boys'])],
  [1004, new Set(['Black Organization', 'Character Development', 'Character Pasts'])],
  [1009, new Set(['Detective Boys'])],
  [1011, new Set(['Detective Boys', 'Character Pasts'])],
  [1012, new Set(['Detective Boys', 'Character Development'])],
  [1015, new Set(['Detective Boys'])],
  [1018, new Set(['Black Organization', 'FBI', 'Heiji Hattori'])],
  [1019, new Set(['Black Organization', 'FBI', 'Heiji Hattori', 'Character Pasts'])],
  [1020, new Set(['FBI', 'Heiji Hattori', 'Character Development'])],
  [1023, new Set(['Detective Boys'])],
  [1024, new Set(['Heiji Hattori', 'Detective Boys', 'New Character'])],
  [1025, new Set(['Black Organization', 'Heiji Hattori', 'Shinichi/Ran', 'Character Development', 'New Character'])],
  [1027, new Set(['Detective Boys'])],
  [1028, new Set(['Detective Boys'])],
  [1033, new Set(['Black Organization', 'Heiji Hattori', 'Shinichi/Ran', 'Detective Boys', 'Character Pasts', 'New Character'])],
  [1034, new Set(['FBI', 'Detective Boys'])],
  [1035, new Set(['Black Organization', 'FBI', 'Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [1036, new Set(['Detective Boys'])],
  [1037, new Set(['Detective Boys'])],
  [1040, new Set(['Detective Boys'])],
  [1041, new Set(['Detective Boys'])],
  [1043, new Set(['Detective Boys'])],
  [1045, new Set(['Black Organization', 'Shinichi/Ran', 'Character Development', 'Character Pasts'])],
  [1046, new Set(['Black Organization', 'Character Development', 'Character Pasts'])],
  [1047, new Set(['Character Pasts'])],
  [1050, new Set(['New Character'])],
  [1052, new Set(['Detective Boys'])],
  [1053, new Set(['Black Organization', 'Detective Boys', 'Character Development', 'Character Pasts'])],
  [1054, new Set(['Black Organization', 'Detective Boys', 'Character Development'])],
  [1057, new Set(['Detective Boys'])],
  [1060, new Set(['Character Development'])],
  [1062, new Set(['Detective Boys'])],
  [1068, new Set(['Detective Boys'])],
  [1070, new Set(['Detective Boys'])],
  [1072, new Set(['Black Organization', 'FBI', 'Character Development'])],
  [1073, new Set(['Detective Boys'])],
  [1077, new Set(['Black Organization', 'FBI', 'Detective Boys', 'Character Development'])],
  [1078, new Set(['Black Organization', 'FBI', 'Character Development'])],
  [1079, new Set(['Black Organization', 'FBI', 'Character Development', 'Character Pasts'])],
  [1080, new Set(['Detective Boys'])],
  [1081, new Set(['Detective Boys'])],
  [1083, new Set(['Detective Boys'])],
  [1085, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development', 'New Character'])],
  [1086, new Set(['Heiji Hattori', 'Character Development', 'Character Pasts', 'New Character'])],
  [1087, new Set(['Detective Boys'])],
  [1088, new Set(['Detective Boys'])],
  [1089, new Set(['Detective Boys'])],
  [1092, new Set(['Detective Boys'])],
  [1093, new Set(['Detective Boys', 'Character Development', 'Character Pasts'])],
  [1094, new Set(['Black Organization', 'Detective Boys', 'Character Development'])],
  [1095, new Set(['Character Development', 'Character Pasts', 'New Character'])],
  [1096, new Set(['Detective Boys'])],
  [1099, new Set(['Character Pasts', 'New Character'])],
  [1104, new Set(['Detective Boys'])],
  [1105, new Set(['Kaitou Kid'])],
  [1106, new Set(['Kaitou Kid', 'Character Pasts'])],
  [1108, new Set(['Detective Boys'])],
  [1109, new Set(['Detective Boys', 'Character Pasts'])],
  [1110, new Set(['Detective Boys'])],
  [1115, new Set(['Shinichi/Ran'])],
  [1116, new Set(['Character Pasts'])],
  [1118, new Set(['Character Pasts'])],
  [1122, new Set(['Detective Boys'])],
  [1123, new Set(['Character Pasts'])],
  [1124, new Set(['Character Development'])],
  [1125, new Set(['Detective Boys'])],
  [1130, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [1131, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [1132, new Set(['Detective Boys'])],
  [1134, new Set(['Character Pasts'])],
  [1135, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development'])],
  [1136, new Set(['Heiji Hattori', 'Shinichi/Ran', 'Character Development', 'New Character'])],
  [1137, new Set(['Detective Boys'])],
  [1138, new Set(['Detective Boys'])],
  [1142, new Set(['Detective Boys'])],
  [1143, new Set(['Detective Boys'])],
  [1145, new Set(['Character Development'])],
  [1146, new Set(['Detective Boys'])],
  [1147, new Set(['Detective Boys'])],
  [1148, new Set(['FBI', 'Detective Boys', 'New Character'])],
  [1149, new Set(['FBI', 'Detective Boys', 'Character Pasts'])],
  [1150, new Set(['Black Organization', 'Kaitou Kid'])],
  [1151, new Set(['Kaitou Kid', 'New Character'])],
  [1157, new Set(['Shinichi/Ran', 'Character Pasts', 'New Character'])],
  [1158, new Set(['Detective Boys'])],
  [1162, new Set(['Detective Boys'])],
  [1164, new Set(['Black Organization', 'Shinichi/Ran', 'Detective Boys'])],
  [1165, new Set(['Black Organization', 'Detective Boys', 'Character Development', 'Character Pasts'])],
  [1166, new Set(['Black Organization', 'Shinichi/Ran', 'Detective Boys', 'Character Development', 'Character Pasts'])],
  [1167, new Set(['Black Organization', 'FBI', 'Detective Boys', 'Character Development', 'Character Pasts'])],
  [1168, new Set(['Detective Boys'])],
  [1169, new Set(['Detective Boys', 'Character Development'])],
  [1170, new Set(['Black Organization', 'Detective Boys', 'Character Development'])],
  [1171, new Set(['Heiji Hattori', 'Character Pasts'])],
  [1172, new Set(['Heiji Hattori', 'Character Development', 'Character Pasts'])],
  [1173, new Set(['Detective Boys'])],
  [1174, new Set(['Character Pasts'])],
  [1176, new Set(['Detective Boys'])],
  [1177, new Set(['Detective Boys'])],
  [1178, new Set(['Heiji Hattori', 'Shinichi/Ran'])],
  [1179, new Set(['Heiji Hattori'])],
  [1182, new Set(['Detective Boys'])],
  [1184, new Set(['Shinichi/Ran', 'Detective Boys'])],
  [1185, new Set(['Detective Boys', 'Character Development'])],
  [1187, new Set(['Shinichi/Ran', 'Character Pasts'])],
  [1192, new Set(['Detective Boys'])],
  [1197, new Set(['Detective Boys'])],
  [1199, new Set(['Detective Boys'])]
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
  // REGULAR OVAs 1-12 — source: wiki Regular OVAs section
  [1, new Set(['Kaitou Kid', 'New Character'])],               // Conan vs. Kid vs. Yaiba
  [2, new Set(['Character Pasts'])],                           // 16 Suspects!?
  // OVA 3: Conan, Heiji, and the Vanished Boy — no wiki plot tags
  [4, new Set(['Kaitou Kid', 'Shinichi/Ran', 'New Character'])], // Conan, Kid, and the Crystal Mother
  // OVA 5: The Target is Kogoro!! — no wiki plot tags
  [6, new Set(['Kaitou Kid', 'Character Development'])],       // Follow the Vanished Diamond!
  // OVA 7: A Challenge from Agasa! — no wiki plot tags
  [8, new Set(['Shinichi/Ran'])],                              // The Casebook of Sonoko Suzuki
  [9, new Set(['Shinichi/Ran'])],                              // The Stranger from Ten Years Later
  [10, new Set(['Kaitou Kid'])],                               // Kid in Trap Island
  [11, new Set(['Character Development'])],                    // A Secret Order From London
  // OVA 12: The Miracle of Excalibur — no wiki plot tags

  // TV SPECIALS / OVA HYBRIDS — source: wiki TV Specials section
  [13, new Set(['New Character', 'Shinichi/Ran', 'Black Organization', 'Character Pasts'])], // Episode "ONE" (not in wiki TV Specials, keeping original)
  [14, new Set(['Black Organization'])],                       // Black History (TV Special 2)
  [15, new Set(['Shinichi/Ran'])],                             // TV Special 7 — Shinichi/Ran focus
  [16, new Set(['Heiji Hattori', 'Character Development'])],   // Heiji Hattori vs. Kazuha Toyama
  [17, new Set(['Heiji Hattori'])],                            // The Satsuma Temple Mystery
  [18, new Set(['Heiji Hattori'])],                            // The Mystery of the Vanishing Haunted House

  // MAGIC FILE SERIES (Movie tie-ins) — no wiki plot tags for most
  [22, new Set(['Shinichi/Ran', 'Character Development'])],    // Magic File 2: Shinichi Kudo case
  [23, new Set(['Kaitou Kid'])],                               // Magic File 3: Shinichi and Ran's Logical Deduction
  [24, new Set(['Kaitou Kid'])],                               // Magic File 4: Osaka Okonomiyaki Odyssey

  // BLACK HISTORY SPECIALS
  [25, new Set(['Black Organization', 'FBI'])],                // Black History 1
  [26, new Set(['Black Organization', 'FBI'])],                // Black History 2
]);

// =======================================================
// MAGIC KAITO 1412 EPISODE TAGS
// =======================================================
const KAITO_TAGS = new Map([
  // Magic Kaito 1412 — 24 episodes, Season 1
  // Source: https://www.detectiveconanworld.com/wiki/Magic_Kaito_1412
  [1, new Set(['Character Pasts', 'New Character'])],           // The Revived Phantom Thief Kid - origin story
  [2, new Set(['Character Development'])],                      // Blue Birthday
  [3, new Set(['Character Development'])],                      // Hustler vs. Magician
  [4, new Set(['Character Development', 'New Character'])],     // A Great Detective Steps Into the Light - Hakuba introduced
  [5, new Set(['Character Development'])],                      // A Temptation in Scarlet
  [6, new Set(['Character Development', 'New Character'])],     // Black Star - Akako introduced
  [7, new Set(['Shinichi/Ran'])],                               // Kaito Kuroba's Busy Holiday - Conan/Shinichi crossover
  [8, new Set(['Character Development'])],                      // The Adult's Charm
  [9, new Set(['Character Development'])],                      // The Phantom Lady Appears
  [10, new Set(['Character Development'])],                     // The Phantom Lady and Ryoma's Treasure
  [11, new Set(['Shinichi/Ran'])],                              // Kid and Conan's Ryoma Treasure Illusion - Conan crossover
  [12, new Set(['Shinichi/Ran'])],                              // Kid and Conan's Ryoma Treasure Illusion pt2
  [13, new Set(['Character Development'])],                     // Christmas Eve - Two Kaitou Kids
  [14, new Set(['Character Development'])],                     // Stay Away From Him
  [15, new Set(['Character Development'])],                     // Crystal Mother
  [16, new Set(['Character Development'])],                     // The Princess and the Thief's Improv
  [17, new Set(['Character Development'])],                     // Stay Away From Him
  [18, new Set(['Character Development'])],                     // Crystal Mother
  [19, new Set(['Shinichi/Ran'])],                              // Kid Vs Conan, Miraculous Midair Walk - Conan crossover
  [20, new Set(['Character Development'])],                     // Green Dream
  [21, new Set(['Character Development'])],                     // Golden Eye (Part 1)
  [22, new Set(['Character Development'])],                     // Golden Eye (Part 2)
  [23, new Set(['Character Development'])],                     // Dark Knight
  [24, new Set(['Shinichi/Ran', 'Character Development', 'Character Pasts'])], // Kid vs Conan: Teleportation Under the Moonlight - finale
]);

// =======================================================
// UNIFIED CONTENT TYPE HELPERS
// =======================================================

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
console.log(`  - OVAs: ${TOTAL_TAGGED_OVAS} (Regular OVAs + TV Specials)`);
console.log(`  - Magic Kaito: ${TOTAL_TAGGED_KAITO} (MK1412, 1-24)`);
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
