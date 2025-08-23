import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useDispatch } from 'dva';
import Context from './Context';
import TaskDetailContext from '../Context';

export default ({ children }: any) => {
  const dispatch = useDispatch();
  const { taskDetail, processInstanceId }: any = useContext(TaskDetailContext);
  const [remoteTaskDetail, setRemoteTaskDetail] = useState<any>(null);
  const [remoteProcessInstanceId, setRemoteProcessInstanceId] = useState<any>(null);

  useEffect(() => {
    setRemoteTaskDetail(taskDetail);
    setRemoteProcessInstanceId(processInstanceId);
  }, [taskDetail, processInstanceId]);

  useEffect(() => {
    if (remoteTaskDetail) {
      dispatch({
        type: 'workspaceSwitchOn/handleTaskChange',
        payload: {
          record: remoteTaskDetail,
        },
      });
    }
  }, [remoteTaskDetail]);

  const contextValue = useMemo(() => ({
    remoteTaskDetail,
    remoteProcessInstanceId,
  }), [remoteTaskDetail, remoteProcessInstanceId])

  return (
    <Context.Provider
      value={contextValue}
    >
      {children}
    </Context.Provider>
  );
};
