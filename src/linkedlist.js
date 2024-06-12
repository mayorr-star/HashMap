const createNode = require("./nodes");
class LinkedList {
  constructor() {
    this.headNode = null;
  }

  appendNode(key, value) {
    const newNode = createNode(key, value);
    if (this.headNode === null) {
      this.headNode = newNode;
    } else {
      let tailNode = this.headNode;
      while (tailNode.nextNode) {
        tailNode = tailNode.nextNode;
      }
      tailNode.nextNode = newNode;
    }
  }
}

module.exports = LinkedList;
