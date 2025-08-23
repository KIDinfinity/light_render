import { produce }  from 'immer';
import lodash from 'lodash';

const addRules = (state: any, action: any) => {
  const { groupId, editData } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = lodash.map(draftState?.submitRuleSet?.groups, (item) => {
      if (item.groupId === groupId) {
        const rules = item?.rules || [];
        return {
          ...item,
          rules: rules?.concat(editData),
        };
      }
      return item;
    });
  });

  return { ...nextState };
};

export default addRules;
