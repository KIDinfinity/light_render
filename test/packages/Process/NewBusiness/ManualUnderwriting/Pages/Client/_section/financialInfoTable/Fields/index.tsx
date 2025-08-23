import Reasonflag, { fieldConfig as reasonFlagConfig } from './Reasonflag';
import Reason, { fieldConfig as reasonConfig } from './Reason';
import AdditionalReason, { fieldConfig as additionalReasonConfig } from './AdditionalReason';
import CtfCountryCode, { fieldConfig as ctfCountryCodeConfig } from './CtfCountryCode';
import CtfId, { fieldConfig as ctfIdConfig } from './CtfId';
import CountryofTaxResidence, {
  fieldConfig as CountryofTaxResidenceConfig,
} from './CountryofTaxResidence';
import CountryofTaxResidenceAdd , {   fieldConfig as CountryofTaxResidenceAddConfig  } from './CountryofTaxResidenceAdd';

export const localFieldConfigs = [
  ctfCountryCodeConfig,
  ctfIdConfig,
  reasonFlagConfig,
  reasonConfig,
  additionalReasonConfig,
  CountryofTaxResidenceConfig,
  CountryofTaxResidenceAddConfig
];

export default {
  CtfCountryCode,
  CtfId,
  Reasonflag,
  Reason,
  AdditionalReason,
  CountryofTaxResidence,
  CountryofTaxResidenceAdd
};
