
import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// 出院时间要晚于入院时间
export const dischargeDateLaterAdmissionDate = (dateOfAdmissionValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, dateOfAdmissionValue)) {
    callback(formatMessageApi({Label_COM_WarningMessage:'ERR_000080'}));
  }
  callback();
}
