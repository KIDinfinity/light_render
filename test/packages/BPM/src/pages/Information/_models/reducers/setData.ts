import { produce } from 'immer';

export default (state: any, action: Object) => {
  const {
    payload: { processInstanceId, taskId, rejected, defaultActivityCode, defaultCategoryCode },
  } = action;
  const nextState = produce(state, (draftState: any) => {
    draftState.processInstanceId = processInstanceId;
    draftState.taskId = taskId;
    draftState.rejected = rejected;
    draftState.defaultActivityCode = defaultActivityCode;
    draftState.defaultCategoryCode = defaultCategoryCode;
  });
  return {
    ...nextState,
  };
};
