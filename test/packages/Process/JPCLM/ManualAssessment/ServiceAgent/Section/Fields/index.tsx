import AgencyAcceptanceDate, {
  localFieldConfig as AgencyAcceptanceDateConfig,
} from './AgencyAcceptanceDate';
import AgencyCode, { localFieldConfig as AgencyCodeConfig } from './AgencyCode';
import AgencyName, { localFieldConfig as AgencyNameConfig } from './AgencyName';
import AgencyPhoneNo, { localFieldConfig as AgencyPhoneNoConfig } from './AgencyPhoneNo';
import AgentName, { localFieldConfig as AgentNameConfig } from './AgentName';
import AgentNumber, { localFieldConfig as AgentNumberConfig } from './AgentNumber';
import AgentStatus, { localFieldConfig as AgentStatusConfig } from './AgentStatus';
import BranchCode, { localFieldConfig as BranchCodeConfig } from './BranchCode';
import BranchName, { localFieldConfig as BranchNameConfig } from './BranchName';
import InformAgency, { fieldConfig as InformAgencyConfig } from './InformAgency';
export const localFieldConfigs = [
  AgencyAcceptanceDateConfig,
  AgencyCodeConfig,
  AgencyNameConfig,
  AgencyPhoneNoConfig,
  AgentNameConfig,
  AgentNumberConfig,
  AgentStatusConfig,
  BranchCodeConfig,
  BranchNameConfig,
  InformAgencyConfig,
];

export default {
  InformAgency,
  AgencyAcceptanceDate,
  AgencyCode,
  AgencyName,
  AgencyPhoneNo,
  AgentName,
  AgentNumber,
  AgentStatus,
  BranchCode,
  BranchName,
};
