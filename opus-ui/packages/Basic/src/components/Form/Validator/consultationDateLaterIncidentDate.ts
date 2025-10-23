import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// 会诊时间要在事故时间之后
export const consultationDateLaterIncidentDate = (incidentDateValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, incidentDateValue)) {
    callback(formatMessageApi({Label_COM_WarningMessage:'ERR_000043'}));
  }
  callback();
}
