import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_000782 = ({ roomType }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    (value === '10.2.0' && lodash.includes(['CS', 'OU'], roomType))
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000772' }));
  }

  callback();
};
