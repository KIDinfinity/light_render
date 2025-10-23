import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import InsuredName, { localFieldConfig as InsuredNameConfig } from './InsuredName';
import ClaimType, { localFieldConfig as ClaimTypeConfig } from './ClaimType';

export const localFieldConfigs = [PolicyNoConfig, InsuredNameConfig, ClaimTypeConfig];

export default {
  PolicyNo,
  InsuredName,
  ClaimType,
};
