import React, { useContext } from 'react';
import Context from './Context';

export default ({ children, ...props }: any) => {
  const {
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
  }: any = useContext(Context);

  return (
    <>
      {React.isValidElement(children) &&
        React.Children.map(children, (child: any) =>
          React.cloneElement(child, {
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
            ...props,
          })
        )}
    </>
  );
};
