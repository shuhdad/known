//冒泡-最基础排序 
function sort(arr) {
    if (!arr || arr.length <= 1)
        return arr;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j + 1] < arr[j]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

/**
 * 冒泡排序优化
 * 优化点点：
 * 1.添加isSorted标识是否已经排序完成，如是，则无需在进行后面的遍历
 * 2.记录最后交换的位置索引，在索引后面的位置无需再进行遍历
 * @param {*} arr 
 * @returns 
 */
function sort2(arr) {
    if (!arr || arr.length <= 1)
        return arr;
    let temp = 0
    let sortBorder = arr.length - 1;
    for (let i = 0; i < arr.length - 1; i++) {
        let isSorted = true;
        for (let j = 0; j < sortBorder; j++) {
            if (arr[j + 1] < arr[j]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                isSorted = false;
                lastExchangeIndex = j
            }
        }
        sortBorder = lastExchangeIndex
        if (isSorted) break;
    }
}
/**
 * 冒泡-鸡尾酒排序
 * 使用此算法可以减少总的排序回合，但是会增加代码量
 * 所以设想使用场景：
 * 1.对一个大部分有序的列表进行排序
 * 2.对一个完全有序，却被混入了n（n>1）个未知数字的列表
 * 使用此算法将会很有效率
 */
function sort3(arr) {
    let temp = 0
    for (let i = 0; i < arr.length / 2; i++) {
        let isSorted = true;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                isSorted = false;
            }
        }
        for (let j = arr.length - 1; j > i; j--) {
            if (arr[j] < arr[j - 1]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                isSorted = false;
            }
        }
        if (isSorted) break;
    }
}

let arr = [1, 2, 3, 4, 8, 5, 7, 13, 12, 10, 11];

sort3(arr);
console.log('arr: ', arr);

