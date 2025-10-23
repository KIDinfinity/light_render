import lodash from 'lodash';
import { requestSrvPolicy } from '@/services/posSrvPolicyRequestControllerService';
import { NAMESPACE } from '../../activity.config';

export default function* policyInfoRefresh({ signal }: any, { put, call, select }: any) {
  const mainPolicyId: string = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData.mainPolicyId
  );

  const result: IResult = yield call(
    requestSrvPolicy,
    { policyId: mainPolicyId },
    {
      signal,
    }
  );

  if (lodash.isPlainObject(result) && result.success && lodash.isPlainObject(result.resultData)) {
    yield put({
      type: 'policyInfoUpdate',
      payload: {
        policyInfo: result.resultData,
        policyId: mainPolicyId,
      },
    });
  }
}
