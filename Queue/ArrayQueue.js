module.exports = class Queue {


    constructor() {
        this.arr = []
        this.front = 0;
        this.rear = 0;
    }

    enQueue(v) {
        this.arr[this.rear] = v;
        this.rear++;
    }

    deQueue() {
        if (this.front == this.rear) {
            throw new Error("队列已空！无元素可出队！")
        }
        let v = this.arr[this.front];
        delete this.arr[this.front];
        this.front++;
        return v
    }

    isEmpty() {
        return this.rear == this.front
    }

    get length() {
        return this.arr.length
    }
}
