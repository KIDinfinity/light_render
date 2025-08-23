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

export const localFieldConfigs = [
  BenefitItemCodeConfig,
  BenefitItemPayableAmountConfig,
  BenefitItemPayableDaysPayableAmountConfig,
  BenefitItemBoosterAmountConfig,
  BenefitItemBoosterDaysConfig,
];

export default {
  BenefitItemCode,
  BenefitItemPayableAmount,
  BenefitItemPayableDays,
  BenefitItemBoosterAmount,
  BenefitItemBoosterDays,
};
