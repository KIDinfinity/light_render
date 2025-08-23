import BankAccountName, { localFieldConfig as BankAccountNameConfig } from './BankAccountName';
import BankAccountNo, { localFieldConfig as BankAccountNoConfig } from './BankAccountNo';
import BankCode, { localFieldConfig as BankCodeConfig } from './BankCode';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import IdentityNo, { localFieldConfig as IdentityNoConfig } from './IdentityNo';
import IdentityType, { localFieldConfig as IdentityTypeConfig } from './IdentityType';
import Organization, { localFieldConfig as OrganizationConfig } from './Organization';
import PayeeType, { localFieldConfig as PayeeTypeConfig } from './PayeeType';
import PaymentAmount, { localFieldConfig as PaymentAmountConfig } from './PaymentAmount';
import PaymentMethod, { localFieldConfig as PaymentMethodConfig } from './PaymentMethod';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';

export const localFieldConfigs = [
  BankAccountNameConfig,
  BankAccountNoConfig,
  BankCodeConfig,
  FirstNameConfig,
  IdentityNoConfig,
  IdentityTypeConfig,
  OrganizationConfig,
  PayeeTypeConfig,
  PaymentAmountConfig,
  PaymentMethodConfig,
  PhoneNoConfig,
  SurnameConfig,
];

export default {
  BankAccountName,
  BankAccountNo,
  BankCode,
  FirstName,
  IdentityNo,
  IdentityType,
  Organization,
  PayeeType,
  PaymentAmount,
  PaymentMethod,
  PhoneNo,
  Surname,
};
