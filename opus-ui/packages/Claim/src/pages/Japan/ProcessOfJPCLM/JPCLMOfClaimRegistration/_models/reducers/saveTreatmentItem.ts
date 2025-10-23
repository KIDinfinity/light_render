import { produce } from 'immer';
import lodash, { cloneDeep } from 'lodash';
import { formUtils } from 'basic/components/Form';
import saveTreatmentItemCallback from './saveTreatmentItemCallback';

const saveTreatmentItem = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  let nextState: any = produce(state, (draftState: any) => {
    if (
      lodash.has(changedFields, 'icu') &&
      lodash.isBoolean(formUtils.queryValue(changedFields.icu))
    ) {
      finalChangedFields.icu = changedFields.icu.value ? 1 : 0;
      finalChangedFields.icuFromDateString = null;
      finalChangedFields.icuToDateString = null;
    }

    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...state.claimEntities.treatmentListMap[treatmentId],
      ...finalChangedFields,
    };
  });

  nextState = saveTreatmentItemCallback(cloneDeep(nextState), action);

  return { ...nextState };
};

export default saveTreatmentItem;
