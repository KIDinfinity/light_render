import Address, { localFieldConfig as AddressConfig } from './Address';
import Age, { localFieldConfig as AgeConfig } from './Age';
import DateOfBirth, { localFieldConfig as DateOfBirthConfig } from './DateOfBirth';
import DateTimeOfDeath, { localFieldConfig as DateTimeOfDeathConfig } from './DateTimeOfDeath';
import Email, { localFieldConfig as EmailConfig } from './Email';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import InsuredId, { localFieldConfig as InsuredIdConfig } from './InsuredId';
import Occupation, { localFieldConfig as OccupationConfig } from './Occupation';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
import PolicyId, { localFieldConfig as PolicyIdConfig } from './PolicyId';
import PostCode, { localFieldConfig as PostCodeConfig } from './PostCode';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';

export const localFieldConfigs = [
  AddressConfig,
  AgeConfig,
  DateOfBirthConfig,
  DateTimeOfDeathConfig,
  EmailConfig,
  FirstNameConfig,
  GenderConfig,
  InsuredIdConfig,
  OccupationConfig,
  PhoneNoConfig,
  PolicyIdConfig,
  PostCodeConfig,
  SurnameConfig,
];

export default {
  Address,
  Age,
  DateOfBirth,
  DateTimeOfDeath,
  Email,
  FirstName,
  Gender,
  InsuredId,
  Occupation,
  PhoneNo,
  PolicyId,
  PostCode,
  Surname,
};
