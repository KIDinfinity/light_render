import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

export default function* handleAssessDecisionListener(_: any, { put, takeLatest }: any) {
  yield takeLatest(
    [
      `${NAMESPACE}/saveClaimPayableItem`,
      `${NAMESPACE}/removeClaimPayableItem`,
      `${NAMESPACE}/addClaimPayableItem`,
      `${NAMESPACE}/saveClaimProcessData`,
    ],
    function* act({ payload }: any) {
      if (
        lodash.isUndefined(payload?.changedFields) ||
        lodash.has(payload, 'changedFields.claimDecision')
      ) {
        yield put({
          type: 'updateAssessDecision',
          payload,
        });
      }
    }
  );
}
