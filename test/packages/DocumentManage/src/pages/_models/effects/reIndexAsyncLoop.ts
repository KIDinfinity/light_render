import lodash from 'lodash';
import { getAsyncRequestReIndexDoc } from '@/services/docViewControllerService';

export default function* getPolicyInfoAsyncLoop({ payload, signal }: any, { select }: any) {
  const asyncId = payload.asyncId;
  if (lodash.isEmpty(asyncId)) {
    return {
      status: 'stop',
    };
  }

  const result = yield getAsyncRequestReIndexDoc({ asyncId }, { signal });

  if (lodash.isPlainObject(result) && result?.success && lodash.isPlainObject(result?.resultData)) {
    if (result?.resultData?.status === 'inProcess') {
      return {
        status: 'inProgress',
      };
    }

    if (result?.resultData?.status === 'finish') {
      return {
        status: 'finish',
        data: result?.resultData?.docViewVOList,
      };
    }
  }

  return {
    status: 'stop',
  };
}
