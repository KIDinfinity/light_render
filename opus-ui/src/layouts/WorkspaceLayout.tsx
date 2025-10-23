import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { Layout, Spin } from 'antd';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import CustomDragLayer from '@/components/DnDHelper/CustomDragLayer';
import useExpanderController from 'navigator/hooks/useExpanderController';
import Provider from './WorkspaceLayout/Provider';
import Footer from './WorkspaceLayout/Footer';
import Content from './WorkspaceLayout/Content';
import NotificationContainer from './WorkspaceLayout/NotificationContainer';
import mediaQuery from './WorkspaceLayout/mediaQuery';
import styles from './WorkspaceLayout.less';

const LoadingSpin = () => {
  const loadingStatus = useSelector(({ login }: any) => login?.loadingStatus);
  return loadingStatus ? (
    <div className={styles.loading}>
      <Spin size="large" />
    </div>
  ) : null;
};

const WorkspaceLayout = ({ children }: any) => {
  const dispatch = useDispatch();
  const { isExpanderSwitchOn, isSiderToggleOn } = useExpanderController();

  useEffect(() => {
    dispatch({
      type: 'global/saveEnv',
    });
    dispatch({
      type: 'global/saveBlackList',
    });
    dispatch({
      type: 'user/fetchCurrent',
    });

    dispatch({
      type: 'authController/listPermissionMenu',
    });

    dispatch({
      type: 'configController/getConfiguration',
    });
    dispatch({
      type: 'workspaceSwitchOn/getListDisplayConfig',
    });
    return () => {
      dispatch({
        type: 'smartCircleNotification/clearMessageList',
      });

      dispatch({
        type: 'converseController/cleanConversationList',
      });

      dispatch({
        type: 'navigatorInformationController/clearInfomation',
      });
    };
  }, []);
  return (
    <ContainerQuery query={mediaQuery}>
      {(params) => (
        <div
          className={classNames(params, {
            [styles.isSwitchOn]: isSiderToggleOn || isExpanderSwitchOn,
            isSwitchOn: isSiderToggleOn || isExpanderSwitchOn,
          })}
        >
          <NotificationContainer />
          <Layout
            style={{
              minHeight: '100vh',
            }}
            className={styles.layout}
          >
            <Provider>
              <div className={classNames(styles.content)}>
                <div className={styles.right}>
                  <Layout.Content>
                    <Content>{children}</Content>
                  </Layout.Content>
                </div>
                {/* <div className={styles.right}>
                    <SwitchDrawer />
                  </div> */}
              </div>
            </Provider>
            {(window as any).location.pathname === '/navigator' && <Footer />}
            <LoadingSpin />
          </Layout>
          <CustomDragLayer />
        </div>
      )}
    </ContainerQuery>
  );
};

export default WorkspaceLayout;
