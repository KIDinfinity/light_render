import DateOfAdmission, { localFieldConfig as DateOfAdmissionConfig } from './DateOfAdmission';
import DateOfDischarge, { localFieldConfig as DateOfDischargeConfig } from './DateOfDischarge';
import DateOfConsultation, {
  localFieldConfig as DateOfConsultationConfig,
} from './DateOfConsultation';

import Doctor, { localFieldConfig as DoctorConfig } from './Doctor';
import Icu, { localFieldConfig as IcuConfig } from './Icu';
import IcuFromDate, { localFieldConfig as IcuFromDateConfig } from './IcuFromDate';
import IcuToDate, { localFieldConfig as IcuToDateConfig } from './IcuToDate';
import IsHospitalInDevelopedCountry, {
  localFieldConfig as IsHospitalInDevelopedCountryConfig,
} from './IsHospitalInDevelopedCountry';
import MedicalProvider, { localFieldConfig as MedicalProviderConfig } from './MedicalProvider';

export const localFieldConfigs = [
  DateOfAdmissionConfig,
  DateOfDischargeConfig,
  DoctorConfig,
  IcuConfig,
  IcuFromDateConfig,
  IcuToDateConfig,
  IsHospitalInDevelopedCountryConfig,
  MedicalProviderConfig,
  DateOfConsultationConfig,
];

export default {
  DateOfConsultation,
  DateOfAdmission,
  DateOfDischarge,
  Doctor,
  Icu,
  IcuFromDate,
  IcuToDate,
  IsHospitalInDevelopedCountry,
  MedicalProvider,
};
