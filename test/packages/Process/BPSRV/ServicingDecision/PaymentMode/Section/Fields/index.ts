import CurrentPaymentMode, {
  localFieldConfig as CurrentPaymentModeConfig,
} from './CurrentPaymentMode';
import NextPaymentMode, { localFieldConfig as NextPaymentModeConfig } from './NextPaymentMode';
import PremiumAmount, { localFieldConfig as PremiumAmountConfig } from './PremiumAmount';

export const localFieldConfigs = [
  CurrentPaymentModeConfig,
  NextPaymentModeConfig,
  PremiumAmountConfig,
];

export default {
  CurrentPaymentMode,
  NextPaymentMode,
  PremiumAmount,
};
