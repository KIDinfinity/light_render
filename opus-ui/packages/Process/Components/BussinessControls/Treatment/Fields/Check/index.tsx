import IsClaimWithOtherInsurer, {
  localFieldConfig as IsClaimWithOtherInsurerConfig,
} from './IsClaimWithOtherInsurer';
import IsHospitalInDevelopedCountry, {
  localFieldConfig as IsHospitalInDevelopedCountryConfig,
} from './IsHospitalInDevelopedCountry';

export const localFieldConfigs = [
  IsClaimWithOtherInsurerConfig,
  IsHospitalInDevelopedCountryConfig,
];

export default {
  IsClaimWithOtherInsurer,
  IsHospitalInDevelopedCountry,
};
