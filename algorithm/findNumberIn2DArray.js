/**
 * 在一个 n * m 的二维数组中，
 * 每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。
 * 请完成一个高效的函数，输入这样的一个二维数组和一个整数，
 * 判断数组中是否含有该整数。
 * @param {*} arr num[][]
 */
function findNumberIn2DArray(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        const curArr = arr[i];
        let curRst = findNumberInArray(curArr, target, 0, curArr.length - 1)
        if (curRst) return true;
    }
    return false
}

function findNumberInArray(arr, target, start, end) {
    if (start > end) return false
    let mid = (start + end) >> 1
    while (mid <= end && mid >= start) {
        if (target == arr[mid]) {
            return true;
        }
        if (target > arr[mid]) {
            return findNumberInArray(arr, target, mid + 1, end)
        } else {
            return findNumberInArray(arr, target, start, mid - 1)
        }
    }
}

function findNumberIn2DArrayV2(matrix, target) {
    if (matrix.length == 0) return false
    let n = matrix[0].length - 1
    let x = 0, y = n;
    while (x < matrix.length && y >= 0) {
        if (matrix[x][y] == target) {
            return true;
        } else if (matrix[x][y] > target) {
            y--
        } else {
            x++
        }
    }
    return false
}

let arr = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
]


let rst = findNumberIn2DArrayV2(arr, 13)
console.log('rst: ', rst);