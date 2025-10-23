import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_001016 =
  (reimbursementPercentage, SA) => (rule: any, value: any, callback: Function) => {
    if (
      !lodash.isUndefined(reimbursementPercentage) &&
      !lodash.isNull(reimbursementPercentage) &&
      value > ((Number(reimbursementPercentage) * Number(SA)) / 100).toFixed(2)
    ) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000761' }));
    }
    callback();
  };
