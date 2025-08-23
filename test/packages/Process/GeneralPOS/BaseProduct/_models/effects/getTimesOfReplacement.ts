import { getTimesOfReplacement } from '@/services/posSrvCaseInquiryControllerService';
import { NAMESPACE } from '../../activity.config';
import lodash from 'lodash';

export default function* ({ payload }, { call, put, select }: any) {
  const { transactionId } = payload;

  const policyId: any = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );

  const duplicatePolicy: any = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap[transactionId]?.duplicatePolicy
  );

  if (lodash.isEmpty(duplicatePolicy)) {
    const result = yield call(getTimesOfReplacement, { policyId });
    yield put({
      type: 'duplicatePolicyInit',
      payload: {
        transactionId,
        timesOfReplacement: result?.resultData,
      },
    });
  }
}
