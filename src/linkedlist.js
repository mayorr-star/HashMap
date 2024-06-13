const CreateHashMapNode = require("./nodes");
class LinkedList {
  constructor() {
    this.headNode = null;
  }

  appendHashMapNode(key, value) {
    const newNode = CreateHashMapNode(key, value);
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
