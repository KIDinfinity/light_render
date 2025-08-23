import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import DenyCode, { localFieldConfig as DenyCodeConfig } from './DenyCode';
import DenyReason, { localFieldConfig as DenyReasonConfig } from './DenyReason';
import ExGratiaCode, { localFieldConfig as ExGratiaCodeConfig } from './ExGratiaCode';
import ExGratiaReason, { localFieldConfig as ExGratiaReasonConfig } from './ExGratiaReason';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import SystemCalculationAmount, {
  localFieldConfig as SystemCalculationAmountConfig,
} from './SystemCalculationAmount';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';


export const localFieldConfigs = [
  AssessorOverrideAmountConfig,
  BenefitTypeCodeConfig,
  ClaimDecisionConfig,
  DenyCodeConfig,
  DenyReasonConfig,
  ExGratiaCodeConfig,
  ExGratiaReasonConfig,
  PolicyNoConfig,
  ProductCodeConfig,
  RemarkConfig,
  SystemCalculationAmountConfig,
  PolicyYearConfig,
];

export default {
  AssessorOverrideAmount,
  BenefitTypeCode,
  ClaimDecision,
  DenyCode,
  DenyReason,
  ExGratiaCode,
  ExGratiaReason,
  PolicyNo,
  ProductCode,
  Remark,
  SystemCalculationAmount,
  PolicyYear,
};
