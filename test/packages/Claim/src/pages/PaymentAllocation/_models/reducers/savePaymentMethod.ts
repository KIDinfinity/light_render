// used by payment information page only
import lodash from 'lodash'
import { produce } from 'immer';
import savePayeeInfo from './savePayeeInfo';
import { formUtils } from 'basic/components/Form';
import { SwitchEnum } from 'claim/pages/utils/claim';

export default (state: any, { payload }: any = {}) => {
  const { changedFields, id } = payload;

  const nextState = produce(state, (draftState) => {
    const payeeIdx = draftState.claimData.payeeList.findIndex(payee => payee.id === id);

    if(payeeIdx < 0) return

    draftState.claimData.payeeList[payeeIdx] = {
      ...draftState.claimData.payeeList[payeeIdx],
      ...changedFields
    }

    if(Object.keys(changedFields)?.length === 1) {
      if(lodash.has(changedFields, 'selectedBankId')) {
        const bankId = formUtils.queryValue(changedFields.selectedBankId)
        const bankInfo: any = {}

        draftState.claimData.payeeList[payeeIdx].payeeBankAccountList?.forEach(bankAccount => {
          const isSelect = bankAccount.id === bankId;

          bankAccount.isSelect = isSelect;
          bankAccount.isDefault = isSelect? SwitchEnum.YES : SwitchEnum.NO;
          bankInfo.bankAccountNo = isSelect? bankAccount.bankAccountNo:'';
          bankInfo.accountHolder = isSelect? bankAccount.accountHolder:'';
        })

        draftState.claimData.payeeList[payeeIdx]={
          ...draftState.claimData.payeeList[payeeIdx],
          ...bankInfo,
        }
      }else{
        savePayeeInfo(draftState, { payload })
      }
    }

  });
  return { ...nextState };

};
