import SubAcCurrency, { localFieldConfig as SubAcCurrencyConfig } from './SubAcCurrency';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import SubAccount, { localFieldConfig as SubAccountConfig } from './SubAccount';
import SubAcBalance, { localFieldConfig as SubAcBalanceConfig } from './SubAcBalance';
import RefundAmount, { localFieldConfig as RefundAmountConfig } from './RefundAmount';

export const localFieldConfigs = [
  SubAcCurrencyConfig,
  SubAccountConfig,
  PolicyNoConfig,
  SubAcBalanceConfig,
  RefundAmountConfig,
];

export default {
  SubAcCurrency,
  SubAccount,
  PolicyNo,
  SubAcBalance,
  RefundAmount,
};
