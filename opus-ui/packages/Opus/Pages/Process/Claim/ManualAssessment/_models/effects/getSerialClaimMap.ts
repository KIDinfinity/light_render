import lodash from 'lodash';
import { getJpRelatedTreatmentMap } from '@/services/claimRelationControllerService';

export default function* getAllSerialClaimList({ payload }: any, { select, call, put }: any) {
  const { treatmentPayableIdList } = payload;

  const claimNo = yield select((state: any) => state.opusClaimAssessment.claimProcessData.claimNo);

  const responseInfo = yield call(getJpRelatedTreatmentMap, treatmentPayableIdList);

  if (responseInfo?.success && !lodash.isEmpty(responseInfo?.resultData)) {
    yield put({
      type: 'saveSerialClaimMap',
      payload: {
        serialClaimMap: responseInfo?.resultData,
      },
    });
  }
}
