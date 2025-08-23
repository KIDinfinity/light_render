import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Claim from 'claim/pages';
import OWBLayout from 'bpm/pages/OWBEntrance/Layout';
import OwbHeader from './ClaimHeader';
import Content from './ClaimContent';
import Sider from './ClaimSider';
import Provider from '../Context/Provider';
import PrepareData from './PrepareData';
import { handleMessageModal } from '@/utils/commonMessage';
import AuthPremission from '@/auth/Authorized/AuthPremission';
import useMonitorEditLog from './_hooks/useMonitorEditLog';

const Entrance = ({ taskDetail, buttonList, businessData, dispatch, initData, taskId }: any) => {
  const globalDispatch = useDispatch();
  const snapshotModalVisible = useSelector(
    ({ processTask }: any) => processTask.snapshotModalVisible
  );
  useMonitorEditLog({ taskDetail, taskId });

  const Layout = OWBLayout;

  const Header = OwbHeader;
  useEffect(() => {
    return () => {
      globalDispatch({
        type: 'processTask/save',
        payload: {
          getTask: {},
        },
      });
      dispatch({
        type: 'setTaskDetail',
        payload: {},
      });
    };
  }, []);

  useEffect(() => {
    // 这个taskDetail应该就是从useReducer传下来的，重新赋值并无意义。不过我在reducer套了一层immer，外加引用没有更改，应当不会影响刷新
    dispatch({
      type: 'setTaskDetailAndTitle',
      payload: {
        title: formatMessageApi({
          activity: taskDetail.taskDefKey,
        }),
        taskDetail,
      },
    });
    globalDispatch({
      type: 'processTask/save',
      payload: { getTask: taskDetail },
    });
  }, [taskDetail]);

  useEffect(() => {
    if (snapshotModalVisible) {
      (async () => {
        const store: any = await globalDispatch({ type: 'global/accessStore' });
        const dataError = store.processTask?.[taskId];

        const content = dataError
          ? formatMessageApi({ Label_COM_WarningMessage: 'MSG_000698' })
          : formatMessageApi({ Label_COM_WarningMessage: 'MSG_000697' });
        const handler = () => {
          if (dataError) {
            globalDispatch({
              type: 'processTask/save',
              payload: { snapshotModalVisible: false },
            });
            return;
          }
          const skipSnapshot = true;
          initData(skipSnapshot);
          globalDispatch({
            type: 'processTask/save',
            payload: { snapshotModalVisible: false, [taskId]: true },
          });
        };

        handleMessageModal([{ content }], { onOk: handler });
      })();
    }
  }, [snapshotModalVisible]);
  // hnw taskDetail入口
  return (
    <AuthPremission type="taskDetail">
      <Layout>
        <Header />
        <Sider businessData={businessData} />
        <Content>
          {taskDetail?.taskId && (
            <Claim taskDetail={taskDetail} buttonList={buttonList} businessData={businessData} />
          )}
        </Content>
      </Layout>
    </AuthPremission>
  );
};

export default (props: any) => (
  <Provider {...props}>
    <PrepareData {...props}>
      <Entrance />
    </PrepareData>
  </Provider>
);
