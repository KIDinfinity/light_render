import lodash from 'lodash';
import { asyncRequestPolicy } from '@/services/owbRegistrationPolicyControllerService';

interface IResult {
  success: boolean;
  resultData: object;
}

export default function* policyInfoRemoteAsync(
  { payload, signal }: any,
  { put, call, select }: any
) {
  const taskDetail = yield select((state: any) => state.processTask.getTask);

  const result: IResult = yield call(
    asyncRequestPolicy,
    { policyId: payload.policyNo, caseCategory: taskDetail?.caseCategory },
    {
      signal,
    }
  );

  if (lodash.isPlainObject(result) && result.success) {
    return result.resultData;
  }
  return;
}
