import BankAcctName, { fieldConfig as bankAcctNameConfig } from './BankAcctName';

import BankAccountNo, { fieldConfig as bankAccountNoConfig } from './BankAccountNo';

import BankCode, { fieldConfig as bankCodeConfig } from './BankCode';
import BranchCode, { fieldConfig as BranchCodeConfig } from './BranchCode';

import BranchName, { fieldConfig as branchNameConfig } from './BranchName';
import AnnuityPayType, { fieldConfig as AnnuityPayTypeConfig } from './AnnuityPayType';

export const localFieldConfigs = [
  AnnuityPayTypeConfig,
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
  AnnuityPayType,
};
