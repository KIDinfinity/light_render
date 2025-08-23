import React, { useState, useEffect } from 'react';
import styles from './index.less';
import useExpanderController from 'navigator/hooks/useExpanderController';
import { useResponsivePx } from '@/utils/responsiveUtils';
import lodash from 'lodash';

export default ({children}) => {
  const [width, setWidth] = useState(window?.innerWidth);
  const { isSiderToggleOn } = useExpanderController();
  const contentLeftWidth = useResponsivePx(384);

  useEffect(() => {
    const listener = lodash.throttle(() => {
      setWidth(window?.innerWidth)
    }, 500)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener);
  }, [])
  if(width < 1080) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.scrollLayer} style={{width: isSiderToggleOn? 1080 - contentLeftWidth : 1080}}>
          {children}
        </div>
      </div>
    )
  }
  // return children
  return (
    <div className={styles.placeHolder}>
      <div className={styles.placeHolder}>
        {children}
      </div>
    </div>
  );
}