export default function* saveTreatmentPayableAddItemListener(
  { payload }: any,
  { put, takeLatest }: any
) {
  yield takeLatest('daOfClaimAssessmentController/saveTreatmentPayableAddItem', function* action(
    ac: any
  ) {
    // yield put({
    //   type: 'saveTreatmentPayableAddItemCallback',
    //   payload: ac.payload,
    // });
  });
}
