import React from 'react';
import styles from './index.less';
import { Tooltip } from 'antd';

export default ({ text }: any) => {
  return (
    <div className={styles.formItemText}>
      <Tooltip title={text}>{text || ''}</Tooltip>
    </div>
  );
};
