
const Stack = require("../Stack/ArrayStack")
function quick_stack(arr, startIndex, endIndex) {
    let stack = new Stack();
    stack.push([startIndex, endIndex])
    while (!stack.isEmpty()) {
        let item = stack.pop();
        let startIndex = item[0];
        let endIndex = item[1];
        if (startIndex < endIndex){
            let partitionIndex = partition(arr, startIndex, endIndex);
            stack.push([partitionIndex + 1, endIndex])
            stack.push([startIndex, partitionIndex - 1])
        }
    }
}

function partition(arr, startIndex, endIndex) {
    let pivot = arr[startIndex];
    let m = startIndex
    let temp = 0;
    for (let i = m + 1; i <= endIndex; i++) {
        if (arr[i] < pivot) {
            m++;
            temp = arr[m];
            arr[m] = arr[i]
            arr[i] = temp;
        }
    }
    arr[startIndex] = arr[m]
    arr[m] = pivot;
    return m;
}
let arr = [4, 4, 6, 5, 3, 2, 8, 1];
quick_stack(arr, 0, arr.length - 1);

console.log(arr);