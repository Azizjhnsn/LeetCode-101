
class ListNode {
    value: number;
    next: ListNode | null;

    constructor(value: number, next: ListNode | null = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    head: ListNode | null;
    constructor() {
        this.head = null;
    }

    // Method to add a node at the end
    append(value: number) {
        const newNode = new ListNode(value);

        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }

    // Method to add new head
    prepend(value: number) {
        const newNode = new ListNode(value, this.head);
        this.head = newNode;
    }

    // Method to delete a node
    delete(value: number) {
        if (!this.head) return;

        // if head is the node to delete
        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next !== null) {
            if (current.next.value === value) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    // Method to search
    search(value: number): ListNode | null {
        let current = this.head;

        while (current !== null) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }

        return null; // Not found
    }

    // Optional: Convert list to array for testing/debug
    toArray(): number[] {
        const result: number[] = [];
        let current = this.head;
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}


// Problems
/**
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
/**
 */

function deleteNode(node: ListNode | null): void {
    if (node === null || node.next === null) {
        return; // Handle edge cases where node or node.next is null
    }

    // Copy the value from the next node to the current node
    node.val = node.next.val;

    // Skip the next node by setting the current node's next to the next node's next
    node.next = node.next.next;
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // Create a dummy node to handle edge cases like removing the head
    const dummy = new ListNode(0, head);
    let size = 0;
    let current = head;

    // Step 1: Calculate size of the list
    while (current !== null) {
        size++;
        current = current.next;
    }

    // Step 2: Find the node before the one to remove
    current = dummy;
    for (let i = 0; i < size - n; i++) {
        current = current.next!;
    }

    // Step 3: Remove the node
    current.next = current.next!.next;

    // Return the updated list
    return dummy.next;
}

function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current = head;

    while (current !== null) {
        const currentNext = current.next; // store old next (the next of current node)
        current.next = prev;              // turn the pointer of current backwards
        prev = current;                   // we make current become previous
        current = currentNext;           // we make the old next become current
    }

    return prev; // new head of reversed list
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode(-1); // dummy node to simplify
    let current = dummy;

    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    // Attach the remaining list if any
    current.next = list1 !== null ? list1 : list2;

    return dummy.next;
}

function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true;

    // Step 1: Find the middle of the list
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next!;
        fast = fast.next.next!;
    }

    // Step 2: Reverse the second half of the list
    let prev: ListNode | null = null;
    let current = slow;
    while (current) {
        let nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }

    // Step 3: Compare both halves
    let firstHalf = head;
    let secondHalf = prev; // reversed second half

    while (secondHalf) {
        if (firstHalf!.val !== secondHalf.val) {
            return false;
        }
        firstHalf = firstHalf!.next;
        secondHalf = secondHalf.next;
    }

    return true;
}

function hasCycle(head: ListNode | null): boolean {
    if (!head || !head.next) return false;

    let slow: ListNode | null = head;
    let fast: ListNode | null = head.next;

    while (fast !== null && fast.next !== null) {
        if (slow === fast) return true;
        slow = slow!.next;
        fast = fast.next.next;
    }

    return false;
}
