
const Stack = require("../Stack/ArrayStack")
function getMaxSortedDistance(arr) {
    //先排序
    let stack = new Stack();
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
let arr = [2, 6, 3, 4, 5, 10, 9];

let maxDistance = getMaxSortedDistance(arr);
console.log('arr: ', arr);
console.log('maxDistance: ', maxDistance);


function getMaxSortedDistanceV2(arr){

}