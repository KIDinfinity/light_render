import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'dva';
import TaskDetailContext from '../Context';

// TODO:opus已经废弃
const Listener = () => {
  const dispatch = useDispatch();
  const { taskDetail }: any = useContext(TaskDetailContext);
  useEffect(() => {
    if (taskDetail) {
      dispatch({
        type: 'insured360/saveTaskInfo',
        payload: {
          taskDetail: {
            ...taskDetail,
          },
        },
      });
    }
  }, [taskDetail]);
  return null;
};

export default ({ children }: any) => {
  return (
    <>
      {children}
      <Listener />
    </>
  );
};
