class Queue<T>{

    arr: Array<T>
    front: number
    rear: number
    constructor() {
        this.arr = []
        this.front = 0;
        this.rear = 0;
    }

    enQueue(v: T) {
        this.arr[this.rear] = v;
        this.rear++;
    }

    deQueue(): T {
        if (this.front == this.rear) {
            throw new Error("队列已空！无元素可出队！")
        }
        let v = this.arr[this.front];
        delete this.arr[this.front];
        this.front++;
        return v
    }

    isEmpty(): boolean {
        return this.rear == this.front
    }

    get length() {
        return this.arr.length
    }
}

export default Queue;