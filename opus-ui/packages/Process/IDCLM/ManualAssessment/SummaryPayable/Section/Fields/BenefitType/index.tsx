import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import BooterAmount, { localFieldConfig as BooterAmountConfig } from './BooterAmount';
import BooterDays, { localFieldConfig as BooterDaysConfig } from './BooterDays';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import DenyCode, { localFieldConfig as DenyCodeConfig } from './DenyCode';
import DenyReason, { localFieldConfig as DenyReasonConfig } from './DenyReason';
import ExGratiaCode, { localFieldConfig as ExGratiaCodeConfig } from './ExGratiaCode';
import ExGratiaReason, { localFieldConfig as ExGratiaReasonConfig } from './ExGratiaReason';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import BillAmount, { localFieldConfig as BillAmountConfig } from './BillAmount';
import CopayAmount, { localFieldConfig as CopayAmountConfig } from './CopayAmount';
import UncoverAmount, { localFieldConfig as UncoverAmountConfig } from './UncoverAmount';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';

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
  BillAmountConfig,
  CopayAmountConfig,
  UncoverAmountConfig,
  PolicyYearConfig,
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
  BillAmount,
  CopayAmount,
  UncoverAmount,
  PolicyYear,
};
