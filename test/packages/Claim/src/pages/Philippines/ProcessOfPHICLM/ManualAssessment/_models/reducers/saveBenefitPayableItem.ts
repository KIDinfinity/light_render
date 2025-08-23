import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { shouldDo } from '../functions/fnObject';

const saveBenefitPayableItem = (state: any, action: any) => {
  const { changedFields, benefitPayableId } = action.payload;
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    if (shouldDo(changedFields, 'assessorOverrideAmount')) {
      changedFields.payableAmount = formUtils.queryValue(changedFields.assessorOverrideAmount) || 0;
    }
    draftState.claimEntities.benefitItemPayableListMap[benefitPayableId] = {
      ...state.claimEntities.benefitItemPayableListMap[benefitPayableId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveBenefitPayableItem;
