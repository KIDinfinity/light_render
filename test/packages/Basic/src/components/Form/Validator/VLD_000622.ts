import { formatMessageApi } from '@/utils/dictFormatMessage';

// eslint-disable-next-line no-shadow
enum Decision {
  A = 'A',
  D = 'D',
  TBC = 'TBC',
}

export const VLD_000622 = ({ isCheck }: any) => (rule: any, value: any, callback: Function) => {
  if (!isCheck) {
    callback();
    return;
  }

  if (value === Decision.TBC) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000550' }));
    return;
  }

  callback();
};
