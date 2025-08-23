import { produce }  from 'immer';
import { deteteDataByIncidentId } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';

const incidentDelete = (state: any, action: any) => {
  const { incidentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { claimEntities, claimProcessData } = draftState;

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

export default incidentDelete;
