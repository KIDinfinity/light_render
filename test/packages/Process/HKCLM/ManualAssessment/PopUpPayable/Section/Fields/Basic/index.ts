import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';

export const localFieldConfigs = [
  ClaimDecisionConfig,
  PolicyNoConfig,
  BenefitTypeCodeConfig,
  BenefitItemCodeConfig,
];

export default {
  ClaimDecision,
  PolicyNo,
  BenefitTypeCode,
  BenefitItemCode,
};
