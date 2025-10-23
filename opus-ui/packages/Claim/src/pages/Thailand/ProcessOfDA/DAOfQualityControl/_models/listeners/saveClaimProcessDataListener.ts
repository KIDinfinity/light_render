export default function* saveClaimProcessDataListener(
  { payload }: any,
  { put, takeLatest, select }: any
) {
  yield takeLatest(['daOfClaimCaseController/saveClaimProcessData'], function* action({
    payload,
  }: any) {
    yield put({
      type: 'formCommonController/saveFormListBGColor',
      payload,
    });
    yield put({
      type: 'saveClaimProcessDataCallback',
      payload,
    });
  });
}
