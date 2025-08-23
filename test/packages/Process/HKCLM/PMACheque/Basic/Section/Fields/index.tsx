import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import ChequeCategory, { localFieldConfig as ChequeCategoryConfig } from './ChequeCategory';
import InsuredName, { localFieldConfig as InsuredNameConfig } from './InsuredName';
import BusinessNo, { localFieldConfig as BusinessNoConfig } from './BusinessNo';

export const localFieldConfigs = [
  ChequeCategoryConfig,
  PolicyNoConfig,
  InsuredNameConfig,
  BusinessNoConfig,
];

export default {
  ChequeCategory,
  PolicyNo,
  InsuredName,
  BusinessNo,
};
