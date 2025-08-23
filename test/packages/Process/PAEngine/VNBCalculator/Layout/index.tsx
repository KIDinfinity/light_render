import styles from './index.less';
import classNames from 'classnames';
import React from 'react';

interface IProps {
  flexDirection: 'row' | 'col';
  className?: string;
  hidden?: boolean;
  children?: any;
}

export const FlexLayout = (props: IProps) => {
  const { flexDirection, className, children, hidden } = props;
  return (
    <div
      className={classNames(
        styles.flexLayout,
        styles[flexDirection || 'row'],
        styles[hidden && 'hidden'],
        className
      )}
    >
      {children}
    </div>
  );
};
