export default function* saveIncidentPayableListener(_: any, { put, takeLatest }: any) {
  yield takeLatest('JPCLMOfClaimAssessmentController/saveIncidentPayableItem', function* action(
    ac: any
  ) {
    yield put({
      type: 'saveIncidentPayableItemCallback',
      payload: ac.payload,
    });
  });
}
