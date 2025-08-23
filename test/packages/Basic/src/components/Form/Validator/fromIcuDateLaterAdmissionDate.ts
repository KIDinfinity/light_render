
import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// 入住ICU时间要晚于入院时间
export const fromIcuDateLaterAdmissionDate = (dateOfAdmissionValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, dateOfAdmissionValue)) {
    callback("From Date should't be earlier than Date Of Admission");
  }
  callback();
}
