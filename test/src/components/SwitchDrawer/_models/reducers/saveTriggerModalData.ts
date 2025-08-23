import lodash from 'lodash';

export default (state: any, { payload: { triggerModalData, taskId, processInstanceId } }: any) => {
  const { taskId: activeTaskId, processInstanceId: activeProcessInstanceId } = state.activeTask;

  const data = taskId
    ? {
        [`${taskId}_taskId`]: {
          ...state.triggerModalData[`${taskId}_taskId`],
          ...triggerModalData[taskId],
        },
      }
    : {
        [`${processInstanceId}_processInstanceId`]: {
          ...state.triggerModalData[`${processInstanceId}_processInstanceId`],
          ...triggerModalData[processInstanceId],
        },
      };

  const newTriggerDependencies = lodash.reduce(
    state.triggerDependencies,
    (result: any, item, key) => {
      const taskTarget = state.triggerModalData?.[`${activeTaskId}_taskId`];
      const processInstanceTarget =
        state.triggerModalData?.[`${activeProcessInstanceId}_processInstanceId`];
      if (lodash.has(taskTarget, key) || lodash.has(processInstanceTarget, key)) {
        result[key] = true;
        return result;
      }
      result[key] = item;
      return result;
    },
    {}
  );

  return {
    ...state,
    triggerModalData: {
      ...state.triggerModalData,
      ...data,
    },
    triggerDependencies: newTriggerDependencies,
  };
};
