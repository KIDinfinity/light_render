import { produce } from 'immer';
import { has, isBoolean } from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveTreatmentItem = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState: any) => {
    if (has(changedFields, 'icu') && isBoolean(formUtils.queryValue(changedFields.icu))) {
      finalChangedFields.icu = changedFields.icu.value ? 1 : 0;
      finalChangedFields.icuFromDate = null;
      finalChangedFields.icuToDate = null;
    }
    if (has(changedFields, 'treatmentType')) {
      if (changedFields.treatmentType.value === 'IP') {
        finalChangedFields.dateOfConsultation = null;
      } else if (changedFields.treatmentType.value === 'OP') {
        finalChangedFields.dateOfAdmission = null;
        finalChangedFields.dateOfDischarge = null;
        finalChangedFields.icu = 0;
        finalChangedFields.icuFromDate = null;
        finalChangedFields.icuToDate = null;
      }
    }
    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...state.claimEntities.treatmentListMap[treatmentId],
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveTreatmentItem;
