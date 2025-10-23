import Allocation, { localFieldConfig as AllocationConfig } from './Allocation';
import FundCode, { localFieldConfig as FundCodeConfig } from './FundCode';
import RiskLevel, { localFieldConfig as RiskLevelConfig } from './RiskLevel';
import Total, { localFieldConfig as TotalConfig } from './Total';

export const localFieldConfigs = [FundCodeConfig, AllocationConfig, RiskLevelConfig, TotalConfig];

export default {
  Allocation,
  FundCode,
  RiskLevel,
  Total,
};
