import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { bankAccountList } = payload;
    draft.bankAccountList = !lodash.isEmpty(bankAccountList)
      ? lodash.chain(bankAccountList).groupBy('clientId').value()
      : [];
  });
};
