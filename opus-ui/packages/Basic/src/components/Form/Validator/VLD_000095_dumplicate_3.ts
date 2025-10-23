import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// （放射線治療温熱療法　期間）結束日須不早於開始日
export const VLD_000095_dumplicate_3 = (startDate: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (compareCurrentTimeTargetTime(value, startDate)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000110' }));
  }
  callback();
};
