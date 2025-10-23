import AssessmentDecision, {
  localFieldConfig as AssessmentDecisionConfig,
} from './AssessmentDecision';
import AssessmentRemark, { localFieldConfig as AssessmentRemarkConfig } from './AssessmentRemark';
import RateRecord, { localFieldConfig as RateRecordConfig } from './RateRecord';
import TotalPayableAmount, {
  localFieldConfig as TotalPayableAmountConfig,
} from './TotalPayableAmount';
import SettlementDate, {
  localFieldConfig as SettlementDateConfig,
} from './SettlementDate';

export const localFieldConfigs = [
  TotalPayableAmountConfig,
  AssessmentDecisionConfig,
  AssessmentRemarkConfig,
  SettlementDateConfig,
  RateRecordConfig,
];

export default {
  TotalPayableAmount,
  AssessmentDecision,
  AssessmentRemark,
  SettlementDate,
  RateRecord,
};
