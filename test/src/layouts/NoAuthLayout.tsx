import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import classNames from 'classnames';
import Provider from './WorkspaceLayout/Provider';
import Header from './WorkspaceLayout/Header';
import styles from './NoAuthLayout.less';
import { Outlet } from 'umi';

export default () => {
  const dispatch = useDispatch();
  const isShowHeader = useSelector((state) => state.global.isShowHeader);

  useEffect(() => {
    dispatch({
      type: 'user/fetchCurrent',
    });

    dispatch({
      type: 'global/saveEnv',
    });

    dispatch({
      type: 'userManagement/getUserGeneralInfo',
    });
  }, []);

  return (
    <div className={styles.layout}>
      <Provider>{isShowHeader && <Header />}</Provider>
      <div className={classNames(styles.container, 'ant-layout', 'biger')}>
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
