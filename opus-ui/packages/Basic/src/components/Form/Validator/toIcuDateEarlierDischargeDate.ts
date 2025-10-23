import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// 出离ICU时间要早于出院时间
export const toIcuDateEarlierDischargeDate = (dateOfDischargeValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(dateOfDischargeValue, value)) {
    callback("To Date should't be later than Date Of Discharge");
  }
  callback();
}
