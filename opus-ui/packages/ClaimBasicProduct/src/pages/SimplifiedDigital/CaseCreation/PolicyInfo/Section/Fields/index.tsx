import BasePlan, { localFieldConfig as BasePlanConfig } from './BasePlan';
import RiskStatus, { localFieldConfig as RiskStatusConfig } from './RiskStatus';
import PremiumStatus, { localFieldConfig as PremiumStatusConfig } from './PremiumStatus';
import IssueEffectiveDate, {
  localFieldConfig as IssueEffectiveDateConfig,
} from './IssueEffectiveDate';
import AgentCode, { localFieldConfig as AgentCodeConfig } from './AgentCode';
import AgentName, { localFieldConfig as AgentNameConfig } from './AgentName';
import AgencyName, { localFieldConfig as AgencyNameConfig } from './AgencyName';
import AgencyMobileNo, { localFieldConfig as AgencyMobileNoConfig } from './AgencyMobileNo';
import AgentBranch, { localFieldConfig as AgentBranchConfig } from './AgentBranch';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';

export const localFieldConfigs = [
  BasePlanConfig,
  RiskStatusConfig,
  PremiumStatusConfig,
  IssueEffectiveDateConfig,
  AgentCodeConfig,
  AgentNameConfig,
  AgencyNameConfig,
  AgencyMobileNoConfig,
  AgentBranchConfig,
  PolicyNoConfig,
];

export default {
  BasePlan,
  RiskStatus,
  PremiumStatus,
  IssueEffectiveDate,
  AgentCode,
  AgentName,
  AgencyName,
  AgencyMobileNo,
  AgentBranch,
  PolicyNo,
};
