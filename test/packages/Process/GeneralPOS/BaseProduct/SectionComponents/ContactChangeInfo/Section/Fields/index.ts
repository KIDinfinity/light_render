import Email, { localFieldConfig as EmailConfig } from './Email';
import HomeNo, { localFieldConfig as HomeNoConfig } from './HomeNo';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './PhoneNo';
import WorkNo, { localFieldConfig as WorkNoConfig } from './WorkNo';
import ApplyTo, { localFieldConfig as ApplyToConfig } from './ApplyTo';
import CountryCodeOfPhoneNo, {
  localFieldConfig as CountryCodeOfPhoneNoConfig,
} from './CountryCodeOfPhoneNo';

export const localFieldConfigs = [
  EmailConfig,
  HomeNoConfig,
  PhoneNoConfig,
  WorkNoConfig,
  ApplyToConfig,
  CountryCodeOfPhoneNoConfig,
];

export default {
  Email,
  HomeNo,
  PhoneNo,
  WorkNo,
  ApplyTo,
  CountryCodeOfPhoneNo,
};
