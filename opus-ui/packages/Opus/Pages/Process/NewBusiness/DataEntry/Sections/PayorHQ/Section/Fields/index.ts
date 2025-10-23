import HealthQ1, { fieldConfig as HealthQ1Config } from './HealthQ1';
import HealthQ2Height, { fieldConfig as HealthQ2HeightConfig } from './HealthQ2Height';
import HealthQ2Weight, { fieldConfig as HealthQ2WeightConfig } from './HealthQ2Weight';
import HealthQ3, { fieldConfig as HealthQ3Config } from './HealthQ3';
import HealthQ4, { fieldConfig as HealthQ4Config } from './HealthQ4';
import WeightChgAmt, { fieldConfig as WeightChgAmtConfig } from './WeightChgAmt';
import WeightChgReason, { fieldConfig as WeightChgReasonConfig } from './WeightChgReason';

export const localFieldConfigs = [
  HealthQ1Config,
  HealthQ2HeightConfig,
  HealthQ2WeightConfig,
  HealthQ3Config,
  HealthQ4Config,
  WeightChgAmtConfig,
  WeightChgReasonConfig,
];

export default {
  HealthQ1,
  HealthQ2Height,
  HealthQ2Weight,
  HealthQ3,
  HealthQ4,
  WeightChgAmt,
  WeightChgReason,
};
