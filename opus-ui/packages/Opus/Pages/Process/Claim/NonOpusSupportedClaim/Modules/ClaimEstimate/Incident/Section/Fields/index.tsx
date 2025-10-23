import DiagnosisName, { localFieldConfig as DiagnosisNameConfig } from './DiagnosisName';
import DiagnosisNo, { localFieldConfig as DiagnosisNoConfig } from './DiagnosisNo';
import WithAntiCanceTreatment, {
  localFieldConfig as WithAntiCanceTreatmentConfig,
} from './WithAntiCanceTreatment';
import WithOutpatientTreatment, {
  localFieldConfig as WithOutpatientTreatmentConfig,
} from './WithOutpatientTreatment';

export const localFieldConfigs = [
  DiagnosisNoConfig,
  DiagnosisNameConfig,
  WithAntiCanceTreatmentConfig,
  WithOutpatientTreatmentConfig,
];

export default {
  DiagnosisNo,
  DiagnosisName,
  WithAntiCanceTreatment,
  WithOutpatientTreatment,
};
