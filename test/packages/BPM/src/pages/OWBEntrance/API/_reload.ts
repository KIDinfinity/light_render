import { useContext } from 'react';
import useGetTaskDetailCallback from 'bpm/pages/OWBEntrance/_hooks/useGetTaskDetailCallback';
import useGetTaskVersionCallback from 'bpm/pages/OWBEntrance/_hooks/useGetTaskVersionCallback';
import context from '../Context/context';

export default () => {
  const {
    reload,
    state: { taskDetail },
    dispatch,
  } = useContext(context);
  const getData = useGetTaskDetailCallback({
    taskDetail,
    options: { localCache: false },
  });
  const getTaskVersion = useGetTaskVersionCallback({ taskId: taskDetail?.taskId });

  const updateCurrentTaskStatus = async () => {
    const { businessData: data, activityButtonList, ...detail } = await getData();
    getTaskVersion();
    dispatch({
      type: 'setTaskDetail',
      payload: { taskDetail: detail },
    });
    dispatch({
      type: 'setButtonList',
      payload: {
        buttonList: activityButtonList,
      },
    });
  };
  return async (taskId?: string) => {
    if (taskId) {
      reload(taskId);
    } else {
      updateCurrentTaskStatus();
    }
  };
};
