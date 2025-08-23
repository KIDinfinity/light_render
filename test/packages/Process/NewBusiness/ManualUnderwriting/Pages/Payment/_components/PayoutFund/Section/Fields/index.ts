import BankAcctName, { fieldConfig as bankAcctNameConfig } from './BankAcctName';

import BankAccountNo, { fieldConfig as bankAccountNoConfig } from './BankAccountNo';

import BankCode, { fieldConfig as bankCodeConfig } from './BankCode';

import BranchName, { fieldConfig as branchNameConfig } from './BranchName';

import BankAcctFactoryHouse, {
  fieldConfig as bankAcctFactoryHouseConfig,
} from './BankAcctFactoryHouse';

export const localFieldConfigs = [
  bankAcctNameConfig,

  bankAccountNoConfig,

  bankCodeConfig,

  branchNameConfig,

  bankAcctFactoryHouseConfig,
];

export default {
  BankAcctName,

  BankAccountNo,

  BankCode,

  BranchName,

  BankAcctFactoryHouse,
};
