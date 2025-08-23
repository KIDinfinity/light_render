import { produce }  from 'immer';
import lodash from 'lodash';

const removeRules = (state: any, action: any) => {
  const { groupId, id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = draftState.submitRuleSet.groups.map((item: any) => ({
      ...item,
      rules:
        item.groupId === groupId
          ? lodash.filter(item?.rules, (ruleItem: any) => ruleItem.id !== id)
          : item.rules,
    }));
  });

  return { ...nextState };
};

export default removeRules;
