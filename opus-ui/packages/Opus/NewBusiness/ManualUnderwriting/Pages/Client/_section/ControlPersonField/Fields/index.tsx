import CustomerEnFirstName, {
  fieldConfig as CustomerEnFirstNameConfig,
} from './CustomerEnFirstName';
import CustomerEnSurname, { fieldConfig as CustomerEnSurnameConfig } from './CustomerEnSurname';
import IdentityNo, { fieldConfig as IdentityNoConfig } from './IdentityNo';
import CustomerRole, { fieldConfig as CustomerRoleConfig } from './CustomerRole';
import Nationality, { fieldConfig as NationalityConfig } from './Nationality';

export const localFieldConfigs = [
  CustomerEnFirstNameConfig,
  CustomerEnSurnameConfig,
  IdentityNoConfig,
  CustomerRoleConfig,
  NationalityConfig,
];

export default {
  CustomerEnFirstName,
  CustomerEnSurname,
  IdentityNo,
  CustomerRole,
  Nationality,
};
