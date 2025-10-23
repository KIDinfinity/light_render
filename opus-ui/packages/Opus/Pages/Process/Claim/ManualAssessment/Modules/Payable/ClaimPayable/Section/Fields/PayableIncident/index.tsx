import AssessorOverrideAmount, {
  localFieldConfig as AssessorOverrideAmountConfig,
} from './AssessorOverrideAmount';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import SystemCalculationAmount, {
  localFieldConfig as SystemCalculationAmountConfig,
} from './SystemCalculationAmount';
import Reasondate, { localFieldConfig as ReasondateConfig } from './Reasondate';
import CalculationAmount, {
  localFieldConfig as CalculationAmountConfig,
} from './CalculationAmount';
import ReimbursementMultiple, {
  localFieldConfig as ReimbursementMultipleConfig,
} from './ReimbursementMultiple';
import AssessorOverrideMultiple, {
  localFieldConfig as AssessorOverrideMultipleConfig,
} from './AssessorOverrideMultiple';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import AnnuityPayToTimes, {
  localFieldConfig as AnnuityPayToTimesConfig,
} from './AnnuityPayToTimes';
import AnnuityInstallmentTimes, {
  localFieldConfig as AnnuityInstallmentTimesConfig,
} from './AnnuityInstallmentTimes';
import AnnuityRemainingTimes, {
  localFieldConfig as AnnuityRemainingTimesConfig,
} from './AnnuityRemainingTimes';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';

import DeductedAmount, { localFieldConfig as DeductedAmountConfig } from './DeductedAmount';
import OffsetNonInvasiveCancerDiagnosisDate, {
  localFieldConfig as OffsetNonInvasiveCancerDiagnosisDateConfig,
} from './OffsetNonInvasiveCancerDiagnosisDate';
import OffsetNonInvasiveCancerFlag, {
  localFieldConfig as OffsetNonInvasiveCancerFlagConfig,
} from './OffsetNonInvasiveCancerFlag';

export const localFieldConfigs = [
  AssessorOverrideAmountConfig,
  BenefitTypeCodeConfig,
  ClaimDecisionConfig,
  ProductCodeConfig,
  RemarkConfig,
  SystemCalculationAmountConfig,
  ReasondateConfig,
  CalculationAmountConfig,
  ReimbursementMultipleConfig,
  AssessorOverrideMultipleConfig,
  BenefitItemCodeConfig,
  AnnuityPayToTimesConfig,
  AnnuityInstallmentTimesConfig,
  AnnuityRemainingTimesConfig,
  PayableAmountConfig,
  DeductedAmountConfig,
  OffsetNonInvasiveCancerDiagnosisDateConfig,
  OffsetNonInvasiveCancerFlagConfig,
];

export default {
  AssessorOverrideAmount,
  BenefitTypeCode,
  ClaimDecision,
  ProductCode,
  Remark,
  SystemCalculationAmount,
  Reasondate,
  CalculationAmount,
  ReimbursementMultiple,
  AssessorOverrideMultiple,
  BenefitItemCode,
  AnnuityPayToTimes,
  AnnuityInstallmentTimes,
  AnnuityRemainingTimes,
  PayableAmount,
  DeductedAmount,
  OffsetNonInvasiveCancerDiagnosisDate,
  OffsetNonInvasiveCancerFlag,
};
