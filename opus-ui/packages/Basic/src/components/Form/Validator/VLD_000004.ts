import { formatMessageApi } from '@/utils/dictFormatMessage';
import { compareCurrenthourTargethour } from '@/utils/validationsUtil';

/**
 * 相同的validation VLD_000175
 *
 * @param {any} incidentDateValue 事故发生时间
 *
 * @return {void}
 */
export const VLD_000004 = (
  incidentDateValue: any,
  granularity?: any,
  incidentTimeValue?: any,
  skip: boolean = false
) => (rule: any, value: any, callback: Function) => {
  if (!incidentDateValue || skip) return callback();
  if (compareCurrenthourTargethour(value, incidentDateValue, granularity, incidentTimeValue)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000007' }));
  }
  callback();
};
