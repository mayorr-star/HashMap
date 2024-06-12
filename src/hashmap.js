const linkedList = require("./linkedlist");
const createNode = require("./nodes");

function createHashmap() {
  const BUCKET_LIST = [];
  BUCKET_LIST.length = 16;
  for (let i = 0; i < BUCKET_LIST.length; i++) {
    const list = new linkedList();
    BUCKET_LIST[i] = list;
  }

  const hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.codePointAt(i)) % BUCKET_LIST.length;
    }
    return hashCode;
  };

  const overwriteValue = (key, newValue) => {
    const hashCode = hash(key);
    let currentNode = BUCKET_LIST[hashCode].headNode;
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
      BUCKET_LIST[hashCode].appendNode(key, value);
    }
  };

  const get = (key) => {
    const hashCode = hash(key);
    let pointer = BUCKET_LIST[hashCode].headNode;
    while (pointer) {
      if (key === pointer.key) return pointer.value;
      pointer = pointer.nextNode;
    }
    return null;
  };

  const has = (key) => {
    const hashCode = hash(key);
    let pointer = BUCKET_LIST[hashCode].headNode;
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
    let pointer = BUCKET_LIST[hashCode].headNode;
    while (pointer) {
      if (pointer.key === key) {
        if (!previousPointer) {
          BUCKET_LIST[hashCode].headNode = pointer.nextNode;
        } else {
          previousPointer.nextNode = pointer.nextNode;
        }
      }
      previousPointer = pointer;
      pointer = pointer.nextNode;
    }
  };

  const length = () => {
    let numberOfKeys = 0;
    for (const bucket of BUCKET_LIST) {
      let currentNode = bucket.headNode;
      while (currentNode !== null) {
        numberOfKeys++;
        currentNode = currentNode.nextNode;
      }
    }
    return numberOfKeys;
  }

  return {
    hash,
    set,
    BUCKET_LIST,
    get,
    has,
    remove,
    length,
  };
}

module.exports = createHashmap;
