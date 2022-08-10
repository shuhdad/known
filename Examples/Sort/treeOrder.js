const Stack = require("../../Stack/ArrayStack");

class TreeNode {
    constructor(v) {
        this.value = v;
        this.left = null;
        this.right = null
    }
}

class BSTree {

    constructor() {
        this.root = null
    }
    insert(v) {
        let newNode = new TreeNode(v)
        if (this.root == null) {
            this.root = newNode
        } else {
            this.insert_node(this.root, newNode)
        }
    }
    insert_node(parentNode, newNode) {
        if (newNode.value < parentNode.value) {
            if (parentNode.left == null) {
                parentNode.left = newNode
            } else {
                this.insert_node(parentNode.left, newNode)
            }
        } else {
            if (parentNode.right == null) {
                parentNode.right = newNode
            } else {
                this.insert_node(parentNode.right, newNode)
            }
        }
    }

    preOrder(cb) {
        this.preOrder_Node(this.root, cb)
    }

    preOrder_Node(node, cb) {
        cb(node.value);
        while (node.left) {
            preOrder(node.left, cb);
        }
        while (node.right) {
            preOrder(node.right, cb);
        }
    }

    preOrderWithStack(cb) {
        if (this.root == null) return;
        let node = this.root;
        let stack = new Stack();
        while (!stack.isEmpty() || node != null) {
            if (node != null) {
                cb(node.value);
                stack.push(node);
                node = node.left
            } else {
                let popNode = stack.pop();
                node = popNode.right
            }
        }
    }

    inOrderWithStack(cb) {
        if (this.root == null) return;
        let node = this.root;
        let stack = new Stack();
        while (!stack.isEmpty() || node != null) {
            if (node != null) {
                stack.push(node);
                node = node.left
            } else {
                let popNode = stack.pop()
                cb(popNode.value)
                node = popNode.right;
            }
        }
    }

    postOrderWithStack(cb) {
        if (this.root == null) return;
        let node = this.root;
        let stack = new Stack();
        let preNode;
        while (!stack.isEmpty() || node != null) {
            if (node != null) {
                stack.push(node)
                node = node.left;
            } else {
                let popNode = stack.pop();
                if (popNode.right == null || popNode.right == preNode) {
                    preNode = popNode;
                    cb(popNode.value)
                    node = null
                } else {
                    stack.push(popNode)
                    node = popNode.right;
                }
            }
        }
    }

    findMin_Node(node) {
        let min = node
        while (min != null && min.left != null) {
            min = min.left
        }
        return min
    }



    remove(v) {
        this.remove_node(this.root, v)
    }

    remove_node(node, v) {
        if (v < node.value) {
            node.left = this.remove_node(node.left, v)
            return node;
        } else if (v > node.value) {
            node.right = this.remove_node(node.right, v)
            return node;
        } else {
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            } else if (node.left == null) {
                node = node.right
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            } else {
                //右子节点最小节点
                let minRight = this.findMin_Node(node.right)
                node.value = minRight.value;
                this.remove_node(node.right, minRight.value)
                return minRight;
            }
        }
    }



}


//创建一个二叉树实例
let bst = new BSTree();
var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]
//构建二叉树
nodes.forEach(x => bst.insert(x));

bst.postOrderWithStack((v) => { console.log(v) });