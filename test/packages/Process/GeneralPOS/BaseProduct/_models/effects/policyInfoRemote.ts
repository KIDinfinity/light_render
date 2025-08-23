import lodash from 'lodash';
import { requestSrvPolicy } from '@/services/posSrvPolicyRequestControllerService';

interface IResult {
  success: boolean;
  resultData: object;
}

export default function* policyInfoRemote({ payload, signal }: any, { put, call, select }: any) {
  const { caseCategory, activityKey } = yield select(({ processTask }: any) => processTask.getTask);

  yield put({
    type: 'clearTransactionInfo',
  });

  const policyNo = lodash.trim(payload.policyNo);
  if (!policyNo) {
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
        policyInfo: {
          ...result.resultData,
          clientInfoList: (result.resultData?.clientInfoList || []).map((item) => ({
            ...item,
            dob: item?.dateOfBirth || item?.dob,
          })),
        },
        policyId: policyNo,
      },
    });
    // yield put({
    //   type: 'policyInfoRemoteEffect',
    //   payload: {
    //     caseCategory,
    //     activityKey,
    //   },
    // });

    // yield put({
    //   type: 'insured360/saveTaskInfo',
    //   payload: {
    //     taskDetail:{
    //       businessNo:'',
    //       insuredId: result.resultData?.mainOwnerClientId,
    //       clientId:result.resultData?.mainOwnerClientId,
    //       caseCategory
    //     }
    //   },
    // });
    return true;
  }
}
