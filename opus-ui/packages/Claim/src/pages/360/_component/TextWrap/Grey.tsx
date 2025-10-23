import type { FunctionComponent } from 'react';
import React from 'react';
import classNames from 'classnames';

import styles from './style.less';

export interface IProps {
  style?: React.CSSProperties;
  hasBorder?: boolean;
  className?: string;
  nowrap?: boolean;
}

const Grey: FunctionComponent<IProps> = ({ style, hasBorder, children, className, nowrap }) => {
  return (
    <span
      className={classNames(styles.textGrey, className, {
        [styles.borderLine]: hasBorder,
        [styles.nowrap]: nowrap
      })}
      style={style}
      title={children}
    >
      {children}
    </span>
  );
};

export default Grey;
