import BaseProductCode, { fieldConfig as BaseProductCodeConfig } from './BaseProductCode';
import CoveredPeriod, { fieldConfig as CoveredPeriodConfig } from './CoveredPeriod';
import PremiumBasePlan, { fieldConfig as PremiumBasePlanConfig } from './PremiumBasePlan';
import PremiumFrequency, { fieldConfig as PremiumFrequencyConfig } from './PremiumFrequency';
import PremiumPeriod, { fieldConfig as PremiumPeriodConfig } from './PremiumPeriod';
import SumAssuredBase, { fieldConfig as SumAssuredBaseConfig } from './SumAssuredBase';
import Classes, { fieldConfig as ClassesConfig } from './Classes';

export const localFieldConfigs = [
  BaseProductCodeConfig,
  CoveredPeriodConfig,
  PremiumBasePlanConfig,
  PremiumFrequencyConfig,
  PremiumPeriodConfig,
  SumAssuredBaseConfig,
  ClassesConfig,
];

export default {
  BaseProductCode,
  CoveredPeriod,
  PremiumBasePlan,
  PremiumFrequency,
  PremiumPeriod,
  SumAssuredBase,
  Classes,
};
