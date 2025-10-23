import { produce } from 'immer';

const saveRuleSetList = (state: any, action: any) => {
  const { list } = action.payload;
  return produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.ruleSet = {
      ...draftState.ruleSet,
      ...list,
    };
  });
};

export default saveRuleSetList;
