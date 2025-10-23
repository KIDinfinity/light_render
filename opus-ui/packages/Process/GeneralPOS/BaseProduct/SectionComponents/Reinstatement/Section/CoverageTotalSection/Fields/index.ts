import TotalLabel, { localFieldConfig as TotalLabelConfig } from './TotalLabel';
import BasePremiumTotal, { localFieldConfig as BasePremiumTotalConfig } from './BasePremiumTotal';
import InstalmentPremiumWithTaxTotal, {
  localFieldConfig as InstalmentPremiumWithTaxTotalConfig,
} from './InstalmentPremiumWithTaxTotal';
import LoadingPremiumTotal, {
  localFieldConfig as LoadingPremiumTotalConfig,
} from './LoadingPremiumTotal';

export const localFieldConfigs = [
  TotalLabelConfig,
  BasePremiumTotalConfig,
  LoadingPremiumTotalConfig,
  InstalmentPremiumWithTaxTotalConfig,
];

export default { TotalLabel, BasePremiumTotal, LoadingPremiumTotal, InstalmentPremiumWithTaxTotal };
