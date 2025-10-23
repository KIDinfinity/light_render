import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { bankDicts, branchDicts } = payload;

    if (!lodash.isEmpty(bankDicts)) {
      draft.paymentModal.bankDicts = bankDicts;
    }

    if (!lodash.isEmpty(branchDicts)) {
      draft.paymentModal.branchDicts = branchDicts;
    }
  });
};
