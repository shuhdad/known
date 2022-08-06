/**
 * 求最大公因数，这里依次使用3种算法，最后一种为性能最优
 * 1.辗转相除法
 *  gcd(a,b) = gcd(a%b,min(a,b))
 *  缺点：取模性能差
 * 2.更相减损术
 *  gcd(a,b) = gcd(max-min,min)
 * 3.②的进阶版
 *  将偶数除2(>>1)，没有偶数则构造出偶数。最后再进行更相减损术
 *  i.a、b均为偶数
 *      gcb(a,b) = 2*gcb(a>>1,b>>1)
 *  ii.a为偶数，b为奇数
 *      gcb(a,b) = gcb(a>>1,b)
 *  iii.a为奇数，b为偶数
 *      gcb(a,b) = gcb(a,b>>1)
 *  iv.a、b均为奇数（更相减损术）
 *      gcb(a,b) = gcb(max-min, min)
 */

/**
 * 求最大公因数greatest common divisor
 * 使用辗转相除法：gcd(a,b) = gcd(a%b,min(a,b))
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function gcdV1(a, b) {
    if (a <= 0 || b <= 0)
        throw new Error("invalid arguments")
    let max = a > b ? a : b;
    let min = a < b ? a : b;
    let remainder = max % min;
    if (remainder == 0) return min;
    return gcdV1(remainder, min);
}
let r1 = gcdV1(88, 120);
console.log('r1: ', r1);

function gcdV2(a, b) {
    if (a <= 0 || b <= 0)
        throw new Error("invalid arguments")
    if (a == b) return a;
    let max = a > b ? a : b;
    let min = a < b ? a : b;
    return gcdV2(max - min, min);
}
let r2 = gcdV2(88, 120);
console.log('r2: ', r2);

function gcbV3(a, b) {
    if (a == b) return a;
    if ((a & 1) == 0 && (b & 1) == 0)
        return 2 * gcbV3(a >> 1, b >> 1)
    else if ((a & 1) == 0)
        return gcbV3(a >> 1, b)
    else if ((b & 1) == 0)
        return gcbV3(a, b >> 1)
    else {
        let max = a > b ? a : b;
        let min = a < b ? a : b;
        return gcbV3(max - min, min);
    }
}
let r3 = gcbV3(88, 120);
console.log('r3: ', r3);
