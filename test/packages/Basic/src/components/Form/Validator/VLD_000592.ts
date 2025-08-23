import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * 是否是日文半角符
 */
export const VLD_000592 = (isPrem: any) => (rule: any, value: any, callback: Function) => {
  if (!isPrem && !/^([^\x00-\xff|\uff61-\uff9f]|[0-9])+$/gi.test(value)) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000512' }));
  }
  callback();
};
