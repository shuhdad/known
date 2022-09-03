//示例 1：
// 输入：[3, 2, 1]
// 输出：1
// 解释：第三大的数是 1 。

// 示例 2：
// 输入：[1, 2]
// 输出：2
// 解释：第三大的数不存在, 所以返回最大的数 2 。

// 示例 3：
// 输入：[2, 2, 3, 1]
// 输出：1
// 解释：注意，要求返回第三大的数，是指在所有不同数字中排第三大的数。
// 此例中存在两个值为 2 的数，它们都排第二。在所有不同数字中排第三大的数为 1 。
//  

// 提示：
// 1 <= nums.length <= 104
// -231 <= nums[i] <= 231 - 1
//  

// 进阶：你能设计一个时间复杂度 O(n) 的解决方案吗？







function thirdMaxNumV1(arr) {
    let f = s = t = null;
    arr.sort((a, b) => b - a)
    return arr
}

function thirdMaxNumV2(arr) {
    let f = s = t = null;
    for (let i = 0; i < arr.length; i++) {
        if (f == null || f < arr[i]) {
            t = s;
            s = f;
            f = arr[i]
        } else if (arr[i] < f && (s < arr[i] || s == null)) {
            t = s;
            s = arr[i]
        } else if (s != null && arr[i] < s && (t < arr[i] || t == null)) {
            t = arr[i]
        }
    }
    return t == null ? f : t
}
let arr = [1, 90, 8, 30, 7, 99]
let rst = thirdMaxNumV2(arr);
console.log('rst: ', rst);