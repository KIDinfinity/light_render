import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const vld000294 = (targetList: any) => (rule: any, value: any, callback: Function) => {
  if (lodash.includes(targetList, value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000247' }));
  }
  callback();
};
