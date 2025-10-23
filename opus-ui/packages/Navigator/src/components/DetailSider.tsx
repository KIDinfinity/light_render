import React from 'react';
import { Link } from 'umi';
import { useSelector } from 'dva';
import Logo from '@/components/Logo/logo';
import styles from './DetailSider.less';

const DetailSider = ({ children }) => {
  const originActiveTheme = useSelector((state) => state.theme.originActiveTheme);
  return (
    <div className={styles.slider}>
      <div className={styles.content}>
        <Link to="/" key="logo">
          <div className={styles.logo} onClick={() => {}}>
            <Logo theme={originActiveTheme} type="4" />
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default DetailSider;
