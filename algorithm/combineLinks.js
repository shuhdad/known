
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

function combineLinks(linkList) {
    return combineLinksRange(linkList, 0, linkList.length - 1)
}

function combineLinksRange(linkList, l, r) {
    if (l > r) {
        return null
    }
    if (l == r) {
        return linkList[l]
    }
    let mid = (l + r) >> 1;
    return combineTwoLinks(combineLinksRange(linkList, l, mid), combineLinksRange(linkList, mid + 1, r))
}

function combineTwoLinks(l1, l2) {
    let head = new ListNode();
    let tail = head; p1 = l1, p2 = l2
    while (p1 != null && p2 != null) {
        if (p1.value <= p2.value) {
            tail.next = new ListNode(p1.value, null)
            p1 = p1.next;
        } else {
            tail.next = new ListNode(p2.value, null)
            p2 = p2.next;
        }
        tail = tail.next
    }
    tail.next = p1 == null ? p2 : p1
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
            value: 4,
            next: null
        }
    }
}

let rst = combineLinks([node1, node2])
console.log('rst: ', JSON.stringify(rst));