import BankAcctName, { fieldConfig as bankAcctNameConfig } from './BankAcctName';

import BankAccountNo, { fieldConfig as bankAccountNoConfig } from './BankAccountNo';

import BankCode, { fieldConfig as bankCodeConfig } from './BankCode';

import BranchName, { fieldConfig as branchNameConfig } from './BranchName';
import IcpDividendPayType, { fieldConfig as IcpDividendPayTypeConfig } from './IcpDividendPayType';

export const localFieldConfigs = [
  IcpDividendPayTypeConfig,
  bankAcctNameConfig,

  bankAccountNoConfig,

  bankCodeConfig,

  branchNameConfig,
];

export default {
  BankAcctName,

  BankAccountNo,

  BankCode,

  BranchName,
  IcpDividendPayType,
};
