import { produce } from 'immer';

export default (state: any, action: any) => {
  const { paymentList, premiumReceived, policyInitialPremium } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.processData.paymentList = paymentList;
    draftState.processData.premiumReceived = premiumReceived;
    draftState.processData.policyInitialPremium = policyInitialPremium;

    draftState.modalData.processData.premiumReceived = premiumReceived;
    draftState.modalData.processData.policyInitialPremium = policyInitialPremium;
    draftState.modalData.processData.paymentList = paymentList;
  });
  return {
    ...nextState,
  };
};
