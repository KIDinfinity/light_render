import { produce }  from 'immer';
import { isArray } from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { INCIDENTITEM, DIAGNOSISITEM } from '@/utils/claimConstant';
import setIncidentItemExpandStatus from './setIncidentItemExpandStatus';

const incidentAdd = (state: any, action: any) => {
  const incidentId = uuidv4();
  const diagnosisId = uuidv4();

  const nextState = produce(state, (draftState: any) => {
    const claimNo = draftState.claimProcessData.claimNo;
    const incidentList = draftState.claimProcessData.incidentList || [];

    let incidentNo = 1;
    if (isArray(incidentList)) {
      incidentNo = incidentList.length + 1;
    }
    const incidentAdd = {
      ...INCIDENTITEM,
      claimNo,
      diagnosisList: [diagnosisId],
      id: incidentId,
      incidentNo,
      ...(action?.payload?.changedValues || {}),
    };
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo,
      id: diagnosisId,
      incidentId,
    };

    draftState.claimProcessData.incidentList = [
      ...draftState.claimProcessData.incidentList,
      incidentAdd.id,
    ];

    draftState.claimEntities.incidentListMap[incidentAdd.id] = incidentAdd;
    draftState.claimEntities.diagnosisListMap[addDiagnosisItem.id] = addDiagnosisItem;
  });

  return setIncidentItemExpandStatus(nextState, {
    type: 'setIncidentItemExpandStatus',
    payload: {
      id: incidentId,
      status: true,
    },
  });
};

export default incidentAdd;
