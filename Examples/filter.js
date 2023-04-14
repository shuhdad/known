let s = new Set()
s.add(2).add(3).add(4).add(5);
let keys  = s.keys().next().value;
console.log('keys: ', keys);

// for (let i = 0; i < s.size(); i++) {
//     console.log('[key,value]: ', [i, s.keys()[i]]);
// }
// for (const [key, value] of s.entries()) {
//     console.log('[key,value]: ', [key, value]);

// }