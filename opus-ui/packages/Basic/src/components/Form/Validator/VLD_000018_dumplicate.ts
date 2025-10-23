import { compareCurrenthourTargethour } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 *
 * @param dateOfAdmission 入院时间
 */
export const VLD_000018 = (dateOfAdmission: any, granularity?: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (compareCurrenthourTargethour(value, dateOfAdmission, granularity)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000035' }));
  }
  callback();
};
