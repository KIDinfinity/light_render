import Age, { localFieldConfig as AgeConfig } from './Age';
import DateofBirth, { localFieldConfig as DateofBirthConfig } from './DateofBirth';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import IDExpiryDate, { localFieldConfig as IDExpiryDateConfig } from './IDExpiryDate';
import IdentityNo, { localFieldConfig as IdentityNoConfig } from './IdentityNo';
import IdentityType, { localFieldConfig as IdentityTypeConfig } from './IdentityType';
import Name, { localFieldConfig as NameConfig } from './Name';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
import Role, { localFieldConfig as RoleConfig } from './Role';
import MaritalStatus, { localFieldConfig as MaritalStatusConfig } from './MaritalStatus';
import OccupationCode, { localFieldConfig as OccupationCodeConfig } from './OccupationCode';
import Email, { localFieldConfig as EmailConfig } from './Email';
import Nationality, { localFieldConfig as NationalityConfig } from './Nationality';
import PlaceOfBirth, { localFieldConfig as PlaceOfBirthConfig } from './PlaceOfBirth';
import HomeNo, { localFieldConfig as HomeNoConfig } from './HomeNo';
import WorkNo, { localFieldConfig as WorkNoConfig } from './WorkNo';

export const localFieldConfigs = [
  AgeConfig,
  DateofBirthConfig,
  GenderConfig,
  IDExpiryDateConfig,
  IdentityNoConfig,
  IdentityTypeConfig,
  NameConfig,
  PhoneNoConfig,
  RoleConfig,
  MaritalStatusConfig,
  OccupationCodeConfig,
  EmailConfig,
  NationalityConfig,
  PlaceOfBirthConfig,
  HomeNoConfig,
  WorkNoConfig,
];

export default {
  MaritalStatus,
  OccupationCode,
  Age,
  DateofBirth,
  Gender,
  IDExpiryDate,
  IdentityNo,
  IdentityType,
  Name,
  PhoneNo,
  Role,
  Email,
  Nationality,
  PlaceOfBirth,
  HomeNo,
  WorkNo,
};
