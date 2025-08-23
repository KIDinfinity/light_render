/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { incidentId, diagnosisId } = action.payload;

    draftState.claimEntities.incidentListMap[incidentId].diagnosisList = lodash.filter(
      draftState.claimEntities.incidentListMap[incidentId].diagnosisList,
      (item) => item !== diagnosisId
    );
    delete draftState.claimEntities.diagnosisListMap[diagnosisId];
  });
