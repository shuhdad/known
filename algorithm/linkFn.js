/**
 * 编写程序使如下代码得以实现
 * u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')
 */




















class U {
    constructor() {
        this.status = 0
        this.timer = Promise.resolve();
    }

    console(txt) {
        this.timer.then(() => {
            console.log(txt)
        })
        return this
    }
    setTimeout(timeout) {
        this.status = 1
        //这一步并不只是简单的，将原先的promise后追加then
        //而是重新赋值this.time= this.time.then返回的promise
        this.timer = this.time.then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, timeout);
            })
        })
        return this;
    }
}
let u = new UU();
u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')
