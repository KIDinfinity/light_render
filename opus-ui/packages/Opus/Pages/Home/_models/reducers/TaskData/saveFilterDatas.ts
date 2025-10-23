import { produce } from 'immer';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.taskData.filterDatas = {
      ...draftState.taskData.filterDatas,
      ...action.payload,
    };
  });
  return { ...nextState };
};
