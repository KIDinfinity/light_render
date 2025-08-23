import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BooterAmount, { localFieldConfig as BooterAmountConfig } from './BoosterAmount';
import BooterDays, { localFieldConfig as BooterDaysConfig } from './BoosterDays';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

export const localFieldConfigs = [
  PayableAmountConfig,
  PayableDaysConfig,
  BenefitItemCodeConfig,
  BooterAmountConfig,
  BooterDaysConfig,
  RemarkConfig,
];

export default {
  PayableAmount,
  PayableDays,
  BenefitItemCode,
  BooterAmount,
  BooterDays,
  Remark,
};
