const linkedList = require("./linkedlist");
const createNode = require("./nodes");

function createHashmap() {
  const buckectList = [];
  buckectList.length = 16;
  for (let i = 0; i < buckectList.length; i++) {
    const list = new linkedList();
    buckectList[i] = list;
  }

  const hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.codePointAt(i)) % buckectList.length;
    }
    return hashCode;
  };

  const overwriteValue = (key, newValue) => {
    const hashCode = hash(key);
    let currentNode = buckectList[hashCode].headNode;
    while (currentNode) {
      if (currentNode.key === key) {
        currentNode.value = newValue;
      }
      currentNode = currentNode.nextNode;
    }
  };

  const set = (key, value) => {
    if (has(key)) {
      overwriteValue(key, value)
    } else {
      const hashCode = hash(key);
      buckectList[hashCode].appendNode(key, value);
    }
  };

  const get = (key) => {
    const hashCode = hash(key);
    let pointer = buckectList[hashCode].headNode;
    while (pointer) {
      if (key === pointer.key) return pointer.value;
      pointer = pointer.nextNode;
    }
    return null;
  };

  const has = (key) => {
    const hashCode = hash(key);
    let pointer = buckectList[hashCode].headNode;
    while (pointer) {
      if (key === pointer.key) return true;
      pointer = pointer.nextNode;
    }
    return false;
  };

  const remove = (key) => {
    if (!has(key)) return false;
    const hashCode = hash(key);
    let previousPointer = null;
    let pointer = buckectList[hashCode].headNode;
    while (pointer) {
      if (pointer.key === key) {
        if (!previousPointer) {
          buckectList[hashCode].headNode = pointer.nextNode;
        } else {
          previousPointer.nextNode = pointer.nextNode;
        }
      }
      previousPointer = pointer;
      pointer = pointer.nextNode;
    }
  };

  return {
    hash,
    set,
    buckectList,
    get,
    has,
    remove,
  };
}

module.exports = createHashmap;
