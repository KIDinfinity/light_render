import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import ClaimReferenceDate, {
  localFieldConfig as ClaimReferenceDateConfig,
} from './ClaimReferenceDate';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

export const localFieldConfigs = [
  PolicyNoConfig,
  ProductCodeConfig,

  BenefitTypeCodeConfig,
  BenefitItemCodeConfig,

  ClaimReferenceDateConfig,
  ClaimDecisionConfig,
  RemarkConfig
];

export default {
  PolicyNo,
  ProductCode,

  BenefitTypeCode,
  BenefitItemCode,

  ClaimReferenceDate,
  ClaimDecision,
  Remark
};
