export default function* saveProcedurePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('opusClaimAssessment/saveProcedurePayableItemAdd', function* action(ac) {
    yield put({
      type: 'saveProcedurePayableItemAddCallback',
      payload: ac.payload,
    });
  });
}
