import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import validateIPDTreatment from './validateIPDTreatment';

const saveTreatmentItem = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    if (
      lodash.has(changedFields, 'icu') &&
      lodash.isBoolean(formUtils.queryValue(changedFields.icu))
    ) {
      finalChangedFields.icu = changedFields.icu.value ? 1 : 0;
    }

    let incrementTreatmentItem = {};
    if (lodash.has(finalChangedFields, 'icu')) {
      if (
        formUtils.queryValue(changedFields.icu) === 0 ||
        formUtils.queryValue(changedFields.icu) === false
      ) {
        incrementTreatmentItem = {
          icuFromDate: '',
          icuToDate: '',
        };
      }
    }

    if (
      lodash.has(finalChangedFields, 'treatmentType') &&
      formUtils.queryValue(changedFields.treatmentType) !== 'IP'
    ) {
      incrementTreatmentItem = {
        dateOfAdmission: '',
        dateOfDischarge: '',
      };
    }

    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...state.claimEntities.treatmentListMap[treatmentId],
      ...finalChangedFields,
      ...incrementTreatmentItem,
    };
  });

  let finalState = nextState;

  if (
    lodash.has(changedFields, 'dateOfAdmission') ||
    lodash.has(changedFields, 'dateOfDischarge') ||
    lodash.has(changedFields, 'treatmentType')
  ) {
    finalState = validateIPDTreatment(nextState, action.payload);
  }

  return { ...finalState };
};

export default saveTreatmentItem;
