import { produce } from 'immer';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  return produce(state, (draftState) => {
    if (!draftState.claimProcessData.claimAppealInfo) {
      draftState.claimProcessData.claimAppealInfo = {};
    }
    Object.assign(draftState.claimProcessData.claimAppealInfo, changedFields);
  });
};
