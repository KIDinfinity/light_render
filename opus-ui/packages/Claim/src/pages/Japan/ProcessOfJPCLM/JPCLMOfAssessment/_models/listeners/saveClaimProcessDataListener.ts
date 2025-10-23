import lodash from 'lodash';
import { preApprovalTaskDefKey } from '../../taskDefKey';

export default function* saveClaimProcessDataListener(
  { payload }: any,
  { select, put, takeLatest }: any
) {
  yield takeLatest(['JPCLMOfClaimAssessmentController/saveClaimProcessData'], function* action() {
    yield put({
      type: 'initDateOfTreatment',
      payload,
    });

    yield put({
      type: 'saveClaimProcessDataCallback',
      payload,
    });

    const taskDefKey = yield select((state: any) => state?.processTask?.getTask?.taskDefKey);
    if (lodash.includes(preApprovalTaskDefKey, taskDefKey)) {
      yield put({
        type: 'triggerSnapshot',
      });
    }
  });
}
