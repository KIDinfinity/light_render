import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

export const operationDateLaterIncidentDate = (incidentDateValue: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (compareCurrentTimeTargetTime(value, incidentDateValue)) {
    callback("Date Of Operation should't be earlier than Date Of Incident");
  }
  callback();
};
