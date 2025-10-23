import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import AssessorOverrideDays, {
  localFieldConfig as AssessorOverrideDaysConfig,
} from './AssessorOverrideDays';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import HospitalizationFlg, {
  localFieldConfig as HospitalizationFlgConfig,
} from './HospitalizationFlg';
import HospitalizationSequentialNo, {
  localFieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';

import SystemCalculationAmount, {
  localFieldConfig as SystemCalculationAmountConfig,
} from './SystemCalculationAmount';
import SystemCalculationDays, {
  localFieldConfig as SystemCalculationDaysConfig,
} from './SystemCalculationDays';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';

import DiagnosisCode, { localFieldConfig as DiagnosisCodeConfig } from './DiagnosisCode';
import ChangeObjectAmount, {
  localFieldConfig as ChangeObjectAmountConfig,
} from './ChangeObjectAmount';
import ReversalFlag, { localFieldConfig as ReversalFlagConfig } from './ReversalFlag';

export const localFieldConfigs = [
  AssessorOverrideAmountConfig,
  AssessorOverrideDaysConfig,
  PayableAmountConfig,
  PayableDaysConfig,
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
  SystemCalculationAmountConfig,
  SystemCalculationDaysConfig,
  ChangeObjectAmountConfig,
  ReversalFlagConfig,
];

export default {
  AssessorOverrideAmount,
  AssessorOverrideDays,
  BenefitItemCode,
  BenefitTypeCode,
  PolicyNo,
  ProductCode,
  Remark,
  PolicyYear,
  HospitalizationFlg,
  HospitalizationSequentialNo,
  DiagnosisCode,
  PayableAmount,
  PayableDays,
  SystemCalculationAmount,
  SystemCalculationDays,
  ChangeObjectAmount,
  ReversalFlag,
};
