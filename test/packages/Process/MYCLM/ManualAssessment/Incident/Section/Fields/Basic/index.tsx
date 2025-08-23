import CauseOfIncident, { localFieldConfig as CauseOfIncidentConfig } from './CauseOfIncident';
import FirstConsultationDate, {
  localFieldConfig as FirstConsultationDateConfig,
} from './FirstConsultationDate';
import IdentificationDate, {
  localFieldConfig as IdentificationDateConfig,
} from './IdentificationDate';
import IncidentDate, { localFieldConfig as IncidentDateConfig } from './IncidentDate';
import IncidentInDetail, { localFieldConfig as IncidentInDetailConfig } from './IncidentInDetail';
import IncidentPlace, { localFieldConfig as IncidentPlaceConfig } from './IncidentPlace';
import PartOfBodyInjuredArray, {
  localFieldConfig as PartOfBodyInjuredArrayConfig,
} from './PartOfBodyInjuredArray';
import PaymentDateOfMajorCrisis, {
  localFieldConfig as PaymentDateOfMajorCrisisConfig,
} from './PaymentDateOfMajorCrisis';
import ImmediateCause, { localFieldConfig as ImmediateCauseConfig } from './ImmediateCause';
import AntecedentCause, { localFieldConfig as AntecedentCauseConfig } from './AntecedentCause';
import UnderlyingCause, { localFieldConfig as UnderlyingCauseConfig } from './UnderlyingCause';
import OtherSignificantCause, { localFieldConfig as OtherSignificantCauseConfig } from './OtherSignificantCause';
import DateTimeOfDeath, { localFieldConfig as DateTimeOfDeathConfig } from './DateTimeOfDeath';


export const localFieldConfigs = [
  CauseOfIncidentConfig,
  FirstConsultationDateConfig,
  IdentificationDateConfig,
  IncidentDateConfig,
  IncidentInDetailConfig,
  IncidentPlaceConfig,
  PartOfBodyInjuredArrayConfig,
  PaymentDateOfMajorCrisisConfig,
  ImmediateCauseConfig,
  AntecedentCauseConfig,
  UnderlyingCauseConfig,
  OtherSignificantCauseConfig,
  DateTimeOfDeathConfig,
];

export default {
  CauseOfIncident,
  FirstConsultationDate,
  IdentificationDate,
  IncidentDate,
  IncidentInDetail,
  IncidentPlace,
  PartOfBodyInjuredArray,
  PaymentDateOfMajorCrisis,
  ImmediateCause,
  AntecedentCause,
  UnderlyingCause,
  OtherSignificantCause,
  DateTimeOfDeath,
};
