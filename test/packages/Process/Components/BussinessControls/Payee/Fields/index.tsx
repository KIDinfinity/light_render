import AccountHolder, { localFieldConfig as AccountHolderConfig } from './AccountHolder';
import NewBankAccount, { localFieldConfig as NewBankAccountConfig } from './NewBankAccount';
import BankDescription, { localFieldConfig as BankDescriptionConfig } from './BankDescription';
import AccountType, { localFieldConfig as AccountTypeConfig } from './AccountType';
import AccountholderKana, {
  localFieldConfig as AccountholderKanaConfig,
} from './AccountholderKana';
import BankAccountNo, { localFieldConfig as BankAccountNoConfig } from './BankAccountNo';
import BankCode, { localFieldConfig as BankCodeConfig } from './BankCode';
import Banktype, { localFieldConfig as BanktypeConfig } from './Banktype';
import BankName, { localFieldConfig as BankNameConfig } from './BankName';
import BranchCode, { localFieldConfig as BranchCodeConfig } from './BranchCode';
import BranchName, { localFieldConfig as BranchNameConfig } from './BranchName';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import Organization, { localFieldConfig as OrganizationConfig } from './Organization';
import BizClientId, { localFieldConfig as BizClientIdConfig } from './BizClientId';
import AccountHolderClientId, {
  localFieldConfig as AccountHolderClientIdConfig,
} from './AccountHolderClientId';
import PassbookCode, { localFieldConfig as PassbookCodeConfig } from './PassbookCode';
import PassbookNo, { localFieldConfig as PassbookNoConfig } from './PassbookNo';
import PayeeType, { localFieldConfig as PayeeTypeConfig } from './PayeeType';
import PaymentMethod, { localFieldConfig as PaymentMethodConfig } from './PaymentMethod';
import PaymentType, { localFieldConfig as PaymentTypeConfig } from './PaymentType';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import TransferAccount, { localFieldConfig as TransferAccountConfig } from './TransferAccount';
import Address, { localFieldConfig as addressConfig } from './Address';
import Email, { localFieldConfig as emailConfig } from './Email';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
import PostCode, { localFieldConfig as postCodeConfig } from './PostCode';
import SMS, { localFieldConfig as smsConfig } from './Smss';
import Address2, { localFieldConfig as address2Config } from './Address2';
import IdentityType, { localFieldConfig as IdentityTypeConfig } from './IdentityType';
import IdentityNo, { localFieldConfig as IdentityNoConfig } from './IdentityNo';
import ContactType, { localFieldConfig as ContactTypeConfig } from './ContactType';

export const localFieldConfigs = [
  AccountHolderConfig,
  AccountTypeConfig,
  AccountholderKanaConfig,
  BankAccountNoConfig,
  BankCodeConfig,
  BanktypeConfig,
  BankNameConfig,
  BranchCodeConfig,
  BranchNameConfig,
  FirstNameConfig,
  OrganizationConfig,
  BizClientIdConfig,
  PassbookCodeConfig,
  PassbookNoConfig,
  PayeeTypeConfig,
  PaymentMethodConfig,
  PaymentTypeConfig,
  SurnameConfig,
  TransferAccountConfig,
  addressConfig,
  emailConfig,
  PhoneNoConfig,
  postCodeConfig,
  smsConfig,
  address2Config,
  NewBankAccountConfig,
  BankDescriptionConfig,
  AccountHolderClientIdConfig,
  IdentityTypeConfig,
  IdentityNoConfig,
  ContactTypeConfig,
];

export default {
  AccountHolder,
  NewBankAccount,
  BankDescription,
  AccountHolderClientId,
  AccountType,
  AccountholderKana,
  Address2,
  BankAccountNo,
  BankCode,
  Banktype,
  BankName,
  BranchCode,
  BranchName,
  FirstName,
  Organization,
  BizClientId,
  PassbookCode,
  PassbookNo,
  PayeeType,
  PaymentMethod,
  PaymentType,
  Surname,
  TransferAccount,
  Address,
  Email,
  PhoneNo,
  PostCode,
  SMS,
  IdentityType,
  IdentityNo,
  ContactType,
};
