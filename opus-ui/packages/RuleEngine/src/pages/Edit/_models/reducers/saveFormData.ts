//

import { produce } from 'immer';

const saveFormData = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const ruleSetInfo = draftState.submitRuleSet.ruleSetInfo;
    draftState.submitRuleSet.ruleSetInfo = {
      ...ruleSetInfo,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveFormData;
