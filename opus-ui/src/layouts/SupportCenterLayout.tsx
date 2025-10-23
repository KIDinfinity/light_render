import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { Layout, Spin } from 'antd';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Provider from './WorkspaceLayout/Provider';
import Content from './WorkspaceLayout/Content';
import NotificationContainer from './WorkspaceLayout/NotificationContainer';
import mediaQuery from './WorkspaceLayout/mediaQuery';
import styles from './SupportCenterLayout.less';
import useExpanderController from 'navigator/hooks/useExpanderController';

const LoadingSpin = () => {
  const loadingStatus = useSelector(({ login }: any) => login?.loadingStatus);
  return loadingStatus ? (
    <div className={styles.loading}>
      <Spin size="large" />
    </div>
  ) : null;
};

const SupportCenterLayout = ({ children }: any) => {
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
              <div className={styles.content}>
                <Layout.Content>
                  <Content>{children}</Content>
                </Layout.Content>
              </div>
            </Provider>
            <LoadingSpin />
          </Layout>
        </div>
      )}
    </ContainerQuery>
  );
};

export default SupportCenterLayout;
