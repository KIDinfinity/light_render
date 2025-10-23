import BankAcctName, { fieldConfig as bankAcctNameConfig } from './BankAcctName';

import BankAccountNo, { fieldConfig as bankAccountNoConfig } from './BankAccountNo';

import BankCode, { fieldConfig as bankCodeConfig } from './BankCode';
import BranchCode, { fieldConfig as branchCodeConfig } from './BranchCode';

import BranchName, { fieldConfig as branchNameConfig } from './BranchName';
import DefaultPayType, { fieldConfig as defaultPayTypeConfig } from './DefaultPayType';

export const localFieldConfigs = [
  defaultPayTypeConfig,
  bankAcctNameConfig,

  bankAccountNoConfig,

  bankCodeConfig,
  branchCodeConfig,

  branchNameConfig,
];

export default {
  BankAcctName,

  BankAccountNo,

  BankCode,
  BranchCode,

  BranchName,
  DefaultPayType,
};
