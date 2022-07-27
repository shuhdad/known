/**
 * 树节点
 */
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val: number) {
        this.val = val
        this.left = null;
        this.right = null;
    }
}

export default TreeNode;