import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';

import { getMcsClaimNoMapping } from '@/services/claimHkAutoAssessmentControllerService';

export default function* checkRegisterMcs({ payload }: any, { call, put }: any) {
  const response = yield call(getMcsClaimNoMapping, objectToFormData(payload));
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'saveRegisterMcs',
      payload: {
        isRegisterMcs: !!resultData,
      },
    });
  }
}
