import { compareCurrenthourTargethour } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 *
 * @param dateOfAdmission 入院时间
 */
export const VLD_000056 = (dateOfAdmission: any, validateIf: boolean, granularity?: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (validateIf && compareCurrenthourTargethour(value, dateOfAdmission, granularity)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000082' }));
  }
  callback();
};
