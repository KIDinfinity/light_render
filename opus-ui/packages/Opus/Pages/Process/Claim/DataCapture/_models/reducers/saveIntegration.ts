import { produce } from 'immer';
import lodash from 'lodash';

const klipCaseInfoUpdate = (state: any, action: any) => {
  const { incidentId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const path = `integration.${incidentId}.klipCaseInfoList`;
    const klipCaseInfoList = lodash.get(draftState, path, []);

    draftState.claimEntities.incidentListMap[incidentId].klipCaseInfoList = [...klipCaseInfoList];
    draftState.claimEntities.procedureListMap = {
      ...(draftState.integration?.[incidentId]?.procedureListMap || {}),
    };
    draftState.claimEntities.treatmentListMap = {
      ...(draftState.integration?.[incidentId]?.treatmentListMap || {}),
    };
  });
  return { ...nextState };
};

export default klipCaseInfoUpdate;
