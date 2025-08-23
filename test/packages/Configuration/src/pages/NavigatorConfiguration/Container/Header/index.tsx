import type { ReactNode } from 'react';
import React from 'react';
import styles from './index.less';

interface IProps {
  title: string;
  children?: ReactNode;
}

const Header = ({ title = '', children }: IProps) => (
  <div className={styles.header}>
    <div className={styles.h1}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  </div>
);

export default Header;
