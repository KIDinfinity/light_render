import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';

export const localFieldConfigs = [
  ClaimDecisionConfig,
  PolicyNoConfig,
  BenefitTypeCodeConfig,
  BenefitItemCodeConfig,
  ProductCodeConfig,
];

export default {
  ClaimDecision,
  PolicyNo,
  BenefitTypeCode,
  BenefitItemCode,
  ProductCode,
};
