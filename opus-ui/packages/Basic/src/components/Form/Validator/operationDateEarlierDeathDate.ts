import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

export const operationDateEarlierDeathDate = (dateTimeOfDeathValue: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
    callback("Date Of Operation should't be later than Datetime Of Death");
  }
  callback();
};
