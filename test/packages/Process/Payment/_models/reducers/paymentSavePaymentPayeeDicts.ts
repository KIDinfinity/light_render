import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const { payeeDicts } = payload;

    draftState.paymentModal.payeeDicts = payeeDicts;
  });
};
