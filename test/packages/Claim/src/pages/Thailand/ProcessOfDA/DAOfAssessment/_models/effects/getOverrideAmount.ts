import lodash from 'lodash';
import { getOverrideAmount } from '@/services/claimGetOverrideAmountControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const id = payload?.params?.id;
  const response = yield call(getOverrideAmount, payload?.params);

  if (response.success && lodash.isNumber(response?.resultData)) {
    yield put({
      type: 'daOfClaimAssessmentController/saveTreatmentPayableItem',
      payload: {
        treatmentPayableItemId: id,
        changedFields: {
          assessorOverrideAmount: response?.resultData,
        },
      },
    });
  }
}
