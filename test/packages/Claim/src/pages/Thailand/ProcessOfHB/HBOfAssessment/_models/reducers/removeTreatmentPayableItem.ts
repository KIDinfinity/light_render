import { deteteDataByIncidentPayableIdAndTreatmentPayableId } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';
import { produce } from 'immer';

const removeTreatmentPayableItem = (state: any, action: any) => {
  const { claimEntities, claimProcessData } = state;
  const { claimPayableItemId, treatmentPayableItemId } = action.payload;
  const result: any = deteteDataByIncidentPayableIdAndTreatmentPayableId(
    claimProcessData,
    claimEntities,
    claimPayableItemId,
    treatmentPayableItemId,
    wholeEntities
  );
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;
  });
  return { ...nextState };
};

export default removeTreatmentPayableItem;
