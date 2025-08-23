import { produce } from 'immer';

const addTreatmentItem = (state: any, action: any) => {
  const { incidentId, addTreatmentItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
      draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
    }
    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
      ...draftState.claimEntities.incidentListMap[incidentId].treatmentList,
      addTreatmentItem.id,
    ];
    draftState.claimEntities.treatmentListMap[addTreatmentItem.id] = addTreatmentItem;
  });
  return { ...nextState };
};

export default addTreatmentItem;
