import React from 'react';
import { Button } from 'antd';
import styles from '../button.less';

export default ({ handleClick, loading }: any) => (
  <div className={styles.buttonWrap}>
    <Button
      icon="sync"
      size="small"
      type="primary"
      shape="circle"
      onClick={handleClick}
      loading={loading}
    />
  </div>
);
