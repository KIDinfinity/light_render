import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { useLocation, useParams } from 'umi';
import lodash from 'lodash';

import navigator from 'navigator/api';

let timer: number | null = null;

const handleTimeOut = ({ dispatch }: any) => {
  timer = setTimeout(() => {
    dispatch({
      type: 'workspaceSwitchOn/saveTriggerTimeout',
      payload: {
        triggerTimeout: true,
      },
    });
  }, 5000);
};

const TriggerComponent = () => {
  const dispatch = useDispatch();
  const autoTrigger = useSelector((state: any) => state.workspaceSwitchOn.autoTrigger);
  const triggerTimeout = useSelector((state: any) => state.workspaceSwitchOn.triggerTimeout);
  const triggerDependencies = useSelector(
    (state: any) => state.workspaceSwitchOn.triggerDependencies
  );
  // const taskDetail = useSelector((state: any) => state.workspaceSwitchOn.taskDetail, shallowEqual);

  useEffect(() => {
    if (
      (autoTrigger && lodash.every(triggerDependencies, (item) => item)) ||
      (autoTrigger && triggerTimeout)
    ) {
      dispatch({
        type: 'workspaceSwitchOn/handleTrrigger',
      });
    }
  }, [autoTrigger, triggerTimeout, triggerDependencies]);

  return <></>;
};

export default () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const triggerPage = ['/navigator/case/detail', '/process/task/detail', '/claim/task/detail'];

  const processInstanceId = useSelector(
    (state: any) => state.workspaceSwitchOn.taskDetail?.processInstanceId
  );
  const taskId = useSelector((state: any) => state.workspaceSwitchOn.taskDetail?.taskId);
  const currentTaskId = useSelector(
    (state: any) => state.workspaceSwitchOn.taskDetail?.currentTaskId
  );

  useEffect(() => {
    const siderToggle = navigator.SiderWorkSpaceController.state.value.siderToggle;
    if (
      siderToggle === 'off' &&
      triggerPage.some((item) => new RegExp(item).test(location.pathname))
    ) {
      dispatch({
        type: 'workspaceSwitchOn/saveAutoTrigger',
        payload: {
          autoTrigger: true,
        },
      });
      dispatch({
        type: 'workspaceSwitchOn/saveActiveTask',
        payload: {
          activeTask: {},
        },
      });
      dispatch({
        type: 'workspaceSwitchOn/saveTriggerDependencies',
        payload: {
          init: true,
        },
      });
      dispatch({
        type: 'workspaceSwitchOn/saveTriggerTimeout',
        payload: {
          triggerTimeout: false,
        },
      });
      dispatch({
        type: 'workspaceSwitchOn/saveTriggerActiveTab',
        payload: {
          triggerActiveTab: null,
        },
      });
    }
  }, [location.key]);

  useEffect(() => {
    if (taskId || processInstanceId) {
      handleTimeOut({ dispatch });
      return () => {
        clearTimeout(timer);
        timer = null;
      };
    }
  }, [taskId, processInstanceId, location.key]);

  useEffect(() => {
    if (
      (params.taskId && (params.taskId === taskId || params.taskId === currentTaskId)) ||
      (params.processInstanceId && params.processInstanceId === processInstanceId)
    ) {
      dispatch({
        type: 'workspaceSwitchOn/saveActiveTask',
        payload: {
          activeTask: {
            taskId: taskId || currentTaskId,
            processInstanceId: processInstanceId,
          },
        },
      });
    }
  }, [taskId, processInstanceId, params, currentTaskId]);

  return (
    <>
      <TriggerComponent />
    </>
  );
};
