import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { getDictNameByCode, getDictCodeByName } from 'claim/pages/utils/claimUtils';

const PayeeItemBankAccountUpdate = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const idx = lodash.findIndex(
      draftState.paymentModal.datas.payeeList,
      ({ id: activePayeeId }: any) => activePayeeId === draftState.paymentModal.activePayeeId
    );
    const { changedFields, id, seachCustom }: any = lodash.pick(payload || {}, [
      'changedFields',
      'id',
      'seachCustom',
      'clientId',
    ]);
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

    if (isEditStatus) draftState.paymentModal.datas.payeeList[idx].manualAdd = 'Y';

    const payeeBankAccountList =
      draftState.paymentModal.datas?.payeeList[idx]?.payeeBankAccountList || [];

    if (lodash.find(payeeBankAccountList, { id })) {
      draftState.paymentModal.datas.payeeList[idx].payeeBankAccountList = lodash.map(
        payeeBankAccountList,
        (item: any) => {
          return item.id === id
            ? {
                ...item,
                ...changedFieldsTemp,
              }
            : item;
        }
      );
    }
  });

  return { ...nextState };
};

export default PayeeItemBankAccountUpdate;
