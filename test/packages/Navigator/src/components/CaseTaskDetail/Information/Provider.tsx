import useAbortController from '@/components/AbortController/useAbortController';
import useJudgeStartLoadData from 'basic/components/DataPriorityContainer/hooks/useJudgeStartLoadData';
import { useDispatch, useSelector } from 'dva';
import DataPriority from 'enum/DataPriority';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import TaskDetailContext from '../Context';
import remoteGetTaskDetail from '../remoteGetTaskDetail';
import Context from './Context';
import { useLocation } from 'umi';

export default ({ children }: any) => {
  const startLoad = useJudgeStartLoadData({
    sectionPriority: DataPriority.MEDIUM,
  });
  const location = useLocation();

  const dispatch = useDispatch();
  const appealCaseNoCover = useSelector(
    ({ navigatorInformationController }: any) => navigatorInformationController.appealCaseNoCover
  );
  const { taskId, taskDetail, processInstanceId, dataSoure }: any = useContext(TaskDetailContext);
  const [remoteProcessInstanceId, setRemoteProcessInstanceId] = useState(null);
  const [remoteCaseDetail, setRemoteCaseDetail] = useState(null);

  const [remoteTaskId, setRemoteTaskId] = useState(null);
  const [remoteTaskDetail, setRemoteTaskDetail] = useState(null);

  const [localProcessInstanceId, setLocalProcessInstanceId] = useState(null);
  const [localCaseDetail, setLocalCaseDetail] = useState(null);

  const [localTaskId, setLocalTaskId] = useState(null);
  const [localTaskDetail, setLocalTaskDetail] = useState(null);

  const [enableGetDetial, setEnableGetDetial] = useState(null);
  const signal = useAbortController([localProcessInstanceId, enableGetDetial]);

  useEffect(() => {
    setRemoteTaskId(taskId);
    setLocalTaskId(null);
  }, [taskId]);

  useEffect(() => {
    setRemoteTaskDetail(taskDetail);
  }, [taskDetail]);

  useEffect(() => {
    setRemoteProcessInstanceId(processInstanceId);
    setLocalProcessInstanceId(null);
  }, [processInstanceId]);
  const loadInformation = useCallback(
    async ({ detail }) => {
      if (detail && dataSoure === 'TASK' && !appealCaseNoCover) {
        await dispatch({
          type: 'navigatorInformationController/clearInformation',
        });
        await dispatch({
          type: 'navigatorInformationController/saveProcessInstanceIdReducer',
          payload: {
            taskId: detail?.taskId,
            processInstanceId: detail?.processInstanceId,
          },
        });
        dispatch({
          type: 'navigatorInformationController/laterLoadInformationData',
          payload: {
            taskDetail: detail,
          },
        });
      }
    },
    [dataSoure]
  );
  useEffect(() => {
    if (localProcessInstanceId && enableGetDetial) {
      (async () => {
        const response = await remoteGetTaskDetail(
          { processInstanceId: localProcessInstanceId },
          signal
        );
        setLocalTaskId(response?.taskId);
        setLocalTaskDetail(response);
      })();
    }
  }, [signal]);

  useEffect(() => {
    const privateProcessInstanceId = localProcessInstanceId || processInstanceId;
    (async () => {
      if (
        (dataSoure === 'CASE' || dataSoure === 'CLAIM') &&
        privateProcessInstanceId &&
        !appealCaseNoCover
      ) {
        await dispatch({
          type: 'navigatorInformationController/clearInformation',
        });
        dispatch({
          type: 'navigatorInformationController/saveProcessInstanceIdReducer',
          payload: {
            processInstanceId: privateProcessInstanceId,
          },
        });
        await dispatch({
          type: 'navigatorInformationController/changeInformationFields',
          payload: {
            changedFields: {
              caseNo: privateProcessInstanceId,
            },
          },
        });
        dispatch({
          type: 'navigatorInformationController/laterLoadInformationData',
          payload: {
            taskDetail,
            processInstanceId,
          },
        });
      }
    })();
    return () => {
      dispatch({
        type: 'navigatorInformationController/setAppealCaseNoCover',
        payload: {
          appealCaseNoCover: false,
        },
      });
    };
  }, [processInstanceId, localProcessInstanceId, dataSoure, taskDetail]);
  useEffect(() => {
    if (startLoad) {
      window.requestIdleCallback(() => {
        setLocalProcessInstanceId(remoteProcessInstanceId);
        loadInformation({ detail: remoteTaskDetail });
      });
    }
  }, [remoteTaskDetail, startLoad]);

  useEffect(() => {
    if (
      localProcessInstanceId &&
      remoteProcessInstanceId &&
      remoteProcessInstanceId !== localProcessInstanceId
    ) {
      setLocalProcessInstanceId(remoteProcessInstanceId);
      loadInformation({ detail: remoteTaskDetail });
    }
  }, [location.key]);

  const contextValue = useMemo(
    () => ({
      remoteProcessInstanceId,
      setRemoteProcessInstanceId,
      remoteCaseDetail,
      setRemoteCaseDetail,

      remoteTaskId,
      setRemoteTaskId,
      remoteTaskDetail,
      setRemoteTaskDetail,

      localProcessInstanceId,
      setLocalProcessInstanceId,
      localCaseDetail,
      setLocalCaseDetail,

      localTaskId,
      setLocalTaskId,
      localTaskDetail,
      setLocalTaskDetail,

      remoteGetTaskDetail,

      enableGetDetial,
      setEnableGetDetial,
    }),
    [
      remoteProcessInstanceId,
      remoteCaseDetail,
      remoteTaskId,
      remoteTaskDetail,
      localProcessInstanceId,
      localCaseDetail,
      localTaskId,
      localTaskDetail,
      enableGetDetial,
    ]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
