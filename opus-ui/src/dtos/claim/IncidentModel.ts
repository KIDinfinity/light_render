import type { IJPIncident } from './JPIncidentModel';
import type { IDiagnosis } from './DiagnosisModel';
import type { ITreatment } from './TreatmentModel';

export interface IIncident {
  causeOfDeath: string;
  causeOfIncident: string;
  claimNo: string;
  claimType: string;
  claimTypeArray: string[];
  creator: string;
  deathDate: Date;
  deleted: number;
  diagnosisList: IDiagnosis[];
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  identificationDate: Date;
  incidentDate: Date;
  incidentInDetail: string;
  incidentNo: string;
  incidentPlace: string;
  insuredType: string;
  modifier: string;
  orderNum: number;
  partOfBodyInjured: string;
  partOfBodyInjuredArray: string[];
  primaryDiagnosisCode: string;
  requirementNo: string;
  transId: string;
  treatmentList: ITreatment[];
  jpIncident: IJPIncident;
  waivedReason: string;
  claimTypeTemp?: string[];
}
