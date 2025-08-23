import AssessmentDecision, {
  localFieldConfig as AssessmentDecisionConfig,
} from './AssessmentDecision';
import TotalPayableAmount, {
  localFieldConfig as TotalPayableAmountConfig,
} from './TotalPayableAmount';

export const localFieldConfigs = [
  TotalPayableAmountConfig,
  AssessmentDecisionConfig,
];

export default {
  TotalPayableAmount,
  AssessmentDecision,
};
