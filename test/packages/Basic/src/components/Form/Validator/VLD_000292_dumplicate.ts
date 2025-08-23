import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 *
 * Withdraw Amount 校验
 */
export const VLD_000292 = (record: any) => (rule: any, value: any, callback: Function) => {
  if (Number(formUtils.queryValue(value)) > Number(formUtils.queryValue(record?.totalFundValue))) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000273' }));
  }
  callback();
};
