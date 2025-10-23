import { compareCurrenthourTargethour } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 *
 * @param hospitalization 入院期间
 */
export const VLD_000058 = (hospitalization: any, validateIf: boolean, granularity?: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    validateIf &&
    (compareCurrenthourTargethour(value, hospitalization[0], granularity) ||
      compareCurrenthourTargethour(hospitalization[1], value, granularity))
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000086' }));
  }
  callback();
};
