export default function* saveInvoicePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('hbOfClaimAssessmentController/saveInvoicePayableAddItem', function* action(ac) {
    yield put({
      type: 'saveInvoicePayableAddItemCallback',
      payload: ac.payload,
    });
  });
}
