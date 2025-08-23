//

import lodash from 'lodash';
import { produce }  from 'immer';

const saveScenarioInfoFormData = (state: any, action: any) => {
  const { changedFields, groupId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = lodash.map(
      draftState.submitRuleSet.groups,
      (groupsItem: any) => {
        return groupsItem.groupId === groupId
          ? {
              ...groupsItem,
              ...changedFields,
            }
          : groupsItem;
      }
    );
  });

  return { ...nextState };
};

export default saveScenarioInfoFormData;
