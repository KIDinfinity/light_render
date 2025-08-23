import type { FunctionComponent } from 'react';
import React from 'react';
import classNames from 'classnames';

import styles from './style.less';

export interface IProps {
  style?: React.CSSProperties;
  hasBorder?: boolean;
  className?: string;
  nowrap?: boolean;
  blackBg?: boolean;
}

const White: FunctionComponent<IProps> = ({
  style,
  hasBorder,
  children,
  className,
  nowrap,
  blackBg,
}) => {
  return (
    <span
      className={classNames(styles.textWhite, className, {
        [styles.borderLine]: hasBorder,
        [styles.nowrap]: nowrap,
        [styles.blackBg]: blackBg,
      })}
      style={style}
    >
      {children}
    </span>
  );
};

export default White;
