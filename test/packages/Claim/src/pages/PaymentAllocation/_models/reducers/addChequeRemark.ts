import { produce } from 'immer';
import lodash from 'lodash';
import type { PayeeModal } from '../../_dto/Models';
import { chequeRemarkAssembly } from '../../_function';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { claimData } = draft;
    const { payeeId } = payload || {};
    const { payeeList } = draft.claimData;

    draft.claimData.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const payeeTemp = { ...payee };
        const { claimChequeRemarkList, id } = payeeTemp;
        if (id === payeeId) {
          payeeTemp.claimChequeRemarkList = lodash
            .chain(claimChequeRemarkList)
            .concat(chequeRemarkAssembly(claimData, payeeTemp.claimChequeRemarkList?.length))
            .compact()
            .value();
        }

        return payeeTemp;
      })
      .value();
  });
};
