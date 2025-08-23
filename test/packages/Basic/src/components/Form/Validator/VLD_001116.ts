import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_001116 = (bankCode: any) => (rule: any, value: any, callback: Function) => {
  const newValue = lodash.isNumber(value) ? lodash.toString(value) : value;
  if (!/^\d+$/g.test(newValue)) {
    callback('Out of range!');
  }
  if (newValue && (bankCode === 'VMJ001' || bankCode === 'SBC005') && newValue.length !== 16) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000250' }, 16));
  }
  if (newValue && bankCode === 'AMX001' && newValue.length !== 15) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000250' }, 15));
  }
  callback();
};
