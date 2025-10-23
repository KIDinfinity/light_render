import BenefitItemCode, { localFieldConfig as BenefitItemCodeConfig } from './BenefitItemCode';
import BenefitTypeCode, { localFieldConfig as BenefitTypeCodeConfig } from './BenefitTypeCode';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';
import BenefitMultiple, { localFieldConfig as BenefitMultipleConfig } from './BenefitMultiple';

import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';

export const localFieldConfigs = [
  BenefitItemCodeConfig,
  BenefitTypeCodeConfig,
  RemarkConfig,
  PayableAmountConfig,
  PayableDaysConfig,
  BenefitMultipleConfig,
];

export default {
  BenefitItemCode,
  BenefitTypeCode,
  Remark,
  PayableAmount,
  PayableDays,
  BenefitMultiple,
};
