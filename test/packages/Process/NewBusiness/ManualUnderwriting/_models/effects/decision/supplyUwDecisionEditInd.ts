import lodash from 'lodash';
import { updateUWDecision } from '@/services/owbNbCoverageUWDecisionServices';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default function* (_: any, { call, put, select }: any) {
  const coverageList = yield select((state: any) => state[NAMESPACE].processData?.coverageList);
  const policyDecision = yield select((state) => state[NAMESPACE].processData?.policyDecision);
  const response = yield call(updateUWDecision, {
    coverageList: formUtils.cleanValidateData(coverageList),
    policyDecision: formUtils.cleanValidateData(policyDecision),
  });
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: `updateCoverageListWhenHitSustainabilityChecking`,
      payload: {
        coverageList: response.resultData.coverageList,
      },
    });
  }
}
