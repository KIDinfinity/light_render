import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DiagnosisCode } from 'basic/enum/DiagnosisCode';

export const VLD_000657 = () => (rule: any, value: any, callback: Function) => {
  if (value === DiagnosisCode.Dummy) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000593' }));
  }
  callback();
};
