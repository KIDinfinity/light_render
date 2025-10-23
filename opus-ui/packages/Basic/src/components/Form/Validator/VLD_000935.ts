import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export const VLD_000935 = (usTaxFlag: string, crtInfoList: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (formUtils.queryValue(usTaxFlag) === 'Y' && lodash.isEmpty(crtInfoList)) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000956' }));
  }
  callback();
};
