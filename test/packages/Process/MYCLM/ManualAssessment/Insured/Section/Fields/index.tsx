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
};
