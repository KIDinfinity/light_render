import { produce }  from 'immer';
import lodash from 'lodash';

const reduceGroupConditions = (state: any, action: any) => {
  const { groupId, item } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = lodash.map(
      draftState.submitRuleSet.groups,
      (groupsItem: any) => {
        return groupsItem.groupId === groupId
          ? {
              ...groupsItem,
              groupConditions: lodash.filter(
                groupsItem.groupConditions,
                (conditionItem: any) => conditionItem.id !== item.id
              ),
            }
          : groupsItem;
      }
    );
  });
  return { ...nextState };
};

export default reduceGroupConditions;
