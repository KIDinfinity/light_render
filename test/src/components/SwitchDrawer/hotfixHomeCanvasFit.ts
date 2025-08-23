export default () => {
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 420);
};
