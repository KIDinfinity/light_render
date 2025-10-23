import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000327 = (paymentMethod: string, chequeRemark: string, isRequireArr: any[]) => {
  const isRequire = lodash.includes(isRequireArr, paymentMethod);
  const errorInfo =
    isRequire &&
    chequeRemark === '' &&
    formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' });
  return errorInfo;
};
