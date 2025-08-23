import { produce } from 'immer';
import lodash from 'lodash';

const saveIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.has(changedFields, 'claimType') && lodash.size(changedFields) === 1) {
      changedFields.subClaimType = ''
    }

    draftState.claimEntities.incidentListMap[incidentId] = {
      ...state.claimEntities.incidentListMap[incidentId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveIncidentItem;
