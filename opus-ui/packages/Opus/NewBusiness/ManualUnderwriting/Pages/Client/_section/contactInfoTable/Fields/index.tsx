import Contacttype, { fieldConfig as contactTypeConfig } from './Contacttype';
import Contactno, { fieldConfig as contactNoConfig } from './Contactno';
import Countrycode, { fieldConfig as countryCodeConfig } from './Countrycode';
import CountryName, { fieldConfig as countryNameConfig } from './CountryName';
import AreaCode, { fieldConfig as areaCodeConfig } from './AreaCode';
import ContacttypeAdd, { fieldConfig as contactTypeAddConfig } from './ContacttypeAdd';

export const localFieldConfigs = [
  contactTypeConfig,
  contactNoConfig,
  countryCodeConfig,
  countryNameConfig,
  areaCodeConfig,
  contactTypeAddConfig
];

export default {
  Contacttype,
  Contactno,
  Countrycode,
  AreaCode,
  CountryName,
  ContacttypeAdd
};
