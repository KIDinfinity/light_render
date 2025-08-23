import BankCode, { localFieldConfig as BankCodeConfig } from './BankCode';
import BankAccountName, { localFieldConfig as BankAccountNameConfig } from './BankAccountName';
import BankAccountNo, { localFieldConfig as BankAccountNoConfig } from './BankAccountNo';
import BranchCode, { localFieldConfig as BranchCodeConfig } from './BranchCode';

export const localFieldConfigs = [
  BankCodeConfig,
  BankAccountNoConfig,
  BranchCodeConfig,
  BankAccountNameConfig,
];

export default {
  BankCode,
  BankAccountName,
  BankAccountNo,
  BranchCode,
};
