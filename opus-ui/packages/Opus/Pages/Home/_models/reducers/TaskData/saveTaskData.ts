import { produce } from 'immer';

export default (state: any, action: any) => {
  const { taskData } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.taskData = { ...draftState.taskData, ...taskData };
  });
  return { ...nextState };
};
