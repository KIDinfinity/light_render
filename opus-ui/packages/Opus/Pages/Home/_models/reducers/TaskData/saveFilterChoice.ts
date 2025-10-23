import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { filterChoice } = payload || {};

  const nextState = produce(state, (draftState: any) => {
    draftState.taskData.filterChoice = filterChoice;
  });
  return { ...nextState };
};
