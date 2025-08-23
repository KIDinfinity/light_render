import lodash from 'lodash';
import { notification } from 'antd';

import { touch } from '@/services/navigatorCaseTouchOperationControllerService';

export default function* ({ payload }: any): Generator<any, any, any> {
  const { params, option } = payload || {};
  const touchResponse = yield touch(params, option);

  if (
    lodash.isPlainObject(touchResponse) &&
    touchResponse?.success &&
    lodash.isString(touchResponse.resultData?.touchId)
  ) {
    return touchResponse.resultData?.touchId || '';
  } else {
    notification.error({
      message: touchResponse?.promptMessages[0]?.content || 'Submit fail!',
    });
    return false;
  }
}
