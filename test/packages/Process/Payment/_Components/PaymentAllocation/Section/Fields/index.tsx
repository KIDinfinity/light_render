import PayeeName, { localFieldConfig as PayeeNameConfig } from './PayeeName';
import PayeeType, { localFieldConfig as PayeeTypeConfig } from './PayeeType';
import PayoutAmount, { localFieldConfig as PayoutAmountConfig } from './PayoutAmount';
import SharedPercentage, { localFieldConfig as SharedPercentageConfig } from './SharedPercentage';
import AdvancedPayoutAmount, {
  localFieldConfig as AdvancedPayoutAmountConfig,
} from './AdvancedPayoutAmount';
import OutstandingPayoutAmount, {
  localFieldConfig as OutstandingPayoutAmountConfig,
} from './OutstandingPayoutAmount';
import AdvancePayoutDate, {
  localFieldConfig as AdvancePayoutDateConfig,
} from './AdvancePayoutDate';

export const localFieldConfigs = [
  PayeeNameConfig,
  PayeeTypeConfig,
  PayoutAmountConfig,
  SharedPercentageConfig,
  AdvancedPayoutAmountConfig,
  OutstandingPayoutAmountConfig,
  AdvancePayoutDateConfig,
];

export default {
  PayeeName,
  PayeeType,
  PayoutAmount,
  SharedPercentage,
  AdvancedPayoutAmount,
  OutstandingPayoutAmount,
  AdvancePayoutDate,
};
