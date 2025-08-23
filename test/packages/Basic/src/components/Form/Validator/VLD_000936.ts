import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export const VLD_000936 = (crtInfoMap: any, crtInfoList: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    !lodash.some(
      crtInfoList,
      (id: string) => formUtils.queryValue(crtInfoMap?.[id]?.ctfCountryCode) === 'USA'
    )
  ) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000957' }));
  }
  callback();
};
