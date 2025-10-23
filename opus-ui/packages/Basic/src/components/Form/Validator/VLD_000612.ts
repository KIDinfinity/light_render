import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000612 = (form: any) => (rule: any, value: any, callback: Function) => {
  if (
    value === '03' &&
    (form.getFieldValue('identityType') !== 'I' || lodash.isEmpty(form.getFieldValue('identityNo')))
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000538' }));
    return;
  }
  callback();
};
