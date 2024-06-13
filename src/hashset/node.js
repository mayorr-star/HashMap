function createNode(key = null, nextNode = null) {
  return { key, nextNode };
}
module.exports = createNode;