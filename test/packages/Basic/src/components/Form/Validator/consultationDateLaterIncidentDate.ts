import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// 会诊时间要在事故时间之后
export const consultationDateLaterIncidentDate = (incidentDateValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, incidentDateValue)) {
    callback("Consultation date shouldn't be earlier than Date Of Incident");
  }
  callback();
}
