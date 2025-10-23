import BusinessNo, { localFieldConfig as BusinessNoConfig } from './BusinessNo';
import CaseCategory, { localFieldConfig as CaseCategoryConfig } from './CaseCategory';
import CaseNo, { localFieldConfig as CaseNoConfig } from './CaseNo';
import CurrentActivity, { localFieldConfig as CurrentActivityConfig } from './CurrentActivity';

export const localFieldConfigs = [
  BusinessNoConfig,
  CaseCategoryConfig,
  CaseNoConfig,
  CurrentActivityConfig,
];

export default {
  BusinessNo,
  CaseCategory,
  CaseNo,
  CurrentActivity,
};
