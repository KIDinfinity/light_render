import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getConditionData } from '../../Utils';

const saveDecisionConditionData = (state: any, action: any) => {
  const { index, branchId, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const moduleCode = formUtils.queryValue(draftState.submitRuleSet.ruleSetInfo.moduleCode || '');
    const ruleAtoms = draftState.dropDown.ruleAtoms || [];
    const atomInputInfo = draftState.atomInputInfo || [];
    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData.branchVO.branchList = lodash.map(
      draftState.decisionEditData.branchVO.branchList,
      (branchItem: any) => {
        return branchItem.id === branchId
          ? {
              ...branchItem,
              conditions: lodash.map(branchItem.conditions, (conditionItem: any, idx: number) => {
                return idx === index
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
          : branchItem;
      }
    );
  });

  return { ...nextState };
};

export default saveDecisionConditionData;
