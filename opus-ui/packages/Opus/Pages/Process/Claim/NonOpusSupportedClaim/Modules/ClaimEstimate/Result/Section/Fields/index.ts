import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import SourceSystem, { localFieldConfig as SourceSystemConfig } from './SourceSystem';

export const localFieldConfigs = [PolicyNoConfig, ProductCodeConfig, SourceSystemConfig];

export default {
  PolicyNo,
  ProductCode,
  SourceSystem,
};
