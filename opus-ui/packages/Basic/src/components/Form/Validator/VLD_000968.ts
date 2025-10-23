import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000968 = () => (rule: any, value: any, callback: Function) => {
  const regex = /[!"\$\%\(\)\*\+:;<=>\?\@\]\[^_\`{\|}\~¥]/gi;
  if (regex.test(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001008' }));
  }
  callback();
};
