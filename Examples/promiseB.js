const STATUS = {
    PENDING: "pending",
    FULLFILLED: "fullfilled",
    REJECTED: "rejected"
}
class PromiseB {
    constructor(fn) {
        this.value = null;
        this.status = STATUS.PENDING;
        this.onFullfilledCbList = []
        this.onRejectedCbList = []
        try {
            fn(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(value) {
        if (this.status == STATUS.PENDING) {
            this.status = STATUS.FULLFILLED
            this.value = value;
            this.onFullfilledCbList.forEach(onFullfilled => {
                onFullfilled(value)
            })
        }
    }

    reject(reason) {
        if (this.status == STATUS.PENDING) {
            this.status = REJECTED
            this.value = reason
            this.onRejectedCbList.forEach(onRejected => {
                onRejected(value)
            })
        }
    }

    then(onFullfilled, onRejected) {
        return new PromiseB((_resolve, _reject) => {
            if (this.status == STATUS.PENDING) {
                this.onFullfilledCbList.push(() => {
                    try {
                        let nextVal = onFullfilled(this.value)
                        if (nextVal instanceof PromiseB) {
                            nextVal.then(_resolve, _reject)
                        } else {
                            _resolve(nextVal)
                        }
                    } catch (error) {
                        _reject(error)
                    }
                })
                this.onRejectedCbList.push(() => {
                    try {
                        let nextVal = onRejected(this.value)
                        if (nextVal instanceof PromiseB) {
                            nextVal.then(_resolve, _reject)
                        } else {
                            _reject(nextVal)
                        }
                    } catch (error) {
                        _reject(error)
                    }
                })
            }
            if (this.status == STATUS.FULLFILLED) {
                try {
                    let nextVal = onFullfilled(this.value)
                    if (nextVal instanceof PromiseB) {
                        PromiseB.resolve(nextVal).then(_resolve, _reject)
                    } else {
                        _resolve(nextVal)
                    }
                } catch (error) {
                    _reject(error)
                }
            }
            if (this.status == STATUS.REJECTED) {
                try {
                    let nextVal = onRejected(this.value)
                    if (nextVal instanceof PromiseB) {
                        PromiseB.reject(nextVal).then(_resolve, _reject)
                    } else {
                        _reject(nextVal)
                    }
                } catch (error) {
                    _reject(error)
                }
            }

        })
    }

    static resolve(value) {
        if (value instanceof PromiseB) {
            return value
        }
        return new PromiseB((resolve) => {
            resolve(value)
        })
    }

    static reject() {
        return new PromiseB((resolve, reject) => {
            reject(value)
        })
    }

    static all(list) {
        return new PromiseB((resolve, reject) => {
            let count = 0;
            let result = []
            for (let i = 0; i < list.length; i++) {
                PromiseB.resolve(list[i]).then((value) => {
                    result[i] = value;
                    count++;
                    if (count == list.length) {
                        resolve(result);
                    }
                }, (reason) => {
                    reject(reason)
                })
            }
        })
    }

    static race() {
        return new PromiseB((resolve, reject) => {
            list.forEach(p => {
                PromiseB.resolve(p).then((value) => {
                    resolve(value);
                }, (reason) => {
                    reject(reason)
                })
            })
        })
    }

}