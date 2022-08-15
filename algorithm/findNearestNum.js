/**
 * 重新组合数字，使得移动后的数字组合最接近原先数字组合
 * 且比原先数字组合大
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

let a1 = findNearestNum([1, 2, 3, 4, 5])
console.log('a1: ', a1);
let a2 = findNearestNum([1, 2, 4, 3, 5])
console.log('a2: ', a2);
let a3 = findNearestNum([1, 7, 9, 8, 6])
console.log('a3: ', a3);

