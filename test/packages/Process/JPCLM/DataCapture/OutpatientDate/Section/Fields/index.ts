import DiagnosisName, { fieldConfig as DiagnosisNameConfig } from './DiagnosisName';
import OutpatientDate, { fieldConfig as OutpatientDateConfig } from './OutpatientDate';

export const localFieldConfigs = [DiagnosisNameConfig, OutpatientDateConfig];

export default {
  DiagnosisName,
  OutpatientDate,
};
