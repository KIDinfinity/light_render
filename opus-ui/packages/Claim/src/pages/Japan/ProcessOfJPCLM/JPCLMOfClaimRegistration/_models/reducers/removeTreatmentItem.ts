import { produce } from 'immer';
import { deteteTreatmentById } from '../../Utils/normalizrUtils';

const removeTreatmentItem = (state: any, action: any) => {
  const { incidentId, treatmentId } = action.payload;
  const { claimEntities, claimProcessData } = state;
  const result = deteteTreatmentById(claimProcessData, claimEntities, incidentId, treatmentId);

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;
  });

  return { ...nextState };
};

export default removeTreatmentItem;
