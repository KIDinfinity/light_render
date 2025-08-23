import AgentFirstName, { localFieldConfig as AgentFirstNameConfig } from './AgentFirstName';
import BillingFrequency, { localFieldConfig as BillingFrequencyConfig } from './BillingFrequency';
import CoverageTerminateDate, {
  localFieldConfig as CoverageTerminateDateConfig,
} from './CoverageTerminateDate';
import InsuredFullName, { localFieldConfig as InsuredFullNameConfig } from './InsuredFullName';
import IssueEffectiveDate, {
  localFieldConfig as IssueEffectiveDateConfig,
} from './IssueEffectiveDate';
import LastPaidDate, { localFieldConfig as LastPaidDateConfig } from './LastPaidDate';
import OwnerFullName, { localFieldConfig as OwnerFullNameConfig } from './OwnerFullName';
import PaidToDate, { localFieldConfig as PaidToDateConfig } from './PaidToDate';
import PaymentMethod, { localFieldConfig as PaymentMethodConfig } from './PaymentMethod';
import PolicyId, { localFieldConfig as PolicyIdConfig } from './PolicyId';
import PolicyName, { localFieldConfig as PolicyNameConfig } from './PolicyName';
import PremiumStatus, { localFieldConfig as PremiumStatusConfig } from './PremiumStatus';
import RiskStatus, { localFieldConfig as RiskStatusConfig } from './RiskStatus';
import SalesChannel, { localFieldConfig as SalesChannelConfig } from './SalesChannel';
import TotalModePremium, { localFieldConfig as TotalModePremiumConfig } from './TotalModePremium';

export const localFieldConfigs = [
  AgentFirstNameConfig,
  BillingFrequencyConfig,
  CoverageTerminateDateConfig,
  InsuredFullNameConfig,
  IssueEffectiveDateConfig,
  LastPaidDateConfig,
  OwnerFullNameConfig,
  PaidToDateConfig,
  PaymentMethodConfig,
  PolicyIdConfig,
  PolicyNameConfig,
  PremiumStatusConfig,
  RiskStatusConfig,
  SalesChannelConfig,
  TotalModePremiumConfig,
];

export default {
  AgentFirstName,
  BillingFrequency,
  CoverageTerminateDate,
  InsuredFullName,
  IssueEffectiveDate,
  LastPaidDate,
  OwnerFullName,
  PaidToDate,
  PaymentMethod,
  PolicyId,
  PolicyName,
  PremiumStatus,
  RiskStatus,
  SalesChannel,
  TotalModePremium,
};
