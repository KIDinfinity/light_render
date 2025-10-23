import RiderProductCode, { fieldConfig as RiderProductCodeConfig } from './RiderProductCode';
import PremiumRider, { fieldConfig as PremiumRiderConfig } from './PremiumRider';
import SumAssuredRider, { fieldConfig as SumAssuredRiderConfig } from './SumAssuredRider';
import TotalPremium, { fieldConfig as TotalPremiumConfig } from './TotalPremium';
import Classes, { fieldConfig as ClassesConfig } from './Classes';

export const localFieldConfigs = [
  RiderProductCodeConfig,
  PremiumRiderConfig,
  SumAssuredRiderConfig,
  TotalPremiumConfig,
  ClassesConfig,
];

export default {
  RiderProductCode,
  PremiumRider,
  SumAssuredRider,
  TotalPremium,
  Classes,
};
