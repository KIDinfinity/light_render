import { produce } from 'immer';

export default (state: any, action: any) => {
  const { premiumPaymentCfgList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.processData.premiumPaymentCfgList = premiumPaymentCfgList;
  });
  return {
    ...nextState,
  };
};
