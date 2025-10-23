import { produce } from 'immer';

const claimEstimateResultUpdate = (state: any, action: any) => {
  const { list } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.nonSupportClaimEstimation.claimEstimationResult.claimEstimationResultDetailList =
      list;
  });

  return { ...nextState };
};

export default claimEstimateResultUpdate;
