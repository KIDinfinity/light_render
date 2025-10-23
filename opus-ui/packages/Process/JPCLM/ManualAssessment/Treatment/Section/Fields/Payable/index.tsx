import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import AssessorOverrideDays, {
  localFieldConfig as AssessorOverrideDaysConfig,
} from './AssessorOverrideDays';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import SystemCalculationAmount, {
  localFieldConfig as SystemCalculationAmountConfig,
} from './SystemCalculationAmount';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import HospitalizationFlg, {
  localFieldConfig as HospitalizationFlgConfig,
} from './HospitalizationFlg';
import HospitalizationSequentialNo, {
  localFieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';

import DiagnosisCode, { localFieldConfig as DiagnosisCodeConfig } from './DiagnosisCode';

export const localFieldConfigs = [
  AssessorOverrideAmountConfig,
  AssessorOverrideDaysConfig,
  BenefitItemCodeConfig,
  BenefitTypeCodeConfig,
  PayableDaysConfig,
  PolicyNoConfig,
  ProductCodeConfig,
  RemarkConfig,
  SystemCalculationAmountConfig,
  PolicyYearConfig,
  HospitalizationFlgConfig,
  HospitalizationSequentialNoConfig,
  DiagnosisCodeConfig,
];

export default {
  AssessorOverrideAmount,
  AssessorOverrideDays,
  BenefitItemCode,
  BenefitTypeCode,
  PayableDays,
  PolicyNo,
  ProductCode,
  Remark,
  SystemCalculationAmount,
  PolicyYear,
  HospitalizationFlg,
  HospitalizationSequentialNo,
  DiagnosisCode,
};
