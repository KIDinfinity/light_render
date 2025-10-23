
export default function* saveServicePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('opusClaimAssessment/saveServicePayableAddItem', function* action(ac) {
    yield put({
      type: 'saveServicePayableAddItemCallback',
      payload: ac.payload,
    });
  });
}
