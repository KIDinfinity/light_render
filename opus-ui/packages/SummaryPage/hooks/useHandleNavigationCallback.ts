import { useCallback } from 'react';

export default () => {
  return useCallback(({ link }) => {
    const targetDom = document.querySelector(`div[data-id=${link}`);
    if (targetDom) {
      targetDom.scrollIntoView();
    }
  }, []);
};
