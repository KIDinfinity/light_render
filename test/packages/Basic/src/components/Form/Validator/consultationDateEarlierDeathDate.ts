import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// 会诊时间要在死亡时间之前
export const consultationDateEarlierDeathDate = (dateTimeOfDeathValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
    callback("Consultation date should't be later than Datetime Of Death");
  }
  callback();
}
