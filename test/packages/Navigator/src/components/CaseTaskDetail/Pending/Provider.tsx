import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useAbortController from '@/components/AbortController/useAbortController';
import remoteGetTaskDetail from '../remoteGetTaskDetailV2';
import Context from './Context';
import TaskDetailContext from '../Context';
import useJudgeStartLoadData from 'basic/components/DataPriorityContainer/hooks/useJudgeStartLoadData';
import DataPriority from 'enum/DataPriority';
import { flushSync } from 'react-dom';
import { useLocation } from 'umi';

export default ({ children }: any) => {
  const dispatch = useDispatch();
  const location = useLocation();

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
  const [getFindBizProcessDataStatus, setGetFindBizProcessDataStatus] = useState(true);

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
        if (response) {
          setGetFindBizProcessDataStatus(true);
        } else {
          setGetFindBizProcessDataStatus(false);
        }
        setLocalTaskId(response?.taskId);
        setLocalTaskDetail(response);
      })();
    }
  }, [signal]);

  const updateCallback = useCallback(
    async ({ caseNo, taskIdAlias }) => {
      flushSync(() => {
        setRequireGetEnvoyData(false);
      });

      await dispatch({
        type: 'envoyController/setCaseNo',
        payload: {
          caseNo,
          taskId: taskIdAlias,
        },
      });
      flushSync(() => {
        setRequireGetEnvoyData(true);
      });
    },
    [caseNo, taskIdAlias]
  );

  const caseNo = localProcessInstanceId || remoteProcessInstanceId;
  const taskIdAlias = localTaskId || remoteTaskId;

  useEffect(() => {
    if (startLoad) {
      if (caseNo || taskIdAlias) {
        setLocalProcessInstanceId(caseNo);
        updateCallback({ caseNo, taskIdAlias });
      }
    }
  }, [caseNo, taskIdAlias, startLoad, currentTab, getFindBizProcessDataStatus]);

  const remoteCaseNo = remoteProcessInstanceId || remoteTaskDetail?.processInstanceId;

  useEffect(() => {
    if (localProcessInstanceId && remoteCaseNo && remoteCaseNo !== localProcessInstanceId) {
      setLocalProcessInstanceId(remoteCaseNo);
      updateCallback({ caseNo, taskIdAlias });
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

      requireGetEnvoyData,

      getFindBizProcessDataStatus,
      setGetFindBizProcessDataStatus,
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
      getFindBizProcessDataStatus,
    ]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
