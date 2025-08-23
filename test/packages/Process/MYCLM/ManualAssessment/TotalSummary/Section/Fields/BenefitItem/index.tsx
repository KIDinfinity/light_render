import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BooterAmount, { localFieldConfig as BooterAmountConfig } from './BoosterAmount';
import BooterDays, { localFieldConfig as BooterDaysConfig } from './BoosterDays';
import BillAmount, { localFieldConfig as BillAmountConfig } from './BillAmount';
import CopayAmount, { localFieldConfig as CopayAmountConfig } from './CopayAmount';
import UncoverAmount, { localFieldConfig as UncoverAmountConfig } from './UncoverAmount';

export const localFieldConfigs = [
  PayableAmountConfig,
  PayableDaysConfig,
  BenefitItemCodeConfig,
  BooterAmountConfig,
  BooterDaysConfig,
  BillAmountConfig,
  CopayAmountConfig,
  UncoverAmountConfig,
];

export default {
  PayableAmount,
  PayableDays,
  BenefitItemCode,
  BooterAmount,
  BooterDays,
  BillAmount,
  CopayAmount,
  UncoverAmount,
};
