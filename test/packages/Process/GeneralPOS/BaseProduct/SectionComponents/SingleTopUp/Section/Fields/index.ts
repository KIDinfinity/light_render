import TopUpValue, { localFieldConfig as TopUpValueConfig } from './TopUpValue';
import FundCode, { localFieldConfig as FundCodeConfig } from './FundCode';
import Total, { localFieldConfig as TotalConfig } from './Total';


export const localFieldConfigs = [FundCodeConfig,TopUpValueConfig, TotalConfig];

export default {
 TopUpValue,
  FundCode,
  Total,
};
