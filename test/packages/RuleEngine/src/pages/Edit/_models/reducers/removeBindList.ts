import { produce }  from 'immer';
import lodash from 'lodash';

const removeBindList = (state: any, action: any) => {
  const { groupId, editData } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = lodash.map(draftState.submitRuleSet.groups, (item) => {
      if (item.groupId === groupId) {
        return {
          ...item,
          rules: item?.rules.filter((el) => el.id !== editData.id),
        };
      }
      return item;
    });
  });

  return { ...nextState };
};

export default removeBindList;
