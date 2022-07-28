let arr = [1, 2, 3]


console.log(arr);

function pop(arr) {
    let O = Object(arr);
    let len = arr.length >>> 0;
    if (len === 0) {
        O.length = 0;
        return undefined;
    }
    len--;
    let value = O[len];
    delete O[len];
    O.length = len;
    return value;
}

// pop(arr);

// delete arr[2];
arr.length = 2

console.log(arr);