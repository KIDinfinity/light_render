import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// 入住ICU时间要早于出院时间
export const fromIcuDateEarlierDischargeDate =
  (dateOfDischargeValue: any) => (rule: any, value: any, callback: Function) => {
    if (compareCurrentTimeTargetTime(dateOfDischargeValue, value)) {
      callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000521' }));
    }
    callback();
  };
