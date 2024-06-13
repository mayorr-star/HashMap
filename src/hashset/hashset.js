const LinkedList = require("./linkedlist");

function createHashSet() {
  const bucketList = [];
  let capacity = 16;
  bucketList.length = capacity;
  const LOAD_FACTOR = 0.75;

  const hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.codePointAt(i)) % bucketList.length;
    }
    return hashCode;
  };

  const set = (key) => {
    if (has(key)) return;
    const hashCode = hash(key);
    if (bucketList[hashCode] === undefined) {
      const list = new LinkedList();
      bucketList[hashCode] = list;
    }
    bucketList[hashCode].appendNode(key);
    const basePoint = Math.round(capacity * LOAD_FACTOR);
    if (length() > basePoint) {
      growBuckets();
    }
  };

  const get = (key) => {
    const hashCode = hash(key);
    if (!bucketList[hashCode]) return null;
    let pointer = bucketList[hashCode].headNode;
    while (pointer) {
      if (key === pointer.key) return pointer;
      pointer = pointer.nextNode;
    }
    return null;
  };

  const has = (key) => {
    const hashCode = hash(key);
    if (!bucketList[hashCode]) return false;
    let pointer = bucketList[hashCode].headNode;
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
    let pointer = bucketList[hashCode].headNode;
    while (pointer) {
      if (pointer.key === key) {
        if (!previousPointer) {
          bucketList[hashCode].headNode = pointer.nextNode;
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
    for (const bucket of bucketList) {
      if (bucket) {
        let currentNode = bucket.headNode;
        while (currentNode !== null) {
          numberOfKeys++;
          currentNode = currentNode.nextNode;
        }
      }
    }
    return numberOfKeys;
  };

  const clear = () => {
    return (bucketList.length = 0);
  };

  const keys = () => {
    const keysStored = [];
    for (const bucket of bucketList) {
      if (bucket) {
        let currentNode = bucket.headNode;
        while (currentNode !== null) {
          keysStored.push(currentNode.key);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return keysStored;
  };

  const growBuckets = () => {
    capacity *= 2;
    bucketList.length = capacity;
  };

  return {
    set,
    has,
    remove,
    length,
    clear,
    keys,
    get,
  };
}
module.exports = createHashSet;
