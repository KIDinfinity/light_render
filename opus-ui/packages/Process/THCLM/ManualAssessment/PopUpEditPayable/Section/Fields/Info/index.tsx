import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import BooterAmount, { localFieldConfig as BooterAmountConfig } from './BoosterAmount';
import BooterDays, { localFieldConfig as BooterDaysConfig } from './BoosterDays';
import BillAmount, { localFieldConfig as BillAmountConfig } from './BillAmount';
import CopayAmount, { localFieldConfig as CopayAmountConfig } from './CopayAmount';
import UncoverAmount, { localFieldConfig as UncoverAmountConfig } from './UncoverAmount';

export const localFieldConfigs = [
  ClaimDecisionConfig,
  BenefitTypeCodeConfig,
  PayableAmountConfig,
  PayableDaysConfig,
  BooterAmountConfig,
  BooterDaysConfig,
  BillAmountConfig,
  CopayAmountConfig,
  UncoverAmountConfig,
];

export default {
  ClaimDecision,
  BenefitTypeCode,
  PayableAmount,
  PayableDays,
  BooterAmount,
  BooterDays,
  BillAmount,
  CopayAmount,
  UncoverAmount,
};
