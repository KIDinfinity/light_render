import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';

export const localFieldConfigs = [
  ClaimDecisionConfig,
  PolicyNoConfig,
  ProductCodeConfig,
  BenefitTypeCodeConfig,
  BenefitItemCodeConfig,
];

export default {
  ClaimDecision,
  PolicyNo,
  ProductCode,
  BenefitTypeCode,
  BenefitItemCode,
};
