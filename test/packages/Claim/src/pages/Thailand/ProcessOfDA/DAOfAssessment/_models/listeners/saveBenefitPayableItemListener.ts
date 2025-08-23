export default function* saveBenefitPayableItemListener(
  { payload }: any,
  { put, takeLatest, select }: any
) {
  yield takeLatest(['daOfClaimAssessmentController/saveBenefitPayableItem'], function* action(
    action: any
  ) {
    yield put({
      type: 'saveBenefitPayableItemCallback',
      payload: action.payload,
    });
  });
}
