import { produce } from 'immer';
import { deteteDataByIncidentId } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';
import { removeIncidentItemExpectDecision } from '../functions/expectDecisionFunc';

const removeIncidentItem = (state: any, action: any) => {
  const { incidentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { claimEntities, claimProcessData } = draftState;
    removeIncidentItemExpectDecision(claimProcessData, claimEntities, incidentId);
    const result = deteteDataByIncidentId(
      claimProcessData,
      claimEntities,
      incidentId,
      wholeEntities
    );

    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;
  });
  return { ...nextState };
};

export default removeIncidentItem;
