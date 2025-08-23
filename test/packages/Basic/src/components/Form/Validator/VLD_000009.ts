import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 *
 * @param array 已存在的diagnosisCode
 */
export const VLD_000009 = (array: any) => (rule: any, value: any, callback: Function) => {
  if (lodash.includes(array, value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000017' }));
  }
  callback();
};
