export default function* saveClaimProcessDataListener(_: any, { put, takeLatest }: any) {
  yield takeLatest(['PHCLMOfAppealCaseController/saveClaimProcessData'], function* action({
    payload,
  }: any) {
    yield put({
      type: 'updatePayableAmountCallback',
    });
    yield put({
      type: 'formCommonController/saveFormListBGColor',
      payload,
    });
  });
}
