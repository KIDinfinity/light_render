import CustomerEnFirstName, {
  fieldConfig as CustomerEnFirstNameConfig,
} from './CustomerEnFirstName';
import CustomerEnSurname, { fieldConfig as CustomerEnSurnameConfig } from './CustomerEnSurname';
import IdentityNo, { fieldConfig as IdentityNoConfig } from './IdentityNo';
import DateOfBirth, { fieldConfig as DateOfBirthConfig } from './DateOfBirth';
import CustomerRole, { fieldConfig as CustomerRoleConfig } from './CustomerRole';
import Nationality, { fieldConfig as NationalityConfig } from './Nationality';
import Country, { fieldConfig as CountryConfig } from './Country';
import AddressType, { fieldConfig as AddressTypeConfig } from './AddressType';
import Address1, { fieldConfig as Address1Config } from './Address1';
import Address2, { fieldConfig as Address2Config } from './Address2';
import Address3, { fieldConfig as Address3Config } from './Address3';
import Address4, { fieldConfig as Address4Config } from './Address4';
import Address5, { fieldConfig as Address5Config } from './Address5';
import Address6, { fieldConfig as Address6Config } from './Address6';
import Zipcode, { fieldConfig as ZipcodeConfig } from './Zipcode';
import Residentialaddress, { fieldConfig as ResidentialaddressConfig } from './Residentialaddress';

export const localFieldConfigs = [
  CustomerEnFirstNameConfig,
  CustomerEnSurnameConfig,
  IdentityNoConfig,
  DateOfBirthConfig,
  CustomerRoleConfig,
  NationalityConfig,
  CountryConfig,
  AddressTypeConfig,
  Address1Config,
  Address2Config,
  Address3Config,
  Address4Config,
  Address5Config,
  Address6Config,
  ZipcodeConfig,
  ResidentialaddressConfig,
];

export default {
  CustomerEnFirstName,
  CustomerEnSurname,
  IdentityNo,
  DateOfBirth,
  CustomerRole,
  Nationality,
  Country,
  AddressType,
  Address1,
  Address2,
  Address3,
  Address4,
  Address5,
  Address6,
  Zipcode,
  Residentialaddress,
};
