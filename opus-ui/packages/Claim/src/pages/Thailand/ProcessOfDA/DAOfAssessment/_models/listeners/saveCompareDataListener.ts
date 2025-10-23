export default function* saveCompareDataListener({ payload }: any, { put, takeLatest }: any) {
  yield takeLatest(
    [
      'daOfClaimAssessmentController/saveBenefitPayableItem',
      'daOfClaimAssessmentController/saveClaimPayableItem',
      'daOfClaimAssessmentController/saveLifePayable',
      'daOfClaimAssessmentController/saveTreatmentPayableItem',
      'daOfClaimAssessmentController/saveAccidentBenefitPayableItem',
    ],
    function* action(action: any) {
      yield put({ type: 'compareData', payload: action?.payload });
    }
  );
}
