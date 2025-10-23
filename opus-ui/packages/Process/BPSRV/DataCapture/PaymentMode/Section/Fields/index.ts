import CurrentPaymentMode, {
  localFieldConfig as CurrentPaymentModeConfig,
} from './CurrentPaymentMode';
import NextPaymentMode, { localFieldConfig as NextPaymentModeConfig } from './NextPaymentMode';

export const localFieldConfigs = [CurrentPaymentModeConfig, NextPaymentModeConfig];

export default {
  CurrentPaymentMode,
  NextPaymentMode,
};
