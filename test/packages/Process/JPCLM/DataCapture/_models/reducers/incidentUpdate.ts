import { produce }  from 'immer';
import lodash from 'lodash';
import links from '../links';

const incidentUpdate = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.incidentListMap[incidentId] = {
      ...draftState.claimEntities.incidentListMap[incidentId],
      ...changedFields,
    };
    if (lodash.size(changedFields) === 1) {
      links.incident_claimTypeArray({ draftState, changedFields, incidentId });
      links.incident_trafficAccidentFlag({ draftState, changedFields, incidentId });
    }
  });
  return { ...nextState };
};

export default incidentUpdate;
