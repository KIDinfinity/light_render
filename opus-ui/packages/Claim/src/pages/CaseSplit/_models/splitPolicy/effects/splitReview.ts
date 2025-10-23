import lodash from 'lodash';
import { previewSplitCase } from '@/services/claimSplitClaimCaseService';

export default function* ({ payload }: any, { call, put, select }: any) {
  const response = yield call(previewSplitCase, payload);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && lodash.isPlainObject(resultData)) {
    const wholeEntities = yield select(
      ({ caseSplitController }: any) => caseSplitController.wholeEntities
    );

    const { newCase, originalCase, splitClaimAssessmentBO } = resultData;

    yield put({
      type: 'updateClaimData',
      payload: {
        wholeEntities,
        newCase,
        originalCase,
      },
    });

    yield put({
      type: 'caseSplitController/saveData',
      payload: {
        splitClaimAssessmentBO,
      },
    });
  }
}
