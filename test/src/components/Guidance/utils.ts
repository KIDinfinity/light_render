import lodash from 'lodash';
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
const hexToRGBA = (hex, alpha) => {
  const curAlpha = alpha || 0.45;
  const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  const rgbaRegex = /^rgba.*$/;
  if (rgbaRegex.test(hex)) {
    return hex;
  }
  if (hexColorRegex.test(hex) && lodash.isNumber(curAlpha)) {
    const curHex = hex.replace('#', '');
    let r, g, b;
    if (curHex.length === 3) {
      r = parseInt(curHex[0] + curHex[0], 16);
      g = parseInt(curHex[1] + curHex[1], 16);
      b = parseInt(curHex[2] + curHex[2], 16);
    } else if (curHex.length === 6) {
      r = parseInt(curHex[0] + curHex[1], 16);
      g = parseInt(curHex[2] + curHex[3], 16);
      b = parseInt(curHex[4] + curHex[5], 16);
    }
    return `rgba(${r},${g},${b},${alpha})`;
  } else {
    return 'rgba(233, 233, 233, 0.45)';
  }
};
export { getPositon, headerElement, setElementStyle, hexToRGBA };
