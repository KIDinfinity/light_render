export default function* saveInvoicePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('PHCLMOfClaimAssessmentController/saveInvoicePayableAddItem', function* action({
    payload,
  }: any) {
    yield put({
      type: 'saveInvoicePayableAddItemCallback',
      payload,
    });
  });
}
