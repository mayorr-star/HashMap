const createNode = require("./node");
class LinkedList {

  constructor() {
    this.headNode = null;
  }

  appendNode(key) {
    const newNode = createNode(key);
    if (this.headNode === null) {
      this.headNode = newNode;
    } else {
      let tailNode = this.headNode;
      while (tailNode.nextNode) {
        tailNode = tailNode.nextNode;
      }
      tailNode.nextNode = newNode;
    }
  };
}
module.exports = LinkedList;