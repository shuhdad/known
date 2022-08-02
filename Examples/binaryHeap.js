/**
 * 构建最小堆
 * @param {*} arr 
 */
function buildHeap(arr) {
    let childIndex = arr.length - 1;
    let lastParentIndex = parseInt((childIndex - 1) / 2)
    for (let i = lastParentIndex; i >= 0; i--) {
        downAdjust(arr, i);
    }
}

/**
 * 下沉调整
 * @param {*} arr 
 * @param {*} parentIndex 
 */
function downAdjust(arr, parentIndex) {
    let temp;
    let childIndex = 2 * parentIndex + 1;
    while (childIndex < arr.length) {
        //取出最小子节点
        if (arr.length > childIndex + 1 && arr[childIndex + 1] < arr[childIndex]) {
            childIndex = childIndex + 1
        }
        if (arr[childIndex] >= arr[parentIndex]) {
            break;
        }
        temp = arr[childIndex]
        arr[childIndex] = arr[parentIndex];
        arr[parentIndex] = temp
        //进行下一个层
        parentIndex = childIndex;
        childIndex = 2 * parentIndex + 1;
    }
}

/**
 * 上浮调整
 * @param {*} arr 
 * @param {*} childIndex 
 * @returns 
 */
function upAdjust(arr, childIndex) {
    if (childIndex <= 0) return;
    let parentIndex = parseInt((childIndex - 1) / 2);
    let temp = arr[childIndex];
    while (parentIndex >= 0) {
        //父节点大于子节点，才需要上浮
        if (arr[parentIndex] <= arr[childIndex])
            break
        //子节点更改为父节点的值，
        //父节点暂且不用更改，等后面是否还要上浮
        arr[childIndex] = arr[parentIndex];

        //继续上一层，上浮
        childIndex = parentIndex;
        parentIndex = parseInt((childIndex - 1) / 2);
    }
    arr[childIndex] = temp;

}

function removeTop(arr) {
    arr[0] = arr[arr.length - 1];
    delete arr[arr.length];
    arr.length--;
    downAdjust(arr, 0)
}

let arr = [3, 1, 5, 4, 2];
buildHeap(arr);
console.log(arr);
removeTop(arr);
console.log(arr);