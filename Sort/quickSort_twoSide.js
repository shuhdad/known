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
        //***注意***
        //这里要先从右边开始移位
        //因为left和right最终会重合，重合就势必要left和right先后停止
        //如果right先停止，也就是停在比pivot小的位置。
        //如果先left移位，也就是停在比pivot大的位置。
        //那最终pivot与重合位置交换，肯定要把小的换到前面去
        while (left < right && arr[right] > privot) {
            right--
        }
        while (left < right && arr[left] <= privot) {
            left++
        }
        if (left < right) {
            let temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
        }
    }

    arr[startIndex] = arr[right];
    arr[right] = privot;
    return right;
}

let arr = [4, 4, 6, 5, 3, 2, 8, 1];
quickSort(arr, 0, arr.length - 1);

console.log(arr);