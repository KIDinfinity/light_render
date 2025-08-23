/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

const diagnosisDelete = (state: any, action: any) => {
  const { incidentId, diagnosisId } = action.payload;
  const newDiagnosisList = lodash.filter(
    state.claimEntities.incidentListMap[incidentId].diagnosisList,
    (item) => item !== diagnosisId
  );

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.incidentListMap[incidentId].diagnosisList = newDiagnosisList;
    delete draftState.claimEntities.diagnosisListMap[diagnosisId];
  });

  return { ...nextState };
};

export default diagnosisDelete;
