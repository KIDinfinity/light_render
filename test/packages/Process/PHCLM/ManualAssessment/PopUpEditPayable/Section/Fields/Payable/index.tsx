import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BooterAmount, { localFieldConfig as BooterAmountConfig } from './BoosterAmount';
import BooterDays, { localFieldConfig as BooterDaysConfig } from './BoosterDays';
import DeductibleWaived, { localFieldConfig as DeductibleWaivedConfig } from './DeductibleWaived';
import DeductibleOtherInsurerDeduction, {
  localFieldConfig as DeductibleOtherInsurerDeductionConfig,
} from './DeductibleOtherInsurerDeduction';
import DeductibleAmount, { localFieldConfig as DeductibleAmountConfig } from './DeductibleAmount';

export const localFieldConfigs = [
  PayableAmountConfig,
  PayableDaysConfig,
  BenefitItemCodeConfig,
  BooterAmountConfig,
  BooterDaysConfig,
  DeductibleWaivedConfig,
  DeductibleOtherInsurerDeductionConfig,
  DeductibleAmountConfig,
];

export default {
  PayableAmount,
  PayableDays,
  BenefitItemCode,
  BooterAmount,
  BooterDays,
  DeductibleWaived,
  DeductibleOtherInsurerDeduction,
  DeductibleAmount,
};
