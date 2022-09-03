/**
 * 一个无序整数数组中，有99个整数出现了，只有一个数字出现奇数次数。
 * 找出这个奇数
 * @param {*} arr 
 */
function findOneOddNumber(arr) {

    let xorResult = 0;
    arr.forEach(element => {
        xorResult ^= element
    });
    return xorResult;
}

// let arr = [1, 2, 2, 3, 3, 1, 6, 5, 6];
// let oddNum = findOneOddNumber(arr);
// console.log('oddNum: ', oddNum);

/**
 * 一个无序整数数组中，有99个整数出现了，有2个数字出现奇数次数。
 * 找出这2个奇数
 */
function findTwoOddNumber(arr) {
    let xorResult = 0
    arr.forEach(element => {
        xorResult ^= element;
    });
    //找到2个奇数不同的位数位置
    let seperator = 1;
    while (seperator != (seperator & xorResult)) {
        seperator = seperator << 1;
    }
    let oddRst = [0, 0]
    //根据那个不同位置，将数组分2不分进行异或运算
    arr.forEach(element => {
        if (seperator == (seperator & element)) {
            oddRst[0] ^= element
        } else {
            oddRst[1] ^= element
        }
    });
    return oddRst;
}

let arr2 = [2, 2, 3, 3, 13, 9, 9, 5, 5, 11];
let twoOddNumRst = findTwoOddNumber(arr2);
console.log('oddNum: ', twoOddNumRst);
