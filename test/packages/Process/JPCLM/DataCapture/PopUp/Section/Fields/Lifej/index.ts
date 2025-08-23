import InterestDays, { localFieldConfig as InterestDaysFieldConfigs } from './InterestDays';
import InvestigationResultConfirmationCategory, {
  localFieldConfig as InvestigationResultConfirmationCategoryConfig,
} from './InvestigationResultConfirmationCategory';
import OutstandingPremiumDate, {
  localFieldConfig as OutstandingPremiumDateFieldConfigs,
} from './OutstandingPremiumDate';
import MedicalCertificateArrivalDate, {
  localFieldConfig as MedicalCertificateArrivalDateConfig,
} from './MedicalCertificateArrivalDate';
import MaterialFee, { localFieldConfig as MaterialFeeFieldConfig } from './MaterialFee';
import TenDaysHospitalizationFlg, {
  localFieldConfig as TenDaysHospitalizationFlgFieldConfig,
} from './TenDaysHospitalizationFlg';
import TenDaysHospitalizationFlgL, {
  localFieldConfig as TenDaysHospitalizationFlgLFieldConfig,
} from './TenDaysHospitalizationFlgL';
import InterestBasedDate, {
  localFieldConfig as InterestBasedDateFieldConfig,
} from './InterestBasedDate';

export const localFieldConfigs = [
  InterestDaysFieldConfigs,
  InvestigationResultConfirmationCategoryConfig,
  OutstandingPremiumDateFieldConfigs,
  MedicalCertificateArrivalDateConfig,
  MaterialFeeFieldConfig,
  TenDaysHospitalizationFlgFieldConfig,
  TenDaysHospitalizationFlgLFieldConfig,
  InterestBasedDateFieldConfig,
];

export default {
  InterestDays,
  InvestigationResultConfirmationCategory,
  OutstandingPremiumDate,
  MedicalCertificateArrivalDate,
  MaterialFee,
  TenDaysHospitalizationFlg,
  TenDaysHospitalizationFlgL,
  InterestBasedDate,
};
