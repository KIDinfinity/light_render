import CustomerEnFirstName, {
  fieldConfig as CustomerEnFirstNameConfig,
} from './CustomerEnFirstName';
import CustomerEnSurname, { fieldConfig as CustomerEnSurnameConfig } from './CustomerEnSurname';
import IdentityNo, { fieldConfig as IdentityNoConfig } from './IdentityNo';
import CustomerRole, { fieldConfig as CustomerRoleConfig } from './CustomerRole';

export const localFieldConfigs = [
  CustomerEnFirstNameConfig,
  CustomerEnSurnameConfig,
  IdentityNoConfig,
  CustomerRoleConfig,
];

export default {
  CustomerEnFirstName,
  CustomerEnSurname,
  IdentityNo,
  CustomerRole,
};
