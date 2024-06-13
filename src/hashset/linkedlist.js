function createLinkedList() {
  let headNode = null;

  const appendNode = (key) => {
    const newNode = CreateNode(key);
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

  return { headNode, appendNode };
}
module.exports = createLinkedList;