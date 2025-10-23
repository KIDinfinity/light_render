import ApplytoPolicies, { localFieldConfig as ApplytoPoliciesConfig } from './ApplytoPolicies';
import BillingFrequency, { localFieldConfig as BillingFrequencyConfig } from './BillingFrequency';
import InsuredFullName, { localFieldConfig as InsuredFullNameConfig } from './InsuredFullName';
import PaidToDate, { localFieldConfig as PaidToDateConfig } from './PaidToDate';
import PaymentMethod, { localFieldConfig as PaymentMethodConfig } from './PaymentMethod';
import PolicyId, { localFieldConfig as PolicyIdConfig } from './PolicyId';
import PolicyName, { localFieldConfig as PolicyNameConfig } from './PolicyName';
import PolicySelection, { localFieldConfig as PolicySelectionConfig } from './PolicySelection';
import PremiumStatus, { localFieldConfig as PremiumStatusConfig } from './PremiumStatus';
import RiskStatus, { localFieldConfig as RiskStatusConfig } from './RiskStatus';

export const whiteList = [
  BillingFrequencyConfig,
  InsuredFullNameConfig,
  PaidToDateConfig,
  PaymentMethodConfig,
  PolicyIdConfig,
  PolicyNameConfig,
  PolicySelectionConfig,
  PremiumStatusConfig,
  RiskStatusConfig,
];

export const localFieldConfigs = [
  ApplytoPoliciesConfig,
  BillingFrequencyConfig,
  InsuredFullNameConfig,
  PaidToDateConfig,
  PaymentMethodConfig,
  PolicyIdConfig,
  PolicyNameConfig,
  PolicySelectionConfig,
  PremiumStatusConfig,
  RiskStatusConfig,
];

export default {
  ApplytoPolicies,
  BillingFrequency,
  InsuredFullName,
  PaidToDate,
  PaymentMethod,
  PolicyId,
  PolicyName,
  PolicySelection,
  PremiumStatus,
  RiskStatus,
};
