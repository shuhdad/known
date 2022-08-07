/**
 * 这里实现的是计数排序
 * 分别实现了3种：
 * 1.普通实现，即正常创建一个计数数组，再遍历这个计数数组输出元素
 * 2.优化数组长度，第一版的优化版
 *  我们创建一个计数数组时，指定他的容量为max-min+1
 * 3.在基于第二种实现的前提下，将计数数组转换一下，
 *  每个元素值加上前面所有元素的值，后面用于排序数组放置元素的索引位置
 *  即sortIndex = countVal - 1 
 ******************************************************** 
 * 计数数组的时间复杂度为O(n)，性能高
 * 却存在使用的局限性：
 *  1.对于最大值与最小值差值太大不适合，因为计数数组的容量根据这个差值决定的.
 *  2.只能对整数进行排序，因为他利用的就是数组的下标(肯定为整数)
 *    计数数组下标=原数组值-offSet
 *    其中，offset=min
 */

/**
 * 对0~10的数组，进行排序
 * @param {*} arr 
 */
function countSort(arr) {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        temp[arr[i]] = (temp[arr[i]] ?? 0) + 1
    }
    let index = 0;
    for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i]; j++) {
            arr[index] = i;
            index++;
        }

    }
}

/**
 * 改进版：
 * 初始化数据长度，且填满0
 * 数组的长度初始化为max-min+1
 * 索引偏移量为-min
 * arr[value-min]++
 * @param {*} arr 
 * @returns 
 */
function countSortV2(arr) {
    let max = 0, min = 0
    arr.forEach(element => {
        if (element < min) {
            min = element
        } if (element > max) {
            max = element
        }
    });
    if (max == min) return arr;
    let offset = min;
    let countArr = new Array(max - min + 1).fill(0)
    arr.forEach(element => {
        countArr[[element - offset]]++
    });

    let rstIndex = 0
    countArr.forEach((element, i) => {
        while (element-- > 0) {
            arr[rstIndex] = i + offset
            rstIndex++
        }
    })
}

function countSort_stable(arr) {
    let min = 0, max = 0;
    arr.forEach(x => {
        if (x > max)
            max = x
        if (x < min)
            min = x
    })
    //先构造一个计数数组
    let countArr = new Array(max - min + 1).fill(0);
    arr.forEach((x, i) => {
        countArr[x - min]++
    })
    //改造计数数组:每一项都加上之前元素的和值
    //使得存的值代表：1.有值，2.值所在位置
    countArr.forEach((x, i) => {
        if (i < countArr.length - 1) {
            countArr[i + 1] = countArr[i] + countArr[i + 1]
        }
    })
    let sortedArr = new Array(arr.length);
    for (let index = arr.length - 1; index >= 0; index--) {
        let value = arr[index];
        sortedArr[countArr[value - min] - 1] = value;
    }
    return sortedArr;
}

let origArr = [99, 102, 111, 103, 106, 104]
// countSort(origArr);
// console.log('origArr: ', origArr);
// countSortV2(origArr);
// console.log('origArr: ', origArr);


let sortArr3 = countSort_stable(origArr)
console.log('sortArr3: ', sortArr3);