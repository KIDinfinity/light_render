import React from 'react';
import { Button } from 'antd';
import classsNames from 'classnames';
import styles from '../button.less';

export default ({ handleClick, className, buttonStyle }: any) => (
  <div className={classsNames(styles.buttonWrap, className)}>
    <Button
      icon="close"
      size="small"
      type="primary"
      shape="circle"
      onClick={handleClick}
      style={buttonStyle}
    />
  </div>
);
