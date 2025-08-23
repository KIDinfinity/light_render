
import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// 出院时间要晚于入院时间
export const dischargeDateLaterAdmissionDate = (dateOfAdmissionValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, dateOfAdmissionValue)) {
    callback("Discharge date should't be earlier than Date Of Admission");
  }
  callback();
}
