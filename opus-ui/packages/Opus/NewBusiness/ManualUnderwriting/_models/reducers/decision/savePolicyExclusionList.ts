import { produce } from 'immer';

export default (state: any, action: any) => {
  const { policyExclusionList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.processData.policyExclusionList = policyExclusionList;
  });
  return {
    ...nextState,
  };
};
