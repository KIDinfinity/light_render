export default (child, parent) => {
  if (child && parent) {
    let { parentNode } = child;
    while (parentNode) {
      if (parent === parentNode) {
        return true;
      }
      // eslint-disable-next-line prefer-destructuring
      parentNode = parentNode.parentNode;
    }
  }
  return false;
};
