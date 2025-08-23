
export default function* saveServicePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('JPCLMOfClaimAssessment/saveServicePayableAddItem', function* action(ac) {
    yield put({
      type: 'saveServicePayableAddItemCallback',
      payload: ac.payload,
    });
  });
}
