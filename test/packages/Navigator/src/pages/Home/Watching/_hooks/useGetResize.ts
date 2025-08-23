import { useEffect, useState } from 'react';
import lodash from 'lodash';

/**
 * hook用来转换1920设计图下一些绝对单位尺寸
 */
export default (value) => {
  if (!lodash.isNumber(value)) {
    return value;
  }
  const [circleSize, setCircleSize] = useState(value);
  useEffect(() => {
    const baseFontSize = 14;

    const updateFontSize = () => {
      const curFontSizeStr = document.documentElement.style.fontSize;
      const curFontSizeNumber =
        Number(curFontSizeStr?.slice(0, curFontSizeStr.indexOf('p'))) || 8.75;
      setCircleSize((value / baseFontSize) * curFontSizeNumber);
    };
    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => {
      window.removeEventListener('resize', updateFontSize);
    };
  }, [value]);
  return circleSize;
};

export const transformLengthByScreen = (value) => {
  const baseFontSize = 14;
  const curFontSizeStr = document.documentElement.style.fontSize;
  const curFontSizeNumber = Number(curFontSizeStr?.slice(0, curFontSizeStr.indexOf('p'))) || 8.75;
  return (value / baseFontSize) * curFontSizeNumber;
};
