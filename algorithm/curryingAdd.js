// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
















function add() {
    let _args = [...arguments]
    let _add = function () {
        _args.push(...arguments);
        return _add
    }
    _add.toString = function () {
        return _args.reduce((a, b) => a + b)
    }
    return _add
}
let v1 = add(1)(2)(3)
console.log('v1: ', v1 + "");
let v2 = add(1, 2, 3)(4)
console.log('v2: ', v2 + "");
let v3 = add(1)(2)(3)(4)(5)
console.log('v3: ', v3 + "");
