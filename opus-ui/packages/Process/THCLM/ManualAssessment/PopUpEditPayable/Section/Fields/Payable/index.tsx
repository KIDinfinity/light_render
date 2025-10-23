import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BooterAmount, { localFieldConfig as BooterAmountConfig } from './BoosterAmount';
import BooterDays, { localFieldConfig as BooterDaysConfig } from './BoosterDays';
import BillAmount, { localFieldConfig as BillAmountConfig } from './BillAmount';
import CopayAmount, { localFieldConfig as CopayAmountConfig } from './CopayAmount';
import UncoverAmount, { localFieldConfig as UncoverAmountConfig } from './UncoverAmount';
import DeductibleAmount, { localFieldConfig as DeductibleAmountConfig } from './DeductibleAmount';
import DeductibleOtherInsurerDeduction, {
  localFieldConfig as DeductibleOtherInsurerDeductionConfig,
} from './DeductibleOtherInsurerDeduction';

export const localFieldConfigs = [
  PayableAmountConfig,
  PayableDaysConfig,
  BenefitItemCodeConfig,
  BooterAmountConfig,
  BooterDaysConfig,
  BooterDaysConfig,
  BillAmountConfig,
  CopayAmountConfig,
  UncoverAmountConfig,
  DeductibleAmountConfig,
  DeductibleOtherInsurerDeductionConfig,
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
  DeductibleAmount,
  DeductibleOtherInsurerDeduction,
};
