import DateOfAdmission, { localFieldConfig as DateOfAdmissionConfig } from './DateOfAdmission';
import DateOfDischarge, { localFieldConfig as DateOfDischargeConfig } from './DateOfDischarge';
import Department, { localFieldConfig as DepartmentConfig } from './Department';
import Doctor, { localFieldConfig as DoctorConfig } from './Doctor';
import HospitalizationInstructionDate, { localFieldConfig as HospitalizationInstructionDateConfig } from './HospitalizationInstructionDate';
import IsDischarged, { localFieldConfig as IsDischargedConfig } from './IsDischarged';
import MedicalProvider, { localFieldConfig as MedicalProviderConfig } from './MedicalProvider';
import MedicalProviderDescription, {
  localFieldConfig as MedicalProviderDescriptionConfig,
} from './MedicalProviderDescription';
import TreatmentType, { localFieldConfig as TreatmentTypeConfig } from './TreatmentType';


export const localFieldConfigs = [
  DateOfAdmissionConfig,
  DateOfDischargeConfig,
  DepartmentConfig,
  DoctorConfig,
  MedicalProviderConfig,
  MedicalProviderDescriptionConfig,
  HospitalizationInstructionDateConfig,
  IsDischargedConfig,
  TreatmentTypeConfig,
];

export default {
  DateOfAdmission,
  DateOfDischarge,
  Department,
  Doctor,
  MedicalProvider,
  MedicalProviderDescription,
  HospitalizationInstructionDate,
  IsDischarged,
  TreatmentType,
};
