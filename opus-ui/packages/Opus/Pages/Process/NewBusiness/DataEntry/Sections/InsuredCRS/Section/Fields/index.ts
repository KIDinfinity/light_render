import City, { fieldConfig as CityConfig } from './City';
import CountryOfTaxResidency, {
  fieldConfig as CountryOfTaxResidencyConfig,
} from './CountryOfTaxResidency';
import LastName, { fieldConfig as LastNameConfig } from './LastName';
import Name, { fieldConfig as NameConfig } from './Name';
import NonThTaxOption, { fieldConfig as NonThTaxOptionConfig } from './NonThTaxOption';
import Tin, { fieldConfig as TinConfig } from './Tin';

export const localFieldConfigs = [
  CityConfig,
  CountryOfTaxResidencyConfig,
  LastNameConfig,
  NameConfig,
  NonThTaxOptionConfig,
  TinConfig,
];

export default {
  City,
  CountryOfTaxResidency,
  LastName,
  Name,
  NonThTaxOption,
  Tin,
};
