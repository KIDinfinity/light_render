import CauseOfIncident, { fieldConfig as CauseOfIncidentConfig } from './CauseOfIncident';
import ClaimTypeArray, { fieldConfig as ClaimTypeArrayConfig } from './ClaimTypeArray';
import IncidentDate, { fieldConfig as IncidentDateConfig } from './IncidentDate';

export const localFieldConfigs = [CauseOfIncidentConfig, ClaimTypeArrayConfig, IncidentDateConfig];

export default {
  CauseOfIncident,
  ClaimTypeArray,
  IncidentDate,
};
