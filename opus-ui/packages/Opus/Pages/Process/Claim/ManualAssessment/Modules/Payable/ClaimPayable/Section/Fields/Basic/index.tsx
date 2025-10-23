import MainProductCode, { localFieldConfig as MainProductCodeConfig } from './MainProductCode';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import SettlementDecision, {
  localFieldConfig as SettlementDecisionConfig,
} from './SettlementDecision';
import DetailedAssessmentDecision, {
  localFieldConfig as DetailedAssessmentDecisionPolicyNoConfig,
} from './DetailedAssessmentDecision';
import RefundAmount, { localFieldConfig as RefundAmountConfig } from './RefundAmount';
import ChangeObjectAmount, {
  localFieldConfig as ChangeObjectAmountConfig,
} from './ChangeObjectAmount';

export const localFieldConfigs = [
  MainProductCodeConfig,
  PayableAmountConfig,
  SettlementDecisionConfig,
  DetailedAssessmentDecisionPolicyNoConfig,
  RefundAmountConfig,
  ChangeObjectAmountConfig,
];

export default {
  MainProductCode,
  PayableAmount,
  SettlementDecision,
  DetailedAssessmentDecision,
  RefundAmount,
  ChangeObjectAmount,
};
