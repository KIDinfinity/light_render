import Email, { fieldConfig as emailConfig } from './Email';
import HomePhoneNo, { fieldConfig as homePhoneNoConfig } from './HomePhoneNo';
import MobilePhoneNo, { fieldConfig as mobilePhoneNoConfig } from './MobilePhoneNo';
import OfficePhoneNo, { fieldConfig as officePhoneNoConfig } from './OfficePhoneNo';

export const localFieldConfigs = [
  emailConfig,
  homePhoneNoConfig,
  mobilePhoneNoConfig,
  officePhoneNoConfig,
];

export default {
  Email,
  HomePhoneNo,
  MobilePhoneNo,
  OfficePhoneNo,
};
