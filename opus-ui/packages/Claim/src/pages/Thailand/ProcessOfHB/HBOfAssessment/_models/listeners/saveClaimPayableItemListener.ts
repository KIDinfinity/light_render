export default function* saveClaimPayableItemListener(
  { payload }: any,
  { put, takeLatest, select }: any
) {
  yield takeLatest(['hbOfClaimAssessmentController/saveClaimPayableItem'], function* action(
    action
  ) {
    yield put({
      type: 'formCommonController/saveFormItemBGColor',
      payload: action.payload.daClaimAssessmentVO,
    });
    yield put({
      type: 'hbOfClaimAssessmentController/saveClaimPayableItemCallback',
      payload: action.payload.daClaimAssessmentVO,
    });
  });
}
