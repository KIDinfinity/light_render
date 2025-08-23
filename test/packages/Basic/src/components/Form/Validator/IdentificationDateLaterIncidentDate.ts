import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// Identification Date should't be earlier than Date Of Incident
export const IdentificationDateLaterIncidentDate = (incidentDateValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, incidentDateValue)) {
    callback("Identification Date should't be earlier than Date Of Incident");
  }
  callback();
}
