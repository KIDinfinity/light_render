export default function* saveClaimPayableItemListener(_: any, { put, takeLatest }: any) {
  yield takeLatest(['PHCLMOfClaimAssessmentController/saveClaimPayableItem'], function* action({
    payload,
  }: any) {
    yield put({
      type: 'formCommonController/saveFormItemBGColor',
      payload,
    });
  });
}
