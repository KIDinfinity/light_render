import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000855 = () => (rule: any, value: any, callback: Function) => {
  if (Number(value) === 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000879' }));
  }

  callback();
};
