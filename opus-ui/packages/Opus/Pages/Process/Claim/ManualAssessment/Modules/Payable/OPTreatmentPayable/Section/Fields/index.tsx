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
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';

import HospitalizationSequentialNo, {
  localFieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';
import HospitalizationFlg, {
  localFieldConfig as HospitalizationFlgConfig,
} from './HospitalizationFlg';
import ReimbursementMultiple, {
  localFieldConfig as ReimbursementMultipleConfig,
} from './ReimbursementMultiple';

import DiagnosisCode, { localFieldConfig as DiagnosisCodeConfig } from './DiagnosisCode';
import ReversalFlag, { localFieldConfig as ReversalFlagConfig } from './ReversalFlag';

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
  BenefitItemCodeConfig,
  BenefitTypeCodeConfig,
  HospitalizationFlgConfig,
  ReimbursementMultipleConfig,
  ReversalFlagConfig,
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
  BenefitItemCode,
  BenefitTypeCode,
  HospitalizationFlg,
  ReimbursementMultiple,
  ReversalFlag,
};
