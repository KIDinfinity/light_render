import lodash from 'lodash';
import { getAsyncRequestExternalCaseResult } from '@/services/posSrvExternalCaseControllerService';

export default function* getLiteDataAsyncLoop({ payload, signal }: any, { select }: any) {
  const asyncId = payload?.asyncId;

  if (lodash.isEmpty(asyncId)) {
    return {
      status: 'stop',
    };
  }

  const result = yield getAsyncRequestExternalCaseResult({ asyncId }, { signal });

  if (lodash.isPlainObject(result) && result?.success && lodash.isPlainObject(result?.resultData)) {
    if (result?.resultData?.status === 'inProgress') {
      return {
        status: 'inProgress',
      };
    }

    if (result?.resultData?.status === 'finish') {
      return {
        status: 'finish',
        data: result?.resultData?.srvCaseVO,
      };
    }
  }

  return {
    status: 'stop',
  };
}
