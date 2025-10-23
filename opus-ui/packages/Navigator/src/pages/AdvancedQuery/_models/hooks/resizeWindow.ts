import { useEffect, useState } from 'react';
import lodash from 'lodash';
import { divide, multiply } from '@/utils/precisionUtils';

const getWindowSize = () => ({
  innerWidth:
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  innerHeight:
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
});

const multiplyScaleFn = (widthScale) => (target, precision = 2) => {
  const result = multiply(target, widthScale);

  if (lodash.isNumber(result)) {
    return Number(result.toFixed(precision));
  }

  return target;
};

export default () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const handleResize = lodash.debounce(() => {
    setWindowSize(getWindowSize());
  }, 300);

  const defaultWidth = 1920;

  const widthScale = divide(windowSize.innerWidth, defaultWidth);

  const handleScale = multiplyScaleFn(widthScale);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowSize, widthScale, handleScale };
};
