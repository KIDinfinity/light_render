import DateOfAdmission, { localFieldConfig as DateOfAdmissionConfig } from './DateOfAdmission';
import DateOfDischarge, { localFieldConfig as DateOfDischargeConfig } from './DateOfDischarge';
import DateOfConsultation, {
  localFieldConfig as DateOfConsultationConfig,
} from './DateOfConsultation';

import Department, { localFieldConfig as DepartmentConfig } from './Department';
import Doctor, { localFieldConfig as DoctorConfig } from './Doctor';
import HospitalType, { localFieldConfig as HospitalTypeConfig } from './HospitalType';
import Icu, { localFieldConfig as IcuConfig } from './Icu';
import IcuFromDate, { localFieldConfig as IcuFromDateConfig } from './IcuFromDate';
import IcuToDate, { localFieldConfig as IcuToDateConfig } from './IcuToDate';
import IsHospitalInDevelopedCountry, {
  localFieldConfig as IsHospitalInDevelopedCountryConfig,
} from './IsHospitalInDevelopedCountry';
import MedicalProvider, { localFieldConfig as MedicalProviderConfig } from './MedicalProvider';
import MedicalProviderDescription, {
  localFieldConfig as MedicalProviderDescriptionConfig,
} from './MedicalProviderDescription';
import MedicalProviderPlace, {
  localFieldConfig as MedicalProviderPlaceConfig,
} from './MedicalProviderPlace';
import RoomType, { localFieldConfig as RoomTypeConfig } from './RoomType';
import ChargableDays, { localFieldConfig as ChargableDaysConfig } from './ChargableDays';
import TimeOfAdmission, { localFieldConfig as TimeOfAdmissionConfig } from './TimeOfAdmission';
import TimeOfConsultation, {
  localFieldConfig as TimeOfConsultationConfig,
} from './TimeOfConsultation';
import TimeOfDischarge, { localFieldConfig as TimeOfDischargeConfig } from './TimeOfDischarge';

export const localFieldConfigs = [
  DateOfAdmissionConfig,
  DateOfDischargeConfig,
  DepartmentConfig,
  DoctorConfig,
  HospitalTypeConfig,
  IcuConfig,
  IcuFromDateConfig,
  IcuToDateConfig,
  IsHospitalInDevelopedCountryConfig,
  MedicalProviderConfig,
  MedicalProviderDescriptionConfig,
  MedicalProviderPlaceConfig,
  RoomTypeConfig,
  DateOfConsultationConfig,
  ChargableDaysConfig,
  TimeOfAdmissionConfig,
  TimeOfConsultationConfig,
  TimeOfDischargeConfig,
];

export default {
  ChargableDays,
  DateOfConsultation,
  DateOfAdmission,
  DateOfDischarge,
  Department,
  Doctor,
  HospitalType,
  Icu,
  IcuFromDate,
  IcuToDate,
  IsHospitalInDevelopedCountry,
  MedicalProvider,
  MedicalProviderDescription,
  MedicalProviderPlace,
  RoomType,
  TimeOfAdmission,
  TimeOfConsultation,
  TimeOfDischarge,
};
