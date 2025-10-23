import IsClaimWithOtherInsurer, {
  localFieldConfig as IsClaimWithOtherInsurerConfig,
} from './IsClaimWithOtherInsurer';
import IsHospitalInDevelopedCountry, {
  localFieldConfig as IsHospitalInDevelopedCountryConfig,
} from './IsHospitalInDevelopedCountry';
import HasEinvoice, { localFieldConfig as HasEinvoiceConfig } from './HasEinvoice';

export const localFieldConfigs = [
  IsClaimWithOtherInsurerConfig,
  IsHospitalInDevelopedCountryConfig,
  HasEinvoiceConfig,
];

export default {
  IsClaimWithOtherInsurer,
  IsHospitalInDevelopedCountry,
  HasEinvoice,
};
