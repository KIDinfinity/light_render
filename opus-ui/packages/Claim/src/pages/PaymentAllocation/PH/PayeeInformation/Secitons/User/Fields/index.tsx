import ClientId, { localFieldConfig as ClientIdConfig } from './ClientId';
import Email, { localFieldConfig as EmailConfig } from './Email';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import IdentityNo, { localFieldConfig as IdentityNoConfig } from './IdentityNo';
import IdentityType, { localFieldConfig as IdentityTypeConfig } from './IdentityType';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
// 这个应该不需要了
import DateOfBirth, { localFieldConfig as DateOfBirthConfig } from './DateOfBirth';

export const localFieldConfigs = [
  ClientIdConfig,
  EmailConfig,
  GenderConfig,
  IdentityNoConfig,
  IdentityTypeConfig,
  PhoneNoConfig,
  DateOfBirthConfig,
];

export default {
  ClientId,
  Email,
  Gender,
  IdentityNo,
  IdentityType,
  PhoneNo,
  DateOfBirth,
};
