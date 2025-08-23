import CriticalIllness, { localFieldConfig as CriticalIllnessConfig } from './CriticalIllness';
import CriticalIllnessName, {
  localFieldConfig as CriticalIllnessNameConfig,
} from './CriticalIllnessName';
import DiagnosisCode, { localFieldConfig as DiagnosisCodeConfig } from './DiagnosisCode';
import DiagnosisCodeAdd, { localFieldConfig as DiagnosisCodeAddConfig } from './DiagnosisCodeAdd';
import DiagnosisDescription, {
  localFieldConfig as DiagnosisDescriptionConfig,
} from './DiagnosisDescription';
import DiagnosisType, { localFieldConfig as DiagnosisTypeConfig } from './DiagnosisType';
import SymptomDate, { localFieldConfig as SymptomDateConfig } from './SymptomDate';
import Ci3, { localFieldConfig as Ci3Config } from './Ci3';

export const localFieldConfigs = [
  CriticalIllnessConfig,
  CriticalIllnessNameConfig,
  DiagnosisCodeConfig,
  DiagnosisDescriptionConfig,
  DiagnosisTypeConfig,
  SymptomDateConfig,
  Ci3Config,
  DiagnosisCodeAddConfig,
];

export default {
  CriticalIllness,
  CriticalIllnessName,
  DiagnosisCode,
  DiagnosisDescription,
  DiagnosisType,
  SymptomDate,
  Ci3,
  DiagnosisCodeAdd,
};
