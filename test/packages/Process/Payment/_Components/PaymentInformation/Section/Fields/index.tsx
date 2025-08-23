import AccountHolder, { localFieldConfig as AccountHolderConfig } from './AccountHolder';
import BankAccount, { localFieldConfig as BankAccountConfig } from './BankAccount';
import BankBranch, { localFieldConfig as BankBranchConfig } from './BankBranch';
import SourceBank, { localFieldConfig as SourceBankConfig } from './SourceBank';
import PaymentMethod, { localFieldConfig as PaymentMethodConfig } from './PaymentMethod';

export const localFieldConfigs = [
  AccountHolderConfig,
  BankAccountConfig,
  BankBranchConfig,
  SourceBankConfig,
  PaymentMethodConfig,
]

export default {
  AccountHolder,
  BankAccount,
  BankBranch,
  SourceBank,
  PaymentMethod,
}
