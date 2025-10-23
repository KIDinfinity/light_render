import SubmissionChannel, {
  localFieldConfig as SubmissionChannelConfig,
} from './SubmissionChannel';
import SubmissionTime, { localFieldConfig as SubmissionTimeConfig } from './SubmissionTime';
import SubmissionDate, { localFieldConfig as SubmissionDateConfig } from './SubmissionDate';
import PremiumStatus, { localFieldConfig as PremiumStatusConfig } from './PremiumStatus';
import PolicyStatus, { localFieldConfig as PolicyStatusConfig } from './PolicyStatus';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import PolicyName, { localFieldConfig as PolicyNameConfig } from './PolicyName';
import PaidToDate, { localFieldConfig as PaidToDateConfig } from './PaidToDate';
import PolicyIssueDate, { localFieldConfig as PolicyIssueDateConfig } from './PolicyIssueDate';
import BillToDate, { localFieldConfig as BillToDateConfig } from './BillToDate';
import AgentPhone, { localFieldConfig as AgentPhoneConfig } from './AgentPhone';
import AgentName, { localFieldConfig as AgentNameConfig } from './AgentName';

export const localFieldConfigs = [
  SubmissionChannelConfig,
  SubmissionTimeConfig,
  SubmissionDateConfig,
  PremiumStatusConfig,
  PolicyStatusConfig,
  PolicyNoConfig,
  PolicyNameConfig,
  PaidToDateConfig,
  PolicyIssueDateConfig,
  BillToDateConfig,
  AgentPhoneConfig,
  AgentNameConfig,
];

export default {
  SubmissionChannel,
  SubmissionTime,
  SubmissionDate,
  PremiumStatus,
  PolicyStatus,
  PolicyNo,
  PolicyName,
  PaidToDate,
  PolicyIssueDate,
  BillToDate,
  AgentPhone,
  AgentName,
};
