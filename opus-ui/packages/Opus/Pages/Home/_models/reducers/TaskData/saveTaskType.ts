import { produce } from 'immer';

export default (state: any, action: any) => {
  const { taskType } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.taskType = taskType;
  });
  return { ...nextState };
};
