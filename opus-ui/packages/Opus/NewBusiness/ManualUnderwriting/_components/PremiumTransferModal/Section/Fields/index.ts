import FromPolicy, { localFieldConfig as FromPolicyConfig } from './FromPolicy';
import TargetPolicyId, { localFieldConfig as TargetPolicyIdConfig } from './TargetPolicyId';
import Amount, { localFieldConfig as AmountConfig } from './Amount';
import Payor, { localFieldConfig as PayorConfig } from './Payor';
import PremiumReceived, { localFieldConfig as PremiumReceivedConfig } from './PremiumReceived';
import Status, { localFieldConfig as StatusConfig } from './Status';

export const localFieldConfigs = [
  FromPolicyConfig,
  PayorConfig,
  PremiumReceivedConfig,
  TargetPolicyIdConfig,
  AmountConfig,
  StatusConfig,
];

export default {
  FromPolicy,
  Payor,
  PremiumReceived,
  TargetPolicyId,
  Amount,
  Status,
};
