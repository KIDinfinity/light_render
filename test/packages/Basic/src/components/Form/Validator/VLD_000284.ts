import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000284 = (
  percentage: number,
  policyNo: string,
  payablesType: string,
  vPercentage: boolean
) => (rule: any, value: number, callback: Function) => {
  if (!lodash.isNumber(value)) {
    callback();
  }
  if (value + percentage !== 100 && vPercentage) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000268' }, policyNo, payablesType));
  }
  callback();
};
