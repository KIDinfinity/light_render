export default function* saveTreatmentPayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('PHCLMOfAppealCaseController/saveTreatmentPayableAddItem', function* action({
    payload,
  }: any) {
    yield put({
      type: 'saveTreatmentPayableAddItemCallback',
      payload,
    });
  });
}
