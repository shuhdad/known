/**
 * 这里解决了链表的出现环的3个问题：
 * 1.是否带环？
 * 2.环的长度？
 * 3.入环节点？
 * ********************************************************************
 * 需要铺垫的知识点：（想了很久才想明白，值得多次复习）
 * 对于一个环而言，2个指针p1/p2，同位置出发，如果速度不一样，则肯定相遇
 * 如果相遇，则p1、p2移动的距离的差值，肯定是这个n个环（n≥1）
 * 如果速度差为1，则n=1.因为无论环长多少，都能整除1
 * ********************************************************************
 * 对于n≠1的情况举例：p1速度1，p2速度3，环长为5。速度差=3-1=2。
 * 则相遇时，不可能多跑一圈，因为移动了t（t为正整数）次的情况下，2*t不可能=5
 * 所以就p2比p1需要多出2圈，移动了t=5次。即2*5=5*2
 */

/**
 * 时间复杂度O(n)
 * 空间复杂度O(n)，可以优化至O(1)
 * @param {*} node 
 * @returns 
 */
// function isCycle(node) {
//     if (!node || !node.next) return false;
//     let linkSet = new Set();
//     while (!!node) {
//         if (linkSet.has(node.next))
//             return true;
//         linkSet.add(node);
//         node = node.next;
//     }
//     return false;
// }

/**
 * 优化版：空间复杂度为O(1)
 * 只是声明了2个指正与node长度无关为常量，故空间复杂度为O(1)
 * @param {*} node 
 */
function checkIsCycle(node) {
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
 * 获取环的长度
 * 
 */
function getCycleLength(node) {
    let p1 = node;
    let p2 = node;
    while (!!p2 && !!p2.next) {
        p1 = p1.next
        p2 = p2.next.next
        //首次相遇
        if (p1 == p2) {
            break;
        }
    }
    //链表无环，直接返回0
    if (p1 != p2) return 0;
    //链表环长
    let cycleLength = 0
    //p1、p2相遇后再次前进，当下次相遇时，本次前进的次数就是环长。
    do {
        p1 = p1.next;
        p2 = p2.next.next;
        cycleLength++
    }
    while (p1 != p2);
    return cycleLength;
}

/**
 * 获取带环链表的入环节点
 * 1.p1、p2一起从头结点出发，p1每次走一步，p2每次走2步
 * 2.第一次相遇时，证明优化的同时，记录下这个相遇节点
 * 3.p1从头结点出发，p2从第一步中相遇节点出发
 *   两者每次走一步，相遇时，即为入环节点
 * 论据：2(D+S1)=D+S1+(S1+S2) -> D=S2
 * @param {*} node 
 */
function getCycleEntryNode(node) {
    let p1 = node;
    let p2 = node;
    let firstMeetNode = null;
    while (!!p2 && !!p2.next) {
        p1 = p1.next;
        p2 = p2.next.next;
        if (p1 == p2) {
            firstMeetNode = p1;
            break;
        }
    }
    //链表无环，返回空
    if (!firstMeetNode) return null;
    p1 = node;
    p2 = firstMeetNode;
    //如果头结点就是相遇节点，则当前链表是一个环形链表
    //入环节点即为头节点
    if (node == firstMeetNode) {
        return node;
    }
    do {
        p1 = p1.next
        p2 = p2.next
    } while (p1 != p2)
    return p1;
}


const node1 = require("./Test/node1")
let isCycle = checkIsCycle(node1)
console.log('isCycle: ', isCycle);

let cycleLength = getCycleLength(node1);
console.log('cycleLength: ', cycleLength);

let entryNode = getCycleEntryNode(node1);
console.log('entryNode: ', entryNode);

