import PayeeName, { localFieldConfig as PayeeNameConfig } from './PayeeName';
import PayeeType, { localFieldConfig as PayeeTypeConfig } from './PayeeType';
import PayoutAmount, { localFieldConfig as PayoutAmountConfig } from './PayoutAmount';
import SharedPercentage, { localFieldConfig as SharedPercentageConfig } from './SharedPercentage';

export const localFieldConfigs = [
  PayeeNameConfig,
  PayeeTypeConfig,
  PayoutAmountConfig,
  SharedPercentageConfig,
]

export default {
  PayeeName,
  PayeeType,
  PayoutAmount,
  SharedPercentage,
}
