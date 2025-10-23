import DateOfAdmission, { fieldConfig as DateOfAdmissionConfig } from './DateOfAdmission';
import DateOfDischarge, { fieldConfig as DateOfDischargeConfig } from './DateOfDischarge';
import Department, { fieldConfig as DepartmentConfig } from './Department';
import Doctor, { fieldConfig as DoctorConfig } from './Doctor';
import ICU, { fieldConfig as ICUConfig } from './ICU';
import ICUFromDate, { fieldConfig as ICUFromDateConfig } from './ICUFromDate';
import ICUToDate, { fieldConfig as ICUToDateConfig } from './ICUToDate';
import OutpatientDate, { fieldConfig as OutpatientDateConfig } from './OutpatientDate';
import IsDischarged, { fieldConfig as IsDischargedConfig } from './IsDischarged';
import MedicalProvider, { fieldConfig as MedicalProviderConfig } from './MedicalProvider';
import MedicalProviderDescription, {
  fieldConfig as MedicalProviderDescriptionConfig,
} from './MedicalProviderDescription';
import HospitalizationInstructionDate, {
  fieldConfig as HospitalizationInstructionDateConfig,
} from './HospitalizationInstructionDate';
import TreatmentType, { fieldConfig as TreatmentTypeConfig } from './TreatmentType';
import DateOfConsultation, { fieldConfig as DateOfConsultationConfig } from './DateOfConsultation';


export const localFieldConfigs = [
  DateOfAdmissionConfig,
  DateOfDischargeConfig,
  DepartmentConfig,
  DoctorConfig,
  ICUConfig,
  ICUFromDateConfig,
  ICUToDateConfig,
  OutpatientDateConfig,
  IsDischargedConfig,
  MedicalProviderConfig,
  MedicalProviderDescriptionConfig,
  HospitalizationInstructionDateConfig,
  TreatmentTypeConfig,
  DateOfConsultationConfig,
];

export default {
  DateOfAdmission,
  DateOfDischarge,
  Department,
  Doctor,
  ICU,
  ICUFromDate,
  ICUToDate,
  OutpatientDate,
  IsDischarged,
  MedicalProvider,
  MedicalProviderDescription,
  HospitalizationInstructionDate,
  TreatmentType,
  DateOfConsultation,
};
