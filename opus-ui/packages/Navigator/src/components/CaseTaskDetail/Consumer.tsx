import React, { useContext } from 'react';
import Context from './Context';

export default ({ children, ...props }: any) => {
  const {
    processInstanceId,
    setProcessInstanceId,
    caseDetail,
    setCaseDetail,

    taskId,
    setTaskId,
    taskDetail,
    setTaskDetail,

    getTaskDetail,

    loading,

    setDataSource,

    reload,
  }: any = useContext(Context);

  return (
    <>
      {React.isValidElement(children) &&
        React.Children.map(children, (child: any) =>
          React.cloneElement(child, {
            processInstanceId,
            setProcessInstanceId,
            caseDetail,
            setCaseDetail,

            taskId,
            setTaskId,
            taskDetail,
            setTaskDetail,

            getTaskDetail,

            loading,

            reload,

            setDataSource,

            ...props,
          })
        )}
    </>
  );
};
