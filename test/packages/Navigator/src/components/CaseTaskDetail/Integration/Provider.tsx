import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useDispatch } from 'dva';
import remoteGetTaskDetail from '../remoteGetTaskDetail';
import Context from './Context';
import TaskDetailContext from '../Context';

export default ({ children }: any) => {
  const dispatch = useDispatch();

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
