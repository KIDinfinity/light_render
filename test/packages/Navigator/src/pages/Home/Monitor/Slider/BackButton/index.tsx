import React from 'react';
import { Icon } from 'antd';
import useHandleBackToMenu from '../hooks/useHandleBackToMenu';
import styles from './index.less';

export default () => {
  const handleClick = useHandleBackToMenu();
  return (
    <>
      <div>
        <button className={styles.back} onClick={handleClick}>
          <Icon type="caret-left" />
        </button>
      </div>
    </>
  );
};
