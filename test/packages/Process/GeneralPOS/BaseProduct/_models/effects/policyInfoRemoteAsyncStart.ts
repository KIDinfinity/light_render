import lodash from 'lodash';
import { asyncRequestSrvPolicy } from '@/services/posSrvPolicyRequestControllerService';

interface IResult {
  success: boolean;
  resultData: object;
}

export default function* policyInfoRemoteAsyncStart(
  { payload, signal }: any,
  { put, call, select }: any
) {
  const taskDetail: IResponse = yield select(({ processTask }: any) => processTask.getTask);
  if (!payload?.isPaymentTrackResult) {
    yield put({
      type: 'clearTransactionInfo',
    });
  }

  const policyNo = lodash.trim(payload.policyNo);
  if (!policyNo) {
    return false;
  }

  const result: IResult = yield call(
    asyncRequestSrvPolicy,
    { policyId: policyNo, srvNo: taskDetail.inquiryBusinessNo },
    {
      signal,
    }
  );

  if (lodash.isPlainObject(result) && result.success) {
    yield put({
      type: 'saveState',
      payload: {
        loopTime: true,
      },
    });
    return result.resultData;
  }
}
