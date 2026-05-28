const fs = require('fs');
let data = fs.readFileSync('d:/Antigravity Projects/BBDCI Index/data.js', 'utf8');

const imageLinks = {
  1: 'https://pbs.twimg.com/media/G_GZW4dXQAAqK-C?format=jpg',
  2: 'https://pbs.twimg.com/media/G_PA_MaWcAA-_GC?format=jpg',
  3: 'https://pbs.twimg.com/media/G_PBJz9b0AAJjn6?format=jpg',
  4: 'https://pbs.twimg.com/media/G_PBO94akAABRs3?format=jpg',
  5: 'https://pbs.twimg.com/media/G_WDNS_WcAAQD-a?format=jpg',
  6: 'https://pbs.twimg.com/media/G_WDddCWAAACEdk?format=jpg',
  7: 'https://pbs.twimg.com/media/G_WDwEwbAAQFQc_?format=jpg',
  8: 'https://pbs.twimg.com/media/G_WEC7MbAAEoSPJ?format=jpg',
  9: 'https://pbs.twimg.com/media/G_WElZOW4AAYApW?format=jpg',
  10: 'https://pbs.twimg.com/media/G_WFbzIaAAAAkRE?format=jpg',
  11: 'https://pbs.twimg.com/media/G_v1AX3boAAWY1v?format=jpg',
  12: 'https://pbs.twimg.com/media/G_v1wjXaEAAjTVc?format=jpg',
  13: 'https://pbs.twimg.com/media/G_v2pLMbQAAHRxm?format=jpg',
  14: 'https://pbs.twimg.com/media/G_zBMQVb0AAoM8R?format=jpg',
  15: 'https://pbs.twimg.com/media/G_zBfLCbUAM7DlQ?format=jpg',
  16: 'https://pbs.twimg.com/media/G_zBqQCaMAALpkJ?format=jpg',
  17: 'https://pbs.twimg.com/media/G_zB6mtbUAAuyy2?format=jpg',
  18: 'https://pbs.twimg.com/media/G_zCcLVb0AAJX8L?format=jpg',
  19: 'https://pbs.twimg.com/media/G_zCr8dbUAA6WvK?format=jpg',
  20: 'https://pbs.twimg.com/media/G_zDBCEbQAAAWzM?format=jpg',
  21: 'https://pbs.twimg.com/media/G_zDTTlbUAMg-W2?format=jpg',
  22: 'https://pbs.twimg.com/media/G_zDm6PbUAA0YBJ?format=jpg',
  23: 'https://pbs.twimg.com/media/G_zD4P1bUAM9yVA?format=jpg',
  24: 'https://pbs.twimg.com/media/G_zEEsFbsAAghUf?format=jpg',
  25: 'https://pbs.twimg.com/media/G_zEUstbUAELSqS?format=jpg',
  26: 'https://pbs.twimg.com/media/G_zEpz9bUAIEOKC?format=jpg',
  27: 'https://pbs.twimg.com/media/G_zE8MPaoAA2PGo?format=jpg',
  28: 'https://pbs.twimg.com/media/G_zFOk5asAAjEhe?format=jpg',
  29: 'https://pbs.twimg.com/media/G_zFarTa4AAQoJS?format=jpg',
  30: 'https://pbs.twimg.com/media/G_zFvzqbUAEGh3q?format=jpg'
};

data = data.replace(/\{id:\"S(\d+)\",\s*label/g, (match, p1) => {
  const num = parseInt(p1, 10);
  if (imageLinks[num]) {
    return `{id:"S${num}", customImg: "${imageLinks[num]}", label`;
  }
  return match;
});

fs.writeFileSync('d:/Antigravity Projects/BBDCI Index/data.js', data);
console.log('data.js updated!');
