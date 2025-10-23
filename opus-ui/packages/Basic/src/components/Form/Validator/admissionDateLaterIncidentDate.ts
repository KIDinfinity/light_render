import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// 入院时间要晚于事故时间
export const admissionDateLaterIncidentDate = (incidentDateValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, incidentDateValue)) {
    callback("Admission date should't be earlier than Date Of Incident");
  }
  callback();
}
