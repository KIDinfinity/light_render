import type { ReactNode } from 'react';
import React from 'react';
import { Link } from 'umi';
import fwdLogo from '@/assets/public/fwd-logo-light.png';
import styles from './Sider.less';

interface IProps {
  children: ReactNode;
}

const Sider = ({ children }: IProps) => (
  <div className={styles.slider}>
    <div className={styles.content}>
      <Link to="/" key="logo">
        <div className={styles.logo} onClick={() => { }}>
          <img src={fwdLogo} alt="fwd" />
        </div>
      </Link>
      {children}
    </div>
  </div>
);

export default Sider;
