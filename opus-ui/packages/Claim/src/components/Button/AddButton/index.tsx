import React from 'react';
import classsNames from 'classnames';
import { Button } from 'antd';
import styles from './index.less';
import button from '../button.less';

export default ({ handleClick, size, block, shape, buttonText, buttonStyle, className }: any) => (
  <div
    className={
      buttonText
        ? classsNames(styles.buttonWrap, className)
        : classsNames(button.buttonWrap, className)
    }
  >
    <div>
      <Button
        icon="plus"
        size={size}
        type="primary"
        shape={shape}
        onClick={handleClick}
        block={block}
        style={buttonStyle}
      >
        {buttonText}
      </Button>
    </div>
  </div>
);
