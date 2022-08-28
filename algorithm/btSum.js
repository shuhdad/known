/**
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。
 * 判断该树中是否存在 根节点到叶子节点 的路径，
 * 这条路径上所有节点值相加等于目标和 targetSum 。
 * 如果存在，返回 true ；否则，返回 false 。
 * 叶子节点 是指没有子节点的节点。
 */
/**
 * Definition for a binary tree root.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function checkNodeHasPathSum(root, targetSum) {
    let cur = root;
    let stack = new Array();
    let sum = 0
    let prePop;
    while (cur != null || stack.length > 0) {
        while (cur != null) {
            sum += cur.val;
            stack.push(cur)
            cur = cur.left
        }
        let popCur = stack.pop();
        if (popCur.right == null) {
            if (popCur.left != prePop && sum == targetSum) {
                return true;
            } else {
                sum -= popCur.val;
                prePop = popCur;
            }
        } else {
            if (popCur.right != prePop) {
                cur = popCur.right
                stack.push(popCur);
            } else {
                sum -= popCur.val
                prePop = popCur;
            }

        }
    }
    return false;
}

/**
 * 递归思路
 * @param {*} root 
 * @param {*} targetSum 
 * @returns 
 */
function checkNodeHasPathSumV2(root, targetSum) {
    if (root == null) {
        return false
    }
    if (root.left == null && root.right == null) {
        return root.val == targetSum;
    }
    return checkNodeHasPathSumV2(root.left, targetSum - root.val) ||
    checkNodeHasPathSumV2(root.right, targetSum - root.val)
}

let root = {
    val: 5,
    left: {
        val: 4,
        left: {
            val: 11,
            left: {
                val: 7
            },
            right: {
                val: 2
            }
        }
    },
    right: {
        val: 8,
        left: {
            val: 13
        },
        right: {
            val: 4,
            right: {
                val: 1
            }
        }
    }
}
let v = checkNodeHasPathSumV2(root, 22)
console.log('v: ', v);