import type { SFC, ReactNode } from 'react';
import React from 'react';
import { Link } from 'umi';
import fwdDarkLogo from '@/assets/public/fwd-logo-dark.png';
import fwdLightLogo from '@/assets/public/fwd-logo-light.png';
import styles from './Sider.less';
import { LS, LSKey } from '@/utils/cache';

interface IProps {
  children: ReactNode;
}

const theme = LS.getItem(LSKey.THEME, false);
const fwdLogo = theme == 'dark' ? fwdLightLogo : fwdDarkLogo;

const Sider: SFC<IProps> = ({ children }) => (
  <div className={styles.slider}>
    <div className={styles.content}>
      <Link to="/" key="logo">
        <div className={styles.logo} onClick={() => {}}>
          <img src={fwdLogo} alt="fwd" />
        </div>
      </Link>
      {children}
    </div>
  </div>
);

export default Sider;
