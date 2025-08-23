import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getConditionData } from '../../Utils';

const saveScenarioConditionData = (state: any, action: any) => {
  const { changedFields, groupId, id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const moduleCode = formUtils.queryValue(draftState.submitRuleSet.ruleSetInfo.moduleCode || '');
    const ruleAtoms = draftState.dropDown.ruleAtoms || [];
    const atomInputInfo = draftState.atomInputInfo || [];
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = lodash.map(
      draftState.submitRuleSet.groups,
      (groupsItem: any) => {
        return groupsItem.groupId === groupId
          ? {
              ...groupsItem,
              groupConditions: lodash.map(groupsItem.groupConditions, (conditionItem: any) => {
                return conditionItem.id === id
                  ? getConditionData({
                      item: conditionItem,
                      changedFields,
                      moduleCode,
                      ruleAtoms,
                      atomInputInfo,
                    })
                  : conditionItem;
              }),
            }
          : groupsItem;
      }
    );
  });

  return { ...nextState };
};

export default saveScenarioConditionData;
