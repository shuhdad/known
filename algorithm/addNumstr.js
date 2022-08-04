function add(a, b) {
    let rstNumber = ""
    let m = a.length - 1;
    let n = b.length - 1;
    if (m <= 0 && n <= 0) {
        return 0;
    }
    let extraAddNum = 0;
    while (m >= 0 || n >= 0) {
        let mNum = m < 0 ? 0 : parseInt(a[m]);
        let nUmber = n < 0 ? 0 : parseInt(a[n]);
        let cur = mNum + nUmber + extraAddNum;
        if (cur > 10) {
            extraAddNum = 1
            cur = cur % 10;
        }

        rstNumber = cur + rstNumber


        m--;
        n--
    }

    return extraAddNum + rstNumber;

}

let rst = add("123","234")

console.log(rst);