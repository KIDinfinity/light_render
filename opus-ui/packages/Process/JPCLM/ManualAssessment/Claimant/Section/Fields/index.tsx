import Address, { localFieldConfig as AddressConfig } from './Address';
import DateOfBirth, { localFieldConfig as DateOfBirthConfig } from './DateOfBirth';
import Email, { localFieldConfig as EmailConfig } from './Email';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
import PostCode, { localFieldConfig as PostCodeConfig } from './PostCode';
import RelationshipWithInsured, {
  localFieldConfig as RelationshipWithInsuredConfig,
} from './RelationshipWithInsured';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import Age, { localFieldConfig as AgeConfig } from './Age';
import SMS, { localFieldConfig as SMSConfig } from './Sms';

export const localFieldConfigs = [
  AgeConfig,
  SMSConfig,
  AddressConfig,
  DateOfBirthConfig,
  EmailConfig,
  FirstNameConfig,
  GenderConfig,
  PhoneNoConfig,
  PostCodeConfig,
  RelationshipWithInsuredConfig,
  SurnameConfig,
];

export default {
  Address,
  DateOfBirth,
  Email,
  FirstName,
  Gender,
  PhoneNo,
  PostCode,
  RelationshipWithInsured,
  Surname,
  Age,
  SMS,
};
