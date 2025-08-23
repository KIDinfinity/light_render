
export default function* saveClaimPayableItemListener({ payload }: any, { put, takeLatest }: any) {
  yield takeLatest(['bpOfClaimAssessmentController/saveClaimPayableItem'], function* action(
    action
  ) {
    yield put({
      type: 'formCommonController/saveFormItemBGColor',
      payload: action.payload,
    });
  });
}
