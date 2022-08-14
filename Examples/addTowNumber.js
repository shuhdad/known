function addTowNumber(n1, n2) {
    let m = n1.length - 1;
    let n = n2.length - 1;
    let rst = ""
    let addOne = false;
    while (m >= 0 || n >= 0) {
        let cur = (m < 0 ? 0 : parseInt(n1[m]))
            + (n < 0 ? 0 : parseInt(n2[n]))
            + (addOne ? 1 : 0);
        if (cur >= 10) {
            cur = cur % 10;
            addOne = true;
        }else{
            addOne = false; 
        }
        rst = cur + rst
        m--;
        n--;
    }
    if (addOne) {
        rst = "1" + rst;
    }
    return rst;
}
let n1 = "9992";
let n2 = "9992";
let rst1 = addTowNumber(n1,n2)
console.log('rst1: ', rst1);