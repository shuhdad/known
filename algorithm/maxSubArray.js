/**
 * 最大子数组
 * 输入一个数组，求出和最大的子数组
 * 
 */


















function maxSubArray(arr) {
    let sum = minPreSum = 0;
    let maxSubSum = arr[0];
    arr.forEach(v => {
        sum += v;
        maxSubSum = Math.max(sum - minPreSum, maxSubSum);
        minPreSum = Math.min(sum, minPreSum)
    });
    return maxSubSum;
}

let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4, 9]
let arr2 = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

let val = maxSubArray(arr2);
console.log('val: ', val);