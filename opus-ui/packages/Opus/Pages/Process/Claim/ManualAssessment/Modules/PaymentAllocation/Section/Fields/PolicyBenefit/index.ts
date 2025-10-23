import PayoutAmount, { localFieldConfig as PayoutAmountConfig } from './PayoutAmount';
import PolicyHolder, { fieldConfig as PolicyHolderConfig } from './PolicyHolder';
import PolicyInsured, { fieldConfig as PolicyInsuredConfig } from './PolicyInsured';
import PolicyNo, { fieldConfig as PolicyNoConfig } from './PolicyNo';

export const localFieldConfigs = [
  PayoutAmountConfig,
  PolicyHolderConfig,
  PolicyInsuredConfig,
  PolicyNoConfig,
];

export default {
  PayoutAmount,
  PolicyHolder,
  PolicyInsured,
  PolicyNo,
};
