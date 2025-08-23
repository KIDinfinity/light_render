import { produce }  from 'immer';
import lodash from 'lodash';

const saveRuleChecked = (state: any, action: any) => {
  const { groupId, id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = lodash.map(
      draftState.submitRuleSet.groups,
      (groupItem: any) => {
        return groupItem.groupId === groupId
          ? {
              ...groupItem,
              rules: lodash.map(groupItem.rules, (ruleItem: any) => {
                return ruleItem.id === id
                  ? {
                      ...ruleItem,
                      checked: !ruleItem.checked,
                    }
                  : ruleItem;
              }),
            }
          : groupItem;
      }
    );
  });

  return { ...nextState };
};

export default saveRuleChecked;
