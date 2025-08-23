import lodash from 'lodash';
import { produce }  from 'immer';

const toggleRuleBind = (state: any, action: any) => {
  const { groupId, checked } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = lodash.map(
      draftState.submitRuleSet.groups,
      (groupItem: any) => {
        return groupItem.groupId === groupId
          ? {
              ...groupItem,
              rules: lodash.map(groupItem.rules, (ruleItem: any) => {
                return {
                  ...ruleItem,
                  checked,
                };
              }),
            }
          : groupItem;
      }
    );
  });

  return { ...nextState };
};

export default toggleRuleBind;
