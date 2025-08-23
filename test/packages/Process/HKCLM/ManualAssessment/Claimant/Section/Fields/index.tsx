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
import IDType, { localFieldConfig as IDTypeConfig } from './IDType';
import DateOfIssue, { localFieldConfig as DateOfIssueConfig } from './DateOfIssue';
import DateOfExpiry, { localFieldConfig as DateOfExpiryConfig } from './DateOfExpiry';
import NoExpiryDate, { localFieldConfig as NoExpiryDateConfig } from './NoExpiryDate';
import AgeAdmit, { localFieldConfig as AgeAdmitConfig } from './AgeAdmit';
import ValidID, { localFieldConfig as ValidIDConfig } from './ValidID';
import OCRResult, { localFieldConfig as OCRResultConfig } from './OCRResult';
import Exempty, { localFieldConfig as ExemptyConfig } from './Exempty';

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
  IDTypeConfig,
  DateOfIssueConfig,
  NoExpiryDateConfig,
  AgeAdmitConfig,
  ValidIDConfig,
  OCRResultConfig,
  ExemptyConfig,
  DateOfExpiryConfig,
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
  IDType,
  DateOfIssue,
  DateOfExpiry,
  NoExpiryDate,
  AgeAdmit,
  ValidID,
  OCRResult,
  Exempty,
};
