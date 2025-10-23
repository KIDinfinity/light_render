const getPositon = (className: string) =>
  document?.querySelector(className)?.getBoundingClientRect();
const headerElement = (className: string) => document?.querySelector(className);
const setElementStyle = (element: HTMLElement, zIndex: string, backgroundColor: string) => {
  if (element) {
    element.style.position = 'relative';
    element.style.zIndex = zIndex;
    element.style.backgroundColor = backgroundColor;
  }
};
export { getPositon, headerElement, setElementStyle };
