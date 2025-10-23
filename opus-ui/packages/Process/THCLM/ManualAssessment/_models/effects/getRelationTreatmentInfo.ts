import lodash from 'lodash';
import claimRelationControllerService from '@/services/claimRelationControllerService';

export default function* getRelationTreatmentInfo({ payload }: any, { call, put }: any) {
  const { claimRelation } = payload || {};

  if (lodash.isPlainObject(claimRelation)) {
    const response = yield call(
      claimRelationControllerService.getRelatedTreatmentInfo,
      claimRelation
    );

    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

    if (success && resultData) {
      yield put({
        type: 'saveSerialTreatment',
        payload: { serialTreatments: resultData },
      });
    }
  }
}
