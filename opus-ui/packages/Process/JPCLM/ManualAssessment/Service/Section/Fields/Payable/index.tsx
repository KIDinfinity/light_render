import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import DeductibleAmount, { localFieldConfig as DeductibleAmountConfig } from './DeductibleAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import SystemCalculationAmount, {
  localFieldConfig as SystemCalculationAmountConfig,
} from './SystemCalculationAmount';

export const localFieldConfigs = [
  AssessorOverrideAmountConfig,
  BenefitItemCodeConfig,
  BenefitTypeCodeConfig,
  DeductibleAmountConfig,
  PayableDaysConfig,
  PolicyNoConfig,
  ProductCodeConfig,
  RemarkConfig,
  SystemCalculationAmountConfig,
];

export default {
  AssessorOverrideAmount,
  BenefitItemCode,
  BenefitTypeCode,
  DeductibleAmount,
  PayableDays,
  PolicyNo,
  ProductCode,
  Remark,
  SystemCalculationAmount,
};
