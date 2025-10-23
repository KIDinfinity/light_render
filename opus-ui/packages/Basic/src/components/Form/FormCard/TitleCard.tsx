import React from 'react';
import classnames from 'classnames';
import styles from './TitleCard.less';

interface CardProps {
  children?: any;
  title?: React.ReactNode;
  className?: any;
}

export default ({ children, title,className }: CardProps) =>
  <div className={styles.border}>
    <div className={classnames(styles.title, className)}>{title}</div>
    <div>{children}</div>
  </div>;
