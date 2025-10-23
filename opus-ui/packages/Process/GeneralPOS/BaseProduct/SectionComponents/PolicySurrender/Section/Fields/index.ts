import AddrContactChangeInd, {
  localFieldConfig as AddrContactChangeIndConfig,
} from './AddrContactChangeInd';
import CashDeposit, { localFieldConfig as CashDepositConfig } from './CashDeposit';
import CashValueBase, { localFieldConfig as CashValueBaseConfig } from './CashValueBase';
import CashValueRider, { localFieldConfig as CashValueRiderConfig } from './CashValueRider';
import CVDate, { localFieldConfig as CVDateConfig } from './CVDate';
import DueDateForRetention, {
  localFieldConfig as DueDateForRetentionConfig,
} from './DueDateForRetention';
import OtherReason, { localFieldConfig as OtherReasonConfig } from './OtherReason';
import PolicyLoan, { localFieldConfig as PolicyLoanConfig } from './PolicyLoan';
import ProRateRider, { localFieldConfig as ProRateRiderConfig } from './ProRateRider';
import SurrenderReasonCode, {
  localFieldConfig as SurrenderReasonCodeConfig,
} from './SurrenderReasonCode';
import SuspBalanceIndOrAmt, {
  localFieldConfig as SuspBalanceIndOrAmtConfig,
} from './SuspBalanceIndOrAmt';
import TotalSurrenderAmount, {
  localFieldConfig as TotalSurrenderAmountConfig,
} from './TotalSurrenderAmount';

export const localFieldConfigs = [
  AddrContactChangeIndConfig,
  CashDepositConfig,
  CashValueBaseConfig,
  CashValueRiderConfig,
  CVDateConfig,
  PolicyLoanConfig,
  ProRateRiderConfig,
  SuspBalanceIndOrAmtConfig,
  TotalSurrenderAmountConfig,
  SurrenderReasonCodeConfig,
  DueDateForRetentionConfig,
  OtherReasonConfig,
];

export default {
  AddrContactChangeInd,
  CashDeposit,
  CashValueBase,
  CashValueRider,
  CVDate,
  PolicyLoan,
  ProRateRider,
  SuspBalanceIndOrAmt,
  TotalSurrenderAmount,
  SurrenderReasonCode,
  DueDateForRetention,
  OtherReason,
};
