import lodash from 'lodash';

export default function* handleAssessDecisionListener(_: any, { put, takeLatest }: any) {
  yield takeLatest(
    [
      'opusClaimAssessment/saveClaimPayableItem',
      'opusClaimAssessment/removeClaimPayableItem',
      'opusClaimAssessment/addClaimPayableItem',
      'opusClaimAssessment/saveClaimProcessData',
      'opusClaimAssessment/saveClaimIncidentPayableItem',
      'opusClaimAssessment/removeClaimIncidentPayableItem',
    ],
    function* act({ payload }: any) {
      if (
        lodash.isUndefined(payload.changedFields) ||
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
