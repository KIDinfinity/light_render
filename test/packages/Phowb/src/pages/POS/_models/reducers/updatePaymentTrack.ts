import { produce }  from 'immer';

const updatePaymentTrack = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const newPaymentTrack = draftState.claimProcessData.posDataDetail.paymentTrack;

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.paymentTrack = {
      ...newPaymentTrack,
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default updatePaymentTrack;
