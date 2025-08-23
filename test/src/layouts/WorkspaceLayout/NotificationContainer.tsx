import React, { useEffect, useRef } from 'react';
import { notification } from 'antd';
import styles from './NotificationContainer.less';

export default () => {
  const containerRef = useRef();

  useEffect(() => {
    notification.config({
      getContainer: () => containerRef.current,
    });
  }, []);

  return (
    <div
      className={styles.container}
      style={{
        position: 'fixed',
        zIndex: '10000',
      }}
      ref={containerRef}
    />
  );
};
