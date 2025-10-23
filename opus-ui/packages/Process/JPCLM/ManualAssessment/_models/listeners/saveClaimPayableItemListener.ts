export default function* saveClaimPayableItemListener(_: any, { put, takeLatest }: any) {
  yield takeLatest(['JPCLMOfClaimAssessment/saveClaimPayableItem'], function* act(
    action: any
  ) {
    yield put({
      type: 'formCommonController/saveFormItemBGColor',
      payload: action.payload,
    });
    yield put({
      type: 'removeTempClaimPayable',
      payload: action.payload,
    })
  });
}
