import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';

export const localFieldConfigs = [
  PayableAmountConfig,
  BenefitItemCodeConfig,
  RemarkConfig,
  BenefitTypeCodeConfig,
  PolicyNoConfig,
  PolicyYearConfig,
  PayableDaysConfig,
];

export default {
  PayableAmount,
  BenefitItemCode,
  Remark,
  BenefitTypeCode,
  PolicyNo,
  PolicyYear,
  PayableDays,
};
