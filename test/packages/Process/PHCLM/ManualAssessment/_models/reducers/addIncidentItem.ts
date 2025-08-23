import { produce }  from 'immer';

const addIncidentItem = (state: any, action: any) => {
  const { addIncidentItem, addDiagnosisItem } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.incidentList = [
      ...draftState.claimProcessData.incidentList,
      addIncidentItem.id,
    ];
    draftState.claimProcessData.showRegisterAlert = true;
    draftState.claimEntities.incidentListMap[addIncidentItem.id] = addIncidentItem;
    // draftState.claimEntities.diagnosisListMap[addDiagnosisItem.id] = addDiagnosisItem;
  });

  return { ...nextState };
};

export default addIncidentItem;
