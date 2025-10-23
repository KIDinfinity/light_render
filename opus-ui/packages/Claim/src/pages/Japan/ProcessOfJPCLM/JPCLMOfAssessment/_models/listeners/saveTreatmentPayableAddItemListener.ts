export default function* saveTreatmentPayableAddItemListener(_: any, { put, takeLatest }: any) {
  yield takeLatest('JPCLMOfClaimAssessmentController/saveTreatmentPayableAddItem', function* action(
    ac: any
  ) {
    yield put({
      type: 'saveTreatmentPayableAddItemCallback',
      payload: ac.payload,
    });
  });
}
