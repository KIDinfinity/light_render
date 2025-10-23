import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// 入院时间要早于死亡时间
export const admissionDateEarlierDeathDate = (dateTimeOfDeathValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
    callback("Date Of Admission should't be later than Datetime Of Death");
  }
  callback();
}
