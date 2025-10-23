import ClientId, { localFieldConfig as ClientIdConfig } from './ClientId';
import DateOfBirth, { localFieldConfig as DateOfBirthConfig } from './DateOfBirth';
import FirstName, { localFieldConfig as FirstNameConfig } from './FirstName';
import Gender, { localFieldConfig as GenderConfig } from './Gender';
import MiddleName, { localFieldConfig as MiddleNameConfig } from './MiddleName';
import PolicyId, { localFieldConfig as PolicyIdConfig } from './PolicyId';
import PolicySource, { localFieldConfig as PolicySourceConfig } from './PolicySource';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';

export const localFieldConfigs = [
  ClientIdConfig,
  DateOfBirthConfig,
  FirstNameConfig,
  GenderConfig,
  MiddleNameConfig,
  PolicyIdConfig,
  PolicySourceConfig,
  SurnameConfig,
];

export default {
  ClientId,
  DateOfBirth,
  FirstName,
  Gender,
  MiddleName,
  PolicyId,
  PolicySource,
  Surname,
};
