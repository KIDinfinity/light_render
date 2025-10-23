import CauseOfIncident, { localFieldConfig as CauseOfIncidentConfig } from './CauseOfIncident';
import DateTimeOfDeath, {
  localFieldConfig as DateTimeOfDeathConfig,
} from './DateTimeOfDeath';
import IncidentDate, { localFieldConfig as IncidentDateConfig } from './IncidentDate';
import IncidentInDetail, { localFieldConfig as IncidentInDetailConfig } from './IncidentInDetail';
import IncidentPlace, { localFieldConfig as IncidentPlaceConfig } from './IncidentPlace';
import PartOfBodyInjuredArray, {
  localFieldConfig as PartOfBodyInjuredArrayConfig,
} from './PartOfBodyInjuredArray';
import ImmediateCause, { localFieldConfig as ImmediateCauseConfig } from './ImmediateCause';
import AntecedentCause, { localFieldConfig as AntecedentCauseConfig } from './AntecedentCause';
import UnderlyingCause, { localFieldConfig as UnderlyingCauseConfig } from './UnderlyingCause';
import OtherSignificantCause, { localFieldConfig as OtherSignificantCauseConfig } from './OtherSignificantCause';

export const localFieldConfigs = [
  CauseOfIncidentConfig,
  DateTimeOfDeathConfig,
  IncidentDateConfig,
  IncidentInDetailConfig,
  IncidentPlaceConfig,
  PartOfBodyInjuredArrayConfig,
  ImmediateCauseConfig,
  AntecedentCauseConfig,
  UnderlyingCauseConfig,
  OtherSignificantCauseConfig,
];

export default {
  CauseOfIncident,
  DateTimeOfDeath,
  IncidentDate,
  IncidentInDetail,
  IncidentPlace,
  PartOfBodyInjuredArray,
  ImmediateCause,
  AntecedentCause,
  UnderlyingCause,
  OtherSignificantCause,
};
