export default function* saveBenefitPayableItemListener(
  { payload }: any,
  { put, takeLatest, select }: any
) {
  yield takeLatest(['hbOfClaimAssessmentController/saveBenefitPayableItem'], function* action(
    action: any
  ) {
    yield put({
      type: 'saveBenefitPayableItemCallback',
      payload: action.payload.daClaimAssessmentVO,
    });
  });
}
