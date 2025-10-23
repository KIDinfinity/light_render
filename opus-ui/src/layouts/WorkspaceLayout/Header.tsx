import React, { useContext } from 'react';
import { Layout } from 'antd';
import { Link } from 'umi';
import LayoutContext from './LayoutContext';
import HeaderUser from './HeaderUser';
import styles from './Header.less';
import Logo from '../../components/Logo/logo';

export default () => {
  const { headerVisiable }: any = useContext(LayoutContext);

  return (
    headerVisiable && (
      <Layout.Header style={{ padding: 0, width: '100%', zIndex: 1002 }} className={styles.header}>
        <div className={`${styles.head} ${styles.light}`}>
          <div className={`${styles.main}`}>
            <div className={styles.left}>
              <div className={styles.logo} key="logo" id="logo">
                <Link to="/">
                  <Logo type="1" />
                </Link>
              </div>
            </div>
            <div className={styles.right}>
              <HeaderUser />
            </div>
          </div>
        </div>
      </Layout.Header>
    )
  );
};
