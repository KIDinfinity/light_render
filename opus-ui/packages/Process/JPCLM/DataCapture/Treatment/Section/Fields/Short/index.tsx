import DateOfConsultation, { fieldConfig as DateOfConsultationConfig } from './DateOfConsultation';
import Department, { fieldConfig as DepartmentConfig } from './Department';
import TreatmentType, { fieldConfig as TreatmentTypeConfig } from './TreatmentType';

export const localFieldConfigs = [DateOfConsultationConfig, DepartmentConfig, TreatmentTypeConfig];

export default {
  DateOfConsultation,
  Department,
  TreatmentType,
};
