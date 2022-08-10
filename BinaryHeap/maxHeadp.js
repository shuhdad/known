class MaxBinaryHeap {

    constructor(arr) {
        this.arr = arr
        this.build();
    }

    get length() {
        return this.arr.length;
    }

    isEmpty() {
        return this.length == 0
    }

    insert(v) {
        this.arr.push(v);
        this.upAdjust(this.length - 1)
    }

    /**
     * 上浮节点，如果当前节点大于父节点，则与父节点兑换
     * @param {*} index 
     */
    upAdjust(childIndex) {
        let parentIndex = parseInt((childIndex - 1) / 2);
        let temp = arr[childIndex]
        while (parentIndex >= 0) {
            if (temp > arr[parentIndex]) {
                //父节点换下来
                arr[childIndex] = arr[parentIndex];
                //下个上浮的子节点，父节点
                childIndex = parentIndex;
                parentIndex = parseInt((childIndex - 1) / 2);
            }
        }
        arr[childIndex] = temp;
    }

    /**
     * 下沉节点，如果当前节点小于最大子节点，则与子节点替换
     * @param {*} parentIndex 
     */
    downAdjust(parentIndex, endIndex) {
        let childIndex = 2 * parentIndex + 1;
        let temp = arr[parentIndex];
        while (childIndex <= endIndex) {
            //取出最大子节点
            if (childIndex + 1 <= endIndex && arr[childIndex + 1] > arr[childIndex]) {
                childIndex = childIndex + 1
            }
            if (arr[childIndex] > temp) {
                arr[parentIndex] = arr[childIndex];
                parentIndex = childIndex;
                childIndex = 2 * parentIndex + 1;
            } else {
                break
            }
        }
        arr[parentIndex] = temp;
    }

    build() {
        let lastChild = this.length - 1;
        let lastParent = parseInt((lastChild - 1) / 2);
        for (let i = lastParent; i >= 0; i--) {
            this.downAdjust(i, this.length - 1);
        }
    }
    /**
     * 排序：依次删除定点，放在末端位置
     */
    sort() {
        let temp;
        for (let i = 0; i < this.length; i++) {
            //将顶点元素放置末端
            temp = this.arr[0];
            this.arr[0] = this.arr[this.length - 1 - i]
            this.arr[this.length - 1 - i] = temp;
            //对新的顶点元素进行下沉调整
            this.downAdjust(0, this.length - 2 - i)
        }
    }


}
let arr = [7, 1, 3, 10, 5, 2, 8, 9, 6]

let maxHeap = new MaxBinaryHeap(arr);
// console.log(maxHeap.arr)
maxHeap.sort();
console.log(maxHeap.arr)

// maxHeap.ins