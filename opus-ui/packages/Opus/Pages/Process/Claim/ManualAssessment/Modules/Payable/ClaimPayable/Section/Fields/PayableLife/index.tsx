import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import ClaimReferenceDate, {
  localFieldConfig as ClaimReferenceDateConfig,
} from './ClaimReferenceDate';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import ReimbursementMultiple, {
  localFieldConfig as ReimbursementMultipleConfig,
} from './ReimbursementMultiple';
import CalculationAmount, {
  localFieldConfig as CalculationAmountConfig,
} from './CalculationAmount';
import Reasondate, { localFieldConfig as ReasondateConfig } from './Reasondate';
import AnnuityInstallmentTimes, {
  localFieldConfig as AnnuityInstallmentTimesConfig,
} from './AnnuityInstallmentTimes';
import AnnuityPayToTimes, {
  localFieldConfig as AnnuityPayToTimesConfig,
} from './AnnuityPayToTimes';
import AnnuityRemainingTimes, {
  localFieldConfig as AnnuityRemainingTimesConfig,
} from './AnnuityRemainingTimes';

export const localFieldConfigs = [
  PolicyNoConfig,
  ProductCodeConfig,

  BenefitTypeCodeConfig,
  BenefitItemCodeConfig,

  ClaimReferenceDateConfig,
  ClaimDecisionConfig,
  RemarkConfig,

  PayableAmountConfig,
  ReimbursementMultipleConfig,
  CalculationAmountConfig,
  ReasondateConfig,
  AnnuityInstallmentTimesConfig,
  AnnuityPayToTimesConfig,
  AnnuityRemainingTimesConfig,
];

export default {
  PolicyNo,
  ProductCode,

  BenefitTypeCode,
  BenefitItemCode,

  ClaimReferenceDate,
  ClaimDecision,
  Remark,

  PayableAmount,
  ReimbursementMultiple,
  CalculationAmount,
  Reasondate,
  AnnuityInstallmentTimes,
  AnnuityPayToTimes,
  AnnuityRemainingTimes,
};
