import lodash from 'lodash';
import { getJpRelatedTreatmentDetail } from '@/services/claimRelationControllerService';
export default function* getSerialClaimTreatmenDetail({ payload }: any, { call, put }: any) {
  const { claimTreatmentPayableIds } = payload;

  const responseInfo = yield call(getJpRelatedTreatmentDetail, claimTreatmentPayableIds);

  if (responseInfo?.success && lodash.isArray(responseInfo?.resultData)) {
    yield put({
      type: 'saveSerialClaimTreatmentPayableDetail',
      payload: {
        list: responseInfo?.resultData,
      },
    });
  }
}
