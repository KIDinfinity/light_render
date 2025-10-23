import { formatMessageApi } from '@/utils/dictFormatMessage';
import { VLD_000036Rule } from './VLD_000036Rule';

export const VLD_000036 = () => (rule: any, value: any, callback: Function) => {
  if (value && !VLD_000036Rule(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000058' }));
  }
  callback();
};
