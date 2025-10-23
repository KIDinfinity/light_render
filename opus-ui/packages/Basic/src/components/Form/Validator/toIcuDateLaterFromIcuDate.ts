import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// 出离ICU时间要晚于入住ICU时间
export const toIcuDateLaterFromIcuDate = (icuFromDateValue: any) => (
  rule: any,
  value: any,
  callback: Function,
) => {
  if (compareCurrentTimeTargetTime(value, icuFromDateValue)) {
    callback(formatMessageApi({Label_COM_WarningMessage:'ERR_000110'}));
  }
  callback();
}
