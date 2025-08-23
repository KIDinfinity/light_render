import lodash from 'lodash';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { SwitchEnum } from 'claim/pages/utils/claim';

const PayeeItemBankAccountDefaultUpdate = (state: any, { payload }: any) => {
  const { id } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    const idx = lodash.findIndex(
      draftState.paymentModal.datas.payeeList,
      ({ id: payeeId }: any) => payeeId === draftState.paymentModal.activePayeeId
    );

    draftState.paymentModal.datas.payeeList[idx].manualAdd = 'Y';
    draftState.paymentModal.datas.payeeList[idx].payeeBankAccountList = lodash.map(
      draftState.paymentModal.datas?.payeeList[idx]?.payeeBankAccountList,
      (item: any) => ({
        ...item,
        isDefault: item.id === id ? SwitchEnum.YES : SwitchEnum.NO,
        isSelect: item.id === id,
      })
    );
    // if id not exist, we create new account
    if (!id) {
      draftState.paymentModal.datas.payeeList[idx].payeeBankAccountList.push({
        id: uuidv4(),
        isDefault: SwitchEnum.YES,
        isSelect: true,
        manualAdd: SwitchEnum.YES,
        isNewBankAccount: SwitchEnum.YES,
      });
    } else {
      const selectedAccount = draftState.paymentModal.datas.payeeList[
        idx
      ].payeeBankAccountList.find((bank) => bank.isSelect);
      // if select fetched account, delete new Account.
      if (selectedAccount && selectedAccount.manualAdd !== SwitchEnum.YES) {
        draftState.paymentModal.datas.payeeList[idx].payeeBankAccountList =
          draftState.paymentModal.datas?.payeeList?.[idx]?.payeeBankAccountList?.filter(
            (bank) => bank.manualAdd !== SwitchEnum.YES
          ) || [];
      }
    }
  });
  return { ...nextState };
};

export default PayeeItemBankAccountDefaultUpdate;
