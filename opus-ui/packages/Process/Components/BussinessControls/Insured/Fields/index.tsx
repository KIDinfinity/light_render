import Address, { localFieldConfig as AddressConfig } from './Address';
import DateOfBirth, { localFieldConfig as DateOfBirthConfig } from './DateOfBirth';
import DateTimeOfDeath, { localFieldConfig as DateTimeOfDeathConfig } from './DateTimeOfDeath';
import Email, { localFieldConfig as EmailConfig } from './Email';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import IdentityNo, { localFieldConfig as IdentityNoConfig } from './IdentityNo';
import IdentityType, { localFieldConfig as IdentityTypeConfig } from './IdentityType';
import InsuredId, { localFieldConfig as InsuredIdConfig } from './InsuredId';
import Nationality, { localFieldConfig as NationalityConfig } from './Nationality';
import Occupation, { localFieldConfig as OccupationConfig } from './Occupation';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
import PolicyId, { localFieldConfig as PolicyIdConfig } from './PolicyId';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import Age, { localFieldConfig as AgeConfig } from './Age';
import MiddleName, { localFieldConfig as MiddleNameConfig } from './MiddleName';
import ExtName, { localFieldConfig as ExtNameConfig } from './ExtName';
import IssueAge, { localFieldConfig as IssueAgeConfig } from './IssueAge';
import CurrentAge, { localFieldConfig as CurrentAgeConfig } from './CurrentAge';
import CompanyRepresentative, {
  localFieldConfig as CompanyRepresentativeConfig,
} from './CompanyRepresentative';
import CompanyAddress, { localFieldConfig as CompanyAddressConfig } from './CompanyAddress';
import Position, { localFieldConfig as PositionConfig } from './Position';

export const localFieldConfigs = [
  AddressConfig,
  DateOfBirthConfig,
  DateTimeOfDeathConfig,
  EmailConfig,
  FirstNameConfig,
  GenderConfig,
  IdentityNoConfig,
  IdentityTypeConfig,
  InsuredIdConfig,
  NationalityConfig,
  OccupationConfig,
  PhoneNoConfig,
  PolicyIdConfig,
  SurnameConfig,
  AgeConfig,
  MiddleNameConfig,
  ExtNameConfig,
  IssueAgeConfig,
  CurrentAgeConfig,
  CompanyRepresentativeConfig,
  CompanyAddressConfig,
  PositionConfig,
];

export default {
  Address,
  DateOfBirth,
  DateTimeOfDeath,
  Email,
  FirstName,
  Gender,
  IdentityNo,
  IdentityType,
  InsuredId,
  Nationality,
  Occupation,
  PhoneNo,
  PolicyId,
  Surname,
  Age,
  MiddleName,
  ExtName,
  IssueAge,
  CurrentAge,
  CompanyRepresentative,
  CompanyAddress,
  Position,
};
