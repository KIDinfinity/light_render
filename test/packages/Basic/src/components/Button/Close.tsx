import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

export default ({ handleClick }: any) => {
  return (
    <div className={styles.buttonWrap}>
      <Button
        className={styles.closeBtn}
        icon="close"
        size="small"
        type="primary"
        shape="circle"
        onClick={handleClick}
      />
    </div>
  );
};
