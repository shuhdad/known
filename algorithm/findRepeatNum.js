/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
    let min = max = nums[0];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < min) {
            min = nums[i]
        }
        if (nums[i] > max) {
            max = nums[i]
        }
    }
    let length = max - min + 1;
    let countArr = new Array(length).fill(0)
    for (let i = 0; i < nums.length; i++) {
        countArr[nums[i] - min]++
    }
    let rst = countArr.map((x, i) => x > 1 ? (i + min) : null).filter(x => x != null)
    return !rst ? null : rst[0]
};

var findRepeatNumberV2 = function (nums) {
    let set= new Set();
    for (let i = 0; i < nums.length; i++) {
        if(set.has(nums[i])){
            return nums[i]
        }else{
            set.add(nums[i])
        }
    }
    return null;
}

let rst = findRepeatNumberV2([2, 3, 1, 0, 2, 5, 3])
console.log('rst: ', rst);