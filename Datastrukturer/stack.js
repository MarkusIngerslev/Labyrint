class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class Stack {
  constructor() {
    this.tail = null;
    this.stacksize = 0;
  }

  push(data) {
    const newNode = new Node(data);
    newNode.next = this.tail;
    this.tail = newNode;
    this.stacksize++;
  }

  pop() {
    if (this.tail === null) {
      throw new Error("Stack er tom");
    }

    const removedNode = this.tail.data;
    this.tail = this.tail.next;
    this.stacksize--;
    return removedNode;
  }

  peek() {
    if (this.tail === null) {
      throw new Error("Stack er tom");
    }

    return this.tail.data;
  }

  size() {
    return this.stacksize;
  }

  dumpList() {
    if (this.tail) {
      let current = this.tail;
      let dump = "";
      while (current) {
        dump += current.data + " ";
        current = current.next;
      }
      return dump;
    }
  }

  get(index) {
    if (index < 0 || index >= this.stacksize) {
      throw new Error("Index matcher ikke stackens størrelse");
    }

    let currentNode = this.tail;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode.data;
  }
}
