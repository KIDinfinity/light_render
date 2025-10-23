import AssessmentDecision, {
  localFieldConfig as AssessmentDecisionConfig,
} from './AssessmentDecision';
import PayoutAmount, { localFieldConfig as PayoutAmountConfig } from './PayoutAmount';
import ClaimPayableAmount, {
  localFieldConfig as ClaimPayableAmountConfig,
} from './ClaimPayableAmount';

export const localFieldConfigs = [
  ClaimPayableAmountConfig,
  PayoutAmountConfig,
  AssessmentDecisionConfig,
];

export default {
  ClaimPayableAmount,
  PayoutAmount,
  AssessmentDecision,
};
