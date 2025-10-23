import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import formUtils from '../formUtils';

export const VLD_001103 =
  ({ exclusionList }: { exclusionList: any[] }) =>
  (_: any, value: any, callback: any) => {
    const existedCode = lodash.some(exclusionList, (ex) => Boolean(formUtils.queryValue(ex.code)));

    // 当remark填了内容，但是没有任何一条exclusion选择了code，则提示错误信息
    if (!existedCode && value && value.length > 0) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001247' }));
    }
    callback();
  };
