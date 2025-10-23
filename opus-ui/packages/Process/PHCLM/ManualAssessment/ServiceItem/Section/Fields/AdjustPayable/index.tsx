import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

export const localFieldConfigs = [
  PayableAmountConfig,
  RemarkConfig
];

export default {
  PayableAmount,
  Remark,
};
