import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { BankAccount } from '../_dto/Consts';
import type { PayeeModal } from '../_dto/Models';

export default (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { claimData } = draft;
    const { claimNo, payeeList } = claimData;
    const { payeeId } = payload;

    const bankAccount = { ...BankAccount, claimNo, payeeId, manualAdd: SwitchEnum.YES };

    bankAccount.id = uuid();

    claimData.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const { payeeBankAccountList, id } = payee;
        if (id === payeeId) {
          if (lodash.size(payeeBankAccountList) === 0) bankAccount.isSelect = true;
          // eslint-disable-next-line no-param-reassign
          payee.payeeBankAccountList = lodash
            .chain(payeeBankAccountList)
            .concat(bankAccount)
            .compact()
            .value();
        }
        return payee;
      })
      .value();

    draft.paymentModal.datas = claimData;
  });
};
