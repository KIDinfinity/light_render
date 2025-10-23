import { produce } from 'immer';
import lodash from 'lodash';
import type { PayeeModal, BankAccountModal } from '../dto';

export default (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const datas = draft.paymentModal.datas;
    const { payeeList } = datas;
    const { payeeId, bankAccountId } = payload;

    const tempPayeeList = lodash
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

    draft.paymentModal.datas.payeeList = tempPayeeList;
  });
};
