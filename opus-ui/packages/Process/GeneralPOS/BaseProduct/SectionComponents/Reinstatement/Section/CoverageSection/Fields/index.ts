import BasePremium, { localFieldConfig as BasePremiumConfig } from './BasePremium';
import ClientId, { localFieldConfig as ClientIdConfig } from './ClientId';
import IndemnifyAgePeriod, {
  localFieldConfig as IndemnifyAgePeriodConfig,
} from './IndemnifyAgePeriod';
import IndemnifyPeriod, { localFieldConfig as IndemnifyPeriodConfig } from './IndemnifyPeriod';
import InstalmentPremiumWithTax, {
  localFieldConfig as InstalmentPremiumWithTaxConfig,
} from './InstalmentPremiumWithTax';
import LoadingPremium, { localFieldConfig as LoadingPremiumConfig } from './LoadingPremium';
import PayAgePeriod, { localFieldConfig as PayAgePeriodConfig } from './PayAgePeriod';
import PayPeriod, { localFieldConfig as PayPeriodConfig } from './PayPeriod';
import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import SumAssured, { localFieldConfig as SumAssuredConfig } from './SumAssured';
import Decision, { localFieldConfig as DecisionConfig } from './Decision';

export const localFieldConfigs = [
  BasePremiumConfig,
  IndemnifyAgePeriodConfig,
  ClientIdConfig,
  IndemnifyPeriodConfig,
  InstalmentPremiumWithTaxConfig,
  LoadingPremiumConfig,
  PayAgePeriodConfig,
  PayPeriodConfig,
  ProductCodeConfig,
  SumAssuredConfig,
  DecisionConfig,
];

export default {
  BasePremium,
  IndemnifyAgePeriod,
  ClientId,
  IndemnifyPeriod,
  InstalmentPremiumWithTax,
  LoadingPremium,
  PayAgePeriod,
  PayPeriod,
  ProductCode,
  SumAssured,
  Decision,
};
