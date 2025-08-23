import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import BooterAmount, { localFieldConfig as BooterAmountConfig } from './BoosterAmount';
import BooterDays, { localFieldConfig as BooterDaysConfig } from './BoosterDays';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import DenyCode, { localFieldConfig as DenyCodeConfig } from './DenyCode';
import DenyReason, { localFieldConfig as DenyReasonConfig } from './DenyReason';
import ExGratiaCode, { localFieldConfig as ExGratiaCodeConfig } from './ExGratiaCode';
import ExGratiaReason, { localFieldConfig as ExGratiaReasonConfig } from './ExGratiaReason';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import DeductibleAmount, { localFieldConfig as DeductibleAmountConfig } from './DeductibleAmount';
import DeductibleWaived, { localFieldConfig as DeductibleWaivedConfig } from './DeductibleWaived';
import DeductibleOtherInsurerDeduction, {
  localFieldConfig as DeductibleOtherInsurerDeductionConfig,
} from './DeductibleOtherInsurerDeduction';

export const localFieldConfigs = [
  ClaimDecisionConfig,
  BenefitTypeCodeConfig,
  PayableAmountConfig,
  PayableDaysConfig,
  BooterAmountConfig,
  BooterDaysConfig,
  RemarkConfig,
  DenyCodeConfig,
  DenyReasonConfig,
  ExGratiaCodeConfig,
  ExGratiaReasonConfig,
  ProductCodeConfig,
  PolicyYearConfig,
  DeductibleAmountConfig,
  DeductibleWaivedConfig,
  DeductibleOtherInsurerDeductionConfig,
];

export default {
  ClaimDecision,
  BenefitTypeCode,
  PayableAmount,
  PayableDays,
  BooterAmount,
  BooterDays,
  Remark,
  DenyCode,
  DenyReason,
  ExGratiaCode,
  ExGratiaReason,
  ProductCode,
  PolicyYear,
  DeductibleAmount,
  DeductibleWaived,
  DeductibleOtherInsurerDeduction,
};
