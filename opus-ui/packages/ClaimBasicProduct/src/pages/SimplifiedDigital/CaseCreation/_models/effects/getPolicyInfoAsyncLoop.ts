import lodash from 'lodash';
import { getAsyncRequestPolicyResult } from '@/services/owbRegistrationPolicyControllerService';

export default function* getPolicyInfoAsyncLoop({ payload, signal }: any, { select }: any) {
  const { policyNo, asyncId } = payload;

  if (lodash.isEmpty(asyncId)) {
    return {
      status: 'stop',
    };
  }

  const result = yield getAsyncRequestPolicyResult({ asyncId, policyId: policyNo }, { signal });

  if (lodash.isPlainObject(result) && result?.success && lodash.isPlainObject(result?.resultData)) {
    if (result?.resultData?.status === 'inProgress') {
      return {
        status: 'inProgress',
      };
    }

    if (result?.resultData?.status === 'finish') {
      return {
        status: 'finish',
        data: result?.resultData?.owbRegVanCaseVO,
      };
    }
  }

  return {
    status: 'stop',
  };
}
