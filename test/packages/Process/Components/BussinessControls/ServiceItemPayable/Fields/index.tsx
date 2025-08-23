import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BoosterAmount, { localFieldConfig as BoosterAmountConfig } from './BoosterAmount';
import DeductibleAmount, { localFieldConfig as DeductibleAmountConfig } from './DeductibleAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import BoosterDays, { localFieldConfig as BoosterDaysConfig } from './BoosterDays';
import ExchangeRateInvoicePolicy, {
  localFieldConfig as ExchangeRateInvoicePolicyConfig,
} from './ExchangeRateInvoicePolicy';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import PayableDaysBooster, {
  localFieldConfig as PayableDaysBoosterConfig,
} from './PayableDaysBooster';
import PayableAmountBooster, {
  localFieldConfig as PayableAmountBoosterConfig,
} from './PayableAmountBooster';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import DeductibleWaived, { localFieldConfig as DeductibleWaivedConfig } from './DeductibleWaived';
import DeductibleOtherInsurerDeduction, {
  localFieldConfig as DeductibleOtherInsurerDeductionConfig,
} from './DeductibleOtherInsurerDeduction';
import BillAmount, { localFieldConfig as BillAmountConfigConfig } from './BillAmount';
import CopayAmount, { localFieldConfig as CopayAmountConfig } from './CopayAmount';
import UncoverAmount, { localFieldConfig as UncoverAmountConfig } from './UncoverAmount';
import IncurredAge, { localFieldConfig as IncurredAgeConfig } from './IncurredAge';

export const localFieldConfigs = [
  PayableAmountConfig,
  BenefitItemCodeConfig,
  BoosterAmountConfig,
  DeductibleAmountConfig,
  PayableDaysConfig,
  BoosterDaysConfig,
  ExchangeRateInvoicePolicyConfig,
  RemarkConfig,
  PayableDaysBoosterConfig,
  PayableAmountBoosterConfig,
  PolicyYearConfig,
  PolicyNoConfig,
  BenefitTypeCodeConfig,
  DeductibleWaivedConfig,
  DeductibleOtherInsurerDeductionConfig,
  BillAmountConfigConfig,
  CopayAmountConfig,
  UncoverAmountConfig,
  IncurredAgeConfig,
];

export default {
  PayableAmount,
  BenefitItemCode,
  BoosterAmount,
  DeductibleAmount,
  PayableDays,
  BoosterDays,
  ExchangeRateInvoicePolicy,
  Remark,
  PayableDaysBooster,
  PayableAmountBooster,
  PolicyYear,
  PolicyNo,
  BenefitTypeCode,
  DeductibleWaived,
  DeductibleOtherInsurerDeduction,
  BillAmount,
  CopayAmount,
  UncoverAmount,
  IncurredAge,
};
