/**
 * *********************************************
 * 1.倒序遍历，找到逆序区开始的前一个位置m
 * 2.倒序遍历，在逆序区里找到第一个比m位置大的n
 * 3.m与n替换
 * 4.对逆序区域更新为顺序区（从两头往中间依次首尾替换）
 * *********************************************
 */

/**
 * 调整数组，比原来数组大，且仅仅比原来数组大
 * @param {*} arr 
 * @returns 
 */
function findNearestNum(arr) {
    let m = null, n = null;
    //find m
    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i] > arr[i - 1]) {
            m = i - 1;
            break;
        }
    }
    //find n
    for (let i = arr.length - 1; i > m; i--) {
        if (arr[i] > arr[m]) {
            n = i;
            break
        }
    }
    //找不到比原数字更大的
    if (m == null || n == null) return null
    //不改变原数组，拷贝新数组
    let rst = [...arr], temp;
    //replace m and n
    temp = rst[m];
    rst[m] = rst[n];
    rst[n] = temp;
    //reverse
    for (let i = m + 1, j = rst.length - 1; i < j; i++, j--) {
        temp = rst[i];
        rst[i] = rst[j];
        rst[j] = temp;
    }
    return rst;
}

let a1 = findNear2([1, 2, 3, 4, 5])
console.log('a1: ', a1);
let a2 = findNear2([1, 2, 4, 3, 5])
console.log('a2: ', a2);
let a3 = findNear2([1, 7, 9, 8, 6])
console.log('a3: ', a3);
