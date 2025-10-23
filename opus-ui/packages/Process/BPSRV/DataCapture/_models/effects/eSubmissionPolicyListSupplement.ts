import lodash from 'lodash';
import { requestSrvPolicy } from '@/services/posSrvPolicyRequestControllerService';

interface IResult {
  success: boolean;
  resultData: any;
}

export default function* policyInfoRemote({ payload }: any, { put, call }: any) {
  const policyId = lodash.trim(payload.policyId);
  if (policyId) {
    const result: IResult = yield call(requestSrvPolicy, { policyId });

    if (lodash.isPlainObject(result) && result.success && lodash.isPlainObject(result.resultData)) {
      yield put({
        type: 'eSubmissionPolicyListUpdate',
        payload: {
          policyInfo: result.resultData,
        },
      });
    }
  }
}
