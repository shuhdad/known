class MyPromise {
    constructor(handler) {
        this.status = "pending";
        this.value = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        try {
            handler(this.resolve, this.reject);
        } catch (err) {
            this.reject(err);
        }
    }

    resolve = value => {
        if (this.status === "pending") {
            this.status = "fulfilled";
            this.value = value;
            this.onFulfilledCallbacks.forEach(fn => fn(value));
        }
    };

    reject = value => {
        if (this.status === "pending") {
            this.status = "rejected";
            this.value = value;
            this.onRejectedCallbacks.forEach(fn => fn(value));
        }
    };


    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            if (this.status === "pending") {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        const fulfilledFromLastPromise = onFulfilled(this.value);
                        if (fulfilledFromLastPromise instanceof MyPromise) {
                            fulfilledFromLastPromise.then(resolve, reject);
                        } else {
                            resolve(fulfilledFromLastPromise);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        const rejectedFromLastPromise = onRejected(this.value);
                        if (rejectedFromLastPromise instanceof MyPromise) {
                            rejectedFromLastPromise.then(resolve, reject);
                        } else {
                            reject(rejectedFromLastPromise);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
            }

            if (this.status === "fulfilled") {
                try {
                    const fulfilledFromLastPromise = onFulfilled(this.value);
                    if (fulfilledFromLastPromise instanceof MyPromise) {
                        fulfilledFromLastPromise.then(resolve, reject);
                    } else {
                        resolve(fulfilledFromLastPromise);
                    }
                } catch (err) {
                    reject(err);
                }

            }

            if (this.status === "rejected") {
                try {
                    const rejectedFromLastPromise = onRejected(this.value);
                    if (rejectedFromLastPromise instanceof MyPromise) {
                        rejectedFromLastPromise.then(resolve, reject);
                    } else {
                        reject(rejectedFromLastPromise);
                    }
                } catch (err) {
                    reject(err);
                }
            }
        });

    }




    static all(promises) {
        return new MyPromise((resolve, reject) => {
            let counter = 0;
            const result = [];
            for (let i = 0; i < promises.length; i++) {
                MyPromise.resolve(promises[i]).then(res => {
                    result[i] = res;
                    counter += 1;
                    // this check need to be here, otherwise counter would remain 0 till forloop is done
                    if (counter === promises.length) {
                        resolve(result);
                    }
                }, err => {
                    reject(err);
                });
            }
        });
    };

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            for (let p of promises) {
                MyPromise.resolve(p).then(res => resolve(res), err => reject(err));
            }
        });
    }

    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        } else {
            return new MyPromise((resolve, reject) => {
                resolve(value);
            });
        }
    };

    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }
}

//自己实现的输出依次为1/2/3
console.log(1)
// testing code
let p1 = new MyPromise((resolve, reject) => {
    resolve(2)
}).then((v)=>{
    console.log(v)
});
console.log(3)

//以下为原生Promise
//因为时间循环机制，promise.then会被加入一个内部队列
//不会立马执行 所以输出为1/3/2
// console.log(1)
// // testing code
// let p1 = new Promise((resolve, reject) => {
//     resolve(2)
// }).then((v)=>{
//     console.log(v)
// });
// console.log(3)


