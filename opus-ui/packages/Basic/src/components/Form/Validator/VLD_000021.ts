import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 *
 * @param array 发票号码列表
 */
export const VLD_000021 = (array: any) => (rule: any, value: any, callback: Function) => {
  if (lodash.includes(array, value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000041' }));
  }
  callback();
};
