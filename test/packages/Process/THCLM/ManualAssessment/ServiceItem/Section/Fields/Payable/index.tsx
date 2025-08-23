import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BoosterAmount, { localFieldConfig as BoosterAmountConfig } from './BoosterAmount';
import DeductibleAmount, { localFieldConfig as DeductibleAmountConfig } from './DeductibleAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import BoosterDays, { localFieldConfig as BoosterDaysConfig } from './BoosterDays';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import BillAmount, { localFieldConfig as BillAmountConfig } from './BillAmount';
import CopayAmount, { localFieldConfig as CopayAmountConfig } from './CopayAmount';
import UncoverAmount, { localFieldConfig as UncoverAmountConfig } from './UncoverAmount';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import IncurredAge, { localFieldConfig as IncurredAgeConfig } from './IncurredAge';
import DeductibleOtherInsurerDeduction, {
  localFieldConfig as DeductibleOtherInsurerDeductionConfig,
} from './DeductibleOtherInsurerDeduction';

export const localFieldConfigs = [
  PayableAmountConfig,
  BenefitItemCodeConfig,
  BoosterAmountConfig,
  DeductibleAmountConfig,
  PayableDaysConfig,
  BoosterDaysConfig,
  RemarkConfig,
  BillAmountConfig,
  CopayAmountConfig,
  UncoverAmountConfig,
  PolicyYearConfig,
  PolicyNoConfig,
  BenefitTypeCodeConfig,
  IncurredAgeConfig,
  DeductibleOtherInsurerDeductionConfig,
];

export default {
  PayableAmount,
  BenefitItemCode,
  BoosterAmount,
  DeductibleAmount,
  PayableDays,
  BoosterDays,
  Remark,
  BillAmount,
  CopayAmount,
  UncoverAmount,
  PolicyYear,
  PolicyNo,
  BenefitTypeCode,
  IncurredAge,
  DeductibleOtherInsurerDeduction,
};
