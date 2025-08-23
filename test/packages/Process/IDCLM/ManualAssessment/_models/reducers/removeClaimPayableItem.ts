import { produce }  from 'immer';
import { deteteDataByIncidentPayableId } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';

const removeClaimPayableItem = (state: any, action: any) => {
  const { claimEntities, claimProcessData } = state;
  const { incidentPayableId } = action.payload;

  const result = deteteDataByIncidentPayableId(
    claimProcessData,
    claimEntities,
    incidentPayableId,
    wholeEntities
  );

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;
  });
  return { ...nextState };
};

export default removeClaimPayableItem;
