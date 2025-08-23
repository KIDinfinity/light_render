import BillingFrequency, { localFieldConfig as BillingFrequencyConfig } from './BillingFrequency';
import PolicyReinstatmentDate, {
  localFieldConfig as PolicyReinstatmentDateConfig,
} from './PolicyReinstatmentDate';
import CoverageTerminateDate, {
  localFieldConfig as CoverageTerminateDateConfig,
} from './CoverageTerminateDate';
import PolicyCurrency, { localFieldConfig as PolicyCurrencyConfig } from './PolicyCurrency';
import IssueEffectiveDate, {
  localFieldConfig as IssueEffectiveDateConfig,
} from './IssueEffectiveDate';
import LastPaymentDate, { localFieldConfig as LastPaymentDateConfig } from './LastPaymentDate';
import PolicyEffectiveDate, {
  localFieldConfig as PolicyEffectiveDateConfig,
} from './PolicyEffectiveDate';
import PaidToDate, { localFieldConfig as PaidToDateConfig } from './PaidToDate';
import PaymentMethod, { localFieldConfig as PaymentMethodConfig } from './PaymentMethod';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import PolicyName, { localFieldConfig as PolicyNameConfig } from './PolicyName';
import PremiumStatus, { localFieldConfig as PremiumStatusConfig } from './PremiumStatus';
import RiskStatus, { localFieldConfig as RiskStatusConfig } from './RiskStatus';
import SalesChannel, { localFieldConfig as SalesChannelConfig } from './SalesChannel';
import TotalModePremium, { localFieldConfig as TotalModePremiumConfig } from './TotalModePremium';
import PolicyDispatchAddr, {
  localFieldConfig as PolicyDispatchAddrConfig,
} from './PolicyDispatchAddr';
import BillToDate, { localFieldConfig as BillToDateConfig } from './BillToDate';
import PreferredMailingAddrDtl, {
  localFieldConfig as PreferredMailingAddrDtlConfig,
} from './PreferredMailingAddrDtl';
import PreferredMailingAddr, {
  localFieldConfig as PreferredMailingAddrConfig,
} from './PreferredMailingAddr';
import TrustPolicy, { localFieldConfig as TrustPolicyConfig } from './TrustPolicy';
import PremiumPaymentMethod, {
  localFieldConfig as PremiumPaymentMethodConfig,
} from './PremiumPaymentMethod';
import HighlightPolicyNote, {
  localFieldConfig as HighlightPolicyNoteConfig,
} from './HighlightPolicyNote';

export const localFieldConfigs = [
  BillingFrequencyConfig,
  PolicyReinstatmentDateConfig,
  CoverageTerminateDateConfig,
  PolicyCurrencyConfig,
  IssueEffectiveDateConfig,
  LastPaymentDateConfig,
  PolicyEffectiveDateConfig,
  PaidToDateConfig,
  PaymentMethodConfig,
  PolicyNoConfig,
  PolicyNameConfig,
  PremiumStatusConfig,
  RiskStatusConfig,
  SalesChannelConfig,
  TotalModePremiumConfig,
  PolicyDispatchAddrConfig,
  BillToDateConfig,
  PreferredMailingAddrDtlConfig,
  PreferredMailingAddrConfig,
  TrustPolicyConfig,
  PremiumPaymentMethodConfig,
  HighlightPolicyNoteConfig,
];

export default {
  BillingFrequency,
  PolicyReinstatmentDate,
  CoverageTerminateDate,
  PolicyCurrency,
  IssueEffectiveDate,
  LastPaymentDate,
  PolicyEffectiveDate,
  PaidToDate,
  PaymentMethod,
  PolicyNo,
  PolicyName,
  PremiumStatus,
  RiskStatus,
  SalesChannel,
  TotalModePremium,
  PolicyDispatchAddr,
  BillToDate,
  PreferredMailingAddrDtl,
  PreferredMailingAddr,
  TrustPolicy,
  PremiumPaymentMethod,
  HighlightPolicyNote,
};
