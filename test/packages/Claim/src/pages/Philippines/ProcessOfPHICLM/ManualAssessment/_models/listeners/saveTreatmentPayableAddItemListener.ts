export default function* saveTreatmentPayableAddItemListener(_, { put, takeLatest }: any) {
  yield takeLatest(
    'PHCLMOfClaimAssessmentController/saveTreatmentPayableAddItem',
    function* action({ payload }: any) {
      yield put({
        type: 'saveTreatmentPayableAddItemCallback',
        payload,
      });
    }
  );
}
