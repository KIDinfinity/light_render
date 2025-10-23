import { produce } from 'immer';

const saveIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.incidentListMap[incidentId] = {
      ...state.claimEntities.incidentListMap[incidentId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveIncidentItem;
