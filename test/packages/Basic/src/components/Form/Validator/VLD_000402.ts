import { ClaimDecision } from 'claim/pages/utils/claim';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * 手动改为pending
 */
export const VLD_000402 = () => (rule: any, value: any, callback: Function) => {
  if (value === ClaimDecision.pending) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000199' }));
  }
  callback();
};
