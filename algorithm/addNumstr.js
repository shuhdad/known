function add(a, b) {
    let rstNumber = ""
    let m = a.length - 1;
    let n = b.length - 1;
    if (m < 0 && n < 0) {
        return 0;
    }
    let extraAddNum = 0;
    while (m >= 0 || n >= 0) {
        let mNum = m < 0 ? 0 : parseInt(a[m]);
        let nNum = n < 0 ? 0 : parseInt(b[n]);
        let cur = mNum + nNum + extraAddNum;
        if (cur >= 10) {
            extraAddNum = 1
            cur = cur % 10;
        } else {
            extraAddNum = 0
        }
        rstNumber = cur + rstNumber
        m--;
        n--
    }

    return (extraAddNum ? extraAddNum : "") + rstNumber;

}
let an = "998";
let bn = "123";
let rst = add(an, bn)
let rst2 = parseInt(an) + parseInt(bn);
console.log(rst, rst2);