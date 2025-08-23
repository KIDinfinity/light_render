import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import AssessorOverrideDays, {
  localFieldConfig as AssessorOverrideDaysConfig,
} from './AssessorOverrideDays';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';

import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import SystemCalculationAmount, {
  localFieldConfig as SystemCalculationAmountConfig,
} from './SystemCalculationAmount';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';

import HospitalizationSequentialNo, {
  localFieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';

import ChangeObjectAmount, {
  localFieldConfig as ChangeObjectAmountConfig,
} from './ChangeObjectAmount';
import SystemCalculationDays, {
  localFieldConfig as SystemCalculationDaysConfig,
} from './SystemCalculationDays';
import ReversalFlag, { localFieldConfig as ReversalFlagConfig } from './ReversalFlag';
import DiagnosisCode, { localFieldConfig as DiagnosisCodeConfig } from './DiagnosisCode';

export const localFieldConfigs = [
  AssessorOverrideAmountConfig,
  AssessorOverrideDaysConfig,
  PayableDaysConfig,
  RemarkConfig,
  SystemCalculationAmountConfig,
  HospitalizationSequentialNoConfig,
  PayableAmountConfig,
  ChangeObjectAmountConfig,
  SystemCalculationDaysConfig,
  ReversalFlagConfig,
  DiagnosisCodeConfig,
];

export default {
  AssessorOverrideAmount,
  AssessorOverrideDays,
  PayableDays,
  Remark,
  HospitalizationSequentialNo,
  PayableAmount,
  ChangeObjectAmount,
  SystemCalculationAmount,
  SystemCalculationDays,
  ReversalFlag,
  DiagnosisCode,
};
