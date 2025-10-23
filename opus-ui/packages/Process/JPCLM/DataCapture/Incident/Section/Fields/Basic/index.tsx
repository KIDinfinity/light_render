import CauseOfIncident, { fieldConfig as CauseOfIncidentConfig } from './CauseOfIncident';
import ClaimTypeArray, { fieldConfig as ClaimTypeArrayConfig } from './ClaimTypeArray';
import EditDate, { fieldConfig as EditDateConfig } from './EditDate';
import FirstConsultationDate, {
  fieldConfig as FirstConsultationDateConfig,
} from './FirstConsultationDate';
import IdentificationDate, { fieldConfig as IdentificationDateConfig } from './IdentificationDate';
import IncidentDate, { fieldConfig as IncidentDateConfig } from './IncidentDate';
import IncidentInDetail, { fieldConfig as IncidentInDetailConfig } from './IncidentInDetail';
import IncidentPlace, { fieldConfig as IncidentPlaceConfig } from './IncidentPlace';
// import KlipClaimNo, { fieldConfig as KlipClaimNoConfig } from './KlipClaimNo';
import LaborConstrainedOfAmi, {
  fieldConfig as LaborConstrainedOfAmiConfig,
} from './LaborConstrainedOfAmi';
import MedicalCertificateDate, {
  fieldConfig as MedicalCertificateDateConfig,
} from './MedicalCertificateDate';
import PartOfBodyInjuredArray, {
  fieldConfig as PartOfBodyInjuredArrayConfig,
} from './PartOfBodyInjuredArray';
import ReportToThePolice, { fieldConfig as ReportToThePoliceConfig } from './ReportToThePolice';
import RequiringNursingDate, {
  fieldConfig as RequiringNursingDateConfig,
} from './RequiringNursingDate';
import SequelaeOfStroke, { fieldConfig as SequelaeOfStrokeConfig } from './SequelaeOfStroke';
import TrafficAccidentFlag, {
  fieldConfig as TrafficAccidentFlagConfig,
} from './TrafficAccidentFlag';
import IsDrinking, { fieldConfig as IsDrinkingConfig } from './IsDrinking';
import BehaviorInAccident, { fieldConfig as BehaviorInAccidentConfig } from './BehaviorInAccident';
import JudgmentAbility, { fieldConfig as JudgmentAbilityConfig } from './JudgmentAbility';
import ClaimReferenceDate, { fieldConfig as ClaimReferenceDateConfig } from './ClaimReferenceDate';
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
  CauseOfIncidentConfig,
  ClaimTypeArrayConfig,
  EditDateConfig,
  FirstConsultationDateConfig,
  IdentificationDateConfig,
  IncidentDateConfig,
  IncidentInDetailConfig,
  IncidentPlaceConfig,
  // KlipClaimNoConfig,
  LaborConstrainedOfAmiConfig,
  MedicalCertificateDateConfig,
  PartOfBodyInjuredArrayConfig,
  ReportToThePoliceConfig,
  RequiringNursingDateConfig,
  SequelaeOfStrokeConfig,
  TrafficAccidentFlagConfig,
  IsDrinkingConfig,
  BehaviorInAccidentConfig,
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
  CauseOfIncident,
  ClaimTypeArray,
  EditDate,
  FirstConsultationDate,
  IdentificationDate,
  IncidentDate,
  IncidentInDetail,
  IncidentPlace,
  // KlipClaimNo,
  LaborConstrainedOfAmi,
  MedicalCertificateDate,
  PartOfBodyInjuredArray,
  ReportToThePolice,
  RequiringNursingDate,
  SequelaeOfStroke,
  TrafficAccidentFlag,
  IsDrinking,
  BehaviorInAccident,
  JudgmentAbility,
  ClaimReferenceDate,
  StateOfRequiringNursing,
  DisabilityGrade,
  TotalPermanentDisability,
  PhysicalDisability,
  MentalState,
  DeathCode,
  CauseOfDeath,
  CancerAppearanceDiagnosisDate,
};
