// used by payment information page only
import lodash from 'lodash';
import { produce } from 'immer';
import savePayeeInfo from './paymentSavePayeeInfo';
import { formUtils } from 'basic/components/Form';
import { SwitchEnum } from 'claim/pages/utils/claim';

export default (state: any, { payload }: any = {}) => {
  const { changedFields, id } = payload;


  const nextState = produce(state, (draftState) => {
    const payeeIdx = draftState.paymentModal.datas.payeeList.findIndex((payee) => payee.id === id);

    if (payeeIdx < 0) return;

    draftState.paymentModal.datas.payeeList[payeeIdx] = {
      ...draftState.paymentModal.datas.payeeList[payeeIdx],
      ...changedFields,
    };

    if (Object.keys(changedFields)?.length === 1) {
      if (lodash.has(changedFields, 'selectedBankId')) {
        const bankId = formUtils.queryValue(changedFields.selectedBankId);
        const bankInfo: any = {};

        draftState.paymentModal.datas.payeeList[payeeIdx].payeeBankAccountList?.forEach(
          (bankAccount) => {
            const isSelect = bankAccount.id === bankId;

            bankAccount.isSelect = isSelect;
            bankAccount.isDefault = isSelect ? SwitchEnum.YES : SwitchEnum.NO;
            bankInfo.bankAccountNo = isSelect ? bankAccount.bankAccountNo : '';
            bankInfo.accountHolder = isSelect ? bankAccount.accountHolder : '';
          }
        );

        draftState.paymentModal.datas.payeeList[payeeIdx] = {
          ...draftState.paymentModal.datas.payeeList[payeeIdx],
          ...bankInfo,
        };
      } else {
        savePayeeInfo(draftState, { payload });
      }
    }
  });
  return { ...nextState };
};
