import { produce } from 'immer';
import { deteteDataByIncidentPayableIdAndTreatmentPayableId } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';

const removeTreatmentPayableItem = (state: any, action: any) => {
  const { claimEntities, claimProcessData } = state;
  const { claimPayableItemId, treatmentPayableItemId } = action.payload;

  const result = deteteDataByIncidentPayableIdAndTreatmentPayableId(
    claimProcessData,
    claimEntities,
    claimPayableItemId,
    treatmentPayableItemId,
    wholeEntities
  );

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;
  });

  return { ...nextState };
};

export default removeTreatmentPayableItem;
