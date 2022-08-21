class PromiseA {
    constructor(fn) {
        this.status = "pending"
        this.val = null;
        this.onFullfilledCallBack = []
        this.onRejectedCallBack = []
        try {
            fn(this.resolve, this.reject);
        } catch (error) {
            this.reject(error)
        }
    }
    resolve = (val) => {
        if (this.status == "pending") {
            this.status = "fullfilled";
            this.val = val;
            this.onFullfilledCallBack.forEach((onFulfilled) => {
                onFulfilled(val)
            })
        }
    }

    reject = (reaseon) => {
        if (this.status == "pending") {
            this.status = "rejected";
            this.val = reaseon;
            this.onRejectedCallBack.forEach((onRejected) => {
                onRejected(reaseon)
            })
        }
    }

    then(onFullfilled, onRejected) {
        return new PromiseA((resolve, reject) => {
            const nextCallBack = callBack => val => {
                try {
                    let nextVal = callBack(val)
                    if (nextVal instanceof PromiseA) {
                        nextVal.then(resolve, reject)
                    } else {
                        resolve(nextVal)
                    }
                } catch (error) {
                    reject(error)
                }
            }
            if (this.status == "pending") {
                this.onFullfilledCallBack.push(
                    nextCallBack(onFullfilled)
                )
                this.onRejectedCallBack.push(
                    nextCallBack(onRejected)
                )
            }
            if (this.status == "fullfilled") {
                nextCallBack(onFullfilled)(this.val)
            }
            if (this.status == "rejected") {
                nextCallBack(onRejected)(this.val)
            }
        })
    }

    static all(list) {
        return new PromiseA((_resolve, _reject) => {
            let result = []
            let count = 0;
            for (let i = 0; i < list.length; i++) {
                PromiseA.resolve(list[i]).then((_value) => {
                    result[i] = _value
                    count++
                    //这里需要注意，不能利用result.length
                    //因为可能即使没有赋值索引0，先赋值索引1的值
                    //result.length === 2
                    if (count == list.length) {
                        _resolve(result);
                    }
                }, (_reason) => {
                    _reject(_reason)
                })
            }
        })
    }
    static race(list) {
        return new PromiseA((_resolve, _reject) => {
            list.forEach(p => {
                PromiseA.resolve(p).then((_value) => {
                    _resolve(_value);
                }, (_reason) => {
                    _reject(_reason);
                })
            })
        })
    }
    static resolve(v) {
        if (v instanceof PromiseA) {
            return v
        }
        return new PromiseA((_resolve) => {
            _resolve(v);
        })
    }
    static reject() {
        return new PromiseA((_resolve, _reject) => {
            _reject(v);
        })
    }
}

// testing
const promise1 = new PromiseA((resolve, reject) => {
    setTimeout(resolve, 2000, 'one');
});
const promise2 = new PromiseA((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
});
const promise3 = new PromiseA((resolve, reject) => {
    setTimeout(reject, 3000, 'three');
});
PromiseA.all([promise1, promise2, promise3]).then((value) => {
    console.log(JSON.stringify(value));
    // Both resolve, but promise2 is faster
}, err => console.log("err:" + err));
