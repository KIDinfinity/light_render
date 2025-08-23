import { compareCurrenthourTargethour } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 *
 * @param incidentDate 事故发生时间
 */
export const VLD_000022 = (incidentDate: any, granularity?: any, skip: boolean = false) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (!incidentDate || skip) return callback();
  if (compareCurrenthourTargethour(value, incidentDate, granularity)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000043' }));
  }
  callback();
};
