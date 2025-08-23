import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000968 = (preDecision: any) => (rule: any, value: any, callback: Function) => {
  const regex = /[!"\$\%\(\)\*\+:;<=>\?\@\]\[^_\`{\|}\~¥]/gi;
  if (regex.test(value) && preDecision !== 'AP') {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001008' }));
  }
  callback();
};
