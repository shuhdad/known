var findMinNum = function (numbers) {
    let index = minRangeArray(numbers, 0, numbers.length - 1);
    return index < 0 ? numbers[0] : numbers[index];
};
function minRangeArray(arr, start, end) {
    if (start >= end) return -1
    let rst = -1
    let mid = (start + end) >> 1;
    if (arr[mid] < arr[mid - 1]) rst = mid;
    if (arr[mid] > arr[mid + 1]) rst = mid + 1;
    if (rst < 0)
        rst = minRangeArray(arr, start, mid - 1)
    if (rst < 0)
        rst = minRangeArray(arr, mid + 1, end)
    return rst;
}
let arr = [4, 5, 6, 2, 3];
let rst = findMinNum(arr);
console.log('rst: ', rst);