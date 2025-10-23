import React from 'react';
import { Button } from 'antd';
import styles from '../button.less';

export default ({ handleClick }: any) => (
  <div className={styles.buttonWrap}>
    <Button
      icon="minus"
      size="small"
      type="primary"
      shape="circle"
      onClick={handleClick}
    />
  </div>
);
