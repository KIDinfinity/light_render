import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000865 = () => (rule: any, value: any, callback: Function) => {
  if (Number(value) === 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000880' }));
  }

  callback();
};
