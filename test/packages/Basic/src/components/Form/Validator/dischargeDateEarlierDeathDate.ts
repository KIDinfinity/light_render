import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// 出院时间要早于或等于死亡时间
export const dischargeDateEarlierDeathDate = (dateTimeOfDeathValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
    callback("From Date should't be later than Date Of Discharge");
  }
  callback();
}
