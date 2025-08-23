import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import AssessorOverrideDays, {
  localFieldConfig as AssessorOverrideDaysConfig,
} from './AssessorOverrideDays';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';

import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import AdjustOriginPayableAmount, {
  localFieldConfig as AdjustOriginPayableAmountConfig,
} from './AdjustOriginPayableAmount';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';

import HospitalizationSequentialNo, {
  localFieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';

import ChangeObjectAmount, {
  localFieldConfig as ChangeObjectAmountConfig,
} from './ChangeObjectAmount';
import AdjustOriginPayableDays, {
  localFieldConfig as AdjustOriginPayableDaysConfig,
} from './AdjustOriginPayableDays';
import ReversalFlag, { localFieldConfig as ReversalFlagConfig } from './ReversalFlag';
import ChangeHospitalizationSequentialNo, {
  localFieldConfig as ChangeHospitalizationSequentialNoConfig,
} from './ChangeHospitalizationSequentialNo';

export const localFieldConfigs = [
  BenefitTypeCodeConfig,
  AssessorOverrideAmountConfig,
  AssessorOverrideDaysConfig,
  PayableDaysConfig,
  RemarkConfig,
  AdjustOriginPayableAmountConfig,
  HospitalizationSequentialNoConfig,
  PayableAmountConfig,
  ChangeObjectAmountConfig,
  AdjustOriginPayableDaysConfig,
  ReversalFlagConfig,
  ChangeHospitalizationSequentialNoConfig,
];

export default {
  BenefitTypeCode,
  AssessorOverrideAmount,
  AssessorOverrideDays,
  PayableDays,
  Remark,
  HospitalizationSequentialNo,
  PayableAmount,
  ChangeObjectAmount,
  AdjustOriginPayableAmount,
  AdjustOriginPayableDays,
  ReversalFlag,
  ChangeHospitalizationSequentialNo,
};
