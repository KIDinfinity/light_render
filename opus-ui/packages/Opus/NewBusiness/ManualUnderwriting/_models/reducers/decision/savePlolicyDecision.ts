import { produce } from 'immer';

export default (state: any, action: any) => {
  const { policyDecision } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.processData.policyDecision = policyDecision;
  });
  return {
    ...nextState,
  };
};
