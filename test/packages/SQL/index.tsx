import React from 'react';
import lodash from 'lodash';
import CommonEmpty from '@/components/Empty';
import { Sider, Menu } from './Layout';
import Pages from './pages';
import styles from './index.less';
import useGetPageConfig from './pages/useGetPageConfig';

function SQL() {
  const pageConfig = useGetPageConfig();
  return (
    <div className={styles.container}>
      <Sider>
        {lodash.isEmpty(pageConfig) ? <CommonEmpty /> : <Menu pageConfig={pageConfig} />}
      </Sider>
      <div className={styles.content}>
        <div className={styles.main}>
          <Pages pageConfig={pageConfig} />
        </div>
      </div>
    </div>
  );
}

export default SQL;
