import React, { useEffect, useState } from 'react';
import Layout from 'bpm/pages/OWBEntrance/Layout';
import Header from './NBHeader';
import Sider from './NBSider';
import Content from './NBContent';
import AuthEntranceLayout from '@/auth/Layout/AuthEntranceLayout';
import Provider from 'bpm/pages/OWBEntrance/Context/Provider';
import lodash from 'lodash';
import { useGetTaskDetailCallback, useGetTaskVersionCallback } from 'bpm/pages/OWBEntrance/_hooks';
import useMonitorEditLog from 'bpm/pages/OWBEntrance/Entrance/_hooks/useMonitorEditLog';
import { useParams } from 'umi'; 

const Entrance = ({
  headerInfoConfig,
  title,
  children,
  taskDetail,
  businessData,
  originBizData,
  taskId,
}: any) => {
  useMonitorEditLog({ taskDetail, taskId });
  return (
    <>
      <Layout>
        <Header headerInfoConfig={headerInfoConfig} title={title} taskDetail={taskDetail} />
        <Sider taskDetail={taskDetail} />
        <Content>
          {React.cloneElement(children, {
            businessData,
            taskDetail,
            originBizData,
          })}
        </Content>
      </Layout>
    </>
  );
};

export default (props: any) => {
  const params = useParams();
  const taskId = params?.taskId || lodash.last(window.location.pathname.split('/'));
  const [taskDetail, setTaskDetail] = useState({});
  const [businessData, setBusinessData] = useState({});
  const [originBizData, setOriginBizData] = useState({});
  const [loading, setLoading] = useState(true);
  const getData = useGetTaskDetailCallback({
    taskId,
    taskDetail,
    dataType: 'businessData',
  });

  const getOriginBizData = useGetTaskDetailCallback({
    taskId,
    taskDetail,
    dataType: 'businessData',
    skipSnapshot: true,
  });
  const getTaskVersion = useGetTaskVersionCallback({ taskId, dataType: 'businessData' });

  useEffect(() => {
    (async () => {
      if (taskId) {
        const [
          { businessData: data, activityButtonList, ...detail },
          { businessData: originData },
        ] = await Promise.all([getData(), getOriginBizData(true)]);
        getTaskVersion();
        setTaskDetail(detail);
        setBusinessData(data);
        setOriginBizData(originData);
        setLoading(false);
      }
    })();
    return () => {
      setTaskDetail({});
    };
  }, [taskId]);
  return (
    <Provider {...props}>
      <AuthEntranceLayout loading={loading} taskDetail={taskDetail}>
        <Entrance
          taskDetail={taskDetail}
          businessData={businessData}
          originBizData={originBizData}
          taskId={taskId}
          {...props}
        />
      </AuthEntranceLayout>
    </Provider>
  );
};
