function CreateHashMapNode(key = null, value = null, nextNode = null) {
  return {
    key,
    value,
    nextNode,
  };
}

module.exports = CreateHashMapNode;
