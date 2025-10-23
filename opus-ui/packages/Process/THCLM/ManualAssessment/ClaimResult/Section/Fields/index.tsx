import AssessmentDecision, {
  localFieldConfig as AssessmentDecisionConfig,
} from './AssessmentDecision';
import AssessmentRemark, { localFieldConfig as AssessmentRemarkConfig } from './AssessmentRemark';
import RateRecord, { localFieldConfig as RateRecordConfig } from './RateRecord';
import TotalPayableAmount, {
  localFieldConfig as TotalPayableAmountConfig,
} from './TotalPayableAmount';
import UncoverAmount, { localFieldConfig as UncoverAmountConfig } from './UncoverAmount';

export const localFieldConfigs = [
  TotalPayableAmountConfig,
  RateRecordConfig,
  AssessmentDecisionConfig,
  AssessmentRemarkConfig,
  UncoverAmountConfig,
];

export default {
  TotalPayableAmount,
  RateRecord,
  AssessmentDecision,
  AssessmentRemark,
  UncoverAmount,
};
