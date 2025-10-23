
export default function* saveInvoicePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('bpOfClaimAssessmentController/saveInvoicePayableAddItem', function* action(ac) {
    yield put({
      type: 'saveInvoicePayableAddItemCallback',
      payload: ac.payload,
    });
  });
}
