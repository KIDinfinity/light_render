import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getDictNameByCode, getDictCodeByName } from 'claim/pages/utils/claimUtils';
import { eTransferAccount, ePaymentMethod } from '../../Enum';

const relationship = {
  [ePaymentMethod.premium]: eTransferAccount.transfer,
  [ePaymentMethod.bank]: eTransferAccount.assign,
  [ePaymentMethod.post]: eTransferAccount.assign,
};

const savePayeeItem = (state: any, action: any) => {
  const { changedFields, payeeId, seachCustom } = action.payload;

  const changedFieldsTemp = { ...changedFields };

  if (lodash.has(changedFields, 'paymentMethod')) {
    changedFieldsTemp.transferAccount =
      relationship[formUtils.queryValue(changedFields.paymentMethod)] || '';
  }

  if (lodash.keys(changedFields).length === 1) {
    if (lodash.has(changedFields, 'bankCode')) {
      changedFieldsTemp.branchCode = '';
      changedFieldsTemp.branchName = '';
      changedFieldsTemp.bankAccountName = getDictNameByCode(
        seachCustom.banks,
        formUtils.queryValue(changedFields.bankCode)
      );
    }

    if (lodash.has(changedFields, 'branchCode')) {
      changedFieldsTemp.branchName = getDictNameByCode(
        seachCustom.bankBranches,
        formUtils.queryValue(changedFields.branchCode)
      );
    }

    if (lodash.has(changedFields, 'bankAccountName')) {
      changedFieldsTemp.branchCode = '';
      changedFieldsTemp.branchName = '';
      changedFieldsTemp.bankCode = getDictCodeByName(
        seachCustom.banks,
        formUtils.queryValue(changedFields.bankAccountName)
      );
    }

    if (lodash.has(changedFields, 'branchName')) {
      changedFieldsTemp.branchCode = getDictCodeByName(
        seachCustom.bankBranches,
        formUtils.queryValue(changedFields.branchName)
      );
    }
  }

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.payeeListMap[payeeId] = {
      ...state.claimEntities.payeeListMap[payeeId],
      ...changedFieldsTemp,
    };
  });

  return { ...nextState };
};

export default savePayeeItem;
