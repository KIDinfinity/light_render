import NonThTaxCountry, { fieldConfig as NonThTaxCountryConfig } from './NonThTaxCountry';
import NonThTin, { fieldConfig as NonThTinConfig } from './NonThTin';
import NoTinExplanation, { fieldConfig as NoTinExplanationConfig } from './NoTinExplanation';
import NoTinReasonCode, { fieldConfig as NoTinReasonCodeConfig } from './NoTinReasonCode';

export const localFieldConfigs = [
  NonThTaxCountryConfig,
  NonThTinConfig,
  NoTinExplanationConfig,
  NoTinReasonCodeConfig,
];

export default {
  NonThTaxCountry,
  NonThTin,
  NoTinExplanation,
  NoTinReasonCode,
};
