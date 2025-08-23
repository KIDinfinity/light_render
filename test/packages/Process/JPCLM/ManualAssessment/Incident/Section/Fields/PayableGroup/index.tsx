// import KlipClaimNo, { localFieldConfig as KlipClaimNoConfig } from './KlipClaimNo';
import MainProductCode, { localFieldConfig as MainProductCodeConfig } from './MainProductCode';
import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
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
  // KlipClaimNoConfig,
  MainProductCodeConfig,
  PayableAmountConfig,
  PolicyNoConfig,
  SettlementDecisionConfig,
  DetailedAssessmentDecisionPolicyNoConfig,
  RefundAmountConfig,
  ChangeObjectAmountConfig,
];

export default {
  // KlipClaimNo,
  MainProductCode,
  PayableAmount,
  PolicyNo,
  SettlementDecision,
  DetailedAssessmentDecision,
  RefundAmount,
  ChangeObjectAmount,
};
