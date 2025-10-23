import lodash from 'lodash';
import { getTakeOverInfoByPolicyId } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { put, call, select }: any) {
  const policyNo = lodash.get(payload, 'policyNo');
  const businessNo = yield select((state: any) => state.processTask.getTask.businessNo);
  const response = yield call(getTakeOverInfoByPolicyId, {
    policyId: policyNo,
    businessNo,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'saveProductCodeConfig',
      payload: {
        productCodeConfig: resultData,
        policyNo,
      },
    });
  }
}
