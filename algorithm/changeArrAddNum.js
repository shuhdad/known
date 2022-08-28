function changeArrWithNum(arr) {
    let countObj = {}
    arr.forEach(element => {
        if (element in countObj) {
            countObj[element] = countObj[element]
                ? (countObj[element] + 1)
                : 2;
        } else {
            countObj[element] = 0
        }
    });
    console.log('countObj: ', countObj);
    for (let i = arr.length - 1; i > 0; i--) {
        let key = arr[i]
        if (countObj[key] > 0) {
            arr[i] = `${arr[i]}${countObj[key]--}`
        }
    }
   
    return arr;
}
let arr = ['a', 'aaa', 'bb', 'aaa', 'ccc', 'bb', 'aaa']
let result = changeArrWithNum(arr);
console.log('result: ', result);
