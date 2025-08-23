import lodash from 'lodash';
import { v4 as uuid } from 'uuid';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { isPremiumAccount } from 'claim/enum/isPremiumAccount';
import type { BankAccountModal } from '../_dto/Models';
/**
 * 过滤bank account的数据
 * @param bankAccountList 需要过滤的数据
 * @param clientId 客户ID
 */
const getBankAccount = (
  bankAccountList: BankAccountModal[],
  clientId?: string,
  policyId?: string
) => {
  if (lodash.isEmpty(bankAccountList)) return [];

  return lodash
    .chain(bankAccountList)
    .filter((bankAccount: BankAccountModal) => {
      if (clientId) {
        return bankAccount?.clientId === clientId;
      }
      if (policyId) {
        return bankAccount?.policyId === policyId;
      }

      return false;
    })
    .map((bankAccount: BankAccountModal) => ({
      ...bankAccount,
      accountHolder: bankAccount?.bankAccountName,
      isPremiumAccount: isPremiumAccount.Yes,
      manualAdd: SwitchEnum.NO,
      id: bankAccount?.id || uuid(),
    }))
    .uniqBy('bankAccountNo')
    .value();
};

export default getBankAccount;
