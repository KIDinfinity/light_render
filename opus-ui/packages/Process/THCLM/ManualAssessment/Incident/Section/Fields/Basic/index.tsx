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
import TimeofIncident, { localFieldConfig as TimeofIncidentConfig } from './TimeofIncident';
import SubClaimType, { localFieldConfig as SubClaimTypeConfig } from './SubClaimType';

export const localFieldConfigs = [
  CauseOfIncidentConfig,
  FirstConsultationDateConfig,
  IdentificationDateConfig,
  IncidentDateConfig,
  IncidentInDetailConfig,
  IncidentPlaceConfig,
  PartOfBodyInjuredArrayConfig,
  TimeofIncidentConfig,
  SubClaimTypeConfig,
];

export default {
  CauseOfIncident,
  FirstConsultationDate,
  IdentificationDate,
  IncidentDate,
  IncidentInDetail,
  IncidentPlace,
  PartOfBodyInjuredArray,
  TimeofIncident,
  SubClaimType,
};
