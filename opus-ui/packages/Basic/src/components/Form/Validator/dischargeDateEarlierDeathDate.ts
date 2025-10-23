import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// 出院时间要早于或等于死亡时间
export const dischargeDateEarlierDeathDate =
  (dateTimeOfDeathValue: any) => (rule: any, value: any, callback: Function) => {
    if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
      callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000521' }));
    }
    callback();
  };
