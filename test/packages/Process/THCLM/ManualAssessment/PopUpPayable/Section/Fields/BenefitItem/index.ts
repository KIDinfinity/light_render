import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitItemPayableAmount, {
  localFieldConfig as BenefitItemPayableAmountConfig,
} from './PayableAmount';
import BenefitItemPayableDays, {
  localFieldConfig as BenefitItemPayableDaysPayableAmountConfig,
} from './PayableDays';

import BenefitItemBoosterAmount, {
  localFieldConfig as BenefitItemBoosterAmountConfig,
} from './BoosterAmount';
import BenefitItemBoosterDays, {
  localFieldConfig as BenefitItemBoosterDaysConfig,
} from './BoosterDays';
import BillAmount, { localFieldConfig as BillAmountConfig } from './BillAmount';
import CopayAmount, { localFieldConfig as CopayAmountConfig } from './CopayAmount';
import UncoverAmount, { localFieldConfig as UncoverAmountConfig } from './UncoverAmount';

export const localFieldConfigs = [
  BenefitItemCodeConfig,
  BenefitItemPayableAmountConfig,
  BenefitItemPayableDaysPayableAmountConfig,
  BenefitItemBoosterAmountConfig,
  BenefitItemBoosterDaysConfig,
  BillAmountConfig,
  CopayAmountConfig,
  UncoverAmountConfig,
];

export default {
  BenefitItemCode,
  BenefitItemPayableAmount,
  BenefitItemPayableDays,
  BenefitItemBoosterAmount,
  BenefitItemBoosterDays,
  BillAmount,
  CopayAmount,
  UncoverAmount,
};
