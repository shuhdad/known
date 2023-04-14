let map = new Map();

map.set("a", 1);
map.set("b", 2);
map.set("c", 3);
let vas = map.values();
let u_TYPES = {
    'undefined': 'undefined',
    'number': 'number',
    'boolean': 'boolean',
    'string': 'string',
    '[object Function]': 'function',
    '[object RegExp]': 'regexp',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Error]': 'error',
    '[object Object]': 'object'
}
let u_tostr = u_TYPES.toString();
console.log('u_tostr: ', u_tostr);

console.log(Object.prototype.toString.call(vas));

let ne = Object.create(ha, {
    name: {
        get: "hah",
        enumerable: true
    }
})
console.log('ne: ', ne);

