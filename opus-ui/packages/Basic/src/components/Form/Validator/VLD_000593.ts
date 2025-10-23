import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * 指定长度
 */
export const VLD_000593 = (length: number, isPrem: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (!isPrem && lodash.size(value) !== length) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000511' }, length));
  }
  callback();
};
