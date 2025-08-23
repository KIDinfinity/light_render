import lodash from 'lodash';

export default function* handleAssessDecisionListener(_: any, { put, takeLatest }: any) {
  yield takeLatest(
    [
      'JPCLMOfClaimAssessment/saveClaimPayableItem',
      'JPCLMOfClaimAssessment/removeClaimPayableItem',
      'JPCLMOfClaimAssessment/addClaimPayableItem',
      'JPCLMOfClaimAssessment/saveClaimProcessData',
      'JPCLMOfClaimAssessment/saveClaimIncidentPayableItem',
      'JPCLMOfClaimAssessment/removeClaimIncidentPayableItem',
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
