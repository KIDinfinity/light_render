export default function* saveClaimProcessDataListener({ payload }: any, { put, takeLatest }: any) {
  yield takeLatest(['daOfClaimAssessmentController/saveInvoiceItem'], function* action({
    payload,
  }: any) {
    yield put({
      type: 'saveInvoiceItemCallback',
      payload,
    });
  });
}
