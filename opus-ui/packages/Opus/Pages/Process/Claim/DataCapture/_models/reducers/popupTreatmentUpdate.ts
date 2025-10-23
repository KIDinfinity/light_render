import { produce } from 'immer';

const treatmentUpdate = (state: any, action: any) => {
  const { changedFields, treatmentId, incidentId } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.integration[incidentId].treatmentListMap[treatmentId] = {
      ...draftState.integration[incidentId].treatmentListMap[treatmentId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default treatmentUpdate;
