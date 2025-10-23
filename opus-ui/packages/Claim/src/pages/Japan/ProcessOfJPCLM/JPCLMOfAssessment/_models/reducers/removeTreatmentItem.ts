import { produce } from 'immer';
import { wholeEntities } from '../dto/EntriesModel';
import { deteteDataByIncidentAndTreatmentId } from '@/utils/claimUtils';
import validateIPDTreatment from './validateIPDTreatment';
import { removeTreatmentItemExpectDecision } from '../functions/expectDecisionFunc';

const removeTreatmentItem = (state: any, action: any) => {
  const { incidentId, treatmentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { claimEntities, claimProcessData } = draftState;
    removeTreatmentItemExpectDecision(claimProcessData, claimEntities, treatmentId);
    const result = deteteDataByIncidentAndTreatmentId(
      claimProcessData,
      claimEntities,
      incidentId,
      treatmentId,
      wholeEntities
    );

    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;
  });

  const finalState = validateIPDTreatment(nextState);

  return { ...finalState };
};

export default removeTreatmentItem;
