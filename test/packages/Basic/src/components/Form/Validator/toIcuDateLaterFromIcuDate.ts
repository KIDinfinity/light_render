import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// 出离ICU时间要晚于入住ICU时间
export const toIcuDateLaterFromIcuDate = (icuFromDateValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, icuFromDateValue)) {
    callback("To Date should't be earlier than From Date");
  }
  callback();
}
