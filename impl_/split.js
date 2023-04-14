function sliceStr(str, length) {
    let rst = []
    let n = str.length;
    let count = Math.ceil(n / length)
    for (let i = 0; i < count; i++) {
        rst.push(str.slice(i * length, (i + 1) * length))
    }
    return rst;
}

let str = "abcdefghijklmnopqrstuvwxyz"
let rst = sliceStr(str, 15)
console.log('rst: ', rst);
