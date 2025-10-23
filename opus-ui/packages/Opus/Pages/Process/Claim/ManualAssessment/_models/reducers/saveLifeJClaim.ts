import { produce } from 'immer';

const saveLifeJClaim = (state: any, { payload }: any) => {
  const { klipCaseInfoList, incidentId } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.incidentListMap[incidentId].klipCaseInfoList = klipCaseInfoList;
    draftState.popupData.klipCaseInfoList = klipCaseInfoList;
  });
  return { ...nextState };
};
export default saveLifeJClaim;
