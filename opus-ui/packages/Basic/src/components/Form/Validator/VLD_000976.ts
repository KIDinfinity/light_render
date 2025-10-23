import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000976 =
  (fieldName: string, maxNum: number) => (rule: any, value: any, callback: Function) => {
    if (Number(value) > maxNum) {
      callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001029' }, fieldName, maxNum));
    }
    callback();
  };
