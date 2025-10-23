import { produce } from 'immer';

const saveClaimHospitalBillingRecover = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.claimHospitalBillingRecover = {
      ...(state.claimProcessData.claimHospitalBillingRecover || {}),
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveClaimHospitalBillingRecover;
