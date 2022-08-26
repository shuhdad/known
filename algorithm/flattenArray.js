function flattenArray(arr) {
    if (!Array.isArray(arr)) return arr;
    let rst = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            rst = rst.concat(flattenArray(item))
        } else {
            rst.push(item);
        }
    })
    return rst;
}


let rst = flattenArray([1, [[2, 3], 4], [5, 6], 7])
console.log('rst: ', rst);