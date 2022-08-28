Array.prototype.myReduce = function (callback, initialValue) {
    let i = 0;
    let rst;
    while (i < this.length) {
        rst = callback(
            i == 0
                ? (arguments.length == 2 ? initialValue : this[i++])
                : rst, this[i++])
    }
    return rst;
}
let ar = new Array()
ar.push(1)
ar.push(2)
ar.push(3)
ar.push(4)

let rst = ar.myReduce((a, b) => {
    console.log([a, b])
    return a + b
},0)
console.log('rst: ', rst);