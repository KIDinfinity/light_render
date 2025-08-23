import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    // draftState.paymentModal = InitState.paymentModal;
    draftState.paymentModal.show = false;
  });
};
