import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import { deteteDataByIncidentPayableIdAndTreatmentPayableId } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';
import { updateDuplicatePayableError } from '../functions';

const removeTreatmentPayableItem = (state: any, action: any) => {
  const { claimProcessData } = state;
  const { claimPayableItemId, treatmentPayableItemId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const editPayable = formUtils.cleanValidateData(
      draftState.claimEntities.treatmentPayableListMap[treatmentPayableItemId]
    );
    updateDuplicatePayableError(
      draftState,
      {
        editPayable,
        benefitItemCode: editPayable.benefitItemCode,
      },
      'treatmentPayable'
    );
    const result = deteteDataByIncidentPayableIdAndTreatmentPayableId(
      claimProcessData,
      draftState.claimEntities,
      claimPayableItemId,
      treatmentPayableItemId,
      wholeEntities
    );
    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;
  });

  return { ...nextState };
};

export default removeTreatmentPayableItem;
