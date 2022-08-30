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

function update(arr) {
    let objMap = {}
    arr.forEach(x => {
        if (x in objMap) {
            objMap[x] += objMap[x] == 0 ? 2 : 1
        } else {
            objMap[x] = 0;
        }
    })
    for (let i = arr.length - 1; i > 0; i--) {
        if (objMap[arr[i]] > 0) {
            arr[i] = `${arr[i]}${objMap[arr[i]]--}`
        }
    }
    return arr;
}

let arr = ['a', 'aaa', 'bb', 'aaa', 'ccc', 'bb', 'aaa']
let result = update(arr);
console.log('result: ', result);
