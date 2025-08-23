import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';

const klipCaseInfoAdd = (state: any, { payload }: any) => {
  const { incidentId, claimNo, klipClaimNo } = payload;
  const nextState = produce(state, (draftState: any) => {
    const item = {
      id: uuidv4(),
      incidentId,
      claimNo,
      klipClaimNo,
    };

    draftState.claimEntities.incidentListMap[incidentId].klipCaseInfoList = [
      ...(draftState.claimEntities.incidentListMap[incidentId]?.klipCaseInfoList || []),
      item,
    ];
  });

  return { ...nextState };
};

export default klipCaseInfoAdd;
