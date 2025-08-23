import { produce }  from 'immer';

const saveCurrentRuleSetModalTab = (state: any, action: any) => {
  const { currentRuleSetModalTab } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.currentRuleSetModalTab = currentRuleSetModalTab;
  });

  return { ...nextState };
};

export default saveCurrentRuleSetModalTab;
