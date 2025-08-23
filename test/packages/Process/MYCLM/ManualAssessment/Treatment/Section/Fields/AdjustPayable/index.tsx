import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

export const localFieldConfigs = [
  PayableAmountConfig,
  PayableDaysConfig,
  RemarkConfig,
];

export default {
  PayableAmount,
  PayableDays,
  Remark,
};
