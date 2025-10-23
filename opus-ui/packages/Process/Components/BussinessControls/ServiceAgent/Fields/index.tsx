import AgentLocation, { localFieldConfig as AgentLocationConfig } from './AgentLocation';
import AgentName, { localFieldConfig as AgentNameConfig } from './AgentName';
import AgentNumber, { localFieldConfig as AgentNumberConfig } from './AgentNumber';
import AgentPhone, { localFieldConfig as AgentPhoneConfig } from './AgentPhone';
import AgentStatus, { localFieldConfig as AgentStatusConfig } from './AgentStatus';
import AgentUnit, { localFieldConfig as AgentUnitConfig } from './AgentUnit';
import GivenName, { localFieldConfig as GivenNameConfig } from './GivenName';
import Surname, { localFieldConfig as SurnameConfig } from './Surname';

export const localFieldConfigs = [
  AgentLocationConfig,
  AgentNameConfig,
  AgentNumberConfig,
  AgentPhoneConfig,
  AgentStatusConfig,
  AgentUnitConfig,
  GivenNameConfig,
  SurnameConfig,
];

export default {
  AgentLocation,
  AgentName,
  AgentNumber,
  AgentPhone,
  AgentStatus,
  AgentUnit,
  GivenName,
  Surname,
};
