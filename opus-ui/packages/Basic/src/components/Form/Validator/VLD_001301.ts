import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';

export const VLD_001301 = (decision) => (rule: any, value: any, callback: Function) => {
  if (value !== 'cleared' && decision === DecisionEnum.A) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001001' }));
  }
  callback();
};
