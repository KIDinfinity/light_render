import CauseOfIncident, { localFieldConfig as CauseOfIncidentConfig } from './CauseOfIncident';
import ClaimTypeArray, { localFieldConfig as ClaimTypeArrayConfig } from './ClaimTypeArray';
import EditDate, { localFieldConfig as EditDateConfig } from './EditDate';
import FirstConsultationDate, {
  localFieldConfig as FirstConsultationDateConfig,
} from './FirstConsultationDate';
import IdentificationDate, {
  localFieldConfig as IdentificationDateConfig,
} from './IdentificationDate';
import IncidentDate, { localFieldConfig as IncidentDateConfig } from './IncidentDate';
import IncidentInDetail, { localFieldConfig as IncidentInDetailConfig } from './IncidentInDetail';
import IncidentPlace, { localFieldConfig as IncidentPlaceConfig } from './IncidentPlace';
import LaborConstrainedOfAmi, {
  localFieldConfig as LaborConstrainedOfAmiConfig,
} from './LaborConstrainedOfAmi';
import MedicalCertificateDate, {
  localFieldConfig as MedicalCertificateDateConfig,
} from './MedicalCertificateDate';
import PartOfBodyInjuredArray, {
  localFieldConfig as PartOfBodyInjuredArrayConfig,
} from './PartOfBodyInjuredArray';
import ReportToThePolice, {
  localFieldConfig as ReportToThePoliceConfig,
} from './ReportToThePolice';
import RequiringNursingDate, {
  localFieldConfig as RequiringNursingDateConfig,
} from './RequiringNursingDate';
import SequelaeOfStroke, { localFieldConfig as SequelaeOfStrokeConfig } from './SequelaeOfStroke';
import TrafficAccidentFlag, {
  localFieldConfig as TrafficAccidentFlagConfig,
} from './TrafficAccidentFlag';
import IsDrinking, { fieldConfig as IsDrinkingConfig } from './IsDrinking';
import BehaviorInAccident, { fieldConfig as BehaviorInAccidentConfig } from './BehaviorInAccident';
import JudgmentAbility, { fieldConfig as JudgmentAbilityConfig } from './JudgmentAbility';
import ClaimReferenceDate, {
  localFieldConfig as ClaimReferenceDateConfig,
} from './ClaimReferenceDate';
import StateOfRequiringNursing, {
  localFieldConfig as StateOfRequiringNursingConfig,
} from './StateOfRequiringNursing';
import DisabilityGrade, { localFieldConfig as DisabilityGradeConfig } from './DisabilityGrade';
import TotalPermanentDisability, {
  localFieldConfig as TotalPermanentDisabilityConfig,
} from './TotalPermanentDisability';
import PhysicalDisability, {
  localFieldConfig as PhysicalDisabilityConfig,
} from './PhysicalDisability';
import MentalState, { localFieldConfig as MentalStateConfig } from './MentalState';
import DeathCode, { localFieldConfig as DeathCodeConfig } from './DeathCode';
import CauseOfDeath, { localFieldConfig as CauseOfDeathConfig } from './CauseOfDeath';
import CancerAppearanceDiagnosisDate, {
  localFieldConfig as CancerAppearanceDiagnosisDateConfig,
} from './CancerAppearanceDiagnosisDate';

export const localFieldConfigs = [
  IsDrinkingConfig,
  BehaviorInAccidentConfig,
  CauseOfIncidentConfig,
  ClaimTypeArrayConfig,
  EditDateConfig,
  FirstConsultationDateConfig,
  IdentificationDateConfig,
  IncidentDateConfig,
  IncidentInDetailConfig,
  IncidentPlaceConfig,
  LaborConstrainedOfAmiConfig,
  MedicalCertificateDateConfig,
  PartOfBodyInjuredArrayConfig,
  ReportToThePoliceConfig,
  RequiringNursingDateConfig,
  SequelaeOfStrokeConfig,
  TrafficAccidentFlagConfig,
  JudgmentAbilityConfig,
  ClaimReferenceDateConfig,
  StateOfRequiringNursingConfig,
  DisabilityGradeConfig,
  TotalPermanentDisabilityConfig,
  PhysicalDisabilityConfig,
  MentalStateConfig,
  DeathCodeConfig,
  CauseOfDeathConfig,
  CancerAppearanceDiagnosisDateConfig,
];

export default {
  CauseOfDeath,
  DeathCode,
  MentalState,
  PhysicalDisability,
  TotalPermanentDisability,
  IsDrinking,
  BehaviorInAccident,
  CauseOfIncident,
  ClaimTypeArray,
  EditDate,
  FirstConsultationDate,
  IdentificationDate,
  IncidentDate,
  IncidentInDetail,
  IncidentPlace,
  LaborConstrainedOfAmi,
  MedicalCertificateDate,
  PartOfBodyInjuredArray,
  ReportToThePolice,
  RequiringNursingDate,
  SequelaeOfStroke,
  TrafficAccidentFlag,
  JudgmentAbility,
  ClaimReferenceDate,
  StateOfRequiringNursing,
  DisabilityGrade,
  CancerAppearanceDiagnosisDate,
};
