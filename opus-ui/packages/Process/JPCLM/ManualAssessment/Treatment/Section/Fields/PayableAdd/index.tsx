import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
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
  PolicyNoConfig,
  ProductCodeConfig,
  RemarkConfig,
  SystemCalculationAmountConfig,
  PolicyYearConfig,
];

export default {
  AssessorOverrideAmount,
  BenefitTypeCode,
  PolicyNo,
  ProductCode,
  Remark,
  SystemCalculationAmount,
  PolicyYear,
};
