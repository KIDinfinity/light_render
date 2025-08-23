import { produce } from 'immer';

export default (state: any, action: any) => {
  const { coverageList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.processData.coverageList = coverageList;
  });
  return {
    ...nextState,
  };
};
