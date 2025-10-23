import lodash from 'lodash';
import { requestSrvPolicy } from '@/services/posSrvPolicyRequestControllerService';

interface IResult {
  success: boolean;
  resultData: object;
}

export default function* policyInfoRemote({ payload, signal }: any, { put, call }: any) {
  const policyNo = lodash.trim(payload.policyNo);

  if (!policyNo) {
    yield put({
      type: 'clear',
    });
    return false;
  }

  const result: IResult = yield call(
    requestSrvPolicy,
    { policyId: policyNo },
    {
      signal,
    }
  );

  if (lodash.isPlainObject(result) && result.success && lodash.isPlainObject(result.resultData)) {
    yield put({
      type: 'policyInfoUpdate',
      payload: {
        policyInfo: result.resultData,
        policyId: policyNo,
      },
    });
    return true;
  }

  yield put({
    type: 'clear',
  });

  return false;
}
