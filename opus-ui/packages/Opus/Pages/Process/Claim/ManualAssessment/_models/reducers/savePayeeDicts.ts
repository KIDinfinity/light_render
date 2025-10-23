import { produce } from 'immer';
import { getPayeeDicts } from '../functions/paymentAllocation';

export default (state: any, { payload }: any = {}) => {
  const newState = produce(state, (draftState: any) => {
    const draft = draftState;
    const payeeList = payload?.payeeList;
    const payeeDicts = getPayeeDicts(payeeList || draft?.paymentModal?.datas?.payeeList);
    draft.paymentModal.payeeDicts = payeeDicts;
  });
  return { ...newState };
};
