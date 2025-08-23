import React, { useEffect } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import useAbortController from '@/components/AbortController/useAbortController';

const Content = ({
  children,
  localProcessInstanceId,
  remoteProcessInstanceId,
  localTaskId,
  remoteTaskId,
  requireGetEnvoyData,
}: any) => {
  const dispatch = useDispatch();
  const currentTab = useSelector(
    ({ advancedQueryAllForm }: any) => advancedQueryAllForm?.currentTab,
    shallowEqual
  );
  const signal = useAbortController([requireGetEnvoyData, currentTab]);
  useEffect(() => {
    if (
      requireGetEnvoyData &&
      (localProcessInstanceId || remoteProcessInstanceId || localTaskId || remoteTaskId)
    ) {
      (async () => {
        await dispatch({
          type: 'envoyController/initEnvoyData',
          signal,
        });
      })();
    }
  }, [signal]);

  return <>{children}</>;
};

export default ({ children }: any) => (
  <CaseTaskDetail.Pending.Consumer>
    <Content>{children}</Content>
  </CaseTaskDetail.Pending.Consumer>
);
