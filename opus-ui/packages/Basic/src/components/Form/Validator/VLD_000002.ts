import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_000002 =
  (minLength: number | undefined, maxLength: number) =>
  (rule: any, value: any, callback: Function) => {
    if (lodash.isEmpty(value)) callback();
    const valueToString = lodash.toString(value);
    if (
      !lodash.isUndefined(minLength) &&
      (valueToString.length < minLength || valueToString.length > maxLength)
    ) {
      callback(
        formatMessageApi(
          { Label_COM_WarningMessage: 'ERR_000003' },
          minLength === maxLength ? `${maxLength}` : `${minLength}-${maxLength}`
        )
      );
    }
    if (lodash.isUndefined(minLength) && valueToString.length > maxLength) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000003' }, maxLength));
    }
    callback();
  };
