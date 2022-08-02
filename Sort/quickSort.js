/**
 * 快速排序
 */
function quickSort(arr, startIndex, endIndex) {
    if (startIndex >= endIndex)
        return;

    let partitionIndex = partition(arr, startIndex,endIndex);

    quickSort(arr, startIndex, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, endIndex);
}

function partition(arr, startIndex, endIndex) {
    let privot = arr[startIndex];
    let left = startIndex;
    let right = endIndex;
    while (left != right) {
        while (left < right && arr[left] <= privot) {
            left++
        }
        while (left < right && arr[right] > privot) {
            right--
        }
        if (left < right) {
            let temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
        }
    }

    arr[startIndex] = arr[left];
    arr[left] = privot;
    return left;
}

let arr = [4, 4, 6, 5, 3, 2, 8, 1];
quickSort(arr, 0, arr.length - 1);

console.log(arr);