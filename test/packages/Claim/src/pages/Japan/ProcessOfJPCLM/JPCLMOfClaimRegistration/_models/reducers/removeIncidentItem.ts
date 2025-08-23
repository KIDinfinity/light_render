import { produce } from 'immer';
import { deteteIncidentById } from '../../Utils/normalizrUtils';

const removeIncidentItem = (state: any, action: any) => {
  const { incidentId } = action.payload;
  const { claimEntities, claimProcessData } = state;

  const result = deteteIncidentById(claimProcessData, claimEntities, incidentId);

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;
  });

  return { ...nextState };
};

export default removeIncidentItem;
