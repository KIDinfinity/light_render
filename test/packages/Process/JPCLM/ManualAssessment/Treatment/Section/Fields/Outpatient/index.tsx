import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import AssessorOverrideDays, {
  localFieldConfig as AssessorOverrideDaysConfig,
} from './AssessorOverrideDays';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import SystemPayableDays, {
  localFieldConfig as SystemPayableDaysConfig,
} from './SystemPayableDays';
import OutpatientDate, { localFieldConfig as OutpatientDateConfig } from './OutpatientDate';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import SystemCalculationAmount, {
  localFieldConfig as SystemCalculationAmountConfig,
} from './SystemCalculationAmount';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';

import HospitalizationSequentialNo, {
  localFieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';
import DiagnosisCode, { localFieldConfig as DiagnosisCodeConfig } from './DiagnosisCode';

export const localFieldConfigs = [
  AssessorOverrideAmountConfig,
  AssessorOverrideDaysConfig,
  PayableDaysConfig,
  OutpatientDateConfig,
  RemarkConfig,
  SystemCalculationAmountConfig,
  HospitalizationSequentialNoConfig,
  PayableAmountConfig,
  SystemPayableDaysConfig,
  DiagnosisCodeConfig,
];

export default {
  AssessorOverrideAmount,
  AssessorOverrideDays,
  PayableDays,
  OutpatientDate,
  Remark,
  SystemCalculationAmount,
  HospitalizationSequentialNo,
  PayableAmount,
  SystemPayableDays,
  DiagnosisCode,
};
