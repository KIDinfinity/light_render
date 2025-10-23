import { produce } from 'immer';

export default (state) => {
  const popupData = state.popupData;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.treatmentListMap = popupData.treatmentListMap;
    draftState.claimEntities.procedureListMap = popupData.procedureListMap;
    draftState.popupData.isShow = false;
    draftState.claimEntities.incidentListMap[popupData.incidentId].klipCaseInfoList =
      popupData.klipCaseInfoList;
  });
  return nextState;
};
