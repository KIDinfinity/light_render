import { produce } from 'immer';
import { wholeEntities } from '../dto/EntriesModel';
import { savePaymentAllocation as saveAllocation } from 'claim/pages/PaymentAllocation/_function';

const savePaymentAllocation = (state: any, { payload }: any) => {
  const claimData = { ...payload };

  return produce(state, (draftState: any) => {
    saveAllocation(draftState, claimData, wholeEntities);
  });
};

export default savePaymentAllocation;
