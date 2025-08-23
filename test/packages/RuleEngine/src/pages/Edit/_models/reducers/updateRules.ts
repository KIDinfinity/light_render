import lodash from 'lodash';
import { produce }  from 'immer';

const updateRules = (state: any, action: any) => {
  const { groupId, editData } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = lodash.map(draftState.submitRuleSet.groups, (item) => {
      if (item.groupId === groupId) {
        return {
          ...item,
          rules: lodash.map(item.rules, (el) => (el.id === editData.id ? editData : el)),
        };
      }
      return item;
    });
  });

  return { ...nextState };
};

export default updateRules;
