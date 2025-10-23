import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  const id = payload?.id;
  const nextState = produce(state, (draftState: any) => {
    draftState.paymentModal.activePayeeId = id;
  });
  return { ...nextState };
};
