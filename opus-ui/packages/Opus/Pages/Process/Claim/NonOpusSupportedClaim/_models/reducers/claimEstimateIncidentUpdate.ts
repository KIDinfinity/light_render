import { produce } from 'immer';

const claimEstimateIncidentUpdate = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.nonSupportClaimEstimation.nonSupportIncident = {
      ...draftState.businessData.nonSupportClaimEstimation?.nonSupportIncident,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default claimEstimateIncidentUpdate;
