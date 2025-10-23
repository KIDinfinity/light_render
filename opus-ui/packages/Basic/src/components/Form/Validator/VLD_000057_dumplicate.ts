import { compareCurrenthourTargethour } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 *
 * @param icuFromDate icu开始时间
 */
export const VLD_000057 = (icuFromDate: any, granularity?: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (compareCurrenthourTargethour(value, icuFromDate, granularity)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000084' }));
  }
  callback();
};
