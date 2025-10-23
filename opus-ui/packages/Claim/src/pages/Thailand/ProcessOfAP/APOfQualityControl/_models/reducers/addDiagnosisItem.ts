import { produce } from 'immer';
import lodash from 'lodash';
import { DiagnosisType } from 'claim/pages/utils/claim';

const addDiagnosisItem = (state: any, action: any) => {
  const { incidentId, addDiagnosisItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!draftState.claimEntities.incidentListMap[incidentId].diagnosisList) {
      draftState.claimEntities.incidentListMap[incidentId].diagnosisList = [];
    }
    const { diagnosisList } = draftState.claimEntities.incidentListMap[incidentId];
    if (lodash.isEmpty(diagnosisList)) {
      addDiagnosisItem.diagnosisType = DiagnosisType.Primary;
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
