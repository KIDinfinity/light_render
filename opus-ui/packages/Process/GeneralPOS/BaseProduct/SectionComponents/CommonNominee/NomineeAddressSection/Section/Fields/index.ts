import AddressLine1, { localFieldConfig as AddressLine1Config } from './AddressLine1';
import AddressLine2, { localFieldConfig as AddressLine2Config } from './AddressLine2';
import AddressLine3, { localFieldConfig as AddressLine3Config } from './AddressLine3';
import AddressLine4, { localFieldConfig as AddressLine4Config } from './AddressLine4';
import AddressLine5, { localFieldConfig as AddressLine5Config } from './AddressLine5';
import CountryCode, { localFieldConfig as CountryCodeConfig } from './CountryCode';
import ZipCode, { localFieldConfig as ZipCodeConfig } from './ZipCode';
import AddressType, { localFieldConfig as AddressTypeConfig } from './AddressType';
import Nationality, { localFieldConfig as NationalityConfig } from './Nationality';
import CorrespondenceAddress, {
  localFieldConfig as CorrespondenceAddressConfig,
} from './CorrespondenceAddress';
import ResidentialAddress, {
  localFieldConfig as ResidentialAddressConfig,
} from './ResidentialAddress';

export const localFieldConfigs = [
  AddressLine1Config,
  AddressLine2Config,
  AddressLine3Config,
  AddressLine4Config,
  AddressLine5Config,
  CountryCodeConfig,
  ZipCodeConfig,
  AddressTypeConfig,
  NationalityConfig,
  CorrespondenceAddressConfig,
  ResidentialAddressConfig,
];

export default {
  AddressLine1,
  AddressLine2,
  AddressLine3,
  AddressLine4,
  AddressLine5,
  CountryCode,
  ZipCode,
  AddressType,
  Nationality,
  CorrespondenceAddress,
  ResidentialAddress,
};
