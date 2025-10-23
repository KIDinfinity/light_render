import ClaimDecision, { localFieldConfig as ClaimDecisionConfig } from './ClaimDecision';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

export const localFieldConfigs = [
  ClaimDecisionConfig,
  PayableAmountConfig,
  PayableDaysConfig,
  RemarkConfig,
];

export default {
  ClaimDecision,
  PayableAmount,
  PayableDays,
  Remark,
};
