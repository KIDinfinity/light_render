export default function* saveIncidentDecisionListener(_: any, { put, takeLatest }: any) {
  yield takeLatest('apOfClaimAssessmentController/saveIncidentDecisionItem', function* action(
    action: any
  ) {
    yield put({
      type: 'formCommonController/saveDecisionBGColor',
      payload: action.payload,
    });
  });
}
