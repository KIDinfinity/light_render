import { produce } from 'immer';

export default (state: any, action: any) => {
  const { claimProcessData, taskId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      [taskId]: claimProcessData,
    };
  });
  return { ...nextState };
};
