import lodash from 'lodash';
import { getAsyncRequestSrvPolicyResult } from '@/services/posSrvPolicyRequestControllerService';
import { NAMESPACE } from '../../activity.config';

export default function* getPolicyInfoAsyncLoop({ payload, signal }: any, { select }: any) {
  const asyncId = payload.asyncId;
  const mainPolicyId = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );
  const loopTime = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.loopTime);
  if (!loopTime || lodash.isEmpty(asyncId)) {
    return {
      status: 'stop',
    };
  }

  const result = yield getAsyncRequestSrvPolicyResult(
    { asyncId, policyId: mainPolicyId },
    { signal }
  );

  if (lodash.isPlainObject(result) && result?.success && lodash.isPlainObject(result?.resultData)) {
    if (result?.resultData?.status === 'inProgress') {
      return {
        status: 'inProgress',
      };
    }

    if (result?.resultData?.status === 'finish') {
      return {
        status: 'finish',
        data: result?.resultData?.srvPolicyVO,
      };
    }
  }

  return {
    status: 'stop',
  };
}
