import React from 'react';
import { Button } from 'antd';
import styles from './Button.less';

export default ({ children, ...otherProps }) => {
  return (
    <Button
      className={styles.button}
      {...otherProps}
      type='primary'
      ghost
    >
      {children}
    </Button>
  )
}