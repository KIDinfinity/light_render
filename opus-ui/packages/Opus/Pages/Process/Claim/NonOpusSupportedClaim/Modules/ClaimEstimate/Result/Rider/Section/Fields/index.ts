import AssessmentRemark, { localFieldConfig as AssessmentRemarkConfig } from './AssessmentRemark';
import CoverageEffectiveDate, {
  localFieldConfig as CoverageEffectiveDateConfig,
} from './CoverageEffectiveDate';
import No, { localFieldConfig as NoConfig } from './No';
import ProcedureCode, { localFieldConfig as ProcedureCodeConfig } from './ProcedureCode';
import SumAssured, { localFieldConfig as SumAssuredConfig } from './SumAssured';
import ProposedClaimDecision, {
  localFieldConfig as ProposedClaimDecisionConfig,
} from './ProposedClaimDecision';
import CoverageStatus, { localFieldConfig as CoverageStatusConfig } from './CoverageStatus';
import PremiumPaymentStatus, {
  localFieldConfig as PremiumPaymentStatusConfig,
} from './PremiumPaymentStatus';
import ClaimReviewPoints, {
  localFieldConfig as ClaimReviewPointsConfig,
} from './ClaimReviewPoints';
import HospitalBenefit, { localFieldConfig as HospitalBenefitConfig } from './HospitalBenefit';
import SurgeryBenefit, { localFieldConfig as SurgeryBenefitConfig } from './SurgeryBenefit';

export const localFieldConfigs = [
  AssessmentRemarkConfig,
  CoverageEffectiveDateConfig,
  NoConfig,
  ProcedureCodeConfig,
  SumAssuredConfig,
  ProposedClaimDecisionConfig,
  CoverageStatusConfig,
  PremiumPaymentStatusConfig,
  ClaimReviewPointsConfig,
  HospitalBenefitConfig,
  SurgeryBenefitConfig,
];

export default {
  AssessmentRemark,
  CoverageEffectiveDate,
  No,
  ProcedureCode,
  SumAssured,
  ProposedClaimDecision,
  CoverageStatus,
  PremiumPaymentStatus,
  ClaimReviewPoints,
  HospitalBenefit,
  SurgeryBenefit,
};
