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


let k = 3;
let num1 = getLowerByRemovekV2("12345", k);
console.log('num1: ', num1);

let num2 = getLowerByRemovekV2("87291", k);
console.log('num2: ', num2);

let num3 = getLowerByRemovekV2("45673", k);
console.log('num3: ', num3);