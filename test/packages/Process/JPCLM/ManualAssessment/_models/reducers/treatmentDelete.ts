import { produce }  from 'immer';
import { deteteDataByIncidentAndTreatmentId } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';

const treatmentDelete = (state: any, action: any) => {
  const { incidentId, treatmentId } = action.payload;
  const { claimEntities, claimProcessData } = state;

  const result = deteteDataByIncidentAndTreatmentId(
    claimProcessData,
    claimEntities,
    incidentId,
    treatmentId,
    wholeEntities
  );

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;
  });

  return { ...nextState };
};

export default treatmentDelete;
