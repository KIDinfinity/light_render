import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveMainBenefitItem = (state: any, action: any) => {
  const { mainBenefitId, changedFields } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    const fieldsArray = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      if (
        lodash.has(changedFields, 'therapiesType') &&
        lodash.isEmpty(formUtils.queryValue(changedFields.therapiesType))
      ) {
        finalChangedFields.doctor = null;
        finalChangedFields.mainBenefit = null;
      }
    }

    draftState.claimEntities.mainBenefitListMap[mainBenefitId] = {
      ...state.claimEntities.mainBenefitListMap[mainBenefitId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveMainBenefitItem;
