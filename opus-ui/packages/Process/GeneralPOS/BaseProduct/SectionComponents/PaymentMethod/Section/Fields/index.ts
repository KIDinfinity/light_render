import PromptPayId, { localFieldConfig as PromptPayIdConfig } from './PromptPayId';
import BankCode, { localFieldConfig as BankCodeConfig } from './BankCode';
import BankAccountName, { localFieldConfig as BankAccountNameConfig } from './BankAccountName';
import BankAccountNo, { localFieldConfig as BankAccountNoConfig } from './BankAccountNo';
import BranchCode, { localFieldConfig as BranchCodeConfig } from './BranchCode';
import PayoutOption, { localFieldConfig as PayoutOptionConfig } from './PayoutOption';
import CurrentFrom, { localFieldConfig as CurrentFromConfig } from './CurrentFrom';
import CurrentTo, { localFieldConfig as CurrentToConfig } from './CurrentTo';
import PolicyOwner, { localFieldConfig as PolicyOwnerConfig } from './PolicyOwner';
import SecurityCode, { localFieldConfig as SecurityCodeConfig } from './SecurityCode';
import SourceBank, { localFieldConfig as SourceBankConfig } from './SourceBank';
import TypeOfAccount, { localFieldConfig as TypeOfAccountConfig } from './TypeOfAccount';
import BankCurrency, { localFieldConfig as BankCurrencyConfig } from './BankCurrency';

export const localFieldConfigs = [
  BankCodeConfig,
  BankAccountNoConfig,
  BranchCodeConfig,
  PayoutOptionConfig,
  PromptPayIdConfig,
  BankAccountNameConfig,
  CurrentFromConfig,
  CurrentToConfig,
  PolicyOwnerConfig,
  SecurityCodeConfig,
  SourceBankConfig,
  TypeOfAccountConfig,
  BankCurrencyConfig,
];

export default {
  PromptPayId,
  BankCode,
  BankAccountName,
  BankAccountNo,
  BranchCode,
  PayoutOption,
  CurrentFrom,
  CurrentTo,
  PolicyOwner,
  SecurityCode,
  SourceBank,
  TypeOfAccount,
  BankCurrency,
};
