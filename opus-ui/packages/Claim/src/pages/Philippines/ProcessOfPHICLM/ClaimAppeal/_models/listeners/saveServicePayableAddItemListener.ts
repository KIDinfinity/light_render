export default function* saveServicePayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest('PHCLMOfAppealCaseController/saveServicePayableAddItem', function* action({
    payload,
  }: any) {
    yield put({
      type: 'saveServicePayableAddItemCallback',
      payload,
    });
  });
}
