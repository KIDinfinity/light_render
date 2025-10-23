
export default function* saveTreatmentPayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('opusClaimAssessment/saveTreatmentPayableAddItem', function* action(ac) {
    yield put({
      type: 'saveTreatmentPayableAddItemCallback',
      payload: ac.payload,
    });
  });
}
