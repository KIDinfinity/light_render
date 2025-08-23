import React, { useMemo } from 'react';
import { useDispatch } from 'dva';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';

const SetTaskDetail = ({ taskDetailSource, setTaskDetail }: any) => {
  const dispatch = useDispatch();
  setTaskDetail(taskDetailSource);
  useMemo(() => {
    dispatch({
      type: 'processTask/save',
      payload: { getTask: taskDetailSource },
    });
  }, [taskDetailSource]);
  return <></>;
};

export default ({ taskDetailSource }: any) => {
  return (
    <CaseTaskDetail.Consumer>
      <SetTaskDetail taskDetailSource={taskDetailSource} />
    </CaseTaskDetail.Consumer>
  );
};
