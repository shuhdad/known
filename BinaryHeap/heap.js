/**
 * 最小二叉堆
 */
class MinimumBinaryHeap {

    constructor(arr) {
        this.arr = arr || [];
        this.buildHeap();
    }

    insert(v) {
        this.arr[this.length] = v;
        this._upAdjust(this.length - 1);
        console.log(this.arr);
    }

    delete(index) {
        this.arr[index] = this.arr[this.length - 1];
        this._downAdjust(index)
        console.log(this.arr);
    }

    buildHeap() {
        let parentIndex = parseInt((this.length - 2) / 2)
        for (let i = parentIndex; i >= 0; i--) {
            this._downAdjust(i);
        }

        console.log(this.arr);
    }

    get length() {
        return this.arr.length;
    }

    /**
     * 上浮调整
     * @param {*} arr 
     * @param {*} v 
     */
    _upAdjust(childIndex) {
        if (childIndex <= 0) return;
        let parentIndex = parseInt((childIndex - 1) / 2);
        let temp = this.arr[childIndex];
        while (childIndex > 0) {
            if (temp < this.arr[parentIndex]) {
                this.arr[childIndex] = this.arr[parentIndex]
                childIndex = parentIndex;
                parentIndex = parseInt((childIndex - 1) / 2);
            }else{
                break;
            }
        }
        //最终赋值索引，用的是childIndex
        //因为在交换内部，已经把childIndex更新为上一个parentIndex
        //并且，如果未发生交换，childIndex为原值
        this.arr[childIndex] = temp;
    }

    /**
     * 下沉调整
     * @param {*} arr 
     * @param {*} pIndex 
     */
    _downAdjust(parentIndex) {
        if (parentIndex >= this.length) return;
        let temp = this.arr[parentIndex];
        //左节点索引
        let childIndex = 2 * parentIndex + 1;
        while (childIndex < this.length ) {
            //如果存在右节点，并且右节点比左节点小，那么后面就用右节点替换
            if (childIndex + 1 < this.length && this.arr[childIndex + 1] < this.arr[childIndex]) {
                childIndex = childIndex + 1
            }
            if (temp > this.arr[childIndex]) {
                this.arr[parentIndex] = this.arr[childIndex];
                parentIndex = childIndex;
                childIndex = 2 * parentIndex + 1
            }else{
                break;
            }
        }
        //最终更新的索引用的是parentIndex
        //因为在交换的内部，已经把parentIndex更新为上一个childIndex
        //并且，如果未发生交换，parentIndex为原值
        this.arr[parentIndex] = temp;

    }
}

let bHeap = new MinimumBinaryHeap([7, 1, 3, 10, 5, 2, 8, 9, 6]);

bHeap.insert(4)
bHeap.delete(0)
