

//合并多个有序链表



















function combineLinks(list) {
    return combineLinkRange(list, 0, list.length - 1)
}

function combineLinkRange(list, start, end) {
    if (start > end) return null
    if (start == end) return list[start];
    let pivot = (start + end) >> 1;
    return combineTwoLinks(combineLinkRange(list, start, pivot), combineLinkRange(list, pivot + 1, end))
}

function combineTwoLinks(node1, node2) {
    let head = {
        next: null
    }
    let t1 = node1, t2 = node2;
    let cur = head;

    while (t1 && t2) {
        if (t1.value <= t2.value) {
            cur.next = t1;
            t1 = t1.next;
        } else {
            cur.next = t2;
            t2 = t2.next
        }
        cur = cur.next;
    }

    cur.next = t1 == null ? t2 : t1;
    return head.next;
}




let node1 = {
    value: 1,
    next: {
        value: 4,
        next: {
            value: 5,
            next: null
        }
    }
}

let node2 = {
    value: 1,
    next: {
        value: 3,
        next: {
            value: 7,
            next: null
        }
    }
}


let node3 = {
    value: 2,
    next: {
        value: 5,
        next: {
            value: 6,
            next: null
        }
    }
}

let rst = combineLinks([node1, node2, node3])
console.log('rst: ', JSON.stringify(rst));

