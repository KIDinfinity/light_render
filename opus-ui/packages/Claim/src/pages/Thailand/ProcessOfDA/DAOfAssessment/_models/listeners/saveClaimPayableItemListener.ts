export default function* saveClaimPayableItemListener(_: any, { put, takeLatest }: any) {
  yield takeLatest(['daOfClaimAssessmentController/saveClaimPayableItem'], function* action(
    action
  ) {
    yield put({
      type: 'formCommonController/saveFormItemBGColor',
      payload: action.payload,
    });

    yield put({
      type: 'saveClaimPayableItemCallback',
      payload: action.payload,
    });

    yield put({
      type: 'updatePayableAmountCallback',
    });
  });
}
