import Address1, { fieldConfig as Address1Config } from './Address1';
import Address2, { fieldConfig as Address2Config } from './Address2';
import Address3, { fieldConfig as Address3Config } from './Address3';
import Address4, { fieldConfig as Address4Config } from './Address4';
import Address5, { fieldConfig as Address5Config } from './Address5';
import Address6, { fieldConfig as Address6Config } from './Address6';
import PostalCode, { fieldConfig as PostalCodeConfig } from './PostalCode';
import Country, { fieldConfig as CountryConfig } from './Country';
import BizAddr, { fieldConfig as BizAddrConfig } from './BizAddr';
import HouseRegAddr, { fieldConfig as HouseRegAddrConfig } from './HouseRegAddr';


export const localFieldConfigs = [
  Address1Config,
  Address2Config,
  Address3Config,
  Address4Config,
  Address5Config,
  Address6Config,
  PostalCodeConfig,
  CountryConfig,
  BizAddrConfig,
  HouseRegAddrConfig,
];

export default {
  Address1,
  Address2,
  Address3,
  Address4,
  Address5,
  Address6,
  PostalCode,
  Country,
  BizAddr,
  HouseRegAddr,
};
