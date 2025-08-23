export default function* saveClaimPayableItemListener(_: any, { put, takeLatest }: any) {
  yield takeLatest(['PHCLMOfAppealCaseController/saveClaimPayableItem'], function* action({
    payload,
  }: any) {
    yield put({
      type: 'formCommonController/saveFormItemBGColor',
      payload,
    });
  });
}
