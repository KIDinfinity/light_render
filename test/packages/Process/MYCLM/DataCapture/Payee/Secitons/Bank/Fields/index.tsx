import AccountHolder, { localFieldConfig as AccountHolderConfig } from './AccountHolder';
import AccountType, { localFieldConfig as AccountTypeConfig } from './AccountType';
import ActivationDateFrom, {
  localFieldConfig as ActivationDateFromConfig,
} from './ActivationDateFrom';
import ActivationDateTo, { localFieldConfig as ActivationDateToConfig } from './ActivationDateTo';
import BankCode, { localFieldConfig as BankCodeConfig } from './BankCode';
import BranchCode, { localFieldConfig as BranchCodeConfig } from './BranchCode';
import Currency, { localFieldConfig as CurrencyConfig } from './Currency';
import SecurityCode, { localFieldConfig as SecurityCodeConfig } from './SecurityCode';
import BankAccountNo, { localFieldConfig as BankAccountNoConfig } from './BankAccountNo';

export const localFieldConfigs = [
  AccountHolderConfig,
  AccountTypeConfig,
  ActivationDateFromConfig,
  ActivationDateToConfig,
  BankCodeConfig,
  BranchCodeConfig,
  CurrencyConfig,
  SecurityCodeConfig,
  BankAccountNoConfig,
];

export default {
  AccountHolder,
  AccountType,
  ActivationDateFrom,
  ActivationDateTo,
  BankCode,
  BranchCode,
  Currency,
  SecurityCode,
  BankAccountNo,
};
