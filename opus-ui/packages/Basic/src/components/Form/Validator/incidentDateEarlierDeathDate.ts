import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';

// Date Of Incident should't be later than death date
export const incidentDateEarlierDeathDate = (dateTimeOfDeathValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
    callback("Date Of Incident should't be later than death date");
  }
  callback();
};
