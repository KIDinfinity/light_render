export default function* saveClaimProcessDataListener({ payload }: any, { put, takeLatest }: any) {
  yield takeLatest(['hbOfClaimAssessmentController/saveInvoiceItem'], function* action({
    payload,
  }: any) {
    yield put({
      type: 'saveInvoiceItemCallback',
      payload,
    });
  });
}
