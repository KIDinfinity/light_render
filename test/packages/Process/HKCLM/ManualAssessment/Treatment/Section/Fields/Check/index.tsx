import IsClaimWithOtherInsurer, {
  localFieldConfig as IsClaimWithOtherInsurerConfig,
} from './IsClaimWithOtherInsurer';
import IsHospitalInDevelopedCountry, {
  localFieldConfig as IsHospitalInDevelopedCountryConfig,
} from './IsHospitalInDevelopedCountry';
import HasEinvoice, { localFieldConfig as HasEinvoiceConfig } from './HasEinvoice';
import GuaranteeOfPayment, {
  localFieldConfig as GuaranteeOfPaymentConfig,
} from './GuaranteeOfPayment';

export const localFieldConfigs = [
  IsClaimWithOtherInsurerConfig,
  IsHospitalInDevelopedCountryConfig,
  HasEinvoiceConfig,
  GuaranteeOfPaymentConfig,
];

export default {
  IsClaimWithOtherInsurer,
  IsHospitalInDevelopedCountry,
  HasEinvoice,
  GuaranteeOfPayment,
};
