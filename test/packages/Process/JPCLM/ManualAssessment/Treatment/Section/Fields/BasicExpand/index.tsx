import DateOfAdmission, { localFieldConfig as DateOfAdmissionConfig } from './DateOfAdmission';
import DateOfDischarge, { localFieldConfig as DateOfDischargeConfig } from './DateOfDischarge';
import Department, { localFieldConfig as DepartmentConfig } from './Department';
import Doctor, { localFieldConfig as DoctorConfig } from './Doctor';
import Icu, { localFieldConfig as IcuConfig } from './Icu';
import IcuFromDate, { localFieldConfig as IcuFromDateConfig } from './IcuFromDate';
import IcuToDate, { localFieldConfig as IcuToDateConfig } from './IcuToDate';
import IsDischarged, { localFieldConfig as IsDischargedConfig } from './IsDischarged';
import MedicalProvider, { localFieldConfig as MedicalProviderConfig } from './MedicalProvider';
import OutpatientDate, { fieldConfig as OutpatientDateConfig } from './OutpatientDate';
import MedicalProviderDescription, {
  localFieldConfig as MedicalProviderDescriptionConfig,
} from './MedicalProviderDescription';
import HospitalizationInstructionDate, {
  localFieldConfig as HospitalizationInstructionDateConfig,
} from './HospitalizationInstructionDate';

export const localFieldConfigs = [
  DateOfAdmissionConfig,
  DateOfDischargeConfig,
  DepartmentConfig,
  DoctorConfig,
  IcuConfig,
  IcuFromDateConfig,
  IcuToDateConfig,
  IsDischargedConfig,
  MedicalProviderConfig,
  MedicalProviderDescriptionConfig,
  HospitalizationInstructionDateConfig,
  OutpatientDateConfig,
];

export default {
  OutpatientDate,
  DateOfAdmission,
  DateOfDischarge,
  Department,
  Doctor,
  Icu,
  IcuFromDate,
  IcuToDate,
  IsDischarged,
  MedicalProvider,
  MedicalProviderDescription,
  HospitalizationInstructionDate,
};
