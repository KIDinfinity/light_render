import lodash from 'lodash';

export default (state: any, { payload: { activeTask } }: any) => {
  if (state.autoTrigger) {
    const taskId = state.activeTask?.taskId;
    const processInstanceId = state.activeTask?.processInstanceId;

    if (
      taskId &&
      activeTask?.taskId === taskId &&
      processInstanceId &&
      activeTask?.processInstanceId === processInstanceId
    ) {
      return state;
    }

    const newTriggerDependencies = lodash.reduce(
      state.triggerDependencies,
      (result: any, item, key) => {
        const taskTarget = state.triggerModalData?.[`${taskId}_taskId`];
        const processInstanceTarget =
          state.triggerModalData?.[`${processInstanceId}_processInstanceId`];
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
      activeTask,
      triggerDependencies: newTriggerDependencies,
    };
  }

  return state;
};
