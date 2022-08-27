/**
 * 输入一个数组，求该数组经过排序后，最大的相邻距离
 * 1.双边快排
 * 2.计数排序（根据现有输入数组的范围）
 */
/******************************************************************/

/**
 * 快速排序实现O(nlogn)
 * @param {*} arr 
 * @returns 
 */
function getMaxSortedDistance(arr) {
    //先快速排序（溯源方式）
    let stack = new Array();
    stack.push([0, arr.length - 1])
    while (!stack.isEmpty()) {
        let data = stack.pop();
        let startIndex = data[0];
        let endIndex = data[1]
        if (startIndex < endIndex) {
            let pivotIndex = partition(arr, startIndex, endIndex)
            stack.push([startIndex, pivotIndex - 1])
            stack.push([pivotIndex + 1, endIndex])
        }
    }
    let maxDistance = 0;
    for (let i = 0; i < arr.length - 2; i++) {
        let curDistance = arr[i + 1] - arr[i]
        if (curDistance > maxDistance)
            maxDistance = curDistance
    }
    return maxDistance;
}

function partition(arr, startIndex, endIndex) {
    let pivot = arr[startIndex];
    let m = startIndex;
    let temp;
    for (let i = startIndex; i <= endIndex; i++) {
        if (arr[i] < pivot) {
            m++;
            temp = arr[m]
            arr[m] = arr[i];
            arr[i] = temp;
        }
    }
    arr[startIndex] = arr[m]
    arr[m] = pivot;
    return m;
}

/**
 *  计数排序实现O(n)
 * @param {*} arr 
 * @returns 
 */
function getMaxSortedDistanceV2(arr) {
    let min = arr[0], max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]
        } else if (arr[i] > max) {
            max = arr[i]
        }
    }
    //计数排序
    let countArr = new Array(max - min + 1).fill(0);
    arr.forEach(v => {
        countArr[v - min]++;
    });
    let maxDistance = curDistance = 1;
    for (let i = 0; i < countArr.length; i++) {
        if (countArr[i] == 0) {
            curDistance++;
        } else {
            maxDistance = Math.max(maxDistance, curDistance);
            curDistance = 1
        }
    }
    return maxDistance;
}

let arr = [2, 6, 3, 4, 5, 10, 9];

// let maxDistance = getMaxSortedDistance(arr);
// console.log('arr: ', arr);
// console.log('maxDistance: ', maxDistance);
let maxDistance2 = getMaxSortedDistanceV2(arr);
console.log('maxDistance2: ', maxDistance2);