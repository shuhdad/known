/**
 * 时间复杂度O(n)
 * 空间复杂度O(n)，可以优化至O(1)
 * @param {*} node 
 * @returns 
 */
function isCycle(node) {
    if (!node || !node.next) return false;
    let linkSet = new Set();
    while (!!node) {
        if (linkSet.has(node.next))
            return true;
        linkSet.add(node);
        node = node.next;
    }
    return false;
}

/**
 * 优化版：空间复杂度为O(1)
 * 只是声明了2个指正与node长度无关为常量，故空间复杂度为O(1)
 * @param {*} node 
 */
function isCycle2(node) {
    if (!node || !node.next) return false;
    let p1 = node, p2 = node;
    while (!!p2 && !!p2.next) {
        p1 = p1.next;
        p2 = p2.next.next;
        if (p1 == p2) return true;
    }
    return false;

}

/**
 * 获取链表长度，考虑环列表
 */
function getLinkLength(node) {
    let linkSet = new Set();
    while (!!node ) {
        if (linkSet.has(node)) {
            break;
        }
        linkSet.add(node);
        node = node.next;
    }
    return linkSet.size
}


//由于JS中没有链表这种基础数据结构
//用Object模拟构造链表
let node1 = {
    data: 1
}
let node2 = {
    data: 2
}
let node3 = {
    data: 3
}
let node4 = {
    data: 4
}
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node2

let rst = isCycle(node1)
console.log(rst);

let length = getLinkLength(node1);
console.log('length: ', length);