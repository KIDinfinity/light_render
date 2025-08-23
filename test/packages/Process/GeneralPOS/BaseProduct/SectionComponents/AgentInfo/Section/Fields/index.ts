import Email, { localFieldConfig as EmailConfig } from './Email';
import AgentExpiryDate, { localFieldConfig as AgentExpiryDateConfig } from './AgentExpiryDate';
import AgentName, { localFieldConfig as AgentNameConfig } from './AgentName';
import AgentPhone, { localFieldConfig as AgentPhoneConfig } from './AgentPhone';
import AgentType, { localFieldConfig as AgentTypeConfig } from './AgentType';
import AgentBranch, { localFieldConfig as AgentBranchConfig } from './AgentBranch';

export const localFieldConfigs = [
  EmailConfig,
  AgentExpiryDateConfig,
  AgentNameConfig,
  AgentPhoneConfig,
  AgentTypeConfig,
  AgentBranchConfig,
];

export default {
  Email,
  AgentExpiryDate,
  AgentName,
  AgentPhone,
  AgentType,
  AgentBranch,
};
