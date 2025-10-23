export default function* saveOtherProcedurePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('opusClaimAssessment/saveOtherProcedurePayableItemAdd', function* action(ac) {
    yield put({
      type: 'saveOtherProcedurePayableItemAddCallback',
      payload: ac.payload,
    });
  });
}
