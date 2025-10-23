import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';

export const localFieldConfigs = [
  PayableAmountConfig,
  BenefitItemCodeConfig,
  PayableDaysConfig,
  RemarkConfig,
  PolicyYearConfig,
  PolicyNoConfig,
  BenefitTypeCodeConfig,
];

export default {
  PayableAmount,
  BenefitItemCode,
  PayableDays,
  Remark,
  PolicyYear,
  PolicyNo,
  BenefitTypeCode,
};
