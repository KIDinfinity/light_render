import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getConditionData } from '../../Utils';

const saveConditionsData = (state: any, action: any) => {
  const { changedFields, id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const moduleCode = formUtils.queryValue(draftState.submitRuleSet.ruleSetInfo.moduleCode || '');
    const ruleAtoms = draftState.dropDown.ruleAtoms || [];
    const atomInputInfo = draftState.atomInputInfo || [];
    // eslint-disable-next-line no-param-reassign
    draftState.editData = {
      ...draftState.editData,
      conditions: lodash.map(draftState.editData.conditions, (item: any) => {
        return item.id === id
          ? getConditionData({
              item,
              changedFields,
              moduleCode,
              ruleAtoms,
              atomInputInfo,
            })
          : item;
      }),
    };
  });

  return { ...nextState };
};

export default saveConditionsData;
