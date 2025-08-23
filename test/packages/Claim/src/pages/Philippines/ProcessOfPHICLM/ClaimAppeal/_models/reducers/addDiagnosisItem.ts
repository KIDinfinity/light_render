import { produce } from 'immer';

const addDiagnosisItem = (state: any, action: any) => {
  const { incidentId, addDiagnosisItem } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    if (!draftState.claimEntities.incidentListMap[incidentId].diagnosisList) {
      draftState.claimEntities.incidentListMap[incidentId].diagnosisList = [];
    }
    draftState.claimEntities.incidentListMap[incidentId].diagnosisList = [
      ...draftState.claimEntities.incidentListMap[incidentId].diagnosisList,
      addDiagnosisItem.id,
    ];
    draftState.claimEntities.diagnosisListMap[addDiagnosisItem.id] = addDiagnosisItem;
  });

  return { ...nextState };
};

export default addDiagnosisItem;
