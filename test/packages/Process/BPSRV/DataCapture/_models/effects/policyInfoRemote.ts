import lodash from 'lodash';
import { requestSrvPolicy } from '@/services/posSrvPolicyRequestControllerService';
import { NAMESPACE } from '../../activity.config';

interface IResult {
  success: boolean;
  resultData: any;
}

export default function* policyInfoRemote({ payload, signal }: any, { put, call, select }: any) {
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

    const customerType = yield select(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.customerType
    );

    const caseCategory = yield select(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.caseCategory
    );


    yield put({
      type: 'insured360/saveTaskInfo',
      payload: {
        taskDetail:{
          businessNo:'',
          insuredId: result.resultData?.mainOwnerClientId,
          clientId:result.resultData?.mainOwnerClientId,
          customerType,
          caseCategory
        }
      },
    });

    return true;
  }

  yield put({
    type: 'clear',
  });

  return false;
}
