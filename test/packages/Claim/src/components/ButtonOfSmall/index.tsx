import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

const DeleteButton = ({ handleClick, icon, shape = 'circle', loading, disabled }: any) => (
  <div className={styles.buttonWrap}>
    <Button
      icon={icon}
      size="small"
      type="primary"
      shape={shape}
      onClick={handleClick}
      loading={loading}
      disabled={disabled}
    />
  </div>
);

export default DeleteButton;
