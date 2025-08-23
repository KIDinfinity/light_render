import AgentLocation, { localFieldConfig as AgentLocationConfig } from './AgentLocation';
import AgentName, { localFieldConfig as AgentNameConfig } from './AgentName';
import GivenName, { localFieldConfig as GivenNameConfig } from './GivenName';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';
import AgentNumber, { localFieldConfig as AgentNumberConfig } from './AgentNumber';
import AgentPhone, { localFieldConfig as AgentPhoneConfig } from './AgentPhone';
import AgentStatus, { localFieldConfig as AgentStatusConfig } from './AgentStatus';
import AgentUnit, { localFieldConfig as AgentUnitConfig } from './AgentUnit';

export const localFieldConfigs = [
  AgentLocationConfig,
  AgentNameConfig,
  GivenNameConfig,
  SurnameConfig,
  AgentNumberConfig,
  AgentPhoneConfig,
  AgentStatusConfig,
  AgentUnitConfig,
];

export default {
  AgentLocation,
  AgentName,
  GivenName,
  Surname,
  AgentNumber,
  AgentPhone,
  AgentStatus,
  AgentUnit,
};
