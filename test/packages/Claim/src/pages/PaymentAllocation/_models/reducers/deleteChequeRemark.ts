import { produce } from 'immer';
import lodash from 'lodash';
import type { PayeeModal, ChequeRemarkModal } from '../../_dto/Models';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { payeeId, chequeRemarkId } = payload;

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
            .filter(
              (remarkItem: ChequeRemarkModal) => remarkItem.id !== chequeRemarkId
            )
            .map((remarkItem: ChequeRemarkModal, idx: number)=> {
              remarkItem.seq = idx;
              return remarkItem
            })
            .value()
        }

        return payeeTemp;
      })
      .value();
  });
};
