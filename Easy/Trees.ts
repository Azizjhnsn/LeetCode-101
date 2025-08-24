// 🌳 A node in a basic binary tree
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// 🌲 Basic Binary Tree - NOT a search tree, just structure
class BinaryTree<T> {
  root: TreeNode<T> | null = null;

  /**
   * Inserts a value into the tree using level-order (Breath First Search).
   */
  insert(value: T): void {
    const newNode = new TreeNode(value);

    // If tree is empty, insert at root
    if (!this.root) {
      this.root = newNode;
      return;
    }

    // Use a queue to find first available position
    const queue: TreeNode<T>[] = [this.root];

    while (queue.length) {
      const current = queue.shift()!;

      if (!current.left) {
        current.left = newNode;
        return;
      } else {
        queue.push(current.left);
      }

      if (!current.right) {
        current.right = newNode;
        return;
      } else {
        queue.push(current.right);
      }
    }
  }

  /**
   * In-Order Traversal: Left → Root → Right
   */
  inOrder(node: TreeNode<T> | null = this.root): void {
    if (node) {
      this.inOrder(node.left);
      console.log(node.value); // Visit root
      this.inOrder(node.right);
    }
  }

  /**
   * Pre-Order Traversal: Root → Left → Right
   */
  preOrder(node: TreeNode<T> | null = this.root): void {
    if (node) {
      console.log(node.value); // Visit root
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  /**
   * Post-Order Traversal: Left → Right → Root
   */
  postOrder(node: TreeNode<T> | null = this.root): void {
    if (node) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.value); // Visit root
    }
  }

  /**
   * Level-Order Traversal (Breadth-First Search)
   */
  levelOrder(): void {
    if (!this.root) return;

    const queue: TreeNode<T>[] = [this.root];
    while (queue.length) {
      const current = queue.shift()!;
      console.log(current.value);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  /**
   * Returns the height (max depth) of the tree
   */
  height(node: TreeNode<T> | null = this.root): number {
    if (!node) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  /**
   * Counts the total number of nodes in the tree
   */
  countNodes(node: TreeNode<T> | null = this.root): number {
    if (!node) return 0;

    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }

  /**
   * Counts only the leaf nodes (nodes with no children)
   */
  countLeaves(node: TreeNode<T> | null = this.root): number {
    if (!node) return 0;

    if (!node.left && !node.right) return 1;

    return this.countLeaves(node.left) + this.countLeaves(node.right);
  }
}

//  Problems

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function maxDepth(root: TreeNode | null): number { //DFS
    if (!root) return 0
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));

// Match.max compares the number returned from the latest iteration on both left and right and returns the biggest num
};

function isValidBST(root: TreeNode | null): boolean { //DFS
  if(!root) return true;

  let stack: {node: TreeNode | null, min: number, max: number}[]=[];
  stack.push({node: root, min: -Infinity, max: Infinity});
  while(stack.length>0){
    const {node, min, max} = stack.pop()!;
    if(node.val >= max || node.val <= min) return false

    if(node.right){
      stack.push({ node: node.right, min: node.val, max})
    }

    if(node.left){
      stack.push({ node: node.left, min, max: node.val})
    }
  }
  return true
//{ We use node to check if left is never higher than node and right never smaller,
// if so we push right first in stack then left (for convention)
// then we pop and process latest so if it still has children the first nodes will be on the wait until all
// newer elements in the stack have been processed and when we get to the end of the tree we starting emtying it till stack.length = 0}
}

function isSymmetric(root: TreeNode | null): boolean {
    if (!root) return false;
//     we need a queue arr of arr then     we need to check if nodeA and nodeB are not null both, and if nodes.val === then     we queue a.left b.right a.right b.left
    let queue:Array<[TreeNode | null, TreeNode | null]> = [];
    queue.push([root.left, root.right]);
    
    while(queue.length>0){
      let [nodeA, nodeB] = queue.shift()!;

      if(!nodeA && !nodeB) continue;
      if(!nodeA || !nodeB)return false;
      if(nodeA.val !== nodeB.val) return false;

      queue.push([nodeA.left, nodeB.right])
      queue.push([nodeA.right, nodeB.left])

    }
    return true
};

// recursive solution of the same problem
function IsSymmetric(root: TreeNode | null): boolean {  
    if (!root) return true;

    function isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        if (t1.val !== t2.val) return false;
        
        return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
    }

    return isMirror(root.left, root.right);
}

function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];

    const result: number[][] = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);

            // Enqueue children for the next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}
// recursive solution
function LevelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    function traverse(node: TreeNode | null, level: number) {
        if (!node) return;
        // If the current level doesn't exist in the result, create it
        if (result.length === level) {
            result.push([]);
        }
        // Add the current node's value to its level
        result[level].push(node.val);
        // Recursively visit left and right children with the next level
        traverse(node.left, level + 1);
        traverse(node.right, level + 1);
    }
    traverse(root, 0);
    return result;
}

function sortedArrayToBST(nums: number[]): TreeNode | null {
    if (nums.length === 0) return null;

    function build(left: number, right: number): TreeNode | null {
        if (left > right) return null;

        const mid = Math.floor((left + right) / 2);
        const root = new TreeNode(nums[mid]);

        root.left = build(left, mid - 1);
        root.right = build(mid + 1, right);

        return root;
    }

    return build(0, nums.length - 1);
}