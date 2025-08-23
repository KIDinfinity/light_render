import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_000999 = (digitsLength: number) => (rule: any, value: any, callback: Function) => {
  const newValue = lodash.isNumber(value) ? lodash.toString(value) : value;
  if (!/^\d+$/g.test(newValue) && !!newValue) {
    callback('Out of range!');
  }
  if (lodash.isNumber(digitsLength) && newValue && newValue.length !== digitsLength) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000250' }, digitsLength));
  }
  callback();
};
