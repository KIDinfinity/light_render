import { produce }  from 'immer';

const saveNewFlowSumbit = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet = {
      ...draftState.submitRuleSet,
      ...action.payload,
    };
  });

  return { ...nextState };
};

export default saveNewFlowSumbit;
