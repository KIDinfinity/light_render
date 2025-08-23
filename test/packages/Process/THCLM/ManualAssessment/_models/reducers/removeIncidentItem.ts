import { produce }  from 'immer';
import { deteteDataByIncidentId } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';

const removeIncidentItem = (state: any, action: any) => {
  const { incidentId } = action.payload;
  const { claimEntities, claimProcessData } = state;

  const result = deteteDataByIncidentId(claimProcessData, claimEntities, incidentId, wholeEntities);

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;
  });

  return { ...nextState };
};

export default removeIncidentItem;
