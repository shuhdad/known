// 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)
// B是A的子结构， 即 A中有出现和B相同的结构和节点值。
// 例如:
// 给定的树 A:
//      3
//     / \
//    4   5
//   / \
//  1   2
// 给定的树 B：
//    4 
//   /
//  1
// 返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。
function isSubStructure(parent, child, isStrict = false) {
    if (child == null) return false;
    let cur = parent;
    let stack = new Array();
    let rst = false;

    while (cur != null || stack.length > 0) {
        while (cur != null) {
            stack.push(cur)
            if (cur.val == child.val) {
                if (child.left == null && child.right == null) {
                    rst = true
                } else if (child.left == null) {
                    rst = isSubStructure(cur.right, child.right, true)
                } else if (child.right == null) {
                    rst = isSubStructure(cur.left, child.left, true)
                } else {
                    rst = isSubStructure(cur.left, child.left, true) && isSubStructure(cur.right, child.right, true)
                }
                if (rst) return rst;

            }
            if (isStrict) return false;
            cur = cur.left
        }
        let popNode = stack.pop();
        if (popNode.right != null) {
            cur = popNode.right
        }
    }
    return false;
}

function isSubStructureV2(parent, child) {
    if (parent == null || child == null)
        return false;
    return recur(parent, child) || isSubStructureV2(parent.left, child)
        || isSubStructureV2(parent.right, child)
}

function recur(parent, child) {
    if (child == null) return true;
    if (parent == null || parent.val != child.val) return false;
    return recur(parent.left, child.left) && recur(parent.right, child.right);
}


let p = {
    val: 4,
    left: {
        val: 2,
        left: {
            val: 4,
            left: {
                val: 8
            },
            right: {
                val: 9
            }
        },
        right: {
            val: 5
        }
    },
    right: {
        val: 3,
        left: {
            val: 6
        },
        right: {
            val: 7
        }
    }
}
let c = {
    val: 4,
    left: {
        val: 8
    },
    right: {
        val: 9
    }
}

let p2 = {
    val: 1,
    left: {
        val: 0,
        left: {
            val: -4,
        },
        right: {
            val: -3
        }
    },
    right: {
        val: 1
    }
}
let c2 = {
    val: 1,
    left: {
        val: -4
    }
}
let rst = isSubStructureV2(p2, c2)
console.log('rst: ', rst);