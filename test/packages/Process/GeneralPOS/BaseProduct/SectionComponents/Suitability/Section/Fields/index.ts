import RiskToleranceLevel, {
  localFieldConfig as RiskToleranceLevelConfig,
} from './RiskToleranceLevel';
import SuitabilityDate, { localFieldConfig as SuitabilityDateConfig } from './SuitabilityDate';
import SuitabilityScore, { localFieldConfig as SuitabilityScoreConfig } from './SuitabilityScore';
import ValidSuitability, { localFieldConfig as ValidSuitabilityConfig } from './ValidSuitability';
export const localFieldConfigs = [
  RiskToleranceLevelConfig,
  SuitabilityDateConfig,
  ValidSuitabilityConfig,
  SuitabilityScoreConfig,
];

export default {
  RiskToleranceLevel,
  SuitabilityDate,
  ValidSuitability,
  SuitabilityScore,
};
