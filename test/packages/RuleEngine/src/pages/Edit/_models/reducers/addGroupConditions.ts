import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';

const addGroupConditions = (state: any, action: any) => {
  const { groupId, index } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = lodash.map(
      draftState?.submitRuleSet?.groups,
      (groupsItem: any) => {
        if (groupsItem.groupId === groupId) {
          groupsItem.groupConditions.splice(index + 1, 0, {
            id: uuidv4(),
            atomCode: '',
            conditionId: '',
            operator: '',
            value: '',
          });
        }
        return groupsItem;
      }
    );
  });
  return { ...nextState };
};

export default addGroupConditions;
