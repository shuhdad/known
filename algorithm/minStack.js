/**
 * 实现一个栈，且含有可以获取最小值的getMin实现。
 * 要求：出栈、入栈、getMin的时间复杂度都是O(1)
 */
class MinStack {
    constructor() {
        this.arr = []
        this.minArr = []
    }

    pop() {
        let rst = this.arr.pop()
        if (rst == this.minArr[this.minArrLength - 1]) {
            this.minArr.pop();
        }
        return rst;
    }

    get minArrLength() {
        return this.minArr.length;
    }


    push(v) {
        this.arr.push(v);
        if (this.minArrLength == 0 || v <= this.minArr[this.minArrLength - 1]) {
            this.minArr.push(v);
        }
    }

    getMin() {
        if (this.minArrLength == 0) {
            console.error("stack is empty")
            return null;
        }
        return this.minArr[this.minArrLength - 1]
    }
}

let stack = new MinStack();

stack.push(7)
stack.push(3)
stack.push(4)
stack.push(1)
stack.push(3)

console.group("First")
console.log("stack.arr: ", stack.arr);
console.log('stack.getMin(): ', stack.getMin());
console.groupEnd()

console.group("Second")
console.log('stack.pop(): ', stack.pop());
console.log("stack.arr: ", stack.arr);
console.log('stack.getMin(): ', stack.getMin());
console.groupEnd()

console.group("Third")
console.log('stack.pop(): ', stack.pop());
console.log("stack.arr: ", stack.arr);
console.log('stack.getMin(): ', stack.getMin());
console.groupEnd()

console.group("Fouth")
console.log('stack.pop(): ', stack.pop());
console.log('stack.pop(): ', stack.pop());
console.log('stack.pop(): ', stack.pop());
console.log('stack.getMin(): ', stack.getMin());
console.groupEnd()