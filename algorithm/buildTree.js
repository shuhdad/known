const TreeNode = require("../BinaryTree/TreeNode");

/**
 * 给出一个二叉树的前序遍历结果+中序遍历结果
 * 求出该二叉树
 */



















let inorderMap = new Map()
function buildSubTree(preOrder, inOrder, pre_left, pre_right, in_left, in_right) {
    if (pre_left > pre_right) {
        return null
    }
    //前序遍历结果第一个元素就是根节点
    let rootVal = preOrder[pre_left];
    //根据根节点的值创建本次返回的树
    let rootNode = new TreeNode(rootVal)
    //获取根节点索引
    let rootIndex = inorderMap.get(rootVal);
    let leftSize = rootIndex - in_left
    //左子树构建
    rootNode.left = buildSubTree(preOrder, inOrder,
        pre_left + 1, pre_left + leftSize,
        in_left, rootIndex - 1)
    //右子树构建
    rootNode.right = buildSubTree(preOrder, inOrder,
        pre_left + leftSize + 1, pre_right,
        rootIndex + 1, in_right)

    return rootNode;
}

function buildTree(preOrder, inOrder) {
    inOrder.forEach((element, index) => {
        inorderMap.set(element, index)
    });
    return buildSubTree(preOrder, inOrder, 0, preOrder.length - 1, 0, preOrder.length - 1)
}



let preOrder = [3, 9, 20, 15, 7], inOrder = [9, 3, 15, 20, 7];
let sourceTree = buildTree(preOrder, inOrder)
console.log('sourceTree: ', JSON.stringify(sourceTree));


