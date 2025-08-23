import { produce } from 'immer';
import lodash from 'lodash';
// import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { getDictNameByCode, getDictCodeByName } from 'claim/pages/utils/claimUtils';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const {
      changedFields,
      id,
      payeeId,
      seachCustom,
    }: // clientId,
    any = lodash.pick(payload, ['changedFields', 'id', 'payeeId', 'seachCustom', 'clientId']);
    const changedFieldsTemp = { ...changedFields };

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

    const bankAccountList = draftState.claimEntities.payeeListMap[payeeId]?.payeeBankAccountList;
    const bankIndex = bankAccountList?.findIndex((account) => account.id === id);

    if (bankIndex !== void 0 && bankIndex !== -1) {
      bankAccountList[bankIndex] = {
        ...bankAccountList[bankIndex],
        ...changedFields,
      };
    }
  });
};
