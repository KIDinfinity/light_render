export default (list) => {
  return list.every(([A, B]) => {
    if (!A && !B) {
      return A === B;
    }
    return String(A).toUpperCase() === String(B).toUpperCase();
  });
};
