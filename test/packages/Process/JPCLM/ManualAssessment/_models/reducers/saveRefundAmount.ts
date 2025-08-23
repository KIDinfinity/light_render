import { produce }  from 'immer';

const saveRefundAmount = (state: any, { payload }: any) => {
  const { refundAmount } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.refundAmount = refundAmount;
  });
  return { ...nextState };
};

export default saveRefundAmount;
