import { formatMessageApi } from '@/utils/dictFormatMessage';
import { VLD_000071Rule } from './VLD_000071Rule';

export const VLD_000071 = (policyNoArray: any) => (rule: any, value: any, callback: Function) => {
  if (!VLD_000071Rule(value, policyNoArray)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000064' }, value));
  }
  callback();
};
