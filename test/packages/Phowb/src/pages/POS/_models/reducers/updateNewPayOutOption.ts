import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NewAccountPayoutOption } from 'phowb/pages/POS/Enum';

const updateNewPayOutOption = (state: any, action: any) => {
  const { changedFields, isChecked, Dropdown_POS_SrcBank_Bank, isAuto } = action.payload;
  const changedFieldsTemp = { ...changedFields };
  const nextState = produce(state, (draftState: any) => {
    if (isChecked) {
      const {
        enrolledBankAccounts,
        newAccount,
      } = draftState.claimProcessData.posDataDetail.payOutOption;

      if (newAccount && lodash.isPlainObject(newAccount)) {
        // eslint-disable-next-line no-param-reassign
        draftState.claimProcessData.posDataDetail.payOutOption.newAccount.check = true;
      }

      if (enrolledBankAccounts && lodash.isArray(enrolledBankAccounts)) {
        // eslint-disable-next-line no-param-reassign
        draftState.claimProcessData.posDataDetail.payOutOption.enrolledBankAccounts = lodash.map(
          enrolledBankAccounts,
          (item: any) => {
            return { ...item, check: false };
          }
        );
      }
    } else {
      const payOutOption = formUtils.queryValue(changedFields.payOutOption);
      const newAccount = draftState.claimProcessData?.posDataDetail.payOutOption.newAccount;
      const oldSourceBank = draftState.claimProcessData?.posDataDetail.payOutOption.sourceBank;
      const newSourceBank =
        NewAccountPayoutOption['02'] === payOutOption ? Dropdown_POS_SrcBank_Bank[0]?.dictCode : '';
      const sourceBank = payOutOption !== undefined && !isAuto ? newSourceBank : oldSourceBank;
      const extra =
        payOutOption && payOutOption === '01'
          ? {
              bankCode: '',
              branchCode: '',
              bankAccountNo: '',
              securityCode: '',
              bankAccountName: '',
              typeOfAccount: '01',
              currency: 'PHP',
              activationDateFrom: '',
              activationDateTo: '',
            }
          : {};

      if (lodash.keys(changedFields).length === 1) {
        // 更新bankcode的同时清除branchcode
        if (lodash.has(changedFields, 'bankCode')) {
          changedFieldsTemp.branchCode = '';
        }
      }

      // eslint-disable-next-line no-param-reassign
      draftState.claimProcessData.posDataDetail.payOutOption = {
        ...draftState.claimProcessData.posDataDetail.payOutOption,
        newAccount: {
          ...newAccount,
          ...extra,
          ...changedFieldsTemp,
        },
        sourceBank,
      };
    }
  });
  return { ...nextState };
};

export default updateNewPayOutOption;
