import lodash from 'lodash';
import { getClaimIncidentBenefitPolicyNosByClaimNo } from '@/services/claimIncidentBenefitControllerService';

function* getPolicyNoInfo(_: any, { select, call, put }: any) {
  const { businessNo } = yield select((state: any) => state.envoyController);
  const currretPolicyNoInfo = yield select((state: any) =>
    lodash.get(state, `envoyController.policyNoInfo[${businessNo}]`)
  );
  if (currretPolicyNoInfo) return;
  const policyNoResponse = yield call(getClaimIncidentBenefitPolicyNosByClaimNo, businessNo);
  if (policyNoResponse && policyNoResponse.success) {
    yield put({
      type: 'savePolicyNoInfo',
      payload: {
        businessNo,
        policyNoArr: policyNoResponse.resultData,
      },
    });
  }
}

export default getPolicyNoInfo;
