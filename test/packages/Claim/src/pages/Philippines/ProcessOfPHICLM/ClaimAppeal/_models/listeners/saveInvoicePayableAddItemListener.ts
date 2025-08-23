export default function* saveInvoicePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('PHCLMOfAppealCaseController/saveInvoicePayableAddItem', function* action({
    payload,
  }: any) {
    yield put({
      type: 'saveInvoicePayableAddItemCallback',
      payload,
    });
  });
}
