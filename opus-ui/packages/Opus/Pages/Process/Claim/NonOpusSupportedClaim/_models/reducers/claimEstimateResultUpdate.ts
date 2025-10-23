import { produce } from 'immer';

const claimEstimateResultUpdate = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    let extra = {};

    draftState.businessData.nonSupportClaimEstimation.claimEstimationResult = {
      ...draftState.businessData.nonSupportClaimEstimation?.claimEstimationResult,
      ...changedFields,
      ...extra,
    };
  });

  return { ...nextState };
};

export default claimEstimateResultUpdate;
