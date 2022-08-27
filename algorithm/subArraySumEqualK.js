/**
 * 输入一个数组arr，与一个正整数K
 * 在数组arr中寻找连续的子数组，满足子数组的和等于K
 * @param {*} arr 
 * @param {*} k 
 * @returns 
 */
function sumArraySumEqualK(arr, k) {
    let count = 0;
    let presum = 0;
    let sum_count_map = new Map();
    sum_count_map.set(0, 1);
    for (let i = 0; i < arr.length; i++) {
        presum += arr[i];
        if (sum_count_map.has(presum)) {
            sum_count_map.set(presum, sum_count_map.get(presum) + 1)
        } else {
            sum_count_map.set(presum, 1)
        }
        if (sum_count_map.has(presum - k)) {
            count += sum_count_map.get(presum - k);
        }
    }
    return count;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let count = sumArraySumEqualK(arr, 21)
console.log("count:", count)