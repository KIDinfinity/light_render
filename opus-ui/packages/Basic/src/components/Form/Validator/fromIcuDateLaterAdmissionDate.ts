
import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// 入住ICU时间要晚于入院时间
export const fromIcuDateLaterAdmissionDate = (dateOfAdmissionValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, dateOfAdmissionValue)) {
    callback(formatMessageApi({Label_COM_WarningMessage:'ERR_000035'}));
  }
  callback();
}
