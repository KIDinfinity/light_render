import UBOShareholder, { fieldConfig as UBOShareholderConfig } from './UBOShareholder';
import CustomerType, { fieldConfig as CustomerTypeConfig } from './CustomerType';
import CustomerEnFirstName, {
  fieldConfig as CustomerEnFirstNameConfig,
} from './CustomerEnFirstName';
import CustomerEnSurname, { fieldConfig as CustomerEnSurnameConfig } from './CustomerEnSurname';
import IdentityNo, { fieldConfig as IdentityNoConfig } from './IdentityNo';
import DateOfBirth, { fieldConfig as DateOfBirthConfig } from './DateOfBirth';
import Gender, { fieldConfig as GenderConfig } from './Gender';
import CustomerRole, { fieldConfig as CustomerRoleConfig } from './CustomerRole';
import Percentage, { fieldConfig as PercentageConfig } from './Percentage';
import Nationality, { fieldConfig as NationalityConfig } from './Nationality';
import Country, { fieldConfig as CountryConfig } from './Country';

export const localFieldConfigs = [
  UBOShareholderConfig,
  CustomerTypeConfig,
  CustomerEnFirstNameConfig,
  CustomerEnSurnameConfig,
  IdentityNoConfig,
  DateOfBirthConfig,
  GenderConfig,
  CustomerRoleConfig,
  PercentageConfig,
  NationalityConfig,
  CountryConfig,
];

export default {
  UBOShareholder,
  CustomerType,
  CustomerEnFirstName,
  CustomerEnSurname,
  IdentityNo,
  DateOfBirth,
  Gender,
  CustomerRole,
  Percentage,
  Nationality,
  Country,
};
