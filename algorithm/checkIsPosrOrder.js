function verifyPostorder(postorder) {
    let n = postorder.length - 1
    const checkSub = function (left, right) {
        if (left >= right) return true;
        let rootVal = postorder[right];
        let subRightLength = 0;
        let passRight = false;
        for (i = right - 1; i >= left; i--) {
            if (postorder[i] > rootVal) {
                subRightLength++
                if (passRight) {
                    return false;
                }
            } else {
                passRight = true;
            }
        }
        return checkSub(right - subRightLength, right - 1)
            && checkSub(left, right - subRightLength - 1);

    }
    return checkSub(0, n)
}

let arr = [1, 2, 5, 10, 6, 9, 4, 3];

let rst = verifyPostorder(arr);
console.log('rst: ', rst);