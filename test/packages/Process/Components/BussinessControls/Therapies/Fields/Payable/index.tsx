import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import DeductibleAmount, { localFieldConfig as DeductibleAmountConfig } from './DeductibleAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';

import ExchangeRateInvoicePolicy, {
  localFieldConfig as ExchangeRateInvoicePolicyConfig,
} from './ExchangeRateInvoicePolicy';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

export const localFieldConfigs = [
  PayableAmountConfig,
  BenefitItemCodeConfig,
  DeductibleAmountConfig,
  PayableDaysConfig,
  ExchangeRateInvoicePolicyConfig,
  RemarkConfig,
];

export default {
  PayableAmount,
  BenefitItemCode,
  DeductibleAmount,
  PayableDays,
  ExchangeRateInvoicePolicy,
  Remark,
};
