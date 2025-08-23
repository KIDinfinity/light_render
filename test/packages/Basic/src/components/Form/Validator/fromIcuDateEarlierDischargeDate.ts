import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// 入住ICU时间要早于出院时间
export const fromIcuDateEarlierDischargeDate = (dateOfDischargeValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(dateOfDischargeValue, value)) {
    callback("From Date should't be later than Date Of Discharge");
  }
  callback();
}
