import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { BANKACCOUNT } from '@/utils/claimConstant';
import type { PayeeModal } from '../dto';

export default (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const datas = draft.paymentModal.datas;
    const { claimNo, payeeList } = datas;
    const { payeeId } = payload;

    const bankAccount = { ...BANKACCOUNT, claimNo, payeeId, manualAdd: SwitchEnum.YES };

    bankAccount.id = uuidv4();

    const tempPayeeList = lodash
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

    draft.paymentModal.datas.payeeList = tempPayeeList;
  });
};
