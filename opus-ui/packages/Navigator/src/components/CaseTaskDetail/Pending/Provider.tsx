import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useAbortController from '@/components/AbortController/useAbortController';
import remoteGetTaskDetail from '../remoteGetTaskDetail';
import Context from './Context';
import TaskDetailContext from '../Context';
import useJudgeStartLoadData from 'basic/components/DataPriorityContainer/hooks/useJudgeStartLoadData';
import DataPriority from 'enum/DataPriority';

export default ({ children }: any) => {
  const dispatch = useDispatch();
  const currentTab = useSelector(
    ({ advancedQueryAllForm }: any) => advancedQueryAllForm?.currentTab,
    shallowEqual
  );

  const startLoad = useJudgeStartLoadData({
    sectionPriority: DataPriority.MEDIUM,
  });
  const { taskId, taskDetail, processInstanceId }: any = useContext(TaskDetailContext);

  const [remoteProcessInstanceId, setRemoteProcessInstanceId] = useState(null);
  const [remoteCaseDetail, setRemoteCaseDetail] = useState(null);

  const [remoteTaskId, setRemoteTaskId] = useState(null);
  const [remoteTaskDetail, setRemoteTaskDetail] = useState(null);

  const [localProcessInstanceId, setLocalProcessInstanceId] = useState(null);
  const [localCaseDetail, setLocalCaseDetail] = useState(null);

  const [localTaskId, setLocalTaskId] = useState(null);
  const [localTaskDetail, setLocalTaskDetail] = useState(null);

  const [enableGetDetial, setEnableGetDetial] = useState(null);

  const [requireGetEnvoyData, setRequireGetEnvoyData] = useState(false);

  const signal = useAbortController([localProcessInstanceId, enableGetDetial, currentTab]);

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

  useEffect(() => {
    if (localProcessInstanceId && enableGetDetial) {
      (async () => {
        const response = await remoteGetTaskDetail(
          { processInstanceId: localProcessInstanceId },
          signal
        );
        if (response === false) {
          dispatch({
            type: 'authController/saveNoPermissionCases',
            payload: {
              caseNo: localProcessInstanceId,
              result: true,
            },
          });
        }
        setLocalTaskId(response?.taskId);
        setLocalTaskDetail(response);
      })();
    }
  }, [signal]);

  const updateCallback = useCallback(async ({ caseNo, taskIdAlias }) => {
    setRequireGetEnvoyData(false);

    setRequireGetEnvoyData(true);
  }, []);

  const caseNo = localProcessInstanceId || remoteProcessInstanceId;
  const taskIdAlias = localTaskId || remoteTaskId;

  useEffect(() => {
    if (startLoad) {
      if (caseNo || taskIdAlias) {
        updateCallback({ caseNo, taskIdAlias });
      }
    }
  }, [caseNo, taskIdAlias, startLoad, currentTab]);

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

      requireGetEnvoyData,
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
      requireGetEnvoyData,
    ]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
