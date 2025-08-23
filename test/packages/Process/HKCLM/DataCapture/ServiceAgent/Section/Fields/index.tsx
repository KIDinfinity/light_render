import AgentLocation, { localFieldConfig as AgentLocationConfig } from './AgentLocation';
import AgentName, { localFieldConfig as AgentNameConfig } from './AgentName';
import AgentNumber, { localFieldConfig as AgentNumberConfig } from './AgentNumber';
import AgentPhone, { localFieldConfig as AgentPhoneConfig } from './AgentPhone';
import AgentStatus, { localFieldConfig as AgentStatusConfig } from './AgentStatus';
import AgentUnit, { localFieldConfig as AgentUnitConfig } from './AgentUnit';

export const localFieldConfigs = [
  AgentLocationConfig,
  AgentNameConfig,
  AgentNumberConfig,
  AgentPhoneConfig,
  AgentStatusConfig,
  AgentUnitConfig,
];

export default {
  AgentLocation,
  AgentName,
  AgentNumber,
  AgentPhone,
  AgentStatus,
  AgentUnit,
};
