import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { getPolicyOwnerPayeeIds } from '../_function';
import { SourceSystem } from 'process/Enum';
import { BankDesc, IsDefault } from 'claim/enum';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const { claimData } = payload;

    const relatePolicyOwnerPayeeIds = getPolicyOwnerPayeeIds(claimData.policyBenefitList);

    lodash.map(claimData?.payeeList, (item) => {
      lodash.map(item?.payeeBankAccountList, (bankItem) =>
        lodash.set(bankItem, 'bankCodeCache', formUtils.queryValue(bankItem?.bankCode))
      );
    });

    const isLifeJPolicy = lodash
      .get(claimData, 'c360PolicyInfo.policyContractList', [])
      .some((policy: any) => policy?.sourceSystem === SourceSystem.Lifej);

    if (isLifeJPolicy) {
      lodash.forEach(claimData?.payeeList, (payee: any) => {
        lodash.forEach(payee?.payeeBankAccountList, (info: any) => {
          info.isNewBankAccount = info.isNewBankAccount || IsDefault.YES;
          info.bankDesc = info.bankDesc || BankDesc.KLIP;
        });
      });
    }

    draftState.paymentModal = {
      ...draftState.paymentModal,
      datas: claimData,
      relatePolicyOwnerPayeeIds,
    };
  });
};
