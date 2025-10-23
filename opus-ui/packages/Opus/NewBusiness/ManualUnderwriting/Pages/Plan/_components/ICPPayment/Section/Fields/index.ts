import BankAcctName, { fieldConfig as bankAcctNameConfig } from './BankAcctName';

import BankAccountNo, { fieldConfig as bankAccountNoConfig } from './BankAccountNo';

import BankCode, { fieldConfig as bankCodeConfig } from './BankCode';
import BranchCode, { fieldConfig as BranchCodeConfig } from './BranchCode';

import BranchName, { fieldConfig as branchNameConfig } from './BranchName';
import IcpDividendPayType, { fieldConfig as IcpDividendPayTypeConfig } from './IcpDividendPayType';

export const localFieldConfigs = [
  IcpDividendPayTypeConfig,
  bankAcctNameConfig,

  bankAccountNoConfig,

  bankCodeConfig,
  BranchCodeConfig,

  branchNameConfig,
];

export default {
  BankAcctName,

  BankAccountNo,

  BankCode,
  BranchCode,

  BranchName,
  IcpDividendPayType,
};
