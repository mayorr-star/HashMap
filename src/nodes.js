module.exports = function CreateNode(key = null, value = null, nextNode = null) {
    return {
        key, 
        value,
        nextNode
    };
};