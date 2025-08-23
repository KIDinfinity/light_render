/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

const addDiagnosisItem = (state: any, action: any) => {
  const { incidentId, addDiagnosisItem: addItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!draftState.claimEntities.incidentListMap[incidentId].diagnosisList) {
      draftState.claimEntities.incidentListMap[incidentId].diagnosisList = [];
    }
    draftState.claimEntities.incidentListMap[incidentId].diagnosisList = [
      ...draftState.claimEntities.incidentListMap[incidentId].diagnosisList,
      addItem.id,
    ];
    draftState.claimEntities.diagnosisListMap[addItem.id] = {
      ...addItem
    };
    draftState.claimProcessData.showRegisterAlert = true;

  });

  return { ...nextState };
};

export default addDiagnosisItem;
