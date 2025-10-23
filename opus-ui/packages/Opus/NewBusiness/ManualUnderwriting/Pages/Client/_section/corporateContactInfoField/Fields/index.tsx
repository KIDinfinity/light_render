import Contacttype, { fieldConfig as contactTypeConfig } from './Contacttype';
import Contactno, { fieldConfig as contactNoConfig } from './Contactno';
import Countrycode, { fieldConfig as countryCodeConfig } from './Countrycode';
import Address7, { fieldConfig as address7Config } from './Address7';
import Address6, { fieldConfig as address6Config } from './Address6';
import Address5, { fieldConfig as address5Config } from './Address5';
import Address4, { fieldConfig as address4Config } from './Address4';
import Address3, { fieldConfig as address3Config } from './Address3';
import Address2, { fieldConfig as address2Config } from './Address2';
import Address1, { fieldConfig as address1Config } from './Address1';
import AddressType, { fieldConfig as addressTypeConfig } from './AddressType';
import Zipcode, { fieldConfig as zipCodeConfig } from './Zipcode';
import Businessaddress, { fieldConfig as BusinessaddressConfig } from './Businessaddress';

export const localFieldConfigs = [
  addressTypeConfig,
  address7Config,
  address6Config,
  address5Config,
  address4Config,
  address3Config,
  address2Config,
  address1Config,
  zipCodeConfig,
  contactTypeConfig,
  contactNoConfig,
  countryCodeConfig,
  BusinessaddressConfig,
];

export default {
  AddressType,
  Address7,
  Address6,
  Address5,
  Address4,
  Address3,
  Address2,
  Address1,
  Zipcode,
  Contacttype,
  Contactno,
  Countrycode,
  Businessaddress,
};
