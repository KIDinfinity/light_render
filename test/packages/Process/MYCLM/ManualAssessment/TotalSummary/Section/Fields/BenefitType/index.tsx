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
import PolicyDuration, { localFieldConfig as PolicyDurationConfig } from './PolicyDuration';
import DeductibleAmount, { localFieldConfig as DeductibleAmountConfig } from './DeductibleAmount';
import DeductibleWaived, { localFieldConfig as DeductibleWaivedConfig } from './DeductibleWaived';
import RedFlg, { localFieldConfig as RedFlgConfig } from './RedFlg';
import BeyondNel, { localFieldConfig as BeyondNelConfig } from './BeyondNel';
import ContestableClaim, { localFieldConfig as ContestableClaimConfig } from './ContestableClaim';
import Holiday, { localFieldConfig as HolidayConfig } from './Holiday';
import DeductibleOtherInsurerDeduction, {
  localFieldConfig as DeductibleOtherInsurerDeductionConfig,
} from './DeductibleOtherInsurerDeduction';
import DenyWithRescissionCheck, {
  localFieldConfig as DenyWithRescissionCheckConfig,
} from './DenyWithRescissionCheck';
import RefundBasis, { localFieldConfig as RefundBasisConfig } from './RefundBasis';
import RegularSeqNo, { localFieldConfig as RegularSeqNoConfig } from './regularSeqNo';
import ClaimModule, { localFieldConfig as ClaimModuleConfig } from './ClaimModule';

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
  PolicyDurationConfig,
  DeductibleAmountConfig,
  DeductibleWaivedConfig,
  DeductibleOtherInsurerDeductionConfig,
  RedFlgConfig,
  BeyondNelConfig,
  ContestableClaimConfig,
  HolidayConfig,
  DenyWithRescissionCheckConfig,
  RefundBasisConfig,
  RegularSeqNoConfig,
  ClaimModuleConfig,
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
  PolicyDuration,
  DeductibleAmount,
  DeductibleWaived,
  DeductibleOtherInsurerDeduction,
  RedFlg,
  BeyondNel,
  ContestableClaim,
  Holiday,
  DenyWithRescissionCheck,
  RefundBasis,
  RegularSeqNo,
  ClaimModule,
};
