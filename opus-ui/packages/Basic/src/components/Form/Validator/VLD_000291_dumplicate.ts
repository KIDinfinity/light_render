import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 * Withdraw No. of Units 校验
 */
export const VLD_000291 = (record: any) => (rule: any, value: any, callback: Function) => {
  if (Number(formUtils.queryValue(value)) > Number(formUtils.queryValue(record?.numberOfUnits))) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000272' }));
  }
  callback();
};
