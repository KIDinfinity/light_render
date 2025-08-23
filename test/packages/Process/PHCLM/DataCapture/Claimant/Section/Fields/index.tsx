import Address, { localFieldConfig as AddressConfig } from './Address';
import DateOfBirth, { localFieldConfig as DateOfBirthConfig } from './DateOfBirth';
import Email, { localFieldConfig as EmailConfig } from './Email';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import IdentityNo, { localFieldConfig as IdentityNoConfig } from './IdentityNo';
import IdentityType, { localFieldConfig as IdentityTypeConfig } from './IdentityType';
import Nationality, { localFieldConfig as NationalityConfig } from './Nationality';
import Occupation, { localFieldConfig as OccupationConfig } from './Occupation';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
import RelationshipWithInsured, {
  localFieldConfig as RelationshipWithInsuredConfig,
} from './RelationshipWithInsured';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import MiddleName, { localFieldConfig as MiddleNameConfig } from './MiddleName';
import ExtName, { localFieldConfig as ExtNameConfig } from './ExtName';
import CompanyName, { localFieldConfig as CompanyNameConfig } from './CompanyName';

export const localFieldConfigs = [
  AddressConfig,
  DateOfBirthConfig,
  EmailConfig,
  FirstNameConfig,
  GenderConfig,
  IdentityNoConfig,
  IdentityTypeConfig,
  NationalityConfig,
  OccupationConfig,
  PhoneNoConfig,
  RelationshipWithInsuredConfig,
  SurnameConfig,
  MiddleNameConfig,
  ExtNameConfig,
  CompanyNameConfig,
];

export default {
  Address,
  DateOfBirth,
  Email,
  FirstName,
  Gender,
  IdentityNo,
  IdentityType,
  Nationality,
  Occupation,
  PhoneNo,
  RelationshipWithInsured,
  Surname,
  MiddleName,
  ExtName,
  CompanyName,
};
