import AccountHolder, { fieldConfig as AccountHolderLocalFieldConfigs } from './AccountHolder';
import AccountHolderID, {
  fieldConfig as AccountHolderIDLocalFieldConfigs,
} from './AccountHolderID';
import BankAccountNo, { fieldConfig as BankAccountNoLocalFieldConfigs } from './BankAccountNo';
import BranchCode, { localFieldConfig as BranchCodeLocalFieldConfigs } from './BranchCode';
import BranchName, { fieldConfig as BranchNameLocalFieldConfigs } from './BranchName';
import BankCode, { localFieldConfig as BankCodeLocalFieldConfigs } from './BankCode';
import BankDescription, {
  localFieldConfig as BankDescriptionLocalFieldConfigs,
} from './BankDescription';
import BankName, { localFieldConfig as BankNameLocalFieldConfigs } from './BankName';
import NewBankAccount, {
  localFieldConfig as NewBankAccountLocalFieldConfigs,
} from './NewBankAccount';
import AccountType, { localFieldConfig as AccountTypeLocalFieldConfig } from './AccountType';
import BankType, { localFieldConfig as BankTypeLocalFieldConfig } from './BankType';
import PassbookCode, { localFieldConfig as PassbookCodeLocalFieldConfigs } from './PassbookCode';
import PassbookNo, { localFieldConfig as PassbookNoLocalFieldConfigs } from './PassbookNo';

export const localFieldConfigs = [
  AccountHolderLocalFieldConfigs,
  AccountHolderIDLocalFieldConfigs,
  BankAccountNoLocalFieldConfigs,
  BranchCodeLocalFieldConfigs,
  BranchNameLocalFieldConfigs,
  BankCodeLocalFieldConfigs,
  BankDescriptionLocalFieldConfigs,
  BankNameLocalFieldConfigs,
  NewBankAccountLocalFieldConfigs,
  AccountTypeLocalFieldConfig,
  BankTypeLocalFieldConfig,
  PassbookCodeLocalFieldConfigs,
  PassbookNoLocalFieldConfigs,
];

export default {
  AccountHolder,
  AccountHolderID,
  BankAccountNo,
  BranchCode,
  BranchName,
  BankCode,
  BankDescription,
  BankName,
  NewBankAccount,
  AccountType,
  BankType,
  PassbookCode,
  PassbookNo,
};
