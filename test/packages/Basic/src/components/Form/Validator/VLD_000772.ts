import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000772 = ({ chequeCategory }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    (chequeCategory === 'CMS' && Number(value) > 500) ||
    (chequeCategory !== 'CMS' && Number(value) > 150000)
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000761' }));
  }

  callback();
};
