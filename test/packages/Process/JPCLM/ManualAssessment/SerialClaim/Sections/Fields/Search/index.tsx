import CauseOfIncident, { localFieldConfig as CauseOfIncidentConfig } from './CauseOfIncident';
import ClaimTypeArray, { localFieldConfig as ClaimTypeArrayConfig } from './ClaimTypeArray';
import DiagnosisName, { localFieldConfig as DiagnosisNameConfig } from './DiagnosisName';
import HospitalizationSequentialNo, {
  localFieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';
import PolicyNo, { localFieldConfig as PolicyNoConfig } from './PolicyNo';
import TreatmentType, { localFieldConfig as TreatmentTypeConfig } from './TreatmentType';
import Times, { localFieldConfig as TimesConfig } from './Times';

export const localFieldConfigs = [
  CauseOfIncidentConfig,
  ClaimTypeArrayConfig,
  DiagnosisNameConfig,
  HospitalizationSequentialNoConfig,
  PolicyNoConfig,
  TreatmentTypeConfig,
  TimesConfig,
];

export default {
  CauseOfIncident,
  ClaimTypeArray,
  DiagnosisName,
  HospitalizationSequentialNo,
  PolicyNo,
  TreatmentType,
  Times,
};
