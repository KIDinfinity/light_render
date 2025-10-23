import DiagnosisName, { fieldConfig as DiagnosisNameConfig } from './DiagnosisName';
import ConsultationDate, { fieldConfig as ConsultationDateConfig } from './ConsultationDate';
import ConsultationNo, { localFieldConfig as ConsultationNoConfig } from './ConsultationNo';
import TherapyType, { localFieldConfig as TherapyTypeConfig } from './TherapyType';

export const localFieldConfigs = [
  DiagnosisNameConfig,
  ConsultationDateConfig,
  ConsultationNoConfig,
  TherapyTypeConfig,
];

export default {
  DiagnosisName,
  ConsultationDate,
  ConsultationNo,
  TherapyType,
};
