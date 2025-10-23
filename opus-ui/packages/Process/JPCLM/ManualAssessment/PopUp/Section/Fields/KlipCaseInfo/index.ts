import KlipClaimNo, { localFieldConfig as KlipClaimNoConfig } from './KlipClaimNo';
import PolicyId, { localFieldConfig as PolicyIdConfig } from './PolicyId';
import ClaimDecision, { localFieldConfig as ClaimDecisionConfigs } from './ClaimDecision';
import TransactionNo, { localFieldConfig as ForcedPaymentFlgConfigs } from './TransactionNo';
import ForcedPaymentFlg, { localFieldConfig as TransactionNoConfigs } from './ForcedPaymentFlg';
import PolicyPayoutAmount, {
  localFieldConfig as PolicyPayoutAmountFieldConfigs,
} from './PolicyPayoutAmount';

export const localFieldConfigs = [
  ForcedPaymentFlgConfigs,
  KlipClaimNoConfig,
  PolicyIdConfig,
  TransactionNoConfigs,
  PolicyPayoutAmountFieldConfigs,
  ClaimDecisionConfigs,
];

export default {
  ForcedPaymentFlg,
  KlipClaimNo,
  PolicyId,
  TransactionNo,
  PolicyPayoutAmount,
  ClaimDecision,
};
