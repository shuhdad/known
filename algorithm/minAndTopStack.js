/**
 * initialize your data structure here.
 */
var MinStack = function () {
    this.arr = [];
    this.minArr = []
    this.maxArr = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
    this.arr.push(x);
    if (this.minArr.length == 0 || this.minArr[this.minArr.length - 1] >= x) {
        this.minArr.push(x)
    }
    if (this.maxArr.length == 0 || this.maxArr[this.maxArr.length - 1] <= x) {
        this.maxArr.push(x)
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    let popVal = this.arr.pop();
    if (popVal == this.minArr[this.minArr.length - 1]) {
        this.minArr.pop()
    }
    if (popVal == this.maxArr[this.maxArr.length - 1]) {
        this.maxArr.pop()
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.maxArr[this.maxArr.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
    return this.minArr[this.minArr.length - 1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 */

var obj = new MinStack()
obj.push(-2)
obj.push(0)
obj.push(-1)
var param_3 = obj.top()
console.log('param_3: ', param_3);
var param_4 = obj.min()
console.log('param_4: ', param_4);