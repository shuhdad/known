function reverseLink(node){
    let cur = node;
    let prev;
    while(cur){
        let next = cur.next;
        cur.next = prev
        prev = cur
        cur = next;
    }
    return prev;
}


//由于JS中没有链表这种基础数据结构
//用Object模拟构造链表
let node1 = {
    data:1
}
let node2 = {
    data:2
}
let node3 = {
    data:3
}
let node4 = {
    data:4
}
node1.next = node2
node2.next = node3
node3.next = node4
console.log(JSON.stringify(node1));

let reverse = reverseLink(node1)
console.log('reverse: ', JSON.stringify(reverse));