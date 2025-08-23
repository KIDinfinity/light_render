import { produce } from 'immer';
import lodash from 'lodash';
import type { PayeeModal, BankAccountModal } from '../_dto/Models';

export default (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { claimData } = draft;
    const { payeeList } = claimData;
    const { payeeId, bankAccountId } = payload;

    claimData.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const { payeeBankAccountList, id } = payee;
        if (id === payeeId) {
          // eslint-disable-next-line no-param-reassign
          payee.payeeBankAccountList = lodash.filter(
            payeeBankAccountList,
            (bankAccount: BankAccountModal) => bankAccount.id !== bankAccountId
          );
        }
        return payee;
      })
      .value();

    draft.paymentModal.datas = claimData;
  });
};
