import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { ClaimEntrance } from 'bpm/pages/OWBEntrance';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import PageLoading from '@/components/PageLoading';
import Exception403 from '@/pages/Exception/403';
import { judgeIsRefactorNB } from 'process/Utils';
import { useParams, useLocation } from 'umi';

const AuthTaskDetail = ({
  setTaskId,
  getTaskDetail,
  taskDetail,
  loading: loadingOfTaskDetail,
  reload,
  ...props
}: any) => {
  const params = useParams();
  const location = useLocation();
  
  const taskId = params?.taskId || props?.match?.params?.taskId || lodash.last(window.location.pathname.split('/'));
  useEffect(() => {
    const reg = /claim\/task\/detail/;
    const refactorNB = taskDetail && judgeIsRefactorNB(taskDetail);
    if (reg.test(location?.pathname) && refactorNB) {
      history.replace(`/process/task/detail/${taskId}`)
    }

  } , [taskDetail])
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authorized, setTaskAuthorized] = useState(false);

  useEffect(() => {
    if (!taskId) return;
    (async () => {
      if (taskDetail?.taskId === taskId) {
        const TaskAuthorized: boolean = await dispatch({
          type: 'authController/getTaskAuth',
          payload: {
            taskId,
            isSetEditable: true,
            taskDetail,
          },
        });
        setTaskAuthorized(TaskAuthorized);
        setLoading(false);
      } else {
        getTaskDetail({
          taskId,
          processInstanceId: taskDetail?.processInstanceId,
        });
      }
    })();
  }, [taskId, taskDetail?.taskId]);

  let c = null;
  if (loading || loadingOfTaskDetail) {
    c = <PageLoading />;
  } else if (!authorized) {
    c = <Exception403 />;
  } else if (taskDetail?.taskDefKey) {
    c = <ClaimEntrance taskDetail={taskDetail} setTaskId={setTaskId} reload={reload} />;
  }

  return <>{c}</>;
};

export default (props: any) => (
  <CaseTaskDetail.Consumer {...props}>
    <AuthTaskDetail />
  </CaseTaskDetail.Consumer>
);
