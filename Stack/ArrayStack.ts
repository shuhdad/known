import TreeNode from "../BinaryTree/TreeNode";

class Stack<T>{

    arr: Array<T>

    constructor() {
        this.arr = []
    }
    /**
     * 入栈
     * @param v 入栈元素
     */
    push(v: T) {
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

    isEmpty(): boolean {
        return this.arr.length == 0
    }
}

export default Stack;

