/**
 * 给一个整数字符串，在删除k个数字后，如何得到最小？返回最小值
 * @param {*} num 
 * @param {*} k 
 * @returns 
 */
function getLowerByRemovek(num, k) {
    if (num.length <= k) {
        return 0;
    }
    for (; k > 0; k--) {
        for (let i = 0; i < num.length; i++) {
            if (i == num.length - 1 || parseInt(num[i]) > parseInt(num[i + 1])) {
                num = num.substring(0, i) + num.substring(i + 1, num.length)
                break
            }
        }
    }
    return num
}

/**
 * 利用栈的设计，新元素与栈顶元素对比，比栈顶元素小，栈顶元素出栈，继续与下个栈顶元素比
 * @param {*} num 
 * @param {*} k 
 * @returns 
 */
function getLowerByRemovekV2(num, k) {
    let newLength = num.length - k
    let stack = new Array(newLength);
    let top = 0;
    for (let i = 0; i < num.length; i++) {
        while (top > 0 && k > 0 && parseInt(stack[top - 1]) > parseInt(num[i])) {
            top--;
            k--;
        }
        stack[top++] = num[i];
    }
    let offset = 0
    while (offset < num.length && num[offset] == "0") {
        offset++
    }
    return stack.join("").substring(offset, newLength - offset)
}


function rk(num, k) {
    let done = false
    for (; k > 0; k--) {
        if (done) break;
        for (let i = 0; i < num.length; i++) {
            if (num[i] > num[i + 1]) {
                //删除这个位置
                num = num.substring(0, i) + num.substring(i + 1, num.length);
                break;
            }
            if (i == num.length - 2) {
                num = num.substring(0, num.length - k)
                break;
            }
        }
    }
    return num

}
let k = 4;
let num = "74598231239"
let num1 = rk(num, k);
console.log('num1: ', num1);

let num2 = getLowerByRemovekV2(num, k);
console.log('num2: ', num2);

let num3 = getLowerByRemovekV2(num, k);
console.log('num3: ', num3);
