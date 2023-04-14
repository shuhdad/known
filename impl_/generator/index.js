function* generator() {
    let a = yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 1000)
    })
    console.log("a：", a)
    let b = yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2)
        }, 1000)
    })

    yield function(){
        
    }
    console.log("b：", b)
}

let run = function () {
    return new Promise((resolve, reject) => {
        let gen = generator();
        function next(val) {
            let rst = gen.next(val);
            if (rst.done) {
                resolve(rst.value)
            };
            rst.value.then((_v) => {
                next(_v)
            }, (error) => {
                reject(error)
            })
        }
        next();
    })
}
run();