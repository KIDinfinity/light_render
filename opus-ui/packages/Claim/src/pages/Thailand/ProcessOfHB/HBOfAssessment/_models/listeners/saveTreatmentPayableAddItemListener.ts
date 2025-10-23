export default function* saveTreatmentPayableAddItemListener(
  { payload }: any,
  { put, takeLatest }: any
) {
  yield takeLatest('hbOfClaimAssessmentController/saveTreatmentPayableAddItem', function* action(
    ac: any
  ) {
    // yield put({
    //   type: 'saveTreatmentPayableAddItemCallback',
    //   payload: ac.payload,
    // });
  });
}
