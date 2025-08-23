import InvestigationAgreementDate, {
  localFieldConfig as InvestigationAgreementDateConfig,
} from './InvestigationAgreementDate';
import AutoassessmentFlg, {
  localFieldConfig as AutoassessmentFlgConfig,
} from './AutoassessmentFlg';
import InvestigationRefusalDate, { localFieldConfig as InvestigationRefusalDateConfig } from './InvestigationRefusalDate';
import ForcedPaymentFlg, {
  localFieldConfig as ForcedPaymentFlgConfig,
} from './ForcedPaymentFlg';
import InformAgency, { localFieldConfig as InformAgencyConfig } from './InformAgency';
import DaysToDeductInterestForArrears, {
  localFieldConfig as DaysToDeductInterestForArrearsConfig,
} from './DaysToDeductInterestForArrears';
import InvestigationResultConfirmationCategory, {
  localFieldConfig as InvestigationResultConfirmationCategoryConfig,
} from './InvestigationResultConfirmationCategory';
import MedicalCertificateFeeCN, { localFieldConfig as MedicalCertificateFeeCNConfig } from './MedicalCertificateFeeCN';
import MedicalCertificateArrivalDate, {
  localFieldConfig as MedicalCertificateArrivalDateConfig,
} from './MedicalCertificateArrivalDate';
import UnpaidInterestFlg, { localFieldConfig as UnpaidInterestFlgConfig } from './UnpaidInterestFlg';
import OffsetAccruedYearMonth, { fieldConfig as OffsetAccruedYearMonthConfig } from './OffsetAccruedYearMonth';
import IncidentStatusCode, { localFieldConfig as IncidentStatusCodeConfig } from './IncidentStatusCode';
import HospitalizationFlg, {
  localFieldConfig as HospitalizationFlgConfig,
} from './HospitalizationFlg';
import HospitalizationSequentialNo, {
  fieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';

export const localFieldConfigs = [
  InvestigationAgreementDateConfig,
  AutoassessmentFlgConfig,
  InvestigationRefusalDateConfig,
  ForcedPaymentFlgConfig,
  InformAgencyConfig,
  DaysToDeductInterestForArrearsConfig,
  InvestigationResultConfirmationCategoryConfig,
  MedicalCertificateFeeCNConfig,
  MedicalCertificateArrivalDateConfig,
  UnpaidInterestFlgConfig,
  OffsetAccruedYearMonthConfig,
  IncidentStatusCodeConfig,
  HospitalizationFlgConfig,
  HospitalizationSequentialNoConfig,
];

export default {
  InvestigationAgreementDate,
  AutoassessmentFlg,
  InvestigationRefusalDate,
  ForcedPaymentFlg,
  InformAgency,
  DaysToDeductInterestForArrears,
  InvestigationResultConfirmationCategory,
  MedicalCertificateFeeCN,
  MedicalCertificateArrivalDate,
  UnpaidInterestFlg,
  OffsetAccruedYearMonth,
  IncidentStatusCode,
  HospitalizationFlg,
  HospitalizationSequentialNo,
};
