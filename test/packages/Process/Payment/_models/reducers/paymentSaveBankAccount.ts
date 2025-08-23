import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getDictNameByCode, getDictCodeByName } from 'claim/pages/utils/claimUtils';
import type { PayeeModal, BankAccountModal } from '../_dto/Models';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const {
      changedFields,
      id: bankAccountId,
      payeeId,
      seachCustom,
    }: // clientId,
    any = lodash.pick(payload, ['changedFields', 'id', 'payeeId', 'seachCustom', 'clientId']);
    const changedFieldsTemp = { ...changedFields };

    const { payeeList } = draft.paymentModal.datas;
    // const bankAccountList = draft?.bankAccountList;

    const isEditStatus = lodash.keys(changedFields).length === 1;

    if (isEditStatus && lodash.has(changedFields, 'bankCode')) {
      changedFieldsTemp.branchCode = '';
      changedFieldsTemp.branchName = '';
      changedFieldsTemp.bankName = getDictNameByCode(
        seachCustom?.banks,
        formUtils.queryValue(changedFields.bankCode)
      );
    }

    if (isEditStatus && lodash.has(changedFields, 'branchCode')) {
      changedFieldsTemp.branchName = getDictNameByCode(
        seachCustom?.bankBranches,
        formUtils.queryValue(changedFields.branchCode)
      );
    }

    if (isEditStatus && lodash.has(changedFields, 'bankName')) {
      changedFieldsTemp.branchCode = '';
      changedFieldsTemp.branchName = '';
      changedFieldsTemp.bankCode = getDictCodeByName(
        seachCustom?.banks,
        formUtils.queryValue(changedFields.bankName)
      );
    }

    if (isEditStatus && lodash.has(changedFields, 'branchName')) {
      changedFieldsTemp.branchCode = getDictCodeByName(
        seachCustom?.bankBranches,
        formUtils.queryValue(changedFields.branchName)
      );
    }

    // if (isEditStatus && lodash.has(changedFields, 'bankAccountNo')) {
    //   tenant.region({
    //     [Region.HK]: () => {
    //       const bankAccountData = handleBankAccount.getBankAccountItem({
    //         clientId,
    //         bankAccountList,
    //         id: changedFieldsTemp.bankAccountNo.value,
    //       });
    //       changedFieldsTemp.bankAccountNo = bankAccountData?.bankAccountNo;
    //       changedFieldsTemp.bankAccountName = bankAccountData?.bankAccountName;
    //       changedFieldsTemp.accountHolder = bankAccountData.bankAccountName;
    //     },
    //   });
    // }

    const isSelectField = lodash.has(changedFields, 'isSelect');

    draft.paymentModal.datas.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const { payeeBankAccountList, id } = payee;
        if (id === payeeId) {
          const bankAccounts = lodash
            .chain(payeeBankAccountList)
            .compact()
            .map((bankAccount: BankAccountModal) => {
              if (bankAccount.id === bankAccountId) {
                const bankAccountTemp = { ...bankAccount, ...changedFieldsTemp };
                if (formUtils.queryValue(bankAccountTemp.bankCode)) {
                  bankAccountTemp.bankCodeCache = formUtils.queryValue(bankAccountTemp.bankCode);
                }

                return bankAccountTemp;
              }
              return isSelectField ? { ...bankAccount, isSelect: false } : bankAccount;
            })
            .value();
          return { ...payee, payeeBankAccountList: bankAccounts };
        }
        return payee;
      })
      .value();
  });
};
