import { produce }  from 'immer';

const updatePaymentTrack = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.businessData.transactionTypes[0].paymentTrack = {
      ...draftState.claimProcessData.businessData.transactionTypes[0].paymentTrack,
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default updatePaymentTrack;
