import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import ClientId, { localFieldConfig as ClientIdConfig } from './ClientId';
import Corporation, { localFieldConfig as CorporationConfig } from './Corporation';
import Email, { localFieldConfig as EmailConfig } from './Email';
import MiddleName, { localFieldConfig as MiddleNameConfig } from './MiddleName';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import IdentityNo, { localFieldConfig as IdentityNoConfig } from './IdentityNo';
import IdentityType, { localFieldConfig as IdentityTypeConfig } from './IdentityType';
import PayeeType, { localFieldConfig as PayeeTypeConfig } from './PayeeType';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import SourceBank, { localFieldConfig as SourceBankConfig } from './SourceBank';
import CompanyName, { localFieldConfig as CompanyNameConfig } from './CompanyName';

export const localFieldConfigs = [
  ClientIdConfig,
  CorporationConfig,
  MiddleNameConfig,
  EmailConfig,
  FirstNameConfig,
  GenderConfig,
  IdentityNoConfig,
  IdentityTypeConfig,
  PhoneNoConfig,
  PayeeTypeConfig,
  SurnameConfig,
  SourceBankConfig,
  CompanyNameConfig,
];

export default {
  ClientId,
  Corporation,
  MiddleName,
  Email,
  FirstName,
  Gender,
  IdentityNo,
  IdentityType,
  PayeeType,
  PhoneNo,
  Surname,
  SourceBank,
  CompanyName,
};
