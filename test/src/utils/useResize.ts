import { useEffect } from 'react';
import { getRootFontSize, resizeEvent } from './responsiveUtils';
import _ from 'lodash';

function updateFontSize() {
  const rootFontSize = getRootFontSize();
  document.documentElement.style.fontSize = rootFontSize + 'px';
}

export default () => {
  useEffect(() => {
    updateFontSize();
    const updateFontSizeDebounce = _.debounce(updateFontSize, 150);
    window.addEventListener(resizeEvent, updateFontSizeDebounce);
    return () => {
      window.removeEventListener(resizeEvent, updateFontSizeDebounce);
    };
  }, []);
};
