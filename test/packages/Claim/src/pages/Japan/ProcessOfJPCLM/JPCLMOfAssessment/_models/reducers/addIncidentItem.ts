import { produce } from 'immer';

const addIncidentItem = (state: any, action: any) => {
  const { addIncidentItem, addDiagnosisItem, addTreatmentItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.incidentList = [
      ...draftState.claimProcessData.incidentList,
      addIncidentItem.id,
    ];

    draftState.claimEntities.incidentListMap[addIncidentItem.id] = addIncidentItem;
    draftState.claimEntities.diagnosisListMap[addDiagnosisItem.id] = addDiagnosisItem;
    draftState.claimEntities.treatmentListMap[addTreatmentItem.id] = addTreatmentItem;
  });
  return { ...nextState };
};

export default addIncidentItem;
