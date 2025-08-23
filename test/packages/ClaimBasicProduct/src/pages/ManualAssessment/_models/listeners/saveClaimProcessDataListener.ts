export default function* saveClaimProcessDataListener(
  { payload }: any,
  { put, takeLatest, select }: any
) {
  yield takeLatest(['bpOfClaimAssessmentController/saveClaimProcessData'], function* action(
    action
  ) {
    yield put({
      type: 'updatePayableAmountCallback',
    });
    yield put({
      type: 'formCommonController/saveFormListBGColor',
      payload: action.payload,
    });
  });
}
