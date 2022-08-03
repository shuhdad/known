
module.exports = class Stack{

    constructor() {
        this.arr = []
    }
    /**
     * 入栈
     * @param v 入栈元素
     */
    push(v) {
        this.arr.push(v)
    }

    /**
     * 出栈
     * @returns 出栈元素
     */
    pop() {
        return this.arr.pop()
    }

    length() {
        return this.arr.length;
    }

    isEmpty() {
        return this.arr.length == 0
    }
}
