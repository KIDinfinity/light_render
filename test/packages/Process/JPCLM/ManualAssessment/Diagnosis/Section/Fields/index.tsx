import CriticalIllness, { localFieldConfig as CriticalIllnessConfig } from './CriticalIllness';
import CriticalIllnessName, {
  localFieldConfig as CriticalIllnessNameConfig,
} from './CriticalIllnessName';
import DiagnosisCode, { localFieldConfig as DiagnosisCodeConfig } from './DiagnosisCode';
import DiagnosisDate, { localFieldConfig as DiagnosisDateConfig } from './DiagnosisDate';
import DiagnosisDescription, {
  localFieldConfig as DiagnosisDescriptionConfig,
} from './DiagnosisDescription';
import DiagnosisName, { localFieldConfig as DiagnosisNameConfig } from './DiagnosisName';
import DiagnosisType, { localFieldConfig as DiagnosisTypeConfig } from './DiagnosisType';
import FirstSymptomDate, { localFieldConfig as FirstSymptomDateConfig } from './FirstSymptomDate';
import SymptomDate, { localFieldConfig as SymptomDateConfig } from './SymptomDate';
import DiagnosisNo, { localFieldConfig as DiagnosisNoConfig } from './DiagnosisNo';
import RelationshipCode, { localFieldConfig as RelationshipCodeConfig } from './RelationshipCode';
import ExistingCancerDiagnosis, { localFieldConfig as ExistingCancerDiagnosisConfig } from './ExistingCancerDiagnosis'
export const localFieldConfigs = [
  DiagnosisNoConfig,
  RelationshipCodeConfig,
  CriticalIllnessConfig,
  CriticalIllnessNameConfig,
  DiagnosisCodeConfig,
  DiagnosisDateConfig,
  DiagnosisDescriptionConfig,
  DiagnosisNameConfig,
  DiagnosisTypeConfig,
  FirstSymptomDateConfig,
  SymptomDateConfig,
  ExistingCancerDiagnosis,
  ExistingCancerDiagnosisConfig
];

export default {
  DiagnosisNo,
  RelationshipCode,
  CriticalIllness,
  CriticalIllnessName,
  DiagnosisCode,
  DiagnosisDate,
  DiagnosisDescription,
  DiagnosisName,
  DiagnosisType,
  FirstSymptomDate,
  SymptomDate,
  ExistingCancerDiagnosis,
};
