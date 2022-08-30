// 将给出的整数x翻转。
// 例1:x=123，返回321
// 例2:x=-123，返回-321

// 你有思考过下面的这些问题么？
// 如果整数的最后一位是0，那么输出应该是什么？比如10,100
// 你注意到翻转后的整数可能溢出吗？溢出返回0









const INT_MAX = 2147483648

function revNum(num) {
    let isNeg = num < 0;
    num = Math.abs(num);
    let rst = 0
    while (num > 0) {
        const difMax = (INT_MAX - num % 10) / 10
        if (rst > difMax) {
            return 0
        }
        rst = rst * 10 + num % 10
        num = num / 10 >> 0
    }
    return isNeg ? rst * -1 : rst;

}

let num = 87678;
let rst = revNum(num);
console.log('rst: ', rst);
