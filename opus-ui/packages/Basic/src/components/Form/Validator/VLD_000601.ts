import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000601 = (dateOfDischarge: any) => (rule: any, value: any, callback: Function) => {
  if (value > dateOfDischarge) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000521' }));
  }
  callback();
};
