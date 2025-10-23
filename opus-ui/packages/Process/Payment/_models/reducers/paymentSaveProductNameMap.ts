import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    draftState.paymentModal.datas.productNameMap = payload?.productNameMap;
  });
};
