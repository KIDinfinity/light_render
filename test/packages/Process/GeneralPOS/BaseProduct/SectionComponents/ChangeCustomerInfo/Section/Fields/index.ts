
import Title, { localFieldConfig as TitleConfig } from './Title';
import MaritalStatus, { localFieldConfig as MaritalStatusConfig } from './MaritalStatus';
import MiddleName, { localFieldConfig as MiddleNameConfig } from './MiddleName';
import SurName, { localFieldConfig as SurNameConfig } from './SurName';
import ClientName, { localFieldConfig as ClientNameConfig } from './ClientName';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
export const localFieldConfigs = [
  TitleConfig,
  MaritalStatusConfig,
  MiddleNameConfig,
  SurNameConfig,
  ClientNameConfig,
  FirstNameConfig,
];

export default {
  ClientName,
  Title,
  MaritalStatus,
  MiddleName,
  FirstName,
  SurName
};
