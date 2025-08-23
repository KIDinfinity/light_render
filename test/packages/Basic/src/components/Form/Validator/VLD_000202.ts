import { ClaimDecision } from 'claim/pages/utils/claim';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000202 = (isClickRegister: boolean = false) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value === ClaimDecision.pending && !isClickRegister) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000199' }));
  }
  callback();
};
