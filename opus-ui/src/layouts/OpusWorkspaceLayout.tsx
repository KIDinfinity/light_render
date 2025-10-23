import CustomDragLayer from '@/components/DnDHelper/CustomDragLayer';
import { HotkeyProvider } from '@/components/Hotkey/home';
import { Layout, Spin } from 'antd';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import React, { useEffect } from 'react';
import { ContainerQuery } from 'react-container-query';
import styles from './OpusWorkspaceLayout.less';
import mediaQuery from './WorkspaceLayout/mediaQuery';
import NotificationContainer from './WorkspaceLayout/NotificationContainer';
import Provider from './WorkspaceLayout/Provider';

// TH OPUS的layouat，基础功能基本一致，移除了右侧的drawer

const LoadingSpin = () => {
  const loadingStatus = useSelector(({ login }: any) => login?.loadingStatus);
  return loadingStatus ? (
    <div className={styles.loading}>
      <Spin size="large" />
    </div>
  ) : null;
};

const OpusWorkspaceLayout = ({ children }: any) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    ({ loading }: any) => loading.effects['authController/getCommonAuthorityList']
  );

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
        <div className={classNames(params)}>
          <NotificationContainer />
          <Layout
            style={{
              minHeight: '100vh',
            }}
            className={styles.layout}
          >
            <Provider>
              <Layout.Content>
                <div className={classNames(styles.content)}>
                  {!isLoading && <HotkeyProvider>{children}</HotkeyProvider>}
                </div>
              </Layout.Content>
            </Provider>

            <LoadingSpin />
          </Layout>
          <CustomDragLayer />
        </div>
      )}
    </ContainerQuery>
  );
};

export default OpusWorkspaceLayout;
