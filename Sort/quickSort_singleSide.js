

function quickSort(arr, startIndex, endIndex) {
    if (startIndex >= endIndex) return
    let partitionIndex = partition(arr, startIndex, endIndex);

    quickSort(arr, startIndex, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, endIndex);
}


function partition(arr, startIndex, endIndex) {
    let pivot = arr[startIndex];
    let m = startIndex;
    let temp = 0;

    for (let i = m + 1; i <= endIndex; i++) {
        //后位小于中位元素
        if (arr[i] < pivot) {
            m++
            temp = arr[m]
            arr[m] = arr[i]
            arr[i] = temp;
        }
    }
    arr[startIndex] = arr[m];
    arr[m] = pivot;
    return m;
}

let arr = [2, 6, 3, 4, 5, 10, 9];
quickSort(arr, 0, arr.length - 1);

console.log(arr);