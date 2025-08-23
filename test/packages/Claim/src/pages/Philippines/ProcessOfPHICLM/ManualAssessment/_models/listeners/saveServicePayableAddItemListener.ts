export default function* saveServicePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('PHCLMOfClaimAssessmentController/saveServicePayableAddItem', function* action({
    payload,
  }: any) {
    yield put({
      type: 'saveServicePayableAddItemCallback',
      payload,
    });
  });
}
