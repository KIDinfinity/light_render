import FecRiskLevel, {
  localFieldConfig as FecRiskLevelConfig,
} from './FecRiskLevel';
import TotalLevel, {
  localFieldConfig as TotalLevelConfig,
} from './TotalLevel';
import TotalScore, { localFieldConfig as TotalScoreConfig } from './TotalScore';

export const localFieldConfigs = [FecRiskLevelConfig, TotalLevelConfig, TotalScoreConfig];

export default {
  FecRiskLevel,
  TotalLevel,
  TotalScore
};
