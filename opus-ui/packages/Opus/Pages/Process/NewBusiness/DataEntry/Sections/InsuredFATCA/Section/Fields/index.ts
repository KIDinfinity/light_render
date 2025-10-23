import GreencardExpDate, { fieldConfig as GreencardExpDateConfig } from './GreencardExpDate';
import GreencardNo, { fieldConfig as GreencardNoConfig } from './GreencardNo';
import FatcaQ1, { fieldConfig as FatcaQ1Config } from './FatcaQ1';
import FatcaQ1Condition, { fieldConfig as FatcaQ1ConditionConfig } from './FatcaQ1Condition';
import FatcaQ2, { fieldConfig as FatcaQ2Config } from './FatcaQ2';
import FatcaQ3, { fieldConfig as FatcaQ3Config } from './FatcaQ3';
import FatcaQ4, { fieldConfig as FatcaQ4Config } from './FatcaQ4';

export const localFieldConfigs = [
  GreencardExpDateConfig,
  GreencardNoConfig,
  FatcaQ1Config,
  FatcaQ1ConditionConfig,
  FatcaQ2Config,
  FatcaQ3Config,
  FatcaQ4Config,
];

export default {
  GreencardExpDate,
  GreencardNo,
  FatcaQ1,
  FatcaQ1Condition,
  FatcaQ2,
  FatcaQ3,
  FatcaQ4,
};
