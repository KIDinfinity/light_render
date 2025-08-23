import { produce }  from 'immer';

const clearRuleSetModalData = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.ruleSetModalData = {};
  });

  return { ...nextState };
};

export default clearRuleSetModalData;
