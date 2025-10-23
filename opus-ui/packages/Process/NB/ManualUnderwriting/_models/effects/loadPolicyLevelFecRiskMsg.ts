import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getFecInfo } from '@/services/c360BenefitPlanPatchControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const { policyId } = lodash.pick(payload, ['policyId']);

  const response = yield call(
    getFecInfo,
    objectToFormData({
      policyId,
    })
  );

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    const fecRiskMsg = lodash.chain(resultData).get('fecRiskInfo.riskLevel').value();
    yield put({
      type: 'setPolicyLevelFecRiskMsg',
      payload: {
        fecRiskMsg,
      },
    });
  }
}
