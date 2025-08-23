import AddressChange, { localFieldConfig as AddressChangeConfig } from './AddressChange';
import AddressLine1, { localFieldConfig as AddressLine1Config } from './AddressLine1';
import AddressLine2, { localFieldConfig as AddressLine2Config } from './AddressLine2';
import AddressLine3, { localFieldConfig as AddressLine3Config } from './AddressLine3';
import AddressLine4, { localFieldConfig as AddressLine4Config } from './AddressLine4';
import AddressLine5, { localFieldConfig as AddressLine5Config } from './AddressLine5';
import CountryCode, { localFieldConfig as CountryCodeConfig } from './CountryCode';
import CurrentAddress, { localFieldConfig as CurrentAddressConfig } from './CurrentAddress';
import ZipCode, { localFieldConfig as ZipCodeConfig } from './ZipCode';
import AddressType, { localFieldConfig as AddressTypeConfig } from './AddressType';
import Email, { localFieldConfig as EmailConfig } from './Email';
import ApplyTo, { localFieldConfig as ApplyToConfig } from './ApplyTo';
import PreferredMailingAddress, {
  localFieldConfig as PreferredMailingAddressConfig,
} from './PreferredMailingAddress';

export const localFieldConfigs = [
  AddressChangeConfig,
  AddressLine1Config,
  AddressLine2Config,
  AddressLine3Config,
  AddressLine4Config,
  AddressLine5Config,
  CountryCodeConfig,
  CurrentAddressConfig,
  ZipCodeConfig,
  AddressTypeConfig,
  EmailConfig,
  ApplyToConfig,
  PreferredMailingAddressConfig,
];

export default {
  AddressChange,
  AddressLine1,
  AddressLine2,
  AddressLine3,
  AddressLine4,
  AddressLine5,
  CountryCode,
  CurrentAddress,
  ZipCode,
  AddressType,
  Email,
  ApplyTo,
  PreferredMailingAddress,
};
