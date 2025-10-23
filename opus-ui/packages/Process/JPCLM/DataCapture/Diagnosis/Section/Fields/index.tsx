import DiagnosisName, { localFieldConfig as DiagnosisNameConfig } from './DiagnosisName';
import CriticalIllness, { localFieldConfig as CriticalIllnessConfig } from './CriticalIllness';
import CriticalIllnessName, {
  localFieldConfig as CriticalIllnessNameConfig,
} from './CriticalIllnessName';
import DiagnosisType, { localFieldConfig as DiagnosisTypeConfig } from './DiagnosisType';
import DiagnosisDescription, {
  localFieldConfig as DiagnosisDescriptionConfig,
} from './DiagnosisDescription';
import DiagnosisCode, { localFieldConfig as DiagnosisCodeConfig } from './DiagnosisCode';
import DiagnosisDate, { localFieldConfig as DiagnosisDateConfig } from './DiagnosisDate';
import FirstSymptomDate, { localFieldConfig as FirstSymptomDateConfig } from './FirstSymptomDate';
import SymptomDate, { localFieldConfig as SymptomDateConfig } from './SymptomDate';
import DiagnosisNo, { localFieldConfig as DiagnosisNoConfig } from './DiagnosisNo';
import RelationshipCode, { localFieldConfig as RelationshipCodeConfig } from './RelationshipCode';
import ExistingCancerDiagnosis, { localFieldConfig as ExistingCancerDiagnosisConfig}from "./ExistingCancerDiagnosis";
export const localFieldConfigs = [
  DiagnosisNameConfig,
  CriticalIllnessConfig,
  CriticalIllnessNameConfig,
  DiagnosisTypeConfig,
  DiagnosisDescriptionConfig,
  DiagnosisCodeConfig,
  DiagnosisDateConfig,
  FirstSymptomDateConfig,
  SymptomDateConfig,
  DiagnosisNoConfig,
  RelationshipCodeConfig,
  ExistingCancerDiagnosisConfig
];

export default {
  DiagnosisName,
  CriticalIllness,
  CriticalIllnessName,
  DiagnosisType,
  DiagnosisDescription,
  DiagnosisCode,
  DiagnosisDate,
  FirstSymptomDate,
  SymptomDate,
  DiagnosisNo,
  RelationshipCode,
  ExistingCancerDiagnosis
};
